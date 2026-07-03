## LittolLiveReloadServer - A lightweight Live Reload Server Development Tool built using Vanilla JS and Node.js 

A lightweight Live Reload Server built using Vanilla JS and Node.js mainly for early Front-End Development. This automatically reloads the browser when source files change.

This development tool supports multiple browser tab reloads for HTML/JS/CSS files.

### Instructions:

(1) Install Node.js. </br>
(2) Clone this repo, or download the zip file and then unzip it. </br>
(3) Add your files inside the public folder. </br>
(4) Default port is set in config.json file. You may change that to your liking. If you do, please also update the baseUrl in the config file.</br>
(5) In your terminal, run "node server.js" and check if there's a message saying server is running in your terminal. </br>
(6) Visit http://localhost:3000/ and then update the browser URL according to your file path. For example: http://localhost:3000/personal-project/index.html </br>
(7) If you add new folders/files after server starts running, you have to run "node server.js" again so that the server serves the new files.

Optional:

(1) Ignore files: You can ignore files that will NOT trigger browser reload when they change. For example: ".git". You have to add that inside the "ignoreList" array inside the public/filesToIgnore.js file. For example: 

    const ignoreList = [
        ".git"
    ];

### Possible Issue:

I've intentionally kept some console.log comments to quickly help you with debugging in case you run into an issue. A possible issue could be related to MIME types. If the mimeTypes.json file doesn't have your file type's MIME type listed, you will run into an error. A quick fix is to simply add the MIME type details in the mimeTypes.json file.

### Technical Details:

This tool is only using Vanilla JS and utilizing built-in modules of Node.js, and not using any third-party packages/ frameworks / libraries. 

The only built-in modules of Node.js used:

(1) http <br/>
(2) fs <br/>
(3) path

The browser reload is happening through polling.
