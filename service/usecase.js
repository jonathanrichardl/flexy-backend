// use case/service layer
var user = require('./user')
function ServiceLayer(repository){
    this.User = new user.UserUseCase(repository.userRepo)
}

exports.ServiceLayer = ServiceLayer

