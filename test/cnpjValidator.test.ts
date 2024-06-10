import { validateCnpj } from "../src/domain/CnpjValidator"

test.each(["52.152.639/0001-96","83688872000111"])("Should test valids cnpjs", function(cnpj: string){
    expect(validateCnpj(cnpj)).toBe(true)
})
test.each([undefined, null, "", "52.152.639/0001-10","83688872000155"])("Should test invalids cnpjs", function(cnpj: any){
    expect(validateCnpj(cnpj)).toBe(false)
})