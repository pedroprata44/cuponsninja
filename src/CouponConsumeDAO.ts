export default interface CouponConsumeDAO{
    update(couponId: string): Promise<void>
}