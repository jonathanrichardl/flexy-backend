// use case layer
var user = require('./user')
function UseCase(repository){
    this.User = new user.UserUseCase(repository)

}

exports.serviceLayer = UseCase


