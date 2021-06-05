let chatBox = $('.chat-box');

let chatBoxFun = function(chatBox){
    let minimize = $(' .chat-box-header', chatBox);
    $(minimize).click(function(e){
        let className = $(chatBox).prop('class');
        if(className == 'chat-box'){
            $(chatBox).removeClass('chat-box');
            $(chatBox).addClass('minimize-chat')
        }
        else{
            $(chatBox).removeClass('minimize-chat');
            $(chatBox).addClass('chat-box')
        }
    })
}

chatBoxFun(chatBox);