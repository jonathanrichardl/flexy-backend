var entity = require('../entity/entity')
class CourseUseCase{
    constructor(courseRepository){
        this.courseRepository = courseRepository;
    }

    seeAllCourse(){
        return this.courseRepository.listAllCourse().then((courses) =>{
            return new Promise((resolve,reject) => {
                return resolve(courses);
            })
        }).catch((error) => {
            return new Promise((resolve,reject) => {
                return reject(error);
            })
        })
    }

    getCourseDetail(courseID){
        return this.courseRepository.getByCourseID(courseID).then((course)=>{
            return this.courseRepository.getCourseModules(courseID).then((courseModules) =>{
                return new Promise((resolve,reject) => {
                    let modules = [];
                    courseModules.forEach(element => {
                        modules.push(new entity.Module(
                            element.texts,
                            element.audio
                        ));
                    });
                    let courseData = new entity.Course(
                        course[0].course_id,
                        course[0].course_name,
                        course[0].course_thumbnail,
                        course[0].total_modules,
                        modules);
                    console.log(courseData)
                    resolve(courseData);
                });
            }).catch((error)=>{
                return new Promise((resolve, reject) => {
                    reject(error);
                })
            })
        }).catch(error =>{
            return new Promise((resolve, reject) => {
                reject(error)
            })
        })
    }

    async createCourse(courseName, courseThumbnail, courseModules){
        let course = entity.newCourse(courseName, courseThumbnail, courseModules)
        try{
            await this.courseRepository.create(course);
        } catch(e){
            console.log(e)
            return false
        }
        courseModules.forEach(async element => {
            try{
                await this.courseRepository.insertCourseModule(element, course.Id)
            } catch(e){
                console.log(e)
                return false
            }
        });
        return true
    }


}

module.exports.CourseUseCase = CourseUseCase;