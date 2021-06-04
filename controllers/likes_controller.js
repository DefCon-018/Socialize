let Post = require('../models/post');
let Comment = require('../models/comment');
let Like = require('../models/like');

module.exports.toggleLike = async function(req, res){
    try{
        let likeable;
        let deleted = false;
        if(req.query.type == 'Post'){
            likeable = await Post.findById(req.query.id).populate('likes');
        }
        else {
            likeable = await Comment.findById(req.query.id).populate('likes');
        }
        let existingLike = await Like.findOne({
            user : req.user._id,
            likeable: req.query.id,
            onModel: req.query.type
        })

        if(existingLike){
            deleted = true;
            likeable.likes.pull(existingLike._id);
            likeable.save();
            existingLike.remove();
        }
        else{
            let like = await Like.create({
                user: req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            })
            likeable.likes.push(like._id);
            likeable.save();
        }
        return res.status(200).json({
            message: 'Toggle like successfully',
            data: {
                deleted: deleted
            }
        });
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }    
}

