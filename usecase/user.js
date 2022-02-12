
class UserUseCase{
    constructor(userRepository){
        this.userRepository = userRepository;
    }
    login(username, password){
        let result = false;
        this.userRepository.getByUsername(username).then((user)=>{
            if (user['password'] == password){
                result = true;
            } 
            else{
                result = false;
            }
        })
        return result;
    }
}