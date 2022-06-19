import * as http from 'http'
import * as controller from './controllers/userController'
import { validate } from 'uuid';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const server = http.createServer(async (req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        await controller.getUsers(req, res);
    } else if (req.url === '/api/users' && req.method === 'POST') {
        await controller.addUser(req, res);
    } else if (req.url?.match(/\/api\/users\/(.+)/)) {
        const splitUrl = req.url.split('/');

        if(splitUrl.length > 4) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify('Route Not Found'));
            return;
        }

        const id = splitUrl[3]

        if (!validate(id)) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify('Invalid id'));
            return;
        }

        if (req.method === 'GET') {
            await controller.getUser(req, res, id);
        }
        if (req.method === 'PUT') {
            await controller.updateUser(req, res, id);
        }
        if (req.method === 'DELETE') {
            await controller.removeUser(req, res, id);
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 'message': 'Route not found'}));
    }
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default server;