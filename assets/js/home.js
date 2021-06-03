let deletePost = function(postLink){
    let dot = $(' .post-card-dots', postLink);
    let deleteBox = $(' .post-card-delete', postLink);
    let actionUrl = $(' .final-delete', postLink).prop('href');
    let popUp = $(' .delete-post-pop-up', postLink);
    // console.log(dot);
    $(dot).click(function(e){
        $(deleteBox).toggleClass('active');
    })
    $(deleteBox).click(function(e){
        console.log("hello");
        $(popUp).toggleClass('active-delete-pop-up');
    })
    let finalDelete = $(' .final-delete', popUp);
    let cancelBtn = $(' .cancel-delete', popUp);
    let closePopUp = $(' .close-pop-up', popUp);
    $(cancelBtn).click(function(e){
        $(deleteBox).toggleClass('active');
        $(popUp).toggleClass('active-delete-pop-up');
    })
    $(closePopUp).click(function(){
        $(deleteBox).toggleClass('active');
        $(popUp).toggleClass('active-delete-pop-up')
    })
    $(finalDelete).click(function(e){
        e.preventDefault();
        //Todo delete a post
        $.ajax({
            type: 'get',
            url: actionUrl,
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
                new Noty({
                    theme: 'relax',
                    text: 'Post Deleted',
                    type: 'success',
                    layout: 'topRight',
                    timeout: '1500'
                }).show();
            },
            error: function(error){
                console.log(error.responseText);
            }
        })
    })
}
let postCards = document.querySelectorAll('.post-card');
for(let postCard of postCards){
    deletePost(postCard);
}
