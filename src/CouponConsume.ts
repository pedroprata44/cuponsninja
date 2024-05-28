import CouponConsumeDAO from "./CouponConsumeDAO";

export default class CouponConsume{
    constructor(private couponConsumeDAO: CouponConsumeDAO){    
    }
    async execute(couponId: string){
        const coupon = await this.couponConsumeDAO.getById(couponId)
        if(!coupon) throw new Error("This coupon id not exists")
        if(!coupon.quantity) throw new Error("This coupon doesn't have enough quantity to be consumed")
        await this.couponConsumeDAO.update(couponId)
    }
}