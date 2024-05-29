import sinon from "sinon"
import CompanyGetDAO from "../src/CompanyGetAccount"
import CompanySignup from "../src/CompanySignup"
import LoggerConsole from "../src/LoggerConsole"
import CompanyDAODatabase from "../src/CompanyDAODatabase"

let companySignup: CompanySignup
let companyGetAccount: CompanyGetDAO

beforeEach(() => {
    const logger = new LoggerConsole()
    const companyDAO = new CompanyDAODatabase()
    companySignup = new CompanySignup(logger, companyDAO)
    companyGetAccount = new CompanyGetDAO(companyDAO)
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
    const outputSignup = await companySignup.execute(inputSignup)
    const outputGetAccount = await companyGetAccount.execute(outputSignup.companyId)
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
    await companySignup.execute(inputSignup)
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("This email already exists"))
})

test.each([undefined, null, "", "company"])("Shoud not do signup company with a invalid name", async function(name:any){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: name
    }
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid name"))
})

test.each([undefined, null, "", "company.company"])("Should not do signup company with a invalid email", async function(email:any){
    const inputSignup = {
        isCompany: true,
        email: email,
        name: "company company"
    }
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid email"))
})

test("Should not do signup company with a invalid cnpj", async function(){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: "company company",
        cnpj: "83800838000155"
    }
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid cnpj"))
})

test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup company with a invalid phone", async function(phone:any){
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: "company company",
        cnpj: "83800838000197",
        phone: phone
    }
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid phone"))
})