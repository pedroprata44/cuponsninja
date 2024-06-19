import Sell from "../../../domain/Sell";
import SellRepository from "../../repository/SellRepository";

export default class SellAdd{
    constructor(private sellRepository: SellRepository){
    }
    async execute(input: Input){
        const sell = Sell.create(input.couponId, input.userId)
        await this.sellRepository.save(sell)
    }
}
type Input = {
    couponId: string,
    userId: string,
}