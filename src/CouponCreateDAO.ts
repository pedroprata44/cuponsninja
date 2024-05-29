export default interface CouponCreateDAO{
    save(coupon:any): Promise<void>
}