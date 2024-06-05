import Coupon from "./Coupon"

export default interface CouponRepository{
    save(coupon:any): Promise<void>
    update(couponId: string): Promise<void>
    getById(couponId: string): Promise<Coupon | undefined>
}