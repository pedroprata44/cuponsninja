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
    couponGet = new CouponGet(couponRepository)
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

test.each([null, undefined, ""])("Should not create coupon with a invalid createdBy", async function(createdBy: any){
    const inputCoupon = {
        createdBy: createdBy,
        describe: "describe",
        quantity: 1
    }
    await expect(couponCreate.execute(inputCoupon)).rejects.toThrow(new Error("Invalid createdBy"))
})

test("Should not create coupon with a company that not exists", async function(){
    const inputCoupon = {
        createdBy: crypto.randomUUID(),
        describe: "describe",
        quantity: 1
    }
    await expect(couponCreate.execute(inputCoupon)).rejects.toThrow(new Error("This company not exists"))
})