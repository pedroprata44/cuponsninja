import CouponRepositoryDatabase from "../src/infra/repository/CouponRepositoryDatabase"
import CompanyRepositoryDatabase from "../src/infra/repository/CompanyRepositoryDatabase"
import DatabaseConnection from "../src/infra/database/DatabaseConnection"
import PgPromiseAdapter from "../src/infra/database/PgPromiseAdapter"
import CompanySignup from "../src/application/usecases/company/CompanySignup"
import CouponConsume from "../src/application/usecases/coupon/CouponConsume"
import CouponCreate from "../src/application/usecases/coupon/CouponCreate"
import CouponGetById from "../src/application/usecases/coupon/CouponGetById"
import LoggerConsole from "../src/infra/logger/LoggerConsole"
import UserRepository from "../src/application/repository/UserRepository"
import UserRepositoryDatabase from "../src/infra/repository/UserRepositoryDatabase"
import UserSignup from "../src/application/usecases/user/UserSignup"

let userRepository: UserRepository
let userSignup: UserSignup
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
    userRepository = new UserRepositoryDatabase(databaseConnection)
    userSignup = new UserSignup(userRepository, logger)
    couponRepository = new CouponRepositoryDatabase(databaseConnection)
    companyRepository = new CompanyRepositoryDatabase(databaseConnection)
    couponCreate = new CouponCreate(logger, couponRepository, companyRepository)
    couponGetById = new CouponGetById(couponRepository)
    couponConsume = new CouponConsume(couponRepository, userRepository)
    companySignup = new CompanySignup(logger, companyRepository)
})

test("Should consume a coupon", async function(){
    const inputUserSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const outputUserSignup = await userSignup.execute(inputUserSignup)
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
    const outputCouponConsume = await couponConsume.execute({couponId: outputCouponGet.id, userId: outputUserSignup.userId})
    const outputCouponGetConsumed = await couponGetById.execute(outputCouponCreate.couponId)
    const outputUserGetAccount = await userRepository.getById(outputCouponConsume.userId)
    expect(outputCouponGetConsumed.quantity).toBe(outputCouponGet.quantity - 1)
    expect(outputUserGetAccount?.name).toBe(inputUserSignup.name)
})

test("Should not consume a coupon with a invalid coupon id", async function(){
    const inputUserSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const outputUserSignup = await userSignup.execute(inputUserSignup)
    await expect(() => couponConsume.execute({couponId: crypto.randomUUID(), userId: outputUserSignup.userId})).rejects.toThrow(new Error("This coupon not exists"))
})

test("Should not consume a coupon with a invalid coupon quantity", async function(){
    const inputUserSignup = {
        name: "user user",
        cpf: "91015490069",
        email: `user${Math.random()}@user`,
        phone: "(99) 9999-9999"
    }
    const outputUserSignup = await userSignup.execute(inputUserSignup)
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
        quantity: 0
    }
    const outputCreateCoupon = await couponCreate.execute(inputCoupon)
    await expect(() => couponConsume.execute({couponId: outputCreateCoupon.couponId, userId: outputUserSignup.userId})).rejects.toThrow(new Error("This coupon doesn't have enough quantity to be consumed"))
})

afterEach(async () => {
    await databaseConnection.close()
})