import CompanyDAODatabase from "../src/CompanyRepositoryDatabase"
import CouponDAODatabase from "../src/CouponDAODatabase"
import CouponCreate from "../src/CouponCreate"
import CouponGet from "../src/CouponGet"
import LoggerConsole from "../src/LoggerConsole"
import CompanySignup from "../src/CompanySignup"
import CouponConsume from "../src/CouponConsume"

let couponCreate: CouponCreate
let couponGet: CouponGet
let couponConsume: CouponConsume
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
    couponConsume = new CouponConsume(couponDAO)
    companySignup = new CompanySignup(logger, companyDAO)
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
        quantity: 1
    }
    const outputCouponCreate = await couponCreate.execute(inputCoupon)
    const outputCouponGet = await couponGet.execute(outputCouponCreate.couponId)
    await couponConsume.execute(outputCouponGet.id)
    const couponConsumed = await couponGet.execute(outputCouponCreate.couponId)
    expect(couponConsumed.quantity).toBe(outputCouponGet.quantity - 1)
})

test("Should not consume a coupon with a invalid coupon id", async function(){
    await expect(() => couponConsume.execute(crypto.randomUUID())).rejects.toThrow(new Error("This coupon id not exists"))
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
    await couponDAO.save(inputCoupon)
    await expect(() => couponConsume.execute(inputCoupon.id)).rejects.toThrow(new Error("This coupon doesn't have enough quantity to be consumed"))
})