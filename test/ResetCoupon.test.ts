import AddToCoupon from "../src/AddToCoupon"
import CompanyRepositoryDatabase from "../src/CompanyRepositoryDatabase"
import CompanySignup from "../src/CompanySignup"
import CouponConsume from "../src/CouponConsume"
import CouponCreate from "../src/CouponCreate"
import CouponGet from "../src/CouponGet"
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase"
import LoggerConsole from "../src/LoggerConsole"
import ResetCoupon from "../src/ResetCoupon"

let couponCreate: CouponCreate
let couponGet: CouponGet
let resetCoupon: ResetCoupon
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
    resetCoupon = new ResetCoupon(couponRepository)
    companySignup = new CompanySignup(logger, companyRepository)
})

test("Should reset a coupon", async function(){
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
    const outputResetCoupon = await resetCoupon.execute(outputCouponCreate.couponId)
    const outputCouponGet = await couponGet.execute(outputResetCoupon.couponId)
    expect(outputCouponGet.quantity).toBe(0)
})