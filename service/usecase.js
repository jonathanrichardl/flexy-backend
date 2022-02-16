// use case/service layer
var user = require('./user');
var course = require('./course');
var certificate = require('./certificate')
function ServiceLayer(repository){
    this.User = new user.UserUseCase(repository.userRepo);
    this.Course = new course.CourseUseCase(repository.courseRepo);
    this.Certificate = new certificate.CertificateUseCase(repository.certificateRepo)
}

exports.ServiceLayer = ServiceLayer;

