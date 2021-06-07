
class ChatEngine{
    constructor(chatBoxId, userEmail, name, id){
        this.chatBoxId = $(`.${chatBoxId}`);
        this.userEmail = userEmail;
        this.name = name;
        this.id = id;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log("connection established using socket...!");

            // self.socket.emit('logged_in', {
            //     email: self.userEmail,
            //     name: self.name,
            //     id: self.id
            // })

            // const openChatWindow = (room) =>{
            //     let msg = $('#chat-message').val();
            //     $('#chat-message').val('');
            //     if(msg != ''){
            //         self.socket.emit('send_message', {
            //             message: msg,
            //             userEmail: self.userEmail,
            //             chatRoom: 'socialize'
            //         })
            //     }
            // }

            // const createRoom = (id) => {
            //     let loggedInUser = self.id;
            //     let room = Date.now() + Math.random();
            //     room = room.toString().replace('.', '_');
            //     self.socket.emit('create', {
            //         room : room,
            //         userId: loggedInUser,
            //         withUserId: id
            //     });
            // }
            
            // self.socket.on('user_list', function(data){
            //     let friends = $('.friends');
            //     for(let friend of friends){
            //         friend.click(function(e){
            //             createRoom($(friend).attr('data-id'));
            //         })
            //     }
            // })

            // self.socket.on('invite', function(data){
            //     self.socket.emit('join_room', data);
            // })

            // $('#message-send').click(function(e){
            //     e.preventDefault();
            //     openChatWindow()
            // }

            // $('#message-send').click(function(e){
            //         e.preventDefault();
            //         let msg = $('#chat-message').val();
            //         $('#chat-message').val('');
            //         if(msg != ''){
            //             self.socket.emit('send_message', {
            //                 message: msg,
            //                 userEmail: self.userEmail,
            //                 chatRoom: 'socialize'
            //             })
            //         }
            //     })

            // self.socket.emit('join_room',{
            //     email: self.userEmail,
            //     chatRoom: 'socialize'
            // })

            // self.socket.on('user_joined', function(data){
            //     console.log("User joined", data);
            // })

            // $('#message-send').click(function(e){
            //     e.preventDefault();
            //     let msg = $('#chat-message').val();
            //     $('#chat-message').val('');
            //     if(msg != ''){
            //         self.socket.emit('send_message', {
            //             message: msg,
            //             userEmail: self.userEmail,
            //             chatRoom: 'socialize'
            //         })
            //     }
            // })

            // self.socket.on('recieve_message', function(data){
            //     console.log(data.message);
            //     let newMessage = $('<div>');
            //     let messageType = 'others-message';
            //     if(self.userEmail == data.userEmail){
            //         messageType = 'my-message'
            //     }
            //     $(newMessage).append($('<span>', {
            //         'html': data.message
            //     }));
            //     $(newMessage).addClass(messageType);
            //     $('#chat-box-body').append(newMessage);
            // })
            
        })
    }

}