import CompanyRepository from "../src/CompanyRepositoryDatabase"
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase"
import CouponCreate from "../src/CouponCreate"
import CouponGet from "../src/CouponGet"
import LoggerConsole from "../src/LoggerConsole"
import CompanySignup from "../src/CompanySignup"
import CouponConsume from "../src/CouponConsume"
import CompanyRepositoryDatabase from "../src/CompanyRepositoryDatabase"

let couponCreate: CouponCreate
let couponGet: CouponGet
let couponConsume: CouponConsume
let companySignup: CompanySignup
let logger: LoggerConsole
let couponRepository: CouponRepositoryDatabase
let companyRepository: CompanyRepositoryDatabase

beforeEach(() => {
    logger = new LoggerConsole()
    couponRepository = new CouponRepositoryDatabase()
    companyRepository = new CompanyRepositoryDatabase()
    couponCreate = new CouponCreate(logger, couponRepository, companyRepository)
    couponGet = new CouponGet(couponRepository)
    couponConsume = new CouponConsume(couponRepository)
    companySignup = new CompanySignup(logger, companyRepository)
})

test("Should consume a coupon", async function(){
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
        quantity: 2
    }
    const outputCouponCreate = await couponCreate.execute(inputCoupon)
    const outputCouponGet = await couponGet.execute(outputCouponCreate.couponId)
    await couponConsume.execute(outputCouponGet.id)
    const couponConsumed = await couponGet.execute(outputCouponCreate.couponId)
    expect(couponConsumed.quantity).toBe(outputCouponGet.quantity - 1)
})

test("Should not consume a coupon with a invalid coupon id", async function(){
    await expect(() => couponConsume.execute(crypto.randomUUID())).rejects.toThrow(new Error("This coupon not exists"))
})

test("Should not consume a coupon with a invalid coupon quantity", async function(){
    const inputCompany = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    const companyId = (await companySignup.execute(inputCompany)).companyId
    const inputCoupon = {
        id: crypto.randomUUID(),
        createdBy: companyId,
        describe: "describe",
        quantity: 0,
        creationDate: Date.call("")
    }
    await couponRepository.save(inputCoupon)
    await expect(() => couponConsume.execute(inputCoupon.id)).rejects.toThrow(new Error("Invalid quantity"))
})