let deletePost = function(postLink){
    let dot = $(' .post-card-dots', postLink);
    let deleteBox = $(' .post-card-delete', postLink);
    let actionUrl = $(' .final-delete', postLink).prop('href');
    let popUp = $(' .delete-post-pop-up', postLink);
    let likeBtn = $(' .toggle-like-button', postLink);
    let likeUrl = $(' .like-link', postLink).prop('href');
    let likeCount = $(' .like-count', postLink);
    let heart = $(' .fa-heart', postLink);
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
    $(likeBtn).click(function(e){
        e.preventDefault();
        // console.log(likeUrl);
        let val = Number(likeCount.text());
        $.ajax({
            type: 'post',
            url: likeUrl,
            success: function(data){
                if(data.data.deleted){
                    val = val-1;
                    $(likeCount).text(val);
                    $(heart).removeClass('fas');
                    $(heart).addClass('far');
                }
                else{
                    val = val + 1;
                    $(likeCount).text(val);
                    $(heart).removeClass('far');
                    $(heart).addClass('fas');
                    $(heart).css("color", "red");
                }
            },
            error: function(err){

            }
        })
    })
    $(finalDelete).click(function(e){
        // e.preventDefault();
        //Todo delete a post
        // $.ajax({
        //     type: 'get',
        //     url: actionUrl,
        //     success: function(data){
        //         console.log("data", data);
        //         $(`#post-${data.data.post_id}`).remove();
        //     },
        //     error: function(error){
        //         console.log(error.responseText);
        //     }
        // })
    })
}
let postCards = document.querySelectorAll('.post-card');
for(let postCard of postCards){
    deletePost(postCard);
}
