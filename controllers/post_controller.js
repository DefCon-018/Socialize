const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

let IMAGE_PATH = path.join('/uploads/posts');
const Post = require('../models/post');
const Like = require('../models/like');
const Comment = require('../models/comment');

module.exports.create = function(req, res){
    const form = new formidable.IncomingForm({});
    form.parse(req, (err, fields, files)=>{
        console.log(fields);
        Post.create({
            content: fields.content,
            user: req.user._id,
            image: path.join(IMAGE_PATH + "/" + files.image.name)
        }, function(err, post){
            console.log(post);
        })
    })
    form.on('fileBegin', function(name, file){
        file.path = path.join(__dirname, "..", '/uploads/posts', file.name);
    })

    form.on('file', function(name, file){
        console.log("Uploaded file", file.name);
    })
    req.flash('success', "Post Published!");
    return res.redirect('back');
}

module.exports.deletePost = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            fs.unlinkSync(path.join(__dirname, '..', post.image));

            await Like.deleteMany({likeable: post, onModel: 'Post'});

            post.remove();



            await Comment.deleteMany({post: req.params.id});
            
            console.log(req.params.id);
            
            return res.status(200).json({
                message: 'post deleted successfully',
                data: {
                    post_id: req.params.id
                }
            })
        }
        else{
            return res.status(401).json({
                message: "unoauthorized"
            })
        }
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
