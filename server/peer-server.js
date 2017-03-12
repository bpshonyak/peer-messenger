var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 9000, path: '/peerjs'});

var activeUsers = [];

function addUser(id) {
    activeUsers.push(id);
}

function removeUser(id) {
    var userIdIndex = activeUsers.indexOf(id);
    activeUsers.splice(userIdIndex, 1);
}

server.on('connection', function(id) { 
    console.log('Joining: ', id);
    addUser(id);
});

server.on('disconnect', function(id) {
    console.log('Leaving: ', id);
    removeUser(id);
 });