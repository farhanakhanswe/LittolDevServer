const htmlDependenciesMappingAPIEndpoint = "/api/v1/html-dependencies-mapping";
const { htmlDependenciesMap } = require("../htmlDependenciesMap");
const config = require("../config.json");

const htmlDependenciesMappingAPIHandler = (request, response) => {
   
    console.log("htmlDependenciesMappingAPIHandler hit");
    let body = '';

    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', () => {
        const parsedBody = JSON.parse(body);
        const htmlLink = parsedBody.browserUrl;
        const assetLinks = parsedBody.assetLinks;

        if(!htmlDependenciesMap.has(htmlLink)){
            htmlDependenciesMap.set(htmlLink, [htmlLink]);
        }

        for(let i = 0 ; i < assetLinks.length ; i++){
            if(!htmlDependenciesMap.has(assetLinks[i])){
                htmlDependenciesMap.set(assetLinks[i], [htmlLink]);
            }else{
                const htmlLinksList = htmlDependenciesMap.get(assetLinks[i]);
                if(!htmlLinksList.includes(htmlLink)){
                    htmlLinksList.push(htmlLink);
                }
            }
        
        }
        console.log(parsedBody);
        console.log(htmlDependenciesMap);

        response.writeHead(200, {
            'Content-Type': 'application/json'
        });

        response.end(JSON.stringify({
            message: 'Success'
        }));
    });
}

module.exports = {
    htmlDependenciesMappingAPIHandler
}