const formidable = require('formidable');
const path = require('path');

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