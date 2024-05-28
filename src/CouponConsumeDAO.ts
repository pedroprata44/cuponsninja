export default interface CouponConsumeDAO{
    getById(couponId: string): Promise<any>
    update(couponId: string): Promise<void>
}