let chatBox = $('#friend-chat-box');

let chatBoxFun = function(chatBox){
    let minimize = $(' .chat-box-header', chatBox);
    let hideBox = $(' .delete-box', chatBox);
    $(hideBox).click(function(e){
        let className = $(chatBox).prop('class');
        if(className == 'chat-box'){
            $(chatBox).removeClass('chat-box');
            $(chatBox).addClass('hide-box');
        }
        else{
            $(chatBox).removeClass('minimize-chat');
            $(chatBox).addClass('hide-box');
        }
    })
    $(minimize).click(function(e){
        e.stopPropagation();
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