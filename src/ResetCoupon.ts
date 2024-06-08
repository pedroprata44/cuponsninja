import CouponRepository from "./CouponRepository";

export default class ResetCoupon{
    constructor(private couponRepository: CouponRepository){
    }
    async execute(couponId: string){
        const coupon = await this.couponRepository.getById(couponId)
        if(!coupon) throw new Error("This coupon not exists")
        coupon.quantity = 0
        await this.couponRepository.update(coupon.quantity, coupon.id)
        return{
            couponId: coupon.id
        }
    }
}