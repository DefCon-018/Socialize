const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    let post = await Post.findById(req.body.post);
    if(post){
        try{
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            })
            post.comments.push(comment);
            post.save();
            return res.redirect('back');
        }
        catch(err){
            console.log("error", err);
            return res.redirect('back');
        }
    }
    else{
        return res.redirect('back');
    }
}