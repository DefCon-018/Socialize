const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

let IMAGE_PATH = path.join('/uploads/posts');
const Post = require('../models/post');

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
    return res.redirect('back');
}

module.exports.deletePost = async function(req, res){
    try{
        let post = await Post.findById(req.params.id);
        if(post.user == req.user.id){
            fs.unlinkSync(path.join(__dirname, '..', post.image));
            post.remove();
            await Comment.deleteMany({post: req.params.id});
            if(req.xhr){
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: "deleted successfully"
                })
            }
        }
        else{
            return res.redirect('back');
        }
    }
    catch(err){
        return res.redirect('back');
    }
}
