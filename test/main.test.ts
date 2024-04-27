import { companys, signUp, users } from "../src/main";

//signup user tests

test("Should not do signup user with a email already exists", function(){
    expect(() => signUp({email:"user@user"})).toThrow(new Error("This email already exists"))
})

test.each([undefined, null, "", "user"])("Should not do signup user with a invalid name", function(name:any){
    expect(() => signUp({email:"mate@mate", name:name})).toThrow(new Error("Invalid name"))
})

test.each([undefined, null, "", "m.m"])("Should not do signup user with a invalid email", function(email:any){
    expect(() => signUp({email:email, name:"user user"})).toThrow(new Error("Invalid email"))
})

test.each([undefined, null, "", "111", "11111111111", "11111111111"])("Should not do signup user with a invalid cpf", function(cpf:any){
    expect(() => signUp({email:"mate@mate", name: "user user", cpf:cpf})).toThrow(new Error("Invalid cpf"))
})

test.each([undefined, null, "", "12345678"])("Should not do signup user with a invalid phone", function(phone:any){
    expect(() => signUp({email:"mate@mate", name: "user user", cpf: "91015490069", phone:phone})).toThrow(new Error("Invalid phone"))
})

test("Should return the correct user id", function(){
    expect(signUp({email:"mate@mate", name: "user user", cpf: "91015490069", phone: "123456789"})).toBe(users[users.length - 1].id)
})

//signup company tests

test("Should not do sign up company with a email already exists", function(){
    expect(() => signUp({isCompany:true, email:"company@company"})).toThrow(new Error("This email already exists"))
})

test.each([undefined, null, "", "company"])("Shoud not do signup company with a invalid name", function(name:any){
    expect(() => signUp({isCompany:true, email:"mate@mate", name:name})).toThrow(new Error("Invalid name"))
})

test.each([undefined, null, "", "mate.mate"])("Should not do signup company with a invalid email", function(email:any){
    expect(() => signUp({isCompany:true, email:email, name:"company company"})).toThrow(new Error("Invalid email"))
})

test.each([undefined, null, "", "111", "11111111111111", "83800838000155"])("Should not do signup company with a invalid cnpj", function(cnpj:any){
    expect(() => signUp({isCompany:true, email:"mate@mate", name:"company company", cnpj:cnpj})).toThrow("Invalid cnpj")
})

test.each([undefined, null, "", "123"])("Should not do signup company with a invalid phone", function(phone:any){
    expect(() => signUp({isCompany:true, email:"mate@mate", name: "company company", cnpj:"83800838000197", phone:phone})).toThrow(new Error("Invalid phone"))
})

test("Should return the correct company id", function(){
    expect(signUp({isCompany:true, email:"mate@mate", name: "company company", cnpj:"83800838000197", phone:"123456789"})).toBe(companys[companys.length - 1].id)
})