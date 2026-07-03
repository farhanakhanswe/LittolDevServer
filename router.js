const path = require("path");
const { requestRules } = require("./requestRules")
const htmlDependenciesMappingAPIEndpoint = "/api/v1/html-dependencies-mapping";
const { htmlDependenciesMappingAPIHandler } = require("./handlers/htmlDependenciesMappingAPIHandler")

const router = (request, response) => {
    console.log(`Request URL: ${request.url}`);
    // console.log(`Extension: ${path.extname(request.url)}`);

    if (request.method === 'POST' && request.url === htmlDependenciesMappingAPIEndpoint) {
        htmlDependenciesMappingAPIHandler(request, response);
        return;
    }

    requestRules(request.url, response);
}
    
module.exports = {
    router
}