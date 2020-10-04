//setup of dependencies
require('dotenv').config();
const io = require('socket.io')();

var users = {};
var hosts = [];

io.on('connection', (client) => {
  console.log('A new connection has appeared', client.client.id);

  users[client.id] = client.id;
  console.log('Current list of users', Object.keys(users));

  client.on('disconnect', () => {
    console.log('A client has disconnected :(', client.client.id);
    delete users[client.id];
    console.log('Current list of users', Object.keys(users));
  });

  //Client joins the room of the specified host.
  client.on('join', (data) => {
    if (data.isHost) {
      console.log('A new host has appeared !', data.caller)
      hosts.push(data.caller)
    } else {
      console.log('a client has joined', data.caller);
    }
    
    client.join(data.host);
    clients = io
      .of('/')
      .in(data.host)
      .clients(function (error, clients) {
        //Emit back all the users already in the room.
        client.emit('all_users', clients);
      });
  });

  //Initiate the peer-peer connection
  client.on('initiate', (data) => {
    //Forward the peer Signal.
    console.log('Sending p2pRequest to', data.recipient);
    try {
      io.to(data.recipient).emit('p2prequest', data);
    } catch (err) {
      console.log('Error!', err);
    }
  });

  client.on('acknowledge_request', (data) => {
    //Acknowledge the caller's request to complete the handshake.
    io.to(data.recipient).emit('acknowledge', data);
  });
});

console.log('Running on ' + io.path());

io.listen(5000);
