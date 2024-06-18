import Sell from "../../../domain/Sell"
import CouponRepository from "../../repository/CouponRepository"
import SellRepository from "../../repository/SellRepository"
import UserRepository from "../../repository/UserRepository"

export default class CouponConsume{
    constructor(private couponRepository: CouponRepository, private userRepository: UserRepository, private sellRepository: SellRepository){
    }
    async execute(input: Input){
        const coupon = await this.couponRepository.getById(input.couponId)
        if(!coupon) throw new Error("This coupon not exists")
        const user = await this.userRepository.getById(input.userId)
        if(!user) throw new Error("This user doesn't exists")
        if(!coupon.quantity) throw new Error("This coupon doesn't have enough quantity to be consumed")
        --coupon.quantity
        await this.couponRepository.update(coupon.quantity, coupon.id)
        const sell = Sell.create(coupon.id, user.id)
        await this.sellRepository.save(sell)    
        return sell
    }
}
type Input = {
    couponId: string,
    userId: string
}