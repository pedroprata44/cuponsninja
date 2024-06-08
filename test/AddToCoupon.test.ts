import AddToCoupon from "../src/AddToCoupon"
import CompanyRepositoryDatabase from "../src/CompanyRepositoryDatabase"
import CompanySignup from "../src/CompanySignup"
import CouponConsume from "../src/CouponConsume"
import CouponCreate from "../src/CouponCreate"
import CouponGet from "../src/CouponGet"
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase"
import LoggerConsole from "../src/LoggerConsole"

let couponCreate: CouponCreate
let couponGet: CouponGet
let couponConsume: CouponConsume
let addToCoupon: AddToCoupon
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
    addToCoupon = new AddToCoupon(couponRepository)
    companySignup = new CompanySignup(logger, companyRepository)
})


test("Should add to a coupon", async function(){
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
    await addToCoupon.execute(outputCouponGet.id, 10)
    const outputCouponGetAfterAddTo = await couponGet.execute(outputCouponGet.id)

    expect(outputCouponGetAfterAddTo.quantity).toBe(inputCoupon.quantity + 10)
})