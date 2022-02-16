var entity = require('../entity/entity')
class UserUseCase{
    constructor(userRepository){
        this.userRepository = userRepository;
    }
    login(username, password){
        let result = false;
        let userid;
        return this.userRepository.getByUsername(username).then((user)=>{
            return new Promise((resolve,reject) => {
                if (user[0].password == password){
                    result = true;
                    userid = user[0].user_id
                    resolve([result, userid])
                } 
                else{
                    result = false;
                    reject([result, ""])
                }
            })
        }).catch((error)=>{
            return new Promise((resolve,reject) => {
                reject(error)
            })
        })
    }

    create(username, password){
        let newUser = entity.newUser(username, password)
        return this.userRepository.create(newUser).then((succesful) => {
            return new Promise((resolve,reject) => {
                resolve(true)
            })
        }).catch((error)=>{
            return new Promise((resolve,reject) => {
                reject(error)
            })
        })
    }

    getUserProfile(id){
        return this.userRepository.getByUserId(id).then((user)=>{
            return new Promise((resolve,reject) => {
                resolve(user)
            })
        }).catch((error)=>{
            return new Promise((resolve,reject) => {
                reject(error)
            })
        })
    }

    update(user){
        return this.userRepository.update(user).then(result => {
            return Promise.resolve(true)
        }).catch(error => {
            console.log(error)
            return Promise.reject(true)
        })
    }
}

module.exports = {UserUseCase}