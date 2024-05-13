export function validateCnpj(cnpj:string){
    if(!cnpj) return false
    cnpj = cleanCnpj(cnpj)
    if(isInvalidLengthCnpj(cnpj)) return false
    if(allDigitsAreTheSameInCnpj(cnpj)) return false
    const dg1 = calculateDigitCnpj(cnpj, 1)
    const dg2 = calculateDigitCnpj(cnpj, 2)

    return extractCheckCnpjDigit(cnpj) === `${dg1}${dg2}`
}

function calculateDigitCnpj(cnpj:string, number:number){
    if(number === 1){
        //calculate digit 1
        const elements = [5,4,3,2,9,8,7,6,5,4,3,2]
        let total = 0
        let index = 0
        for(const element of elements){
            if(index < elements.length){
                total += element * parseInt(cnpj[index])
                index++
            }
        }
        let rest = total % 11
        const digit = rest < 2? 0 : 11 - rest 
        return digit
    }
    if(number === 2){
        //calculate digit 2
        const elements = [6,5,4,3,2,9,8,7,6,5,4,3,2]
        let total = 0
        let index = 0
        for(const element of elements){
            if(index < elements.length){
                total += element * parseInt(cnpj[index])
                index++
            }
        }
        let rest = total % 11
        let digit = rest < 2? 0 : 11 - rest
        return digit
    }
}

function isInvalidLengthCnpj(cnpj:string){
    return cnpj.length !== 14
}

function extractCheckCnpjDigit(digits:string){
    return digits.slice(12)
}

function allDigitsAreTheSameInCnpj(digits:string){return digits.split("").every(c => c === digits[0])}

function cleanCnpj(digits:string){return digits.replace(/\D/g, "")}