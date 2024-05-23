export default interface CouponDAO{
    getById(couponId: string): Promise<any>
}