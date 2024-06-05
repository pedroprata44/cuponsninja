import Coupon from "../src/Coupon"

test("Should create a coupon", function(){
    const coupon = Coupon.create("", "describe", 1)
    expect(coupon.id).toBeDefined()
    expect(coupon.describe).toBe("describe")
    expect(coupon.quantity).toBe(1)
})