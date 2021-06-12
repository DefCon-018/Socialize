
class ChatEngine{
    constructor(chatBoxId, userEmail, name, id){
        this.chatBoxId = $(`.${chatBoxId}`);
        this.userEmail = userEmail;
        this.name = name;
        this.id = id;
        this.cnt = 0;
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

            let messages = {
                
            }

            $.ajax({
                type: 'get',
                url: 'message/get-messages',
                success: function(data){
                    console.log(data.messages.message);
                    for(let msg of data.messages.message){
                        if(msg.from_user == self.id){
                            let obj = {
                                msg: msg.msg,
                                val: 1  
                            }
                            if(!messages[msg.to_user]){
                                messages[msg.to_user] = [];
                            }
                            messages[msg.to_user].push(obj);
                        }
                        else{
                            let obj = {
                                msg: msg.msg,
                                val: 2
                            }
                            if(!messages[msg.from_user]){
                                messages[msg.from_user] = [];
                            }
                            messages[msg.from_user].push(obj);
                        }
                    }
                    console.log(messages);
                    let friends = $('.friend');
                    for(let friend of friends){
                        $(friend).click(function(e){
                            self.cnt = 0;
                            let flag = 0;
                            let box = $('#friend-chat-box');
                            $(box).removeClass('hide-box');
                            $(box).addClass('chat-box');
                            $('#chat-box-body').text('');
                            let to_user = $(friend).attr('data-email');
                            let to_id = $(friend).attr('data-id');
                            let name = $(friend).attr('data-name');

                            if(messages[to_id]){
                                for(let msg of messages[to_id]){
                                    let newMessage = $('<div>');
                                    let messageType = 'others-message';
                                    if(msg.val === 1){
                                        messageType = 'my-message'
                                    }
                                    $(newMessage).append($('<span>', {
                                        'html': msg.msg
                                    }));
                                    $(newMessage).addClass(messageType);
                                    $('#chat-box-body').append(newMessage);
                                }
                            }


                            $('.chat-box-name').text('')
                            $('.chat-box-name').append(name);
                            console.log(to_user);
                            $('#message-send').click(function(e){
                                e.preventDefault();
                                e.stopPropagation();
                                let msg = $('#chat-message').val();
                                $('#chat-message').val('');
                                if(msg != ''){
                                    $.ajax({
                                        type: 'get',
                                        url: `message/create/?id=${to_id}&msg=${msg}`,
                                        success: function(data){
                                            console.log(data);
                                            if(self.cnt == 0){
                                                self.cnt = 1;
                                                flag = 1;
                                            }
                                            else{
                                                flag = 0;
                                            }
                                            self.socket.emit('send_message', {
                                                message: msg,
                                                userEmail: self.userEmail,
                                                chatRoom: to_user,
                                                name: self.name,
                                                flag : flag,
                                                oldMsg: messages[to_id],
                                                id: self.id
                                            })
                                        },
                                        error: function(err){
                                            console.log(err.responseText);
                                        }
                                    })
                                }
                            })
                        })
                    }
                },
                error: function(err){
                    console.log(err.responseText);
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

            self.socket.on('open_message_box', function(data){
                if(data.chatRoom == self.userEmail){
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

                    for(let msg of data.oldMsg){
                        let newMessage = $('<div>');
                        let messageType = 'others-message';
                        if(msg.val === 2){
                            messageType = 'my-message'
                        }
                        $(newMessage).append($('<span>', {
                            'html': msg.msg
                        }));
                        $(newMessage).addClass(messageType);
                        $('#chat-box-body').append(newMessage);
                    }
                    
                    console.log(to_user);
                    $('#message-send').click(function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        self.cnt = 1;
                        let msg = $('#chat-message').val();
                        $('#chat-message').val('');
                        if(msg != ''){
                            $.ajax({
                                type: 'get',
                                url: `message/create/?id=${data.id}&msg=${msg}`,
                                success: function(data){
                                    console.log(data);
                                    self.socket.emit('send_message', {
                                        message: msg,
                                        userEmail: self.userEmail,
                                        chatRoom: to_user,
                                        flag: data.flag
                                    })
                                },
                                error: function(err){
                                    console.log(err.responseText);
                                }
                            })
                        }
                    })
                }
            })
            
        })
    }

}