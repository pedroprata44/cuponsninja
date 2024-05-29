import { validateCpf } from "../src/CpfValidator"

test.each(["320.148.000-22", "851.381.890-93", "45710543004"])("Should test valids cpfs", function(cpf: string){
    expect(validateCpf(cpf)).toBe(true)
})
test.each([undefined, null, "", "111","11111111111","320.148.000-00", "45710543011"])("Should test invalids cpfs", function(cpf: any){
    expect(validateCpf(cpf)).toBe(false)
})