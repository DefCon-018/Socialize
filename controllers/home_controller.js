const Post = require('../models/post');

module.exports.home = function(req, res){
    Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    }).exec(function(err, posts){
        if(err){
            console.log("Error in finding posts in home");
            return;
        }
        return res.render('home', {
            title: 'Socialize | Home',
            posts: posts
            
        })
    })
}