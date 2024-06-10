export default class Coupon{
    id: string
    createdBy: string
    describe: string
    quantity: number
    creationDate: string
    constructor(id: string, createdBy: string, describe: string, quantity: number){
        if(this.isInvalidDescribe(describe)) throw new Error("Invalid describe")
        if(this.isInvalidQuantity(quantity)) throw new Error("Invalid quantity")
        this.id = id
        this.createdBy = createdBy
        this.describe = describe
        this.quantity = quantity
        this.creationDate = Date.call("")
    }
    static create(createdBy: string, describe: string, quantity: number){
        const id = crypto.randomUUID()
        return new Coupon(id, createdBy, describe, quantity)
    }
    static restore(id: string, createdBy: string, describe: string, quantity: number){
        return new Coupon(id, createdBy, describe, quantity)
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