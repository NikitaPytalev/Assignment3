import data from '../data'
import User from '../models/user';

export const getUsers = () : Promise<Array<User>> => {
    return new Promise((resolve, reject) => {
        try{
            resolve(data);
        } catch (e) {
            reject(e);
        }  
    });
};