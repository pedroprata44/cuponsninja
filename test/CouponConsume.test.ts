import CompanyDAODatabase from "../src/CompanyDAODatabase"
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

    await couponConsume.execute(outputCouponGet.id)

    const coupon = await couponGet.execute(outputCouponCreate.couponId)
    expect(coupon.quantity).toBe(outputCouponGet.quantity - 1)
})