const models = require('./models')

exports.newCourse = function(req, res){
    let courseDetail = req.body;
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