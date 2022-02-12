var express = require('express')
let controller = (port) => {
    let app = express()
    app.get('', (req,res) => {
        res.end("yeah its working, don't worry")
    });
    app.listen(port, ()=>{
        console.log(`flexy app starting at ${port}`)
    });
}

exports.newController = controller
