let deleteCommentHandler=function(e){let t=$(" .comment-card-dots",e),o=$(" .comment-card-delete",e),n=$(" .final-delete-comment",e),c=$(" .cancel-delete-comment",e),l=$(" .close-pop-up-comment",e),s=$(" .delete-comment-pop-up",e),a=$(" .final-delete-comment",e),m=n.prop("href");$(t).click((function(e){$(o).toggleClass("comment-active")})),$(o).click((function(e){console.log("hello",s),$(s).toggleClass("active-delete-pop-up-comment")})),$(c).click((function(e){$(o).toggleClass("comment-active"),$(s).toggleClass("active-delete-pop-up-comment")})),$(l).click((function(){$(o).toggleClass("comment-active"),$(s).toggleClass("active-delete-pop-up-comment")})),$(a).click((function(e){e.preventDefault(),console.log(m),$.ajax({type:"get",url:m,success:function(e){console.log(e),$("#comment-"+e.data.comment_id).remove(),new Noty({theme:"relax",type:"success",text:"Comment deleted successfully",layout:"topRight",timeout:1e3}).show()},error:function(e){console.log(e.responseText)}})}))},deleteComment=function(e){let t=$(" .comments-container",e);for(oneComment of t)deleteCommentHandler(oneComment)},deletePost=function(e){let t=$(" .show-post-comments",e);deleteComment(t);let o=$(" .post-card-dots",e),n=$(" .post-card-delete",e),c=$(" .final-delete",e).prop("href"),l=$(" .delete-post-pop-up",e),s=$(" .toggle-like-button",e),a=$(" .like-link",e).prop("href"),m=$(" .like-count",e),i=$(" .fa-heart",e),d=$(" .show-post-comments",e),p=$(" #comment-create-form",e),r=$(" .toggle-comment-button",e),u=$(" .post-card-comments",e);$(r).click((function(){$(u).slideToggle("1000")})),$(p).submit((function(e){e.preventDefault(),$.ajax({type:"post",url:"/comment/create",data:p.serialize(),success:function(e){console.log(e);let t=getComment(e.data.comment);$(d).append(t);let o=$("#comment-"+e.data.comment._id);deleteCommentHandler(o),console.log(t),new Noty({theme:"relax",type:"success",text:"Comment added successfully",layout:"topRight",timeout:1e3}).show()},error:function(e){console.log(e.responseText)}})})),$(o).click((function(e){$(n).toggleClass("active")})),$(n).click((function(e){console.log("hello"),$(l).toggleClass("active-delete-pop-up")}));let f=$(" .final-delete",l),g=$(" .cancel-delete",l),v=$(" .close-pop-up",l);$(g).click((function(e){$(n).toggleClass("active"),$(l).toggleClass("active-delete-pop-up")})),$(v).click((function(){$(n).toggleClass("active"),$(l).toggleClass("active-delete-pop-up")})),$(s).click((function(e){e.preventDefault();let t=Number(m.text());$.ajax({type:"post",url:a,success:function(e){e.data.deleted?(t-=1,$(m).text(t),$(i).removeClass("fas"),$(i).addClass("far")):(t+=1,$(m).text(t),$(i).removeClass("far"),$(i).addClass("fas"),$(i).css("color","red"))},error:function(e){}})})),$(f).click((function(e){e.preventDefault(),console.log(c),$.ajax({type:"get",url:c,success:function(e){console.log("data",e),$("#post-"+e.data.post_id).remove(),new Noty({theme:"relax",type:"success",text:"Post deleted successfully",layout:"topRight",timeout:1e3}).show()},error:function(e){console.log(e.responseText)}})}))},postCards=document.querySelectorAll(".post-card");for(let e of postCards)deletePost(e);function getComment(e){return`\n        <div class="comments-container" id= "comment-${e._id}">\n            <div class="user-comment-image">\n                <img src= "${e.user.avatar}">\n            </div>\n            <div class= "show-comments">\n                <div class= "comment-user-name">\n                    <h3>${e.user.name}</h3>\n                    <div class= 'comment-card-dots'>\n                        <i class="fas fa-ellipsis-h"></i>\n                    </div>\n                    <div class="comment-card-delete">\n                        <a><span><i class="fas fa-trash-alt"></i></span> Delete comment</a>\n                    </div>\n                    <div class="delete-comment-pop-up">\n                        <div class="pop-up-card-comment">\n                            <div class="pop-up-header-comment">\n                                <h2>delete comment?</h2>\n                                <div class="close-pop-up-comment">+</div>\n                            </div>\n                            <div class="pop-up-content-comment">\n                                <p>Are you sure you want to delete this comment?</p>\n                            </div>\n                            <div class="pop-up-buttons-comment">\n                                <p class="cancel-delete-comment">Cancel</p>\n                                <a href="/comment/delete-comment/${e._id}" class="final-delete-comment">Delete</a>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n                <div class= "comment-content">\n                    ${e.content}\n                </div>\n            </div>\n         </div>\n    `}function addFriendship(e){let t=$(" .friend-request-btn",e),o=$(t).prop("href");t.click((function(e){e.preventDefault(),$.ajax({type:"get",url:o,success:function(e){console.log(e.data.friend_id),$("#person-"+e.data.friend_id).remove(),new Noty({theme:"relax",type:"success",text:"Friend Added",layout:"topRight",timeout:1e3}).show()},error:function(e){console.log(e.responseText)}})}))}let people=$(".individual");for(let e of people)addFriendship(e);