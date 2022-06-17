import { randomUUID } from 'crypto';

const data = [
    {
        id: randomUUID(),
        username: 'Donald Duck',
        age: 35,
        hobbies: [
            'swimming',
            'running'
        ]
    },
    {
        id: randomUUID(),
        username: 'Brad Pitt',
        age: 55,
        hobbies: [
            'acting',
            'cycling'
        ]
    },
    {
        id: randomUUID(),
        username: 'Elon Musk',
        age: 50,
        hobbies: [
            'science'
        ]
    }
];

export default data;