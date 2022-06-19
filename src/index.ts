import { IncomingMessage, ServerResponse, Server, createServer } from 'http';
import * as controller from './controllers/userController';
import cluster from 'cluster';
import { cpus } from 'os';
import { validate } from 'uuid';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const initServer = () : Server => { 
    return createServer(requestHandler).listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

const requestHandler = async (req: IncomingMessage, res: ServerResponse) => {
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
};

if (process.env.NODE_ENV == "multi") {
    if (cluster.isPrimary) {
        var numCPUs = cpus().length;
        console.log('total cpu cores on this host: ', numCPUs);
        for (var i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('online', (worker) => {
            console.log('Worker ' + worker.process.pid + ' is online.');
        });
        cluster.on('exit', (worker, code, signal) => {
            console.log('worker ' + worker.process.pid + ' died.');
        });
    } else {
        initServer()
    }
}

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV == "development" || process.env.NODE_ENV == "production") {
    initServer();
}


export default initServer;