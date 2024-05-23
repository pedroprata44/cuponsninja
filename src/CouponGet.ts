import CouponGetDAO from "./CouponGetDAO";

export default class CouponGet{
    couponDAO: CouponGetDAO
    constructor(couponDAO:CouponGetDAO){
        this.couponDAO = couponDAO
    }
    async execute(couponId: string){
        const coupon = this.couponDAO.getById(couponId)
        return coupon
    }
}