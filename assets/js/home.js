
let deleteCommentHandler = function(commentLink){
    let commentCardDots = $(' .comment-card-dots', commentLink);
    let commentCardDelete = $(' .comment-card-delete', commentLink);
    let deleteComment = $(' .final-delete-comment', commentLink);
    let cancelBtn = $(' .cancel-delete-comment', commentLink);
    let closeBtn = $(' .close-pop-up-comment', commentLink);
    let popUp = $(' .delete-comment-pop-up', commentLink);
    let finalDeleteBtn = $(' .final-delete-comment', commentLink);
    let url = deleteComment.prop('href');

    $(commentCardDots).click(function(e){
        $(commentCardDelete).toggleClass('comment-active');
    })

    $(commentCardDelete).click(function(e){
        console.log("hello", popUp);
        $(popUp).toggleClass('active-delete-pop-up-comment');
    })

    $(cancelBtn).click(function(e){
        $(commentCardDelete).toggleClass('comment-active');
        $(popUp).toggleClass('active-delete-pop-up-comment');
    })

    $(closeBtn).click(function(){
        $(commentCardDelete).toggleClass('comment-active');
        $(popUp).toggleClass('active-delete-pop-up-comment')
    })

    $(finalDeleteBtn).click(function(e){
        e.preventDefault();
        console.log(url);
        $.ajax({
            type: 'get',
            url: url,
            success: function(data){
                console.log(data);
                $(`#comment-${data.data.comment_id}`).remove();
            },
            error: function(err){
                console.log(err.responseText);
            }
        })
    })
}

let deleteComment = function(comment){
    let allComments = $(' .comments-container', comment);
    for(oneComment of allComments){
        deleteCommentHandler(oneComment);
    }
}



let deletePost = function(postLink){
    let commentLink = $(' .show-post-comments', postLink);
    deleteComment(commentLink);
    let dot = $(' .post-card-dots', postLink);
    let deleteBox = $(' .post-card-delete', postLink);
    let actionUrl = $(' .final-delete', postLink).prop('href');
    let popUp = $(' .delete-post-pop-up', postLink);
    let likeBtn = $(' .toggle-like-button', postLink);
    let likeUrl = $(' .like-link', postLink).prop('href');
    let likeCount = $(' .like-count', postLink);
    let heart = $(' .fa-heart', postLink);

    let createComment = $(' .show-post-comments', postLink);
    let newCommentForm = $(' #comment-create-form', postLink);
    $(newCommentForm).submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/comment/create',
            data: newCommentForm.serialize(),
            success: function(data){
                console.log(data);
                let newComment = getComment(data.data.comment);
                $(createComment).append(newComment);
                let getNewComment = $(`#comment-${data.data.comment._id}`) 
                deleteCommentHandler(getNewComment);
                console.log(newComment);
            },
            error: function(err){
                console.log(err.responseText);
            }
        })
    })


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


function getComment(comment){
    return `
        <div class="comments-container" id= "comment-${comment._id}">
            <div class="user-comment-image">
                <img src= "${comment.user.avatar}">
            </div>
            <div class= "show-comments">
                <div class= "comment-user-name">
                    <h3>${comment.user.name}</h3>
                    <div class= 'comment-card-dots'>
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <div class="comment-card-delete">
                        <a><span><i class="fas fa-trash-alt"></i></span> Delete comment</a>
                    </div>
                    <div class="delete-comment-pop-up">
                        <div class="pop-up-card-comment">
                            <div class="pop-up-header-comment">
                                <h2>delete comment?</h2>
                                <div class="close-pop-up-comment">+</div>
                            </div>
                            <div class="pop-up-content-comment">
                                <p>Are you sure you want to delete this comment?</p>
                            </div>
                            <div class="pop-up-buttons-comment">
                                <p class="cancel-delete-comment">Cancel</p>
                                <a href="/comment/delete-comment/${comment._id}" class="final-delete-comment">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class= "comment-content">
                    ${ comment.content }
                </div>
            </div>
         </div>
    `
}