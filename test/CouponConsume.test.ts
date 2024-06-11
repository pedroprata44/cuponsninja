import CouponRepositoryDatabase from "../src/infra/repository/CouponRepositoryDatabase"
import CompanyRepositoryDatabase from "../src/infra/repository/CompanyRepositoryDatabase"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import CompanySignup from "../src/application/usecases/company/CompanySignup"
import CouponConsume from "../src/application/usecases/coupon/CouponConsume"
import CouponCreate from "../src/application/usecases/coupon/CouponCreate"
import CouponGetById from "../src/application/usecases/coupon/CouponGetById"
import LoggerConsole from "../src/infra/logger/LoggerConsole"

let couponCreate: CouponCreate
let couponGetById: CouponGetById
let couponConsume: CouponConsume
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
    const outputCouponGet = await couponGetById.execute(outputCouponCreate.couponId)
    await couponConsume.execute(outputCouponGet.id)
    const couponConsumed = await couponGetById.execute(outputCouponCreate.couponId)
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
    await expect(() => couponConsume.execute(inputCoupon.id)).rejects.toThrow(new Error("This coupon doesn't have enough quantity to be consumed"))
})

afterEach(async () => {
    await databaseConnection.close()
})