function addFriendship(person){
    let addBtn = $(' .friend-request-btn', person);
    let url = $(addBtn).prop('href');
    addBtn.click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: url,
            success: function(data){
                console.log(data.data.friend_id);
                $(`#person-${data.data.friend_id}`).remove();
                new Noty({
                    theme: 'relax',
                    type: 'success',
                    text: `Friend Added`,
                    layout: 'topRight',
                    timeout: 1000
                }).show();
            },
            error: function(err){
                console.log(err.responseText);
            }
        })
    })
}

let people = $('.individual');

for(let person of people){
    addFriendship(person);
}