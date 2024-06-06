import CouponRepository from "./CouponRepository";

export default class CouponConsume{
    constructor(private couponRepository: CouponRepository){
    }
    async execute(couponId: string){
        const coupon = await this.couponRepository.getById(couponId)
        if(!coupon) throw new Error("This coupon not exists")
        if(!coupon.quantity) throw new Error("This coupon doesn't have enough quantity to be consumed")
        --coupon.quantity
        await this.couponRepository.update(coupon.quantity, coupon.id)
        return{
            couponId: coupon.id
        }
    }
}