import User from "../src/User"

test("Should create a user", function(){
    const user = User.create("user user", "91015490069", `user@user`, "(99) 9999-9999")
    expect(user.id).toBeDefined()
    expect(user.cpf).toBe("91015490069")
    expect(user.email).toBe("user@user")
    expect(user.phone).toBe("(99) 9999-9999")
})