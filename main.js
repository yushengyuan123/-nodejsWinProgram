// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')
const FileHandler = require('./utils/readFile')
const gui = require('./createUI')

//浏览器实例
//process.argv 第一个参数是路径，第二个参数才是window传入的参数
app.on('ready', function () {
    let funcParam = process.argv[1]
    let fileParam = process.argv[2]
    if (funcParam !== '-c' && funcParam !== '-w' && funcParam !== '-l' && funcParam !== '-x') {
        throw new Error('please check your params input')
    } else if(funcParam === '-x') {
        gui()
    } else {
        let pathFile = FileHandler.findFile(fileParam, '../')
        if (pathFile !== false) {
            //-c 返回文件file.c的字符数 -w 返回词的数目 -l返回行数 -x打开图形化界面
            switch (funcParam) {
                case '-c': {
                    FileHandler.readFile(pathFile, '-c').then(res => {
                    })
                    break
                }
                case '-w': {
                    FileHandler.readFile(pathFile, '-w').then(res => {
                    })
                    break
                }
                case '-l': {
                    FileHandler.readFile(pathFile, '-l').then(res => {
                    })
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


