const fs = require("fs");
const mimeTypes = require("./mimeTypes.json");
const { contentTypeStr, notFoundStatusCodeInt, notFoundHTMLFilePathStr, htmlExtensionStr }  = require('./helpers/constantsHelper');
const { scriptInjection } = require("./scriptInjection");

const serve404NotFound = (response) => {
    response.statusCode = notFoundStatusCodeInt;
    response.setHeader(contentTypeStr, mimeTypes[htmlExtensionStr]);

    fs.readFile(notFoundHTMLFilePathStr, (error, data) => {
        response.end(data);
    });
}

const serveFile = (fileName, fileExtension, response) => {
    fs.readFile(`public${fileName}`, (error, data) => {
        if(!error){
            if(fileExtension === htmlExtensionStr){
                const html = scriptInjection(data);
                response.end(html);
            }else{
                response.end(data); 
            }
        }else{
            serve404NotFound(response);
        }
    });
}

module.exports = {
    serveFile,
    serve404NotFound
}