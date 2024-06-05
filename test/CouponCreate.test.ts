import CouponRepository from "../src/CouponRepositoryDatabase"
import CouponCreate from "../src/CouponCreate"
import CouponGet from "../src/CouponGet"
import LoggerConsole from "../src/LoggerConsole"
import CompanySignup from "../src/CompanySignup"
import CompanyRepositoryDatabase from "../src/CompanyRepositoryDatabase"

let couponCreate: CouponCreate
let couponGet: CouponGet
let companySignup: CompanySignup
let logger: LoggerConsole
let couponRepository: CouponRepository
let companyRepository: CompanyRepositoryDatabase

beforeEach(() => {
    logger = new LoggerConsole()
    couponRepository = new CouponRepository()
    companyRepository = new CompanyRepositoryDatabase()
    couponCreate = new CouponCreate(logger, couponRepository, companyRepository)
    couponGet = new CouponGet(couponRepository, companyRepository)
    companySignup = new CompanySignup(logger, companyRepository)
})

test("Should create a coupon", async function(){

    const inputCompany = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }

    const companyId = (await companySignup.execute(inputCompany)).companyId

    const inputCoupon = {
        createdBy: companyId,
        describe: "describe",
        quantity: 1
    }
    
    const outputCouponCreate = await couponCreate.execute(inputCoupon)
    const outputCouponGet = await couponGet.execute(outputCouponCreate.couponId)
    expect(outputCouponGet.id).toBeDefined()
    expect(outputCouponGet.describe).toBe(inputCoupon.describe)
    expect(outputCouponGet.quantity).toBe(inputCoupon.quantity)
})

test.only.each([undefined, null, "", "1634919c-7f5f-49a3-9c2d-24e0e1b1c6b2"])("Should not create coupon with a invalid createdBy", async function(createdBy: any){
    const inputCoupon = {
        createdBy: createdBy,
        describe: "describe",
        quantity: 1
    }
    await expect(couponCreate.execute(inputCoupon)).rejects.toThrow(new Error("Invalid created by"))
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
    
    const inputCoupon = {
        createdBy: companyId, 
        describe: describe,
        quantity: 1
    }
    await expect(couponCreate.execute(inputCoupon)).rejects.toThrow(new Error("Invalid describe"))
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
    
    const inputCoupon = {
        createdBy: companyId,
        describe: "describe",
        quantity: quantity
    }
    await expect(couponCreate.execute(inputCoupon)).rejects.toThrow(new Error("Invalid quantity"))
})