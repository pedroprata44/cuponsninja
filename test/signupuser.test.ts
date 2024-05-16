import GetUserAccount from "../src/GetUserAccount"
import SignupUser from "../src/SignupUser"
import sinon from "sinon"
import UserDAO from "../src/UserDAO"
import Logger from "../src/Logger"
let signupUser: SignupUser
let getUserAccount: GetUserAccount

beforeEach(() => {
    signupUser = new SignupUser()
    getUserAccount = new GetUserAccount()
})

test("Should do user signup by Stub", async function(){
    const stubUserDAOSave = sinon.stub(UserDAO.prototype, "save").resolves()
    const stubUserDAOGetByEmail = sinon.stub(UserDAO.prototype, "getByEmail").resolves(null)
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const outputSignup = await signupUser.execute(inputSignup)
    expect(outputSignup.userId).toBeDefined()
    const stubUserDAOGetById = sinon.stub(UserDAO.prototype, "getById").resolves(inputSignup)
    const outputGetAccount = await getUserAccount.execute(outputSignup.userId)
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
    stubUserDAOSave.restore()
    stubUserDAOGetByEmail.restore()
    stubUserDAOGetById.restore()
})

test.only("Should do user signup by Mock", async function(){
    const mockLogger = sinon.mock(Logger.prototype)
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