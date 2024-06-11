import CouponRepository from "../../repository/CouponRepository"

export default class CouponGetByCode{
    couponRepository: CouponRepository
    constructor(couponRepository:CouponRepository){
        this.couponRepository = couponRepository
    }
    async execute(couponCode: string){
        const coupon = await this.couponRepository.getByCode(couponCode)
        if(!coupon) throw new Error("This coupon code doesn't exists") 
        return coupon
    }
}