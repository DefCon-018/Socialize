const User = require('../models/user');
const fs = require('fs');
const path = require('path');
const Post = require('../models/post');

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('sign_in', {
        title: 'Socialize | sign- in'
    })
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('back');
    }
    return res.render('sign_up', {
        title: 'Socialize | sign-up'
    })
}

let avatarPath = path.join('/uploads/users/avatars/images.png');

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err, user){
        if(!user){
            User.create({
                name: req.body.name,
                email: req.body.email, 
                password: req.body.password,
                avatar: avatarPath
            }, function(err, user){
                if(err){
                    console.log("Error in creating the user in create", err);
                    return;
                }
                console.log(user);
                return res.redirect('/user/sign-in');
            });
        }
        else{
            return res.redirect('/user/sign-in');
        }
    })
}

module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in successfully');
    return res.redirect('/user/profile');
}

module.exports.profile = async function(req, res){
    let user = await User.findById(req.params.id).populate({
        path: 'friendship',
        populate: {
            path: 'to_user',
            populate: {
                path: 'user'
            }
        }
    });
    let posts = await Post.find({user: req.params.id}).sort('-createdAt').populate('likes').populate('user').populate({
        path: 'comments',
        populate:{
            path: 'user'
        }
    })
    // console.log(posts);
    return res.render('profile', {
        title: 'Socialize | profile',
        user_details: user,
        posts: posts
    })
}

module.exports.destroySession = function(req, res){
    req.logout();
    req.flash('success', 'Logged out successfully');
    return res.redirect('/user/sign-in');
}

module.exports.update = async function(req, res){
    try{
        if(req.user.id == req.params.id){
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log("Error in multer ", err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar && fs.existsSync(path.join(__dirname, '..', user.avatar))){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'Profile updated!');
                return res.redirect('back');
            })
        }
        else{
            req.flash('error', "can't update the profile");
            return res.redirect('back');
        }
    }
    catch(err){
        console.log("error in updating profile", err);
        return res.redirect('back');
    }
}