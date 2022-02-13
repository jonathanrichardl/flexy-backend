var entity = require('../entity/entity')
class UserUseCase{
    constructor(userRepository){
        this.userRepository = userRepository;
    }
    async login(username, password){
        let result = false;
        await this.userRepository.getByUsername(username).then((user)=>{
            if (user[0].password == password){
                result = true;
            } 
            else{
                result = false;
            }
        }).catch((error)=>{
            console.log(error)
            return false
        })
        return result;
    }

    async create(username, password){
        let result = false
        let newUser = entity.newUser(username, password)
        await this.userRepository.create(newUser).then((succesful) => {
            result = true
        }).catch((error)=>{
            console.log(error)
            result = false
        })
        return result
    }
}

module.exports = {UserUseCase}