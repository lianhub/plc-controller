// Hello World client
// Connects REQ socket to tcp://localhost:5555
// Sends "Hello" to server.
const zmq = require('zeromq');

//console.log("Connecting to hello-world server…");
var requester = zmq.socket('req');// socket to talk to server

var cmd = ""
requester.on("message", function(reply) {
    console.log("Received reply", 0, ": [", reply.toString(), ']');
    document.getElementById('statusReply').innerHTML = cmd + ": " + reply.toString()
    //requester.close();
    //process.exit(0);
});
process.on('SIGINT', function() {  requester.close(); });

//requester.connect("tcp://localhost:5555");
requester.connect("tcp://10.0.0.2:5555");
console.log("Sending request", 0, '…');

const syncMsgBtn = document.getElementById('sendSyncMsgBtn')
syncMsgBtn.addEventListener('click', function () {
    document.getElementById('syncReply').innerHTML = "sync"
    requester.send(JSON.stringify({type: 'start', file: 'ecat'}) )
    cmd = "start"
})

const asyncMsgBtn = document.getElementById('sendAsyncMsgBtn')
asyncMsgBtn.addEventListener('click', function () {
    document.getElementById('asyncReply').innerHTML = "async"
    requester.send(JSON.stringify({type: 'stop', file: 'ecat'}) )
    cmd = "stop"
})

const loginBtn = document.getElementById('loginBtn')
loginBtn.addEventListener('click', function () {
    document.getElementById('login').innerHTML = "oosync"
    requester.send(JSON.stringify({type: 'estart', file: 'ecat'}) )
    cmd = "estart"
})
const logoutBtn = document.getElementById('logoutBtn')
logoutBtn.addEventListener('click', function () {
    document.getElementById('logout').innerHTML = "oo  sync"
    requester.send(JSON.stringify({type: 'estop', file: 'ecat'}) )
    cmd = "estop"
})
