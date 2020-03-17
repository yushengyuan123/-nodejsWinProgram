// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

console.log('fuck')
console.log(__dirname)
console.log('nihao')

// function createWindow () {
//   // Create the browser window.
//   const mainWindow = new BrowserWindow({
//     width: 800,
//     height: 600,
//     webPreferences: {
//       preload: path.join(__dirname, 'preload.js')
//     }
//   })
//
//   // and load the index.html of the app.
//   mainWindow.loadFile('index.html')
//
//   // Open the DevTools.
//   // mainWindow.webContents.openDevTools()
// }
//
// // This method will be called when Electron has finished
// // initialization and is ready to create browser windows.
// // Some APIs can only be used after this event occurs.


//process.argv 第一个参数是路径，第二个参数才是window传入的参数
app.on('ready', function () {
    console.log(process.argv)
    let funcParam = process.argv[1]
    if(funcParam !== '-c' || funcParam !== '-w' || funcParam !== '-l') {
        console.log('请检查你的参数输入')
    } else {
        //-c 返回文件file.c的字符数 -w 返回词的数目 -l返回行数
        switch (funcParam) {
            case '-c': {
                break
            }
            case '-w': {
                break
            }
            case '-l': {
                break
            }
            default: break
        }
    }
})
//
// // Quit when all windows are closed.
// app.on('window-all-closed', function () {
//   // On macOS it is common for applications and their menu bar
//   // to stay active until the user quits explicitly with Cmd + Q
//   if (process.platform !== 'darwin') app.quit()
// })
//
// app.on('activate', function () {
//   // On macOS it's common to re-create a window in the app when the
//   // dock icon is clicked and there are no other windows open.
//   if (BrowserWindow.getAllWindows().length === 0) createWindow()
// })

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
