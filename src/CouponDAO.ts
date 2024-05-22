export default interface CouponDAO{
    save(coupon:any): Promise<void>
    getById(couponId: string): Promise<any>
}