import data from '../data'
import User from '../models/user';

export const getUsers = () : Promise<Array<User>> => {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};

export const getUserById = (id: string) : Promise<User> => {
    return new Promise((resolve, reject) => {
        const user = data.find(u => u.id === id);
        if (user)
            resolve(user);
        else 
            reject(new Error('User Not Found'));
    });
};