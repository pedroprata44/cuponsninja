export function validateCpf(cpf:string){
    if(!cpf) return false
    cpf = cleanCpf(cpf)
    if(isInvalidLengthCpf(cpf)) return false
    if(allDigitsAreTheSameInCpf(cpf)) return false
    const dg1 = calculateDigitCpf(cpf, 10)
    const dg2 = calculateDigitCpf(cpf, 11)
    return extractCheckCpfDigit(cpf) === `${dg1}${dg2}`
}

function extractCheckCpfDigit(digits:string){
    return digits.slice(9)
}

function calculateDigitCpf(cpf:string, factor:number){
    let total = 0
    for(const digit of cpf){
        if(factor > 1) total += parseInt(digit) * factor--
    }
    const rest = total%11
    return (rest < 2) ? 0 : 11 - rest
}

function allDigitsAreTheSameInCpf(digits:string){return digits.split("").every(c => c === digits[0])}

function isInvalidLengthCpf(cpf: string){return cpf.length !== 11}

function cleanCpf(digits:string){return digits.replace(/\D/g, "")}