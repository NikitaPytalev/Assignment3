import User from "../models/user";
import { v4 as uuidv4 } from 'uuid';
import PartialUser from "../models/partialUser";

let data: Array<User> = [];

export const getUsers = () : Promise<Array<User>> => {
    return new Promise((resolve, reject) => {
        resolve(data);
    });
};

export const getUser= (id: string) : Promise<User | undefined> => {
    return new Promise((resolve, reject) => {
        const user = data.find(u => u.id === id);
        resolve(user);
    });
};

export const addUser = (delta: PartialUser) : Promise<User> => {
    return new Promise((resolve, reject) => {
        const newId = uuidv4();
        const user = {id: newId, ...delta};
        data.push(user);
        resolve(user);
    });
};

export const updateUser = (id: string, delta: PartialUser) => {
    return new Promise((resolve, reject) => {
        const index = data.findIndex(u => u.id === id);
        if (index >= 0) {
            data[index] = {...data[index], ...delta};
            resolve(data[index]);
        } else {
            resolve(undefined);
        }
    });
};

export const removeUser = (id: string) : Promise<Boolean> => {
    return new Promise((resolve, reject) => {
        const index = data.findIndex(u => u.id === id);
        if (index >= 0) {
            data = data.filter(u => u.id !== id);
            resolve(true);
        } else {
            resolve(false)
        }
    });
};