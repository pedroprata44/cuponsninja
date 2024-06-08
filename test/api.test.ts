import axios from "axios"
import CompanySignup from "../src/CompanySignup"
import LoggerConsole from "../src/LoggerConsole"
import CompanyRepository from "../src/CompanyRepository"
import companyRepositoryDatabase from "../src/CompanyRepositoryDatabase"
import CouponCreate from "../src/CouponCreate"
import CouponRepository from "../src/CouponRepository"
import couponRepositoryDatabase from "../src/CouponRepositoryDatabase"
import DatabaseConnection from "../src/DatabaseConnection"
import PgPromiseAdapter from "../src/PgPromiseAdapter"
axios.defaults.validateStatus = function (){
    return true
}

let companySignup: CompanySignup
let logger: LoggerConsole
let companyRepository: CompanyRepository
let couponCreate: CouponCreate
let couponRepository: CouponRepository
let databaseConnection: DatabaseConnection


beforeEach(() => {
    logger = new LoggerConsole()
    databaseConnection = new PgPromiseAdapter()
    companyRepository = new companyRepositoryDatabase(databaseConnection)
    companySignup = new CompanySignup(logger, companyRepository)
    couponRepository = new couponRepositoryDatabase(databaseConnection)
    couponCreate = new CouponCreate(logger, couponRepository, companyRepository)
})

test("Should do user signup by api", async function(){
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

test("Should do company signup by api", async function(){
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

test("Should create a coupon by api", async function(){
    
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

test("Should consume a coupon by api", async function(){
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
        quantity: 3
    }

    const responseCouponCreate = await axios.post("http://localhost:3000/couponcreate", inputCreate)
    const outputCouponCreate = responseCouponCreate.data
    const responseCouponGet = await axios.get(`http://localhost:3000/couponget/${outputCouponCreate.couponId}`)
    const outputCouponGet = responseCouponGet.data

    const responseCouponConsume = await axios.post(`http://localhost:3000/couponconsume/${outputCouponGet.id}`)
    const outputCouponConsume = responseCouponConsume.data

    const responseCouponGetAfterConsume = await axios.get(`http://localhost:3000/couponget/${outputCouponConsume.couponId}`)
    const outputCouponGetAfterConsume = responseCouponGetAfterConsume.data

    expect(outputCouponGetAfterConsume.quantity).toBe(2)
})

afterEach(async () => {
    await databaseConnection.close()
})