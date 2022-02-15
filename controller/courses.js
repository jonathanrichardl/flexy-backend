const models = require('./models')
exports.newCourse = function(req, res){
    let courseDetail = req.body;
    this.courseService.createCourse(courseDetail.course_name, 
        courseDetail.course_thumbnail, courseDetail.course_modules).then((result) => {
            if(result){
                res.status(201)
                res.end(models.buildPayload('Course Added', null));
            }
            else{
                res.status(405)
                res.end(models.buildPayload('Server Error While Creating, Check log', null));
            }
        }).catch(error => {
            console.log(error)
            res.status(405)
            res.end(models.buildPayload('Server Error, Check log', null))
        })
    
}