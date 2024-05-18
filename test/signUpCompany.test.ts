import sinon from "sinon"
import GetCompanyAccount from "../src/GetCompanyAccount"
import SignupCompany from "../src/SignupCompany"
import Logger from "../src/Logger"
import LoggerConsole from "../src/LoggerConsole"

let signupCompany: SignupCompany
let getCompanyAccount: GetCompanyAccount

beforeEach(() => {
    const logger = new LoggerConsole()
    signupCompany = new SignupCompany(logger)
    getCompanyAccount = new GetCompanyAccount()
})

test("Should do company signup by SPY", async function(){
    const spyLoggerLog = sinon.spy(LoggerConsole.prototype, "log")
    const inputSignup = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    const outputSignup = await signupCompany.execute(inputSignup)
    const outputGetAccount = await getCompanyAccount.execute(outputSignup.companyId)
    expect(outputGetAccount.id).toBeDefined()
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
    expect(spyLoggerLog.calledOnce).toBeTruthy()
    expect(spyLoggerLog.calledWith("signup company company company")).toBeTruthy()
    spyLoggerLog.restore()
})

test("Should not do sign up company with a email already exists", async function(){
    const inputSignup = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    await signupCompany.execute(inputSignup)
    await expect(() => signupCompany.execute(inputSignup)).rejects.toThrow(new Error("This email already exists"))
})

test.each([undefined, null, "", "company"])("Shoud not do signup company with a invalid name", async function(name:any){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: name
    }
    await expect(() => signupCompany.execute(inputSignup)).rejects.toThrow(new Error("Invalid name"))
})

test.each([undefined, null, "", "company.company"])("Should not do signup company with a invalid email", async function(email:any){
    const inputSignup = {
        isCompany: true,
        email: email,
        name: "company company"
    }
    await expect(() => signupCompany.execute(inputSignup)).rejects.toThrow(new Error("Invalid email"))
})

test("Should not do signup company with a invalid cnpj", async function(){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: "company company",
        cnpj: "83800838000155"
    }
    await expect(() => signupCompany.execute(inputSignup)).rejects.toThrow(new Error("Invalid cnpj"))
})

test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup company with a invalid phone", async function(phone:any){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: "company company",
        cnpj: "83800838000197",
        phone: phone
    }
    await expect(() => signupCompany.execute(inputSignup)).rejects.toThrow(new Error("Invalid phone"))
})