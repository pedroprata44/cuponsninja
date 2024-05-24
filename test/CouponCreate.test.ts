import CompanyDAODatabase from "../src/CompanyDAODatabase"
import CouponDAODatabase from "../src/CouponDAODatabase"
import CouponCreate from "../src/CouponCreate"
import CouponGet from "../src/CouponGet"
import LoggerConsole from "../src/LoggerConsole"
import CompanySignup from "../src/CompanySignup"

let couponCreate: CouponCreate
let couponGet: CouponGet
let companySignup: CompanySignup
let logger: LoggerConsole
let couponDAO: CouponDAODatabase
let companyDAO: CompanyDAODatabase

beforeEach(() => {
    logger = new LoggerConsole()
    couponDAO = new CouponDAODatabase()
    companyDAO = new CompanyDAODatabase
    couponCreate = new CouponCreate(logger, couponDAO, companyDAO)
    couponGet = new CouponGet(couponDAO)
    companySignup = new CompanySignup(logger, companyDAO)
})

test("Should create a coupon", async function(){

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
    
    const outputCouponCreate = await couponCreate.execute(inputCreate)
    const outputCouponGet = await couponGet.execute(outputCouponCreate.couponId)
    expect(outputCouponGet.id).toBeDefined()
    expect(outputCouponGet.describe).toBe(inputCreate.describe)
    expect(outputCouponGet.quantity).toBe(inputCreate.quantity)
})

test.each([undefined, null, "", "1634919c-7f5f-49a3-9c2d-24e0e1b1c6b2"])("Should not create coupon with a invalid createdBy", async function(createdBy: any){
    const inputCreate = {
        createdBy: createdBy,
        describe: "describe",
        quantity: 1
    }
    await expect(couponCreate.execute(inputCreate)).rejects.toThrow(new Error("Invalid created by"))
})

test.each([undefined, null, "", "ddddddddddddddddddddddddddddddd"])("Should not create coupon with a invalid describe", async function(describe: any){
    
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
        describe: describe,
        quantity: 1
    }
    await expect(couponCreate.execute(inputCreate)).rejects.toThrow(new Error("Invalid describe"))
})

test.each([undefined, null, 0])("Should not create coupon with a invalid quantity", async function(quantity: any){
    
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
        quantity: quantity
    }
    await expect(couponCreate.execute(inputCreate)).rejects.toThrow(new Error("Invalid quantity"))
})