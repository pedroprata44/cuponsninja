import User from "../src/User"
import signUp, { registerUsers } from "../src/main"

test("Should return the last user added in the list", function(){
    
    const user = new User("user", "39780909028", "user@user", "12345678")
    
    expect(signUp(user)).toStrictEqual(registerUsers.slice(-1))
})