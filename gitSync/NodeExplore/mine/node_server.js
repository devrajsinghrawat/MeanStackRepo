var http = require('http');
var dt = require('./date_module');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('Todays Date is --> ', dt.myDateTime);
}).listen(8080);