import CompanyRepositoryDatabase from "../src/infra/repository/CompanyRepositoryDatabase"
import CouponRepositoryDatabase from "../src/infra/repository/CouponRepositoryDatabase"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import CompanySignup from "../src/application/usecases/company/CompanySignup"
import CouponCreate from "../src/application/usecases/coupon/CouponCreate"
import CouponGet from "../src/application/usecases/coupon/CouponGet"
import ResetCoupon from "../src/application/usecases/coupon/ResetCoupon"
import LoggerConsole from "../src/infra/logger/LoggerConsole"

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