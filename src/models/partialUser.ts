type PartialUser = {
    username: string,
    age: number,
    hobbies: Array<string>
}

export const validateNewPartialUserModel = (partialUser: PartialUser) : Boolean=> {
    return  partialUser.hasOwnProperty('username') &&
            partialUser.hasOwnProperty('age') &&
            partialUser.hasOwnProperty('hobbies');
}

export default PartialUser;