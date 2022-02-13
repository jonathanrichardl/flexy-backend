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
                    reject(result)
                }
            })
        }).catch((error)=>{
            console.log(error)
        })
    }

    create(username, password){
        let newUser = entity.newUser(username, password)
        return this.userRepository.create(newUser).then((succesful) => {
            return new Promise((resolve,reject) => {
                resolve(true)
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

module.exports = {UserUseCase}