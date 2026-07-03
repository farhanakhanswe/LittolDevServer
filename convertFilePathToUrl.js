const config = require("./config.json");
const { publicStr }= require("./helpers/constantsHelper");

const convertFilePathToUrl = (filePath) => {
    let url = filePath.replace(publicStr, "");
    url = url.replaceAll("\\", "/");
    url = `${config.baseUrl}${url}`;
    return url;
}

module.exports = {
    convertFilePathToUrl
}