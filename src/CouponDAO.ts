import CouponConsumeDAO from "./CouponConsumeDAO"
import CouponCreateDAO from "./CouponCreateDAO"
import CouponGetDAO from "./CouponGetDAO"

export default interface CouponDAO extends CouponGetDAO, CouponConsumeDAO, CouponCreateDAO{
    save(coupon:any): Promise<void>
    update(couponId: string): Promise<void>
    getById(couponId: string): Promise<any>
}