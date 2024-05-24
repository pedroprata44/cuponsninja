import axios from "axios"
import CompanySignup from "../src/CompanySignup"
import LoggerConsole from "../src/LoggerConsole"
import CompanyDAO from "../src/CompanyDAO"
import CompanyDAODatabase from "../src/CompanyDAODatabase"
import CouponCreate from "../src/CouponCreate"
import CouponDAO from "../src/CouponDAO"
import CouponDAODatabase from "../src/CouponDAODatabase"
axios.defaults.validateStatus = function (){
    return true
}

let companySignup: CompanySignup
let logger: LoggerConsole
let companyDAO: CompanyDAO
let couponCreate: CouponCreate
let couponDAO: CouponDAO


beforeEach(() => {
    logger = new LoggerConsole()
    companyDAO = new CompanyDAODatabase()
    companySignup = new CompanySignup(logger, companyDAO)
    couponDAO = new CouponDAODatabase()
    couponCreate = new CouponCreate(logger, couponDAO, companyDAO)
})

test("Do user signup by api", async function(){
    const inputSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const responseSignup = await axios.post("http://localhost:3000/signup/user", inputSignup)
    const outputSignup = responseSignup.data
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/user/${outputSignup.userId}`)
    const outputGetAccount = responseGetAccount.data
    expect(outputGetAccount.id).toBeDefined()
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
})

test("Do company signup by api", async function(){
    const inputSignup = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    const responseSignup = await axios.post("http://localhost:3000/signup/company", inputSignup)
    const outputSignup = responseSignup.data
    const responseGetAccount = await axios.get(`http://localhost:3000/accounts/company/${outputSignup.companyId}`)
    const outputGetAccount = responseGetAccount.data
    expect(outputGetAccount.id).toBeDefined()
    expect(outputGetAccount.name).toBe(inputSignup.name)
    expect(outputGetAccount.email).toBe(inputSignup.email)
})

test("Do coupon create by api", async function(){
    
    const inputSignup = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    const companyId = (await companySignup.execute(inputSignup)).companyId
    
    const inputCreate = {
        createdBy: companyId,
        describe: "describe",
        quantity: 1
    }

    const responseCouponCreate = await axios.post("http://localhost:3000/couponcreate", inputCreate)
    const outputCouponCreate = responseCouponCreate.data
    const responseCouponGet = await axios.get(`http://localhost:3000/couponget/${outputCouponCreate.couponId}`)
    const outputCouponGet = responseCouponGet.data

    expect(outputCouponGet.id).toBeDefined()
    expect(outputCouponGet.describe).toBe(inputCreate.describe)
    expect(outputCouponGet.quantity).toBe(inputCreate.quantity)
})