const models = require('./models')
exports.transaction = function(req, res){
    let transactionDetail = req.body;
    let userID = req.cookies.flexysession;
    this.userService.getUserProfile(userID).then((result)=>{
        let user = result[0];
        if (transactionDetail.amount > user.wallet){
            res.status(200)
            res.end(models.buildPayload("User has not enough money in wallet", null))
        }
        user.wallet -= transactionDetail.amount
        this.userService.update(user).then(result => {
            if(result){
                res.status(200)
                res.end(models.buildPayload("Transaction Succesful", user))
            }
            else{
                res.status(500)
                res.end(models.buildPayload("Internal Server Error", null))
            }
        })
    }).catch((error)=>{
        console.log(error)
        res.status(500)
        res.end(models.buildPayload("Internal Server Error", null))
    })
    
}

exports.topUp = function(req, res){
    let topUpDetail = req.body;
    let userID = req.cookies.flexysession
    this.userService.getUserProfile(userID).then((result)=>{
        let user = result[0];
        user.wallet += topUpDetail.amount
        this.userService.update(user).then(result => {
            if(result){
                res.status(200)
                res.end(models.buildPayload("TopUp Succesful", user))
            }
            else{
                res.status(500)
                res.end(models.buildPayload("Internal Server Error", null))
            }
        })
    }).catch((error)=>{
        console.log(error)
        res.status(500)
        res.end(models.buildPayload("Internal Server Error", null))
    })
    
}

