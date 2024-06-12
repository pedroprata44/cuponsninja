import AddToCoupon from "../src/application/usecases/coupon/AddToCoupon"
import CompanyRepositoryDatabase from "../src/infra/repository/CompanyRepositoryDatabase"
import CouponRepositoryDatabase from "../src/infra/repository/CouponRepositoryDatabase"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import CompanySignup from "../src/application/usecases/company/CompanySignup"
import CouponCreate from "../src/application/usecases/coupon/CouponCreate"
import CouponGetById from "../src/application/usecases/coupon/CouponGetById"
import LoggerConsole from "../src/infra/logger/LoggerConsole"
import sinon from "sinon"

let couponCreate: CouponCreate
let couponGetById: CouponGetById
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
    couponGetById = new CouponGetById(couponRepository)
    addToCoupon = new AddToCoupon(couponRepository)
    companySignup = new CompanySignup(logger, companyRepository)
})


test("Should add to a coupon", async function(){
    const stubCouponGetByCode = sinon.stub(CouponRepositoryDatabase.prototype, "getByCode").resolves(undefined)
    const inputCompany = {
        isCompany: true,
        name: "company company",
        cnpj: "83800838000197",
        email: `company${Math.random()}@company`,
        phone: "(99) 9999-9999"
    }
    const companyId = (await companySignup.execute(inputCompany)).companyId
    const inputCoupon = {
        code: "ABCD1234",
        discount: "10%",
        expirationDate: new Date(2050,0,1),
        createdBy: companyId,
        describe: "describe",
        quantity: 2
    }
    const outputCouponCreate = await couponCreate.execute(inputCoupon)
    const outputCouponGet = await couponGetById.execute(outputCouponCreate.couponId)
    await addToCoupon.execute(outputCouponGet.id, 10)
    const outputCouponGetAfterAddTo = await couponGetById.execute(outputCouponGet.id)

    expect(outputCouponGetAfterAddTo.quantity).toBe(inputCoupon.quantity + 10)
})

afterEach(async () => {
    await databaseConnection.close()
})