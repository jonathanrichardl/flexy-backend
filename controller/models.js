exports.buildPayload = function(message, payload){
    let response = {
        msg : message,
        payload : payload
    }
    return JSON.stringify(response)
}