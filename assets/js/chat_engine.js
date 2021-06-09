
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
                                chatRoom: to_user
                            })
                        }
                    })
                })
            }

            self.socket.on('recieve_message', function(data){
                let chatBox = $('#friend-chat-box');
                let className = $(chatBox).attr('class');
                if(className == 'hide-box'){
                    $(chatBox).removeClass('hide-box');
                    $(chatBox).addClass('chat-box');
                }
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