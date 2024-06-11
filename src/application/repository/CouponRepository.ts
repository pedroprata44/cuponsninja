import Coupon from "../../domain/Coupon"

export default interface CouponRepository{
    save(coupon:any): Promise<void>
    update(quantity: number, couponId: string): Promise<void>
    getById(couponId: string): Promise<Coupon | undefined>
    getByCode(couponCode: string): Promise< Coupon | undefined>
}