import UserGetAccount from "./application/usecases/user/UserGetAccount"
import UserSignup from "./application/usecases/user/UserSignup"
import MainController from "./infra/controller/MainController"
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter"
import ExpressAdapter from "./infra/http/ExpressAdapter"
import LoggerConsole from "./infra/logger/LoggerConsole"
import UserRepositoryDatabase from "./infra/repository/UserRepositoryDatabase"


const httpServer = new ExpressAdapter()
const databaseConnection = new PgPromiseAdapter()
const userRepository = new UserRepositoryDatabase(databaseConnection)
const logger = new LoggerConsole()
const userSignup = new UserSignup(userRepository, logger)
const userGetAccount = new UserGetAccount(userRepository)
new MainController(httpServer, userSignup, userGetAccount)
httpServer.listen(3000)