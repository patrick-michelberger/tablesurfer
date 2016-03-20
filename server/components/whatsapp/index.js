var Whatsapp = {};

// Create a socket 
var zmq = require('zmq');
var socket = zmq.socket('req');

// Register to monitoring events 
socket.connect('tcp://52.58.72.79:5555');
console.log('Worker connected to port 5555');

Whatsapp.sendMessage = function(recipient, message, isVerifyMessage) {
    var jsonObject = {
        "cmd": "message_send",
        "to": recipient,
        "msg": message
    };
    var stringObject = JSON.stringify(jsonObject);
    socket.send(stringObject);
};

module.exports = Whatsapp;