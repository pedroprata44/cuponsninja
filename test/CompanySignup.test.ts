import sinon from "sinon"
import CompanyGetDAO from "../src/CompanyGetAccount"
import CompanySignup from "../src/CompanySignup"
import LoggerConsole from "../src/LoggerConsole"
import CompanyDAODatabase from "../src/CompanyRepositoryDatabase"
import CompanyDAO from "../src/CompanyRepository"

let companySignup: CompanySignup
let companyGetAccount: CompanyGetDAO

beforeEach(() => {
    const logger = new LoggerConsole()
    const companyDAO = new CompanyDAODatabase()
    companySignup = new CompanySignup(logger, companyDAO)
    companyGetAccount = new CompanyGetDAO(companyDAO)
})

test("Should do company signup", async function(){
    const inputSignup = {
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    const outputSignup = await companySignup.execute(inputSignup)
    const outputGetCompany = await companyGetAccount.execute(outputSignup.companyId)
    expect(outputGetCompany.id).toBeDefined()
    expect(outputGetCompany.name).toBe(inputSignup.name)
})

test("Should not do sign up company with a email already exists", async function(){
    const companys: any = []
    const companyDAO: CompanyDAO = {
        async save (company: any): Promise<void> {
            companys.push(company)
        },
        async getById (companyId: string): Promise<any> {
        },
        async getByEmail(companyEmail: string): Promise<any> {
            return companys.find((company: any) => company.email === companyEmail)
        }
    }
    const inputSignup = {
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    const companySignup = new CompanySignup(new LoggerConsole(), companyDAO)
    await companySignup.execute(inputSignup)
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("This email already exists"))
})

test.each([undefined, null, "", "company"])("Shoud not do signup company with a invalid name", function(name:any){
    const stubCompanyDAOGetByEmail = sinon.stub(CompanyDAODatabase.prototype, "getByEmail").resolves(undefined)
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: name
    }
    expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid name"))
    stubCompanyDAOGetByEmail.restore()
})

test.each([undefined, null, "", "company.company"])("Should not do signup company with a invalid email", async function(email:any){
    const stubCompanyDAOGetByEmail = sinon.stub(CompanyDAODatabase.prototype, "getByEmail").resolves(undefined)
    const inputSignup = {
        isCompany: true,
        email: email,
        name: "company company"
    }
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid email"))
    stubCompanyDAOGetByEmail.restore()
})

test("Should not do signup company with a invalid cnpj", async function(){
    const stubCompanyDAOGetByEmail = sinon.stub(CompanyDAODatabase.prototype, "getByEmail").resolves(undefined)
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: "company company",
        cnpj: "83800838000155"
    }
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid cnpj"))
    stubCompanyDAOGetByEmail.restore()
})

test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup company with a invalid phone", async function(phone:any){
    const stubCompanyDAOGetByEmail = sinon.stub(CompanyDAODatabase.prototype, "getByEmail").resolves(undefined)
    const inputSignup = {
        isCompany: true,
        email: `company${Math.random()}@company`,
        name: "company company",
        cnpj: "83800838000197",
        phone: phone
    }
    await expect(() => companySignup.execute(inputSignup)).rejects.toThrow(new Error("Invalid phone"))
    stubCompanyDAOGetByEmail.restore()
})