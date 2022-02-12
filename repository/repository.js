// infrastructure / repository layer
var mysql      = require('mysql');
var userRepository = require('./user')
function SqlConnection (host, user, password, database) {
    this.connection = mysql.createConnection({
        host: host,
        user: user,
        password : password,
        database: database
    });
    this.connection.connect();
    this.executeQuery = function(query) {
        return new Promise((resolve, reject) => {
            this.connection.query(query, (err, results, fields) =>{
                if(err) return reject(err)
                resolve(results)
            })
        })
    }
    this.userRepo = new userRepository.UserRepository(this)
}


exports.mySqlConnector = SqlConnection;
