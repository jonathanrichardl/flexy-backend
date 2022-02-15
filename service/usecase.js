// use case/service layer
var user = require('./user');
var course = require('./course');
function ServiceLayer(repository){
    this.User = new user.UserUseCase(repository.userRepo);
    this.Course = new course.CourseUseCase(repository.courseRepo);
}

exports.ServiceLayer = ServiceLayer;

