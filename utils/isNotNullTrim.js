let $ = require('jquery')

function isNotNullTrim(source) {
    console.log(source.length)
    let length = source.replace(/(^\s*)|(\s*$)/g, "").length;
    console.log(length)
}

module.exports = {
    isNotNullTrim: isNotNullTrim
}

