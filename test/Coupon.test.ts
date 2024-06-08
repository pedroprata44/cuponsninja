import Coupon from "../src/Coupon"

test("Should create a coupon", function(){
    const coupon = Coupon.create("", "describe", 1)
    expect(coupon.id).toBeDefined()
    expect(coupon.describe).toBe("describe")
    expect(coupon.quantity).toBe(1)
})
test.each([undefined, null, "", "cccccccccccccccccccccccccccccc"])("Should not create a coupon with a invalid describe", function(describe: any){
    expect(() => new Coupon(crypto.randomUUID(), "", describe, 1)).toThrow(new Error("Invalid describe"))
})
test.each([undefined, null, "", -1])("Should not create a coupon with a invalid quantity", function(quantity: any){
    expect(() => new Coupon(crypto.randomUUID(), "", "describe", quantity)).toThrow(new Error("Invalid quantity"))
})