import User from "../src/User";

test.each([""])("Should not create user with invalid name", function(name:any){
    expect(()=> new User(name,"12345678901","user@user","12345678")).toThrow("Invalid name")
})
test.each(["", "123456789012", "123456789", "11111111111"])("Should not create user with invalid cpf", function(cpf: any){
    expect(()=> new User("user", cpf, "user@user", "12345678")).toThrow("Invalid cpf")
})
test.each(["", "user.user"])("Should not create user with invalid email", function(email:any){
    expect(()=> new User("user", "12345678901", email, "12345678")).toThrow("Invalid email")
})
test.each(["", "1234567", "123456789"])("Should not create user with invalid phone", function(phone:any){
    expect(()=> new User("user", "12345678901", "user@user", phone)).toThrow("Invalid phone")
})