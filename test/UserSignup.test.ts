import UserGetAccount from "../src/UserGetAccount"
import UserSignup from "../src/UserSignup"
import sinon from "sinon"
import UserDAODatabase from "../src/UserDAODatabase"
import LoggerConsole from "../src/LoggerConsole"
import UserDAO from "../src/UserDAO"
import Logger from "../src/Logger"
let userSignup: UserSignup
let userGetAccount: UserGetAccount

beforeEach(() => {
    const userDAO = new UserDAODatabase()
    const logger = new LoggerConsole()
    userSignup = new UserSignup(userDAO, logger)
    userGetAccount = new UserGetAccount(userDAO)
})

test("Should not do signup user with a email already exists", async function(){
    const users: any = []
    const userDAO: UserDAO = {
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
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const userSignup = new UserSignup(userDAO, new LoggerConsole())
    await userSignup.execute(inputSignup)
    expect(() => userSignup.execute(inputSignup)).rejects.toThrow(new Error("This email already exists"))
})

test.each([undefined, null, "", "user"])("Should not do signup user with a invalid name", function(){
    const stubUserDAOGetByEmail = sinon.stub(UserDAODatabase.prototype, "getByEmail").resolves(null)
    const inputSignup = {
        name: "user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    expect(() => userSignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid name"))
    stubUserDAOGetByEmail.restore()
})

test.each([undefined,null,"","user.user"])("Should do not signup with a invalid email", function(email:any){
    const stubUserDAOGetByEmail = sinon.stub(UserDAODatabase.prototype, "getByEmail").resolves(null)
    const inputSignup = {
        email: email,
        name: "user user",
    }
    expect(() => userSignup.execute(inputSignup)).rejects.toThrow("Invalid email")
    stubUserDAOGetByEmail.restore()
})

test.each([undefined, null, "", "111", "11111111111", "46890347810"])("Should do not signup with a invalid cpf", function(cpf:any){
    const stubUserDAOGetByEmail = sinon.stub(UserDAODatabase.prototype, "getByEmail").resolves(null)
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: "user user",
        cpf: cpf
    }
    expect(() => userSignup.execute(inputSignup)).rejects.toThrow("Invalid cpf")
    stubUserDAOGetByEmail.restore()
})

test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup user with a invalid phone", function(phone:any){
    const stubUserDAOGetByEmail = sinon.stub(UserDAODatabase.prototype, "getByEmail").resolves(null)
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: "user user",
        cpf: "91015490069",
        phone: phone
    }
    expect(() => userSignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid phone"))
    stubUserDAOGetByEmail.restore()
})