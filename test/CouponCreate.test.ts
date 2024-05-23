import CompanyDAODatabase from "../src/CompanyDAODatabase"
import CouponDAODatabase from "../src/CouponDAODatabase"
import CouponCreate from "../src/CouponCreate"
import GetCoupon from "../src/GetCoupon"
import LoggerConsole from "../src/LoggerConsole"

let couponCreate: CouponCreate
let getCoupon: GetCoupon
let logger: LoggerConsole
let couponDAO: CouponDAODatabase
let companyDAO: CompanyDAODatabase

beforeEach(() => {
    logger = new LoggerConsole()
    couponDAO = new CouponDAODatabase()
    companyDAO = new CompanyDAODatabase
    couponCreate = new CouponCreate(logger, couponDAO, companyDAO)
    getCoupon = new GetCoupon(couponDAO)
})

test("Should create a coupon", async function(){
    const inputCreate = {
        createdBy: "1634919c-7f5f-49a3-9c2d-24e0e1b1c6b1",
        describe: "describe",
        quantity: 1
    }
    
    const outputCreate = await couponCreate.execute(inputCreate)
    const outputGetCoupon = await getCoupon.execute(outputCreate.couponId)
    expect(outputGetCoupon.id).toBeDefined()
    expect(outputGetCoupon.describe).toBe(inputCreate.describe)
    expect(outputGetCoupon.quantity).toBe(inputCreate.quantity)
})

test.each([undefined, null, "", "1634919c-7f5f-49a3-9c2d-24e0e1b1c6b2"])("Should not create coupon with a invalid createdBy", async function(createdBy: any){
    const inputCreate = {
        createdBy: createdBy,
        describe: "describe",
        quantity: 1
    }
    await expect(couponCreate.execute(inputCreate)).rejects.toThrow(new Error("Invalid created by"))
})

test.each([undefined, null, "", "ddddddddddddddddddddddddddddddd"])("Should not create coupon with a invalid describe", async function(describe: any){
    const inputCreate = {
        createdBy: "1634919c-7f5f-49a3-9c2d-24e0e1b1c6b1",
        describe: describe,
        quantity: 1
    }
    await expect(couponCreate.execute(inputCreate)).rejects.toThrow(new Error("Invalid describe"))
})