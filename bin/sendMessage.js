// Create a socket 
var zmq = require('zmq');
socket = zmq.socket('req');

socket.on('message', function(reply) {
    console.log("Received reply for client from server", ": [", reply.toString(), ']');
});

// Register to monitoring events 
socket.connect('tcp://52.58.72.79:5555');
console.log('Worker connected to port 5555');


jsonObject = {
    "cmd": "message_send",
    "to": "4915115236058",
    "msg": "How are you? :)"
};

var stringObject = JSON.stringify(jsonObject);
socket.send(stringObject, function(err) {
	console.log("err: ", err);
});