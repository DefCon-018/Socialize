module.exports.chatSocket = function(socketServer){
    const io = require('socket.io')(socketServer, {cors: {origin: '*'}});
    io.sockets.on('connection', function(socket){
        console.log("new connection reciever", socket.id);

        socket.on('disconnect', function(){
            console.log("socket disconnected");
        })

        socket.on('join_room', function(data){
            console.log("joining request reciever", data);
            socket.join(data.chatRoom);

            io.in(data.chatRoom).emit('user_joined', data);
        })

        socket.on('send_message', function(data){
            io.in(data.chatRoom).emit('recieve_message', data);
        })
    })
}
