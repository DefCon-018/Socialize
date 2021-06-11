
class ChatEngine{
    constructor(chatBoxId, userEmail, name){
        this.chatBoxId = $(`.${chatBoxId}`);
        this.userEmail = userEmail;
        this.name = name;
        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    connectionHandler(){
        let self = this;
        this.socket.on('connect', function(){
            console.log("connection established using socket...!");

            self.socket.emit('join', {
                email : self.userEmail
            })


            let friends = $('.friend');
            for(let friend of friends){
                $(friend).click(function(e){
                    let box = $('#friend-chat-box');
                    $(box).removeClass('hide-box');
                    $(box).addClass('chat-box');
                    let to_user = $(friend).attr('data-email');
                    let name = $(friend).attr('data-name');
                    $('.chat-box-name').text('')
                    $('.chat-box-name').append(name);
                    console.log(to_user);
                    $('#message-send').click(function(e){
                        e.preventDefault();
                        let msg = $('#chat-message').val();
                        $('#chat-message').val('');
                        if(msg != ''){
                            self.socket.emit('send_message', {
                                message: msg,
                                userEmail: self.userEmail,
                                chatRoom: to_user,
                                name: self.name,
                                flag : 1
                            })
                        }
                    })
                })
            }

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

            self.socket.on('open_message_box', function(data){
                let box = $('#friend-chat-box');
                $(box).removeClass('hide-box');
                $(box).addClass('chat-box');
                let to_user = data.userEmail;
                let name = data.name;
                if(data.name !== self.name && data.flag == 1){
                    $('.chat-box-name').text('')
                    $('.chat-box-name').append(name);
                    data.flag = 0;
                }
                console.log(to_user);
                $('#message-send').click(function(e){
                    e.preventDefault();
                    let msg = $('#chat-message').val();
                    $('#chat-message').val('');
                    if(msg != ''){
                        self.socket.emit('send_message', {
                            message: msg,
                            userEmail: self.userEmail,
                            chatRoom: to_user
                        })
                    }
                })
            })
            
        })
    }

}