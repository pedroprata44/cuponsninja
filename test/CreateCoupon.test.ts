import CouponDAODatabase from "../src/CouponDAODatabase"
import CreateCoupon from "../src/CreateCoupon"
import LoggerConsole from "../src/LoggerConsole"

let createCoupon: CreateCoupon
let logger: LoggerConsole
let couponDAO: CouponDAODatabase

beforeEach(() => {
    logger = new LoggerConsole
    couponDAO = new CouponDAODatabase()
    createCoupon = new CreateCoupon(logger, couponDAO)
})

test("Should create a coupon", async function(){
    const inputCreate = {
        createdBy: "1634919c-7f5f-49a3-9c2d-24e0e1b1c6b1",
        describe: "describe",
        quantity: 1
    }
    
    const outputCreate = await createCoupon.execute(inputCreate)
    const outputGetCoupon = await couponDAO.getById(outputCreate.couponId)
    expect(outputGetCoupon.id).toBeDefined()
    expect(outputGetCoupon.describe).toBe(inputCreate.describe)
    expect(outputGetCoupon.quantity).toBe(inputCreate.quantity)
})