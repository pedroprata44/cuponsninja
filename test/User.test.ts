import Cpf from "../src/domain/Cpf"
import Email from "../src/domain/Email"
import Name from "../src/domain/Name"
import Phone from "../src/domain/Phone"
import User from "../src/domain/User"

test("Should create a user", function(){
    const user = User.create(new Name("user user"), new Cpf("91015490069"), new Email("user@user"), new Phone("(99) 9999-9999"))
    expect(user.id).toBeDefined()
    expect(user.name.value).toBe("user user")
    expect(user.cpf.value).toBe("91015490069")
    expect(user.email.value).toBe("user@user")
    expect(user.phone.value).toBe("(99) 9999-9999")
})
test.each([undefined, null, "", "user"])("Should not do signup user with a invalid name", function(name:any){
    expect(() => User.create(new Name(name), new Cpf("91015490069"), new Email("user@user"), new Phone("(99) 9999-9999"))).toThrow(new Error("Invalid name"))
})
test.each([undefined,null,"","user.user"])("Should do not signup with a invalid email", function(email:any){
    expect(() => User.create(new Name("user user"), new Cpf("91015490069"), new Email(email), new Phone("(99) 9999-9999"))).toThrow(new Error("Invalid email"))
})
test.each([undefined, null, "", "111", "11111111111", "46890347810"])("Should do not signup with a invalid cpf", function(cpf:any){
    expect(() => User.create(new Name("user user"), new Cpf(cpf), new Email("user@user"), new Phone("(99) 9999-9999"))).toThrow(new Error("Invalid cpf"))
})
test.each([undefined, null, "", "() 0000-0000", "(00) 00000000", "0000000000"])("Should not do signup user with a invalid phone", function(phone:any){
    expect(() => User.create(new Name("user user"), new Cpf("91015490069"), new Email("user@user"), new Phone(phone))).toThrow(new Error("Invalid phone"))
})