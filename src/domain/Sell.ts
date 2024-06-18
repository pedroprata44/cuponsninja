export default class Sell{
    id: string
    couponId: string
    userId: string
    date: Date 
    constructor(id: string, couponId: string, userId: string, date: Date){
        this.id = id
        this.couponId = couponId
        this.userId = userId
        this.date = date
    }
    static create(couponId: string, userId: string){
        const id = crypto.randomUUID()
        return new Sell(id, couponId, userId, new Date())
    }
    static restore(id: string, couponId: string, userId: string, date: Date){
        return new Sell(id, couponId, userId, date)
    }
}