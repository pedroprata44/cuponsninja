import CouponRepository from "./CouponRepository";

export default class AddToCoupon{
    constructor(private couponRepository: CouponRepository){
    }
    async execute(couponId: string, quantity: number){
        const coupon = await this.couponRepository.getById(couponId)
        if(!coupon) throw new Error("This coupon not exists")
        coupon.quantity += quantity
        await this.couponRepository.update(coupon.quantity, coupon.id)
        return{
            couponId: coupon.id
        }
    }
}