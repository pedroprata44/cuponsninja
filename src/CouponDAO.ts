import CouponConsumeDAO from "./CouponConsumeDAO"
import CouponGetDAO from "./CouponGetDAO"

export default interface CouponDAO extends CouponGetDAO, CouponConsumeDAO{
    save(coupon:any): Promise<void>
    update(couponId: string): Promise<void>
    getById(couponId: string): Promise<any>
}