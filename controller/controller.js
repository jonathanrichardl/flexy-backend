const user = require('./user')
const course = require('./courses')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');

class Controller{
    constructor(port, service){
        this.app = express();
        this.userService = service.User;
        this.courseService = service.Course;
        this.port = port;
        this.jsonParser = bodyParser.json();
    }
    registerHandler(){
        this.app.use(cookieParser());
        this.app.use(function (req, res, next) {
            res.setHeader("Content-Type","application/json");
            next();
        });
        this.app.post("/login", this.jsonParser,  user.login.bind(this));
        this.app.post("/newuser", this.jsonParser, user.createUser.bind(this));
        this.app.get("/profile", this.jsonParser, user.getUserProfile.bind(this) );
        this.app.post("/courses", this.jsonParser, course.newCourse.bind(this));
    }
    start(){
        this.app.listen(this.port, ()=>{
            console.log(`App started in ${this.port}`);
        })
    }
}
exports.Controller = Controller;
