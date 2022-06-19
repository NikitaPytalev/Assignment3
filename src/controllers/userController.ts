import { IncomingMessage, ServerResponse } from 'http';
import * as repository from '../data';

export const getUsers = async (req: IncomingMessage, res: ServerResponse): Promise<void> => {
    try {
        const users = await repository.getUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users).replace(/]|[[]/g, ''));
    } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
}

export const getUser = async (req: IncomingMessage, res: ServerResponse, id:string): Promise<void> => {
    try{
        const user = await repository.getUser(id);
        if (user === undefined) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 'error' : 'User Not Found'})); 
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(user));
    } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
};

export const addUser = async (req: IncomingMessage, res: ServerResponse) : Promise<void> => {
    try {
        const buffers = [];

        for await (const chunk of req) {
          buffers.push(chunk);
        }
      
        const data = Buffer.concat(buffers).toString();
      
        const newUser = await repository.addUser(JSON.parse(data));
    
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
};

export const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) : Promise<void> => {  
    try {
        const buffers = [];

        for await (const chunk of req) {
          buffers.push(chunk);
        }
      
        const data = Buffer.concat(buffers).toString();

        const updatedUser = await repository.updateUser(id, JSON.parse(data));
        if (updatedUser === undefined) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 'error' : 'User Not Found'})); 
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(updatedUser));
    } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }
};

export const removeUser = async (req: IncomingMessage, res: ServerResponse, id: string) : Promise<void> => {
    try {
        const isFoundAndRemoved = await repository.removeUser(id);
        if (!isFoundAndRemoved) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ 'error' : 'User Not Found'})); 
        }
        res.writeHead(204, { 'Content-Type': 'application/json' });
        res.end(id);
    } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server Error' }));
    }

};