const fs = require('fs')
const path = require('path')
const _ = require('underscore')
const Result = require('./Result')
/**
 * 根据不同要求返回文件不同的信息
 * @param filename
 * @param sort
 * @returns {Function}
 */
let readFile = function (filename, sort) {
    return new Promise(((resolve, reject) => {
        let name = getFileName(filename)
        fs.readFile(filename, function (err, data) {
            if (err) {
                console.error(err);
                reject(Result(false, null, err))
                return false
            }
            let dataStr = data.toString()
            switch (sort) {
                case '-l': {
                    let rows = getLine(dataStr)
                    console.log(name + " file's number of row is " + rows)
                    resolve(Result(true, rows))
                    break
                }
                case '-w': {
                    let words = getWords(dataStr)
                    console.log(name + " file's number of words is " + words)
                    resolve(Result(true, words))
                    break
                }
                case '-c': {
                    let str = getString(dataStr)
                    resolve(Result(true, str))
                    console.log(name + " file's number of string is " + str)
                }
                default: {
                    reject(Result(false, null, null))
                    break
                }
            }
        });
    }))

}


//从根目录开始查找，查找文件所在的目录
//todo 看看怎么优化能够支持延申搜索文件
let findFile = function (filename, path) {
    let currentPath = fs.readdirSync(path)
    console.log(currentPath)
    //这里是调用了underscore的find函数
    let temp = _.find(currentPath, function (file) {
        return file === filename
    })
    console.log('temp' + temp)
    if (temp === void 0) {
        return false
    } else {
        return path + filename
        // currentPath.forEach(function (file) {
        //     if(!findFile(filename, './' + file)) {
        //
        //     }
        // })
        // console.log(temp)
    }
}

//获取文件的名字
let getFileName = function(pathStr) {
    let position = pathStr.lastIndexOf('/')
    return pathStr.slice(position + 1, pathStr.length)
}

//获取文件英文字母个数
let getString = function (str) {
    if (typeof str !== "string") {
        throw new Error('the param is not an string type!')
    }
    let num = 0
    let newStr = str.replace(/\s+/gi, " ").replace(/\n|\r|^\s+|\s+$/gi, "").split(' ')
    for (let i = 0; i < newStr.length; i++) {
        num += newStr[i].length
    }
    console.log(num)
    return num
}

//获取单词数,换行算接入上一行的单词
let getWords = function (txtInfo) {
    if (typeof txtInfo !== "string") {
        throw new Error('the param is not an string type!')
    }
    console.log(txtInfo.replace(/\s+/gi, " ").replace(/\n|\r|^\s+|\s+$/gi, "").split(' ').length)
    return txtInfo.replace(/\s+/gi, " ").replace(/\n|\r|^\s+|\s+$/gi, "").split(' ').length
}


//获取文件行数
let getLine = function (txtInfo) {
    if (typeof txtInfo !== "string") {
        throw new Error('the param is not an string type!')
    }
    return txtInfo.toString().split('\n').length
}

module.exports = {
    readFile: readFile,
    findFile: findFile
}
