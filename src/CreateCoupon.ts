import CouponDAO from "./CouponDAO";
import Logger from "./Logger";

export default class CreateCoupon{
    logger: Logger
    couponDAO: CouponDAO
    constructor(logger:Logger, couponDAO: CouponDAO){
        this.logger = logger
        this.couponDAO = couponDAO
    }
    async execute(input:any){
        this.logger.log(input)
        input.id = crypto.randomUUID()
        await this.couponDAO.save(input)
        return{
            couponId: input.id
        }
    }
}