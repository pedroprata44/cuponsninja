import GetCouponDAO from "./GetCouponDAO";

export default class GetCoupon{
    couponDAO: GetCouponDAO
    constructor(couponDAO:GetCouponDAO){
        this.couponDAO = couponDAO
    }
    async execute(couponId: string){
        const coupon = this.couponDAO.getById(couponId)
        return coupon
    }
}