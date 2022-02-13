function main(){
    let controller = require('./controller/controller')
    let database = require('./repository/repository')
    let usecase = require('./service/usecase')
    let sql = new database.mySqlConnector('localhost', 'root', '100300', 'flexy' )
    let service = new usecase.ServiceLayer(sql)
    let x = new controller.Controller(8080, service)
    x.registerHandler()
    x.start()
}

main()
