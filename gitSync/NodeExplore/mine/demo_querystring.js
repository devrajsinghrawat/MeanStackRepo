let http = require('http');
let url = require('url');

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    let q = url.parse()
    res.write(req.url);
    res.end();
}).listen(8080);