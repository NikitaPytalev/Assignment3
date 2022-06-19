import * as http from 'http'
import * as store from './data';
import { validate } from 'uuid';

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        const users = await store.getUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users).replace(/]|[[]/g, ''));
    } else if (req.url === '/api/users' && req.method === 'POST') {
        const buffers = [];

        for await (const chunk of req) {
          buffers.push(chunk);
        }
      
        const data = Buffer.concat(buffers).toString();
      
        const newUser = await store.addUser(JSON.parse(data));

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
    } else if (req.url?.match(/\/api\/users\/(.+)/)) {
        const splitUrl = req.url.split('/');

        if(splitUrl.length > 4) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify('Route Not Found'));
        }

        const id = splitUrl[3]

        if (!validate(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify('Invalid id'));
        }

        if (req.method === 'GET') {
            try{
                const user = await store.getUser(id);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } catch (e) {
                if (e instanceof Error) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'error' : e.message})); 
                }
            }
        }
        if (req.method === 'PUT') {
            const buffers = [];

            for await (const chunk of req) {
              buffers.push(chunk);
            }
          
            const data = Buffer.concat(buffers).toString();
          
            try {
                const updatedUser = await store.updateUser(id, JSON.parse(data));
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(updatedUser));
            } catch (e) {
                if (e instanceof Error) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'error' : e.message})); 
                }
            }
        }
        if (req.method === 'DELETE') {
            try{
                const user = await store.removeUser(id);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            } catch (e) {
                if (e instanceof Error) {
                    res.writeHead(404, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ 'error' : e.message})); 
                }
            }
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 'message': 'Route not found'}));
    }

    res.statusCode = 200;
    res.end();
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;