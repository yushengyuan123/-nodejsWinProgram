const path = require('path')
const {app, BrowserWindow} = require('electron')

let openWin = function () {
    function createWindow () {
        // Create the browser window.
        const mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })

        mainWindow.loadFile('index.html')
    }

    app.on('ready', createWindow)

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') app.quit()
    })

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
}

