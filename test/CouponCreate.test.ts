import CouponRepositoryDatabase from "../src/infra/repository/CouponRepositoryDatabase"
import CompanyRepositoryDatabase from "../src/infra/repository/CompanyRepositoryDatabase"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import CompanySignup from "../src/application/usecases/company/CompanySignup"
import CouponCreate from "../src/application/usecases/coupon/CouponCreate"
import CouponGetById from "../src/application/usecases/coupon/CouponGetById"
import LoggerConsole from "../src/infra/logger/LoggerConsole"
import sinon from "sinon"

let couponCreate: CouponCreate
let couponGetById: CouponGetById
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
    companySignup = new CompanySignup(logger, companyRepository)
})
test("test", async function(){
})
test("Should create a coupon", async function(){
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
        expirationDate: new Date(2025,0,1),
        createdBy: companyId,
        describe: "describe",
        quantity: 1
    }
    const outputCouponCreate = await couponCreate.execute(inputCoupon)
    const outputCouponGet = await couponGetById.execute(outputCouponCreate.couponId)
    expect(outputCouponGet.id).toBeDefined()
    expect(outputCouponGet.code).toBe(inputCoupon.code)

})
test.each([null, undefined, ""])("Should not create coupon with a invalid createdBy", async function(createdBy: any){
    const inputCoupon = {
        code: "ABCD1234",
        discount: "10%",
        expirationDate: new Date(2025,0,1),
        createdBy: createdBy,
        describe: "describe",
        quantity: 1
    }
    await expect(couponCreate.execute(inputCoupon)).rejects.toThrow(new Error("Invalid createdBy"))
})
test("Should not create coupon with a company that not exists", async function(){
    const inputCoupon = {
        code: "ABCD1234",
        discount: "10%",
        expirationDate: new Date(2025,0,1),
        createdBy: crypto.randomUUID(),
        describe: "describe",
        quantity: 1
    }
    await expect(couponCreate.execute(inputCoupon)).rejects.toThrow(new Error("This company not exists"))
})
afterEach(async () => {
    await databaseConnection.close()
})