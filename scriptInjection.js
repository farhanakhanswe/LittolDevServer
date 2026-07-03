const { pollingScriptStr, pollingSrcStr, postHTMLTagDataScriptStr, postHTMLTagDataSrcStr} = require("./helpers/constantsHelper");

const injectPollingScript = (html, hasBody) => {
    const hasPollingScriptSrc = html.includes(pollingSrcStr);

    if (!hasPollingScriptSrc) {
        if (hasBody) {
            html = html.replace(/<\/body>/i, pollingScriptStr + "</body>");
        } else {
            html += pollingScriptStr;
        }
    }

    return html;
}

const injectPostHTMLTagDataScript  = (html, hasBody) => {
    const hasPostHTMLTagDataScript = html.includes(postHTMLTagDataSrcStr);
    
    if (!hasPostHTMLTagDataScript) {
        if (hasBody) {
            html = html.replace(/<\/body>/i, postHTMLTagDataScriptStr + "</body>");
        } else {
            html += postHTMLTagDataScriptStr;
        }
    }

    return html
}

const scriptInjection = (data) => {
    let html = data.toString();
    const hasBody = /<\/body>/i.test(html);

    html = injectPollingScript(html, hasBody);
    html = injectPostHTMLTagDataScript(html, hasBody);
    
    return html;
}

module.exports = {
    scriptInjection
}