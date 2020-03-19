function Result(isSuccess, data, message) {
    return {
        message: message || null,
        data: data || null,
        isSuccess: isSuccess
    }
}

module.exports = Result
