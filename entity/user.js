var entity = require('./entity')
class User{
    constructor(userId, username, password){
        this.Id = userId,
        this.username = username
        this.password = password
    }
}

function newUser(username, password){
    let userId = entity.newUuid()
    return new User(userId, username, password);
}

module.exports = {User, newUser}