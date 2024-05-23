import CouponGetDAO from "./CouponGetDAO"

export default interface CouponDAO extends CouponGetDAO{
    save(coupon:any): Promise<void>
    getById(couponId: string): Promise<any>
}