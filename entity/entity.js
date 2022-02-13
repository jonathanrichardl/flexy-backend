//entity layer
const uuid = require('uuid');
const {User, newUser} = require('./user');

module.exports.newUuid = function(){
    return uuid.v4();
}

module.exports = {User, newUser}
