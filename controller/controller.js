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
        this.app.post("/newuser", this.jsonParser, this.createUser.bind(this))
    }
    start(){
        this.app.listen(this.port, ()=>{
            console.log(`App started in ${this.port}`);
        })
    }

    login(req,res){
        let credentials = req.body;
        this.userService.login(credentials.username, credentials.password).then((result) => {
            if(result[0]){
                res.cookie('flexysession', result[1])
                res.end("login success");
            }
            else{
                res.end("login failed");
            }
        }).catch((error)=>{
            console.log(error);
        })
    }

    createUser(req,res){
        let userData = req.body;
        this.userService.create(userData.username, userData.password).then((result)=>{
            if(result){
                res.end("User added");
            }
        }).catch((error)=>{
            console.log(error)
        })

    }
}
exports.Controller = Controller;
