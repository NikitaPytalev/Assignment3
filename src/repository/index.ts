import data from '../data'
import User from '../models/user';
import { v4 as uuidv4 } from 'uuid';

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

export const addUser = (userData: any) : Promise<User> => {
    return new Promise((resolve, reject) => {
        const newId = uuidv4();
        const user = {id: newId, ...userData};
        data.push(user);
        resolve(user);
    });
}