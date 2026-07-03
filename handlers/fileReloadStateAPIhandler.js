const config = require("../config.json");
const { setContentHeader } = require("../setContentHeader");
const { jsonExtensionStr } = require("../helpers/constantsHelper");
const { filesToReloadSet } = require("../filesToReloadSet");

const fileReloadStateAPIhandler = (url, response) => {
   
    let fileReloadState = false;

    if(filesToReloadSet.has(url)){
        fileReloadState = true;
    }

    setContentHeader(jsonExtensionStr, response);
    response.end(JSON.stringify({
        changed: fileReloadState
    }));

    filesToReloadSet.delete(url);
    return;
}

module.exports = {
    fileReloadStateAPIhandler
}