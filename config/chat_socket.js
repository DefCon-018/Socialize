
let users = [];

module.exports.chatSocket = function(socketServer){
    const io = require('socket.io')(socketServer, {cors: {origin: '*'}});
    io.sockets.on('connection', function(socket){
        console.log("new connection reciever", socket.id);

        socket.on('join', function(data){
            console.log("joined", data.email);
            socket.join(data.email);
        })

        socket.on('send_message', function(data){
            io.in(data.chatRoom).emit('recieve_message', data);
            io.in(data.userEmail).emit('recieve_message', data);
        })

        // socket.on('logged_in', function(data){
        //     let user = {
        //         name: data.name,
        //         email: data.email,
        //         id: socket.id,
        //         socket: socket
        //     }
        //     users.push(user);
        //     io.emit('user_list', users);
        // })

        // socket.on('disconnect', function(){
        //     console.log("socket disconnected");
        // })

        // const getSocketByUserId = (userId) =>{
        //     let socket = '';
        //     for(let i = 0; i< users.length; i++) {
        //         if(users[i].id == userId) {
        //             socket = users[i].socket;
        //             break;
        //         }
        //     }
        //     return socket;
        // }

        // socket.on('create', function(data){
        //     socket.join(data.room);
        //     let withSocket = getSocketByUserId(data.withUserId);
        //     io.to(withSocket.id).emit("invite",{room:data})
        // })

        // socket.on('join_room', function(data){
        //     socket.join(data.room.room);
        // })

        // socket.on('join_room', function(data){
        //     console.log("joining request reciever", data);
        //     socket.join(data.chatRoom);

        //     io.in(data.chatRoom).emit('user_joined', data);
        // })

    })
}
