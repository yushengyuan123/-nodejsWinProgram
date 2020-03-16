const fs = require('fs')
const path = require('path')

console.log('哈哈')

/**
 * 根据不同要求返回文件不同的信息
 * @param filename
 * @returns {Function}
 */
let readFile = function (filename) {
    return function() {
        fs.readFile('test.txt', function (err, data) {
            if (err) {
                return console.error(err);
            }
            getString(data.toString())
        });
    }
}

//获取文件英文字母个数
let getString = function (str) {
    if(typeof str !== "string") {
        throw new Error('the param is not an string type!')
    }
    let num = 0
    let newStr = str.replace(/\s+/gi," ").replace(/\n|\r|^\s+|\s+$/gi,"").split(' ')
    for(let i = 0; i < newStr.length; i++) {
        num += newStr[i].length
    }
    console.log(num)
    return num
}

//获取单词数,换行算接入上一行的单词
let getWords = function(txtInfo) {
    if(typeof txtInfo !== "string") {
        throw new Error('the param is not an string type!')
    }
    console.log(txtInfo.replace(/\s+/gi," ").replace(/\n|\r|^\s+|\s+$/gi,"").split(' ').length)
    return txtInfo.replace(/\s+/gi," ").replace(/\n|\r|^\s+|\s+$/gi,"").split(' ').length
}


//获取文件行数
let getLine = function (txtInfo) {
    if(!txtInfo instanceof Array) {
        throw new Error('the param is not an array type!')
    }
    return txtInfo.toString().split('\n').length
}

// readFile()()
