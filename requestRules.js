const { fileReloadStateAPIhandler } = require("./handlers/fileReloadStateAPIhandler");
const { fileHandler } = require("./handlers/fileHandler");
const checkIfFileChangedAPISubstring = "/check-file-changes/filename=";

const requestRules = (url, response) => {
    if(url.includes(checkIfFileChangedAPISubstring)){
        url = url.replace(checkIfFileChangedAPISubstring, "");
        return fileReloadStateAPIhandler(url, response);
    }else{
        return fileHandler(url, response);
    }
}

module.exports = {
    requestRules
}