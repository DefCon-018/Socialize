const Comment = require('../../../models/comment');
const User = require('../../../models/user');
const Post = require('../../../models/post');

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.body._id
            })
            post.comments.push(comment);
            post.save();
            let comment1 = await Comment.findById(comment._id).populate('user').populate('post');
            return res.status(200).json({
                message: 'get Comment successfully',
                data: {
                    comment: comment1
                }
            })
        }
        else{
            return res.status(404).json({
                message: 'Did not get post'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id).populate('post');
        if((comment.user == req.user.id) || (comment.post.user == req.user.id)){
            let postId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(postId, {$pull : {comments: req.params.id}});
            return res.status(200).json({
                message: 'Comment deleted successfully',
                data: {
                    comment_id: req.params.id
                }
            })
        }
        else{
            return res.status(404).json({
                message: 'comment not found'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}