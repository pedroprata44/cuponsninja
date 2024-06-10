import Company from "../src/domain/Company"

test("Shoud create a company", function(){
    const company = Company.create("company company", "82.211.946/0001-61", "company@company", "(99) 9999-9999")
    expect(company.id).toBeDefined()
    expect(company.name).toBe("company company")
    expect(company.email).toBe("company@company")
    expect(company.cnpj).toBe("82.211.946/0001-61")
    expect(company.phone).toBe("(99) 9999-9999")
})
test.each([undefined, null, "", "company"])("Should not do signup company with a invalid name", function (name: any){
    expect(() => Company.create(name, "82.211.946/0001-61", "company@company", "(99) 9999-9999")).toThrow(new Error("Invalid name"))
})
test.each([undefined, null, "", "company.company"])("Should not do signup company with a invalid email", function (email: any){
    expect(() => Company.create("company company", "82.211.946/0001-61", email, "(99) 9999-9999")).toThrow(new Error("Invalid email"))
})
test("Should not do signup company with a invalid cnpj", function (){
    expect(() => Company.create("company company", "83800838000155", "company@company", "(99) 9999-9999")).toThrow(new Error("Invalid cnpj"))
})
test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup company with a invalid phone", function (phone:any){
    expect(() => Company.create("company company", "82.211.946/0001-61", "company@company", phone)).toThrow(new Error("Invalid phone"))
})