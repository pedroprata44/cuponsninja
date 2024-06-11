export default class Coupon{
    id: string
    code: string
    discount: string
    expirationDate: Date
    createdBy: string
    describe: string
    quantity: number
    creationDate: string
    constructor(id: string, code: string, discount: string, expirationDate: Date, createdBy: string, describe: string, quantity: number){
        if(this.isInvalidCode(code)) throw new Error("Invalid code")
        if(this.isInvalidDiscount(discount)) throw new Error("Invalid discount")
        if(this.isInvalidExpirationDate(expirationDate)) throw new Error("Invalid expiration date")
        if(this.isInvalidDescribe(describe)) throw new Error("Invalid describe")
        if(this.isInvalidQuantity(quantity)) throw new Error("Invalid quantity")
        this.id = id
        this.code = code.toUpperCase()
        this.discount = discount
        this.expirationDate = expirationDate
        this.createdBy = createdBy
        this.describe = describe
        this.quantity = quantity
        this.creationDate = Date.call("")
    }
    static create(code: string, discount: string, expirationDate: Date, createdBy: string, describe: string, quantity: number){
        const id = crypto.randomUUID()
        return new Coupon(id, code, discount, expirationDate, createdBy, describe, quantity)
    }
    static restore(id: string, code:string, discount: string, expirationDate: Date, createdBy: string, describe: string, quantity: number, creationDate: string){
        const coupon = new Coupon(id, code, discount, expirationDate, createdBy, describe, quantity)
        coupon.creationDate = creationDate
        return coupon
    }
    isInvalidCode(code: string){
        if(!code || code.length !== 8) return true
    }
    isInvalidDiscount(discount: string){
        if(!discount) return true
        return !discount.match(/^[0-9]{1,2}\%$/)
    }
    isInvalidExpirationDate(expirationDate: Date){
        if(!expirationDate) return true
        if(expirationDate < new Date()) return true
    }
    isInvalidQuantity(quantity: number){
        if(typeof quantity != "number") return true
        return quantity < 0
    }
    isInvalidDescribe(describe: string){
        if(!describe) return true
        return !(describe.length < 30)
    }
}