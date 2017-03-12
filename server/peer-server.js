var _ = require('lodash');
var cors = require('cors');
var express = require('express');
var app = express();
var ExpressPeerServer = require('peer').ExpressPeerServer;

var activeUsers = [];


app.use(cors());

app.get('/randomUser', function(req, res, next) {
    res.send(_.sample(activeUsers)); 
});

var server = app.listen(9000);

var options = {
    debug: false,
    proxied: true
}

var peerServer = ExpressPeerServer(server, options)
app.use('/peerjs', peerServer);

function addUser(id) {
    activeUsers.push(id);
}

function removeUser(id) {
    var userIdIndex = activeUsers.indexOf(id);
    activeUsers.splice(userIdIndex, 1);
}

peerServer.on('connection', function(id) { 
    console.log('Joining: ', id);
    addUser(id);
});

peerServer.on('disconnect', function(id) {
    console.log('Leaving: ', id);
    removeUser(id);
 });