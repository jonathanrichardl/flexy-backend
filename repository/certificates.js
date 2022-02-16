class CertificatesRepository{
    constructor(db){
        this.db = db;
    }
    getByUserId(userID){
        return this.db.executeQuery(`SELECT course.course_name FROM certifications 
        INNER JOIN course on course.course_id = certifications.course_id WHERE user_id = '${userID}'`);
    }

    newCertification(courseID, userID){
        return this.db.executeQuery(`INSERT INTO certifications (user_id, course_id) 
        VALUES ('${userID}', '${courseID}')`);
    }

    

}

module.exports.CertificatesRepository = CertificatesRepository