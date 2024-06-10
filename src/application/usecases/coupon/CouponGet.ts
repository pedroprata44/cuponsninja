import CouponRepository from "../../repository/CouponRepository"

export default class CouponGet{
    couponRepository: CouponRepository
    constructor(couponRepository:CouponRepository){
        this.couponRepository = couponRepository
    }
    async execute(couponId: string){
        const coupon = await this.couponRepository.getById(couponId)
        if(!coupon) throw new Error("This coupon doesn't exists") 
        return coupon
    }
}