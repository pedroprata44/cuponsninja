import GetCouponDAO from "./GetCouponDAO"

export default interface CouponDAO extends GetCouponDAO{
    save(coupon:any): Promise<void>
    getById(couponId: string): Promise<any>
}