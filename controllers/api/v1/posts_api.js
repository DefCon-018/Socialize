const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
let IMAGE_PATH = path.join('/uploads/posts');


module.exports.index = async function(req, res){
    let posts = await Post.find({}).sort('-createdAt').populate({
        path: 'user',
        select: '-password',
        populate : {
            path: 'comments',
            populate: {
                path: 'user',
                select: '-password'
            }
        }
    })
    return res.status(200).json({
        message: 'Getting all posts',
        posts: posts
    })
}

module.exports.destroy = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            return res.status(200).json({
                message: 'Post and associated comments deleted successfully'
            })
        }
        else{
            return res.status(401).json({
                message: 'unauthorized'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

module.exports.create = function(req, res){
    const form = new formidable.IncomingForm({});
    let post_id;
    form.parse(req, (err, fields, files) =>{
        Post.create({
            content: fields.content,
            user: req.user._id,
            image: Path.join(IMAGE_PATH + "/" + fiels.image.name)
        },function(err, post){
            post_id = post._id
        })
    })
    form.on('fileBegin', function(name, file){
        file.path = path.join(__dirname, "..", '/uploads/posts', file.name);
    })

    form.on('file', function(name, file){
        console.log("Uploaded file", file.name);
    })
    req.flash('success', "Post Published!");
    let post = Post.findById(post_id);
    return res.status(200).json({
        message: "post created successfully",
        data: {
            post: post
        }
    })
}


