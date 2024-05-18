import GetUserAccount from "../src/GetUserAccount"
import SignupUser from "../src/SignupUser"
import sinon from "sinon"
import UserDAODatabase from "../src/UserDAODatabase"
import LoggerConsole from "../src/LoggerConsole"
import UserDAO from "../src/UserDAO"
import Logger from "../src/Logger"
let signupUser: SignupUser
let getUserAccount: GetUserAccount

beforeEach(() => {
    const userDAO = new UserDAODatabase()
    const logger = new LoggerConsole()
    signupUser = new SignupUser(userDAO, logger)
    getUserAccount = new GetUserAccount(userDAO)
})

test("Should do user signup by Stub", async function(){
    const stubUserDAOSave = sinon.stub(UserDAODatabase.prototype, "save").resolves()
    const stubUserDAOGetByEmail = sinon.stub(UserDAODatabase.prototype, "getByEmail").resolves(null)
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const outputSignup = await signupUser.execute(inputSignup)
    expect(outputSignup.userId).toBeDefined()
    const stubUserDAOGetById = sinon.stub(UserDAODatabase.prototype, "getById").resolves(inputSignup)
    const outputGetAccount = await getUserAccount.execute(outputSignup.userId)
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
    stubUserDAOSave.restore()
    stubUserDAOGetByEmail.restore()
    stubUserDAOGetById.restore()
})

test("Should do user signup by Fake", async function(){
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const userDAO: UserDAO = {
        async save (user: any): Promise<void> {
        },
        async getById (userId: string): Promise<any> {
            return inputSignup
        },
        async getByEmail (userEmail: string): Promise<any> {
            return undefined
        }
    }
    const logger: Logger = {
        log (message: string): void {
        }
    }
    const signupUser = new SignupUser(userDAO, logger)
    const getUserAccount = new GetUserAccount(userDAO)
    const outputSignup = await signupUser.execute(inputSignup)
    expect(outputSignup.userId).toBeDefined()
    const outputGetAccount = await getUserAccount.execute(outputSignup.userId)
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)

})

test("Should do user signup by Mock", async function(){
    const mockLogger = sinon.mock(LoggerConsole.prototype)
    mockLogger.expects("log").withArgs("signup user user user").calledOnce
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const outputSignup = await signupUser.execute(inputSignup)
    expect(outputSignup.userId).toBeDefined()
    const outputGetAccount = await getUserAccount.execute(outputSignup.userId)
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
    mockLogger.verify()
    mockLogger.restore()
})

test("Should not do signup user with a email already exists", async function(){
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }

    await signupUser.execute(inputSignup)
    await expect(() => signupUser.execute(inputSignup)).rejects.toThrow(new Error("This email already exists"))
})

test.each([undefined,null,"","user"])
("Should do not signup with a invalid name", async function(name:any){
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: name
    }
    await expect(() => signupUser.execute(inputSignup)).rejects.toThrow("Invalid name")
})

test.each([undefined,null,"","user.user"])
("Should do not signup with a invalid email", async function(email:any){
    const inputSignup = {
        email: email,
        name: "user user",
    }
    await expect(() => signupUser.execute(inputSignup)).rejects.toThrow("Invalid email")
})

test("Should do not signup with a invalid cpf", async function(){
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: "user user",
        cpf: "46890347810"
    }
    await expect(() => signupUser.execute(inputSignup)).rejects.toThrow("Invalid cpf")
})

test.each([undefined, null, "", "111", "11111111111", "46890347810"])
("Should do not signup with a invalid cpf", async function(cpf:any){
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: "user user",
        cpf: cpf
    }
    await expect(() => signupUser.execute(inputSignup)).rejects.toThrow("Invalid cpf")
})

test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"]
)("Should not do signup user with a invalid phone", async function(phone:any){
    const inputSignup = {
        email: `user${Math.random()}@user`,
        name: "user user",
        cpf: "91015490069",
        phone: phone
    }
    await expect(() => signupUser.execute(inputSignup)).rejects.toThrow(new Error("Invalid phone"))
})