import UserGetAccount from "../src/application/usecases/user/UserGetAccount"
import UserSignup from "../src/application/usecases/user/UserSignup"
import UserRepositoryDatabase from "../src/infra/repository/UserRepositoryDatabase"
import UserRepository from "../src/application/repository/UserRepository"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import LoggerConsole from "../src/infra/logger/LoggerConsole"
import Name from "../src/domain/Name"
import Cpf from "../src/domain/Cpf"
import Email from "../src/domain/Email"
import Phone from "../src/domain/Phone"


let userSignup: UserSignup
let userGetAccount: UserGetAccount
let databaseConnection: DatabaseConnection

beforeEach(() => {
    databaseConnection = new PgPromiseAdapter()
    const userRepositoryDatabase = new UserRepositoryDatabase(databaseConnection)
    const logger = new LoggerConsole()
    userSignup = new UserSignup(userRepositoryDatabase, logger)
    userGetAccount = new UserGetAccount(userRepositoryDatabase)
})

test.only("Should do user signup", async function(){
    const inputUserSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const outputSignup = await userSignup.execute(inputUserSignup)
    const outputGetAccount = await userGetAccount.execute(outputSignup.userId)
    expect(outputGetAccount.userId).toBeDefined()
    expect(outputGetAccount.name).toBe(inputUserSignup.name)
    expect(outputGetAccount.email).toBe(inputUserSignup.email)
})

test("Should not do signup user with a email already exists", async function(){
    const users: any = []
    const userRepository: UserRepository = {
        async save (user: any): Promise<void> {
            users.push(user)
        },
        getById: function (userId: string): Promise<any> {
            return users.find((user: any) => user.userId === userId)
        },
        getByEmail: function (userEmail: string): Promise<any> {
            return users.find((user: any) => user.email === userEmail)
        }
    }
    const inputUserSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const userSignup = new UserSignup(userRepository, new LoggerConsole())
    await userSignup.execute(inputUserSignup)
    expect(() => userSignup.execute(inputUserSignup)).rejects.toThrow(new Error("This email already exists"))
})

afterEach(async () => {
    await databaseConnection.close()
})

// test.each([undefined, null, "", "user"])("Should not do signup user with a invalid name", function(){
//     const stubUserDAOGetByEmail = sinon.stub(UserRepositoryDatabase.prototype, "getByEmail").resolves(undefined)
//     const inputUserSignup = {
//         name: "user",
//         cpf: "91015490069",
//         email: `user${Math.random()}@user`,
//         phone: "(99) 9999-9999"
//     }
//     expect(() => userSignup.execute(inputUserSignup)).rejects.toThrow(new Error("Invalid name"))
//     stubUserDAOGetByEmail.restore()
// })

// test.each([undefined,null,"","user.user"])("Should do not signup with a invalid email", function(email:any){
//     const stubUserDAOGetByEmail = sinon.stub(UserRepositoryDatabase.prototype, "getByEmail").resolves(undefined)
//     const inputUserSignup = {
//         email: email,
//         name: "user user",
//     }
//     expect(() => userSignup.execute(inputUserSignup)).rejects.toThrow("Invalid email")
//     stubUserDAOGetByEmail.restore()
// })

// test.each([undefined, null, "", "111", "11111111111", "46890347810"])("Should do not signup with a invalid cpf", function(cpf:any){
//     const stubUserDAOGetByEmail = sinon.stub(UserRepositoryDatabase.prototype, "getByEmail").resolves(undefined)
//     const inputUserSignup = {
//         email: `user${Math.random()}@user`,
//         name: "user user",
//         cpf: cpf
//     }
//     expect(() => userSignup.execute(inputUserSignup)).rejects.toThrow("Invalid cpf")
//     stubUserDAOGetByEmail.restore()
// })

// test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup user with a invalid phone", function(phone:any){
//     const stubUserDAOGetByEmail = sinon.stub(UserRepositoryDatabase.prototype, "getByEmail").resolves(undefined)
//     const inputUserSignup = {
//         email: `user${Math.random()}@user`,
//         name: "user user",
//         cpf: "91015490069",
//         phone: phone
//     }
//     expect(() => userSignup.execute(inputUserSignup)).rejects.toThrow(new Error("Invalid phone"))
//     stubUserDAOGetByEmail.restore()
// })