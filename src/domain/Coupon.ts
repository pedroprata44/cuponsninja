export default class Coupon{
    id: string
    code: string
    discount: string
    validDate: Date
    createdBy: string
    describe: string
    quantity: number
    creationDate: string
    constructor(id: string, code: string, discount: string, validDate: Date, createdBy: string, describe: string, quantity: number){
        if(this.isInvalidCode(code)) throw new Error("Invalid code")
        if(this.isInvalidDiscount(discount)) throw new Error("Invalid discount")
        if(this.IsInvalidValidDate(validDate)) throw new Error("Invalid valid date")
        if(this.isInvalidDescribe(describe)) throw new Error("Invalid describe")
        if(this.isInvalidQuantity(quantity)) throw new Error("Invalid quantity")
        this.id = id
        this.code = code.toUpperCase()
        this.discount = discount
        this.validDate = validDate
        this.createdBy = createdBy
        this.describe = describe
        this.quantity = quantity
        this.creationDate = Date.call("")
    }
    static create(code: string, discount: string, validDate: Date, createdBy: string, describe: string, quantity: number){
        const id = crypto.randomUUID()
        return new Coupon(id, code, discount, validDate, createdBy, describe, quantity)
    }
    static restore(id: string, code:string, discount: string, validDate: Date, createdBy: string, describe: string, quantity: number){
        return new Coupon(id, code, discount, validDate, createdBy, describe, quantity)
    }
    isInvalidCode(code: string){
        if(!code || code.length !== 8) return true
    }
    isInvalidDiscount(discount: string){
        if(!discount) return true
        return !discount.match(/^[0-9]{1,2}\%$/)
    }
    IsInvalidValidDate(validDate: Date){
        if(!validDate) return true
        if(validDate < new Date()) return true
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