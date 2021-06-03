const Post = require('../../../models/post');
module.exports.index = async function(req, res){
    let posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    })
    return res.status(200).json({
        message: 'Getting all posts',
        posts: posts
    })
}