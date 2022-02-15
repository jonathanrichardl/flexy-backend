var entity = require('./entity')
class Course{
    constructor(courseId, courseName, courseThumbnail, totalModules, modules){
        this.Id = courseId,
        this.courseName = courseName,
        this.courseThumbnail = courseThumbnail,
        this.totalModules = totalModules,
        this.modules = modules
    }
};

function newCourse(courseName, courseThumbnail, modules){
    let courseId = entity.newUuid();
    let totalModules = modules.length;
    return new Course(courseId, courseName, courseThumbnail, totalModules, modules);
}


class Module{
    constructor(texts, audio){
        this.texts = texts,
        this.audio = audio
    }
};

function newModule(texts, audio){
    return new Module(texts, audio)
}

module.exports = {Course, newCourse, Module, newModule}