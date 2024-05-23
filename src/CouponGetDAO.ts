export default interface CouponGetDAO{
    getById(couponId: string): Promise<any>
}