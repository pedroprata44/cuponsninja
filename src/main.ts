import User from "./User";

let registerUsers: User[] = []
export {registerUsers}

export default function signUp(user:User){
    registerUsers.push(user)
    return registerUsers.slice(-1)
}