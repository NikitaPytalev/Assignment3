import * as http from 'http'
import * as repository from './repository';
import { validate } from 'uuid';

const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
    console.log(req.url);
    if (req.url === '/api/users' && req.method === 'GET') {
        const users = await repository.getUsers();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(users).replace(/]|[[]/g, ''));
    } else if (req.url === '/api/users' && req.method === 'POST') {
        const buffers = [];

        for await (const chunk of req) {
          buffers.push(chunk);
        }
      
        const data = Buffer.concat(buffers).toString();
      
        const newUser = await repository.addUser(JSON.parse(data));

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
                const user = await repository.getUserById(id);
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
            
        }
        if (req.method === 'DELETE') {
            
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 'message': 'Route not found'}));
    }

    res.statusCode = 200;
    res.end();
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));