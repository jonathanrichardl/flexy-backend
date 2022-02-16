class UserRepository{
    constructor(db){
        this.db = db;
    }
    getByUserId(userId){
        return this.db.executeQuery(`SELECT user_id, username, wallet FROM users WHERE user_id = '${userId}'`);
    }

    getByUsername(username){
        return this.db.executeQuery(`SELECT * FROM users WHERE username = '${username}'`)
    }

    create(user){
        return this.db.executeQuery(`INSERT INTO users (user_id, username, password, wallet) 
        VALUES ('${user.Id}','${user.username}','${user.password}', 0)`)
    }
    
    delete(userId){
        return this.db.executeQuery(`DELETE FROM users WHERE user_id = '${userId}'`)
    }

    update(user){
        return this.db.executeQuery(`UPDATE users SET username = '${user.username}', wallet = '${user.wallet}' WHERE user_id = '${user.user_id}'`)
    }

}

module.exports.UserRepository = UserRepository