// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const _ = require('underscore')
let channel = 'file'
require('electron').ipcRenderer.on(channel, (event, argument) => {
    console.log(argument)
    add(_.keys(argument), _.values(argument))
});

let add = function (domId, value) {
    if(!domId instanceof Array && !value instanceof Array) {
        throw new Error('Params must be an Array ')
    }
    for (let i = 0; i < domId.length; i++) {
        let domNode = document.getElementById(domId[i])
        domNode.innerHTML = value[i]
    }
}
