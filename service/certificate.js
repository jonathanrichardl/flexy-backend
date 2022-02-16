var entity = require('../entity/entity')
class CertificateUseCase{
    constructor(certificateRepository){
        this.certificateRepository = certificateRepository;
    }

    seeAllCertitication(userId){
        return this.certificateRepository.getByUserId(userId).then((certificates) =>{
            return new Promise((resolve,reject) => {
                return resolve(certificates);
            })
        }).catch((error) => {
            return new Promise((resolve,reject) => {
                return reject(error);
            })
        })
    }

    courseCompleted(courseId, userId){
        return this.certificateRepository.newCertification(courseId, userId)
    }

}

module.exports.CertificateUseCase = CertificateUseCase;