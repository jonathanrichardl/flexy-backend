const uuid = require('uuid');
const {User, newUser} = require('./user');
const {Course, newCourse, Module, newModule} = require('./course')
module.exports.newUuid = function(){
    return uuid.v4();
}

module.exports = {User, newUser, Course, newCourse, Module, newModule}
