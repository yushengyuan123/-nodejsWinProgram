const {BrowserWindow} = require('electron')
const path = require('path')
let openUI = function () {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    mainWindow.loadFile('../index.html').then(r => {
        console.log('打开UI成功')
    })
}

module.exports = openUI
