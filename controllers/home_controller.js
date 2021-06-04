const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try{
        let people = await User.find({});
        let posts = await Post.find({}).sort('-createdAt').populate('user').populate('likes').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })
        // console.log(posts);
        return res.render('home', {
            title: 'Socialize | Home',
            posts: posts,
            people: people  
        })
    }
    catch(err){
        console.log("error", err);
        return res.redirect('back');
    }
}