// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const FileHandler = require('./utils/readFile')

//浏览器实例
//process.argv 第一个参数是路径，第二个参数才是window传入的参数
app.on('ready', function () {
    let funcParam = process.argv[1]
    let fileParam = process.argv[2] || null
    if (funcParam !== '-c' && funcParam !== '-w' && funcParam !== '-l' && funcParam !== '-x') {
        throw new Error('please check your params input')
    } else if(funcParam === '-x') {
        openUI()
    } else {
        let pathFile = FileHandler.findFile(fileParam, '../')
        if (pathFile !== false) {
            //-c 返回文件file.c的字符数 -w 返回词的数目 -l返回行数 -x打开图形化界面
            switch (funcParam) {
                case '-c': {
                    FileHandler.readFile(pathFile, '-c')
                    break
                }
                case '-w': {
                    FileHandler.readFile(pathFile, '-w')
                    break
                }
                case '-l': {
                    FileHandler.readFile(pathFile, '-l')
                    break
                }
                default:
                    break
            }
        } else {
            throw new Error('The file is not found')
        }

    }
})

function openUI() {
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


app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})
//
// app.on('activate', function () {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
