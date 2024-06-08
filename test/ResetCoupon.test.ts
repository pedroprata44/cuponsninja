import CompanyRepositoryDatabase from "../src/CompanyRepositoryDatabase"
import CompanySignup from "../src/CompanySignup"
import CouponCreate from "../src/CouponCreate"
import CouponGet from "../src/CouponGet"
import CouponRepositoryDatabase from "../src/CouponRepositoryDatabase"
import DatabaseConnection from "../src/DatabaseConnection"
import LoggerConsole from "../src/LoggerConsole"
import PgPromiseAdapter from "../src/PgPromiseAdapter"
import ResetCoupon from "../src/ResetCoupon"

let couponCreate: CouponCreate
let couponGet: CouponGet
let resetCoupon: ResetCoupon
let companySignup: CompanySignup
let logger: LoggerConsole
let couponRepository: CouponRepositoryDatabase
let companyRepository: CompanyRepositoryDatabase
let databaseConnection: DatabaseConnection

beforeEach(() => {
    logger = new LoggerConsole()
    databaseConnection = new PgPromiseAdapter()    
    couponRepository = new CouponRepositoryDatabase(databaseConnection)
    companyRepository = new CompanyRepositoryDatabase(databaseConnection)
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

afterEach(async () => {
    await databaseConnection.close()
})