const User = require('../models/user');

module.exports.signIn = function(req, res){
    if(req.cookies.user_id){
        return res.redirect('back');
    }
    return res.render('sign_in', {
        title: 'Socialize | sign- in'
    })
}

module.exports.signUp = function(req, res){
    if(req.cookies.user_id){
        return res.redirect('back');
    }
    return res.render('sign_up', {
        title: 'Socialize | sign-up'
    })
}

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err, user){
        if(!user){
            User.create(req.body, function(err, user){
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
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('Error in finding the user in signing in');
            return;
        }
        if(user){
            if(req.body.password != user.password){
                return res.redirect('/user/sign-in');
            }
            res.cookie('user_id', user.id);
            return res.redirect('/user/profile');
        }
        else{
            return res.redirect('/user/sign-in');
        }
    })
}

module.exports.profile = function(req, res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err, user){
            if(err){
                console.log("Error in finding user in profile", err);
                return;
            }
            if(user){
                return res.render('profile', {
                    title: 'User Profile',
                    user: user
                })
            }
            else{
                return res.redirect('/user/sign-in');
            }
        })
    }
    else{
        return res.redirect('/user/sign-in');
    }
}

module.exports.logOut = function(req, res){
    res.clearCookie('user_id');
    return res.redirect('/user/sign-in');
}


