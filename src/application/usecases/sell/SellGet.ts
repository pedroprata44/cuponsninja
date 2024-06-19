import SellRepository from "../../repository/SellRepository";

export default class SellGet{
    constructor(private sellRepository: SellRepository){
    }
    async execute(sellId: string){
        const sell = await this.sellRepository.getById(sellId)
        if(!sell) throw new Error("Not found this sell")
        return sell
    }
}