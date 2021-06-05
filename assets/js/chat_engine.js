
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBoxId = $(`.${chatBoxId}`);
        this.userEmail = userEmail;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log("connection established using socket...!");

            self.socket.emit('join_room',{
                email: self.userEmail,
                chatRoom: 'socialize'
            })

            self.socket.on('user_joined', function(data){
                console.log("User joined", data);
            })

            $('#message-send').click(function(e){
                e.preventDefault();
                let msg = $('#chat-message').val();
                $('#chat-message').val('');
                if(msg != ''){
                    self.socket.emit('send_message', {
                        message: msg,
                        userEmail: self.userEmail,
                        chatRoom: 'socialize'
                    })
                }
            })

            self.socket.on('recieve_message', function(data){
                console.log(data.message);
                let newMessage = $('<div>');
                let messageType = 'others-message';
                if(self.userEmail == data.userEmail){
                    messageType = 'my-message'
                }
                $(newMessage).append($('<span>', {
                    'html': data.message
                }));
                $(newMessage).addClass(messageType);
                $('#chat-box-body').append(newMessage);
            })
            
        })
    }

}