const express = require('express')
const bodyParser = require('body-parser')
class Controller{
    constructor(port, service){
        this.app = express();
        this.userService = service.User;
        this.port = port;
        this.jsonParser = bodyParser.json();
    }
    registerHandler(){
        this.app.post("/login", this.jsonParser,  this.login.bind(this));
    }
    start(){
        this.app.listen(this.port, ()=>{
            console.log(`App started in ${this.port}`);
        })
    }

    login(req,res){
        let credentials = req.body;
        if(this.userService.login(credentials.username, credentials.password)){
            res.end("login success");
        }
        else{
            res.end("login failed");
        }
    }
}
exports.Controller = Controller;
