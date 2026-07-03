const fs = require("fs");
const path = require("path");
const { filesToIgnore } = require("./public/filesToIgnore");
const { htmlDependenciesMap } = require("./htmlDependenciesMap");
const { filesToReloadSet} = require("./filesToReloadSet")
const { convertFilePathToUrl } = require("./convertFilePathToUrl");
const { eventTypeChangeStr, publicStr, rootIndexHTMLFilePath } = require("./helpers/constantsHelper");
const config = require("./config.json");
const baseUrl = config.baseUrl;


const watchDirectory = (directoryPath) => {
    // console.log(`watching directory path: ${directoryPath}` );
    
    fs.watch(directoryPath, (eventType, filename) => {
        if (!filename) return;

        const fullFilePath = path.join(directoryPath, filename);
        if (filesToIgnore(fullFilePath)) return;

        // console.log(`eventType: ${eventType} , directory path: ${directoryPath} , fileName: ${filename}, fullpath: ${fullFilePath}`);

        if(eventType === eventTypeChangeStr){
            const url = convertFilePathToUrl(fullFilePath);
            // console.log(`watcher, converted url : ${url}`);
            if(htmlDependenciesMap.has(url)){
                const htmlLinks = htmlDependenciesMap.get(url);
                for (const htmlLink of htmlLinks) {
                    filesToReloadSet.add(htmlLink);
                }
            }

            if(htmlDependenciesMap.has(baseUrl) && fullFilePath === rootIndexHTMLFilePath){
                filesToReloadSet.add(baseUrl);
            }

            // console.log(htmlDependenciesMap);
            // console.log(filesToReloadSet)
        }
        return;
    });
}

const watchDirectoriesRecursively = (directoryPath) => {
    watchDirectory(directoryPath);

    const items = fs.readdirSync(directoryPath, { withFileTypes: true});
    for(const item of items){
        const childDirectory = path.join(directoryPath, item.name);

        if (filesToIgnore(childDirectory)) continue;

        if(item.isDirectory()){
            watchDirectoriesRecursively(childDirectory);
        }
    }
}

const watchFiles = () => {
    watchDirectoriesRecursively(publicStr);
}

module.exports = {
    watchFiles
};