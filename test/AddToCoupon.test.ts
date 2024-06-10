import AddToCoupon from "../src/application/usecases/coupon/AddToCoupon"
import CompanyRepositoryDatabase from "../src/infra/repository/CompanyRepositoryDatabase"
import CouponRepositoryDatabase from "../src/infra/repository/CouponRepositoryDatabase"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import CompanySignup from "../src/application/usecases/company/CompanySignup"
import CouponCreate from "../src/application/usecases/coupon/CouponCreate"
import CouponGet from "../src/application/usecases/coupon/CouponGet"
import LoggerConsole from "../src/infra/logger/LoggerConsole"

let couponCreate: CouponCreate
let couponGet: CouponGet
let addToCoupon: AddToCoupon
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

afterEach(async () => {
    await databaseConnection.close()
})