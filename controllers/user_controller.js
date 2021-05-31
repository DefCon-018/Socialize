const User = require('../models/user');

module.exports.signIn = function(req, res){
    return res.render('sign_in', {
        title: 'Socialize | sign- in'
    })
}

module.exports.signUp = function(req, res){
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


