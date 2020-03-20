const {BrowserWindow } = require('electron')
const path = require('path')
const FileHandler = require('./utils/readFile')

let gui = function () {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true
        }
    })

    mainWindow.loadFile('index.html').then(r => {
        console.log('open GUI successfully!')
    })

    mainWindow.webContents.on('did-finish-load', () => {
        let data = {
            file: process.argv[2],
            rows: null,
            words: null,
            strings: null
        }
        let channel= 'file'
        let fileParam = process.argv[2] || null
        let pathFile = FileHandler.findFile(fileParam, '../')
        FileHandler.readFile(pathFile, '-l').then((result) => {
            data.rows = result.data
            return FileHandler.readFile(pathFile, '-w')
        }).then(res => {
            data.words = res.data
            return FileHandler.readFile(pathFile, '-c')
        }).then(res => {
            data.strings = res.data
            mainWindow.webContents.send(channel, data)
        }).catch((error) => {
            mainWindow.webContents.send(channel, error)
        })
    })

    mainWindow.webContents.openDevTools({mode: 'right'});
}

module.exports = gui
