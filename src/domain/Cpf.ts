export default class Cpf{
    constructor(readonly value: string){
        if(!this.validateCpf(value)) throw new Error("Invalid cpf")
    }
    private validateCpf(cpf:string){
        if(!cpf) return false
        cpf = this.cleanCpf(cpf)
        if(this.isInvalidLengthCpf(cpf)) return false
        if(this.allDigitsAreTheSameInCpf(cpf)) return false
        const dg1 = this.calculateDigitCpf(cpf, 10)
        const dg2 = this.calculateDigitCpf(cpf, 11)
        return this.extractCheckCpfDigit(cpf) === `${dg1}${dg2}`
    }
    private extractCheckCpfDigit(digits:string){
        return digits.slice(9)
    }
    private calculateDigitCpf(cpf:string, factor:number){
        let total = 0
        for(const digit of cpf){
            if(factor > 1) total += parseInt(digit) * factor--
        }
        const rest = total%11
        return (rest < 2) ? 0 : 11 - rest
    }
    private allDigitsAreTheSameInCpf(digits:string){return digits.split("").every(c => c === digits[0])}
    private isInvalidLengthCpf(cpf: string){return cpf.length !== 11}
    private cleanCpf(digits:string){return digits.replace(/\D/g, "")}
}