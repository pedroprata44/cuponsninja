import GetCompanyAccount from "../src/GetCompanyAccount"
import SignupCompany from "../src/SignupCompany"

let signupCompany: SignupCompany
let getCompanyAccount: GetCompanyAccount

beforeEach(() => {
    signupCompany = new SignupCompany()
    getCompanyAccount = new GetCompanyAccount()
})

test("Should do company signup with valids fields", async function(){
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