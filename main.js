function main(){
    let controller = require('./controller')
    let database = require('./repository/repository')
    let usecase = require('./usecase/usecase')
    let sql = new database.mySqlConnector('localhost', 'root', '100300', 'flexy' )
    let service = new usecase.serviceLayer(sql)
}

main()
