import User from "../models/user";
import { v4 as uuidv4 } from 'uuid';

let data = [
    {
        id: '04847fb9-8207-41c2-a5db-734be73386c7',
        username: 'Donald Duck',
        age: 35,
        hobbies: [
            'swimming',
            'running'
        ]
    },
    {
        id: 'b38af105-153f-485f-817b-5646cbd253ec',
        username: 'Brad Pitt',
        age: 55,
        hobbies: [
            'acting',
            'cycling'
        ]
    },
    {
        id: '9767a7f8-192e-4cac-bfc7-c18f68907d1a',
        username: 'Elon Musk',
        age: 50,
        hobbies: [
            'science'
        ]
    }
];

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

export const addUser = (delta: any) : Promise<User> => {
    return new Promise((resolve, reject) => {
        const newId = uuidv4();
        const user = {id: newId, ...delta};
        data.push(user);
        resolve(user);
    });
};

export const updateUser = (id: string, delta: any) => {
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