import Company from "../src/Company"

test("Shoud create a company", function(){
    const company = Company.create("company company", "82.211.946/0001-61", "company@company", "(99) 9999-9999")
    expect(company.id).toBeDefined()
    expect(company.name).toBe("company company")
    expect(company.email).toBe("company@company")
    expect(company.cnpj).toBe("82.211.946/0001-61")
    expect(company.phone).toBe("(99) 9999-9999")
})