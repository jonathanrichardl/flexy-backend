const models = require('./models')
exports.login = function(req,res){
    let credentials = req.body;
    this.userService.login(credentials.username, credentials.password).then((result) => {
        if(result[0]){
            res.cookie('flexysession', result[1])
            res.end(models.buildPayload('Login Succesful', null));
        }
        else{
            res.status(405)
            res.end(models.buildPayload('Login Failed', null));
        }
    }).catch((error)=>{
        console.log(error);
        res.status(500)
        res.end(models.buildPayload('Server Error Occured', null));
    })
}

exports.createUser = function (req,res){
    let userData = req.body;
    this.userService.create(userData.username, userData.password).then((result)=>{
        if(result){
            res.status(201)
            res.end(models.buildPayload('User Created', null));
        }
    }).catch((error)=>{
        console.log(error)
        res.status(500)
        res.end(models.buildPayload('Server Error Occured', null));
    })
}

exports.getUserProfile = function(req,res){
    let userID = req.cookies.flexysession
    this.userService.getUserProfile(userID).then((user)=>{
        res.end(models.buildPayload("Profile Retrieved", user))
    }).catch((error)=>{
        console.log(error)
        res.status(500)
        res.end(models.buildPayload("Internal Server Error", null))
    })
}

exports.getCertificates = function(req, res){
    let userID = req.cookies.flexysession
    this.certificateService.seeAllCertitication(userID).then((certificates) =>{
        res.end(models.buildPayload("Certificates Retrieved", certificates))
    }).catch(error => {
        console.log(error)
        res.status(500)
        res.end(models.buildPayload("Internal Server Error", null))
    })
}