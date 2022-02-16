const models = require('./models')
const url = require('url')
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

exports.listAllCourse = function(req, res) {
    this.courseService.seeAllCourse().then(result => {
        res.status(200)
        res.end(models.buildPayload('Courses Retrieved', result))
    }).catch(error => {
        console.log(error)
        res.status(500)
        res.end(models.buildPayload('Server Error, Check log', null))
    })
}

exports.getCourseDetail = function(req, res) {
    let id = req.query.id
    this.courseService.getCourseDetail(id).then(result => {
        res.status(200)
        res.end(models.buildPayload('Course Retrieved', result))
    }).catch(error => {
        console.log(error)
        res.status(500)
        res.end(models.buildPayload('Server Error, Check log', null))
    })
}

exports.courseCompleted = function(req, res){
    console.log("OK")
    let courseData = req.body;
    let userID = req.cookies.flexysession;
    this.certificateService.courseCompleted(courseData.course_id, userID).then((result)=> {
        res.status(201)
        res.end(models.buildPayload('Certificate Added', result))
    }).catch(error => {
        console.log(error)
        res.status(500)
        res.end(models.buildPayload('Server Error, Check log', null))
    })

}