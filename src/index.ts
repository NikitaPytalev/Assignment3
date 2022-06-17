import * as http from 'http'

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {

    } else if (req.url === '/api/users' && req.method === 'POST') {

    } else if (req.url?.match(/'\/api\/users\/([0-9]+)'/)) {
        if (req.method === 'GET') {
            
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