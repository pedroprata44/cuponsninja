import User from "../src/domain/User"

test("Should create a user", function(){
    const user = User.create("user user", "91015490069", `user@user`, "(99) 9999-9999")
    expect(user.id).toBeDefined()
    expect(user.cpf).toBe("91015490069")
    expect(user.email).toBe("user@user")
    expect(user.phone).toBe("(99) 9999-9999")
})
test.each([undefined, null, "", "user"])("Should not do signup user with a invalid name", function(name:any){
    expect(() => User.create(name, "91015490069", `user@user`, "(99) 9999-9999")).toThrow(new Error("Invalid name"))
})
test.each([undefined,null,"","user.user"])("Should do not signup with a invalid email", function(email:any){
    expect(() => User.create("user user", "91015490069", email, "(99) 9999-9999")).toThrow(new Error("Invalid email"))
})
test.each([undefined, null, "", "111", "11111111111", "46890347810"])("Should do not signup with a invalid cpf", function(cpf:any){
    expect(() => User.create("user user", cpf, `user@user`, "(99) 9999-9999")).toThrow(new Error("Invalid cpf"))
})
test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup user with a invalid phone", function(phone:any){
    expect(() => User.create("user user", "91015490069", `user@user`, phone)).toThrow(new Error("Invalid phone"))
})