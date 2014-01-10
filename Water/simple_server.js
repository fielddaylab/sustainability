var express = require('express');
var app = express()
  , http = require('http')
  , server = http.createServer(app)
  , io = require('socket.io').listen(server, { log: true });

server.listen(8080);

app.use("/js", express.static(__dirname + '/js'));
app.use("/img", express.static(__dirname + '/img'));

// routing
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});
