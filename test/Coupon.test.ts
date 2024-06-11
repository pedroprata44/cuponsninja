import Coupon from "../src/domain/Coupon"

test("Should create a coupon", function(){
    const coupon = Coupon.create("ABCD1234","10%", new Date(2025, 0, 1), "", ".", 1)
    expect(coupon.id).toBeDefined()
    expect(coupon.code).toBe("ABCD1234")
})
test.each([null, undefined, "", "ABCD"])("Should not create a coupon with a invalid code", function(code: any){
    expect(() => Coupon.create(code,"", new Date(), "", ".", 1)).toThrow(new Error("Invalid code"))
})
test.each([null, undefined, "", "%", "10"])("Should not create a coupon with a invalid discount", function(discount: any){
    expect(() => Coupon.create("ABCD1234", discount, new Date(), "", ".", 1)).toThrow(new Error("Invalid discount"))
})
test.each([null, undefined, "", new Date(2022)])("Should not create a coupon with a invalid expiration date", function(expiration_date: any){
    expect(() => Coupon.create("ABCD1234", "10%", expiration_date, "", ".", 1)).toThrow(new Error("Invalid expiration date"))
})
test.each([undefined, null, "", "cccccccccccccccccccccccccccccc"])("Should not create a coupon with a invalid describe", function(describe: any){
    expect(() => new Coupon(crypto.randomUUID(), "ABCD1234", "10%", new Date(), "", describe, 1)).toThrow(new Error("Invalid describe"))
})
test.each([null, undefined, "", -1])("Should not create a coupon with a invalid quantity", function(quantity: any){
    expect(() => new Coupon(crypto.randomUUID(), "ABCD1234", "10%", new Date(), "", ".", quantity)).toThrow(new Error("Invalid quantity"))
})