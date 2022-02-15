class CourseRepository{
    constructor(db){
        this.db = db;
    }
    getByCourseID(courseID){
        return this.db.executeQuery(`SELECT * FROM course WHERE course_id = '${courseID}'`);
    }

    getCourseModules(courseID){
        return this.db.executeQuery(`SELECT * FROM course_module WHERE course_id = '${courseID}'`);
    }

    create(course){
        return this.db.executeQuery(`INSERT INTO course (course_id, course_name, course_thumbnail, total_modules)
        VALUES ('${course.Id}','${course.courseName}','${course.Thumbnail}', ${course.totalModules})`)
    }

    insertCourseModule(module, courseID){
        return this.db.executeQuery(`INSERT INTO course_module (course_id, texts, audio)
        VALUES ('${courseID}','${module.texts}','${module.audio}')`)

    }
    
    delete(courseID){
        return this.db.executeQuery(`DELETE FROM course WHERE course_id = '${courseID}'`)
    }

    listAllCourse(){
        return this.db.executeQuery(`SELECT * FROM course`)
    }

}

module.exports.CourseRepository = CourseRepository