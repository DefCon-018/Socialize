const AccessToken = require('../models/accessToken');
const crypto = require('crypto');
const User = require('../models/user');
const resetPasswordMailer = require('../mailers/reset_password_mailer');

module.exports.auth = function(req, res){
    return res.render('verify_email' , {
        title: "Socialize | Verify",
    });
}

module.exports.verifyEmail = async function(req, res){
    let user = await User.findOne({email: req.body.email});
    if(user){
        let token = await crypto.randomBytes(20).toString('hex');
        let accessToken = await AccessToken.create({
            user : user,
            token :  token,
            isValid : true
        });
        resetPasswordMailer.resetPassword(accessToken);
        return res.render('account_verified' , {
            title: "Codeial | Account Verified",
        });
    }
    else{
        req.flash("error", "Account does not exist with this email");
        return res.redirect('back');
    }
}

module.exports.resetPassword = async function(req, res){
    
    let accessToken = await AccessToken.findOne({token : req.query.accessToken});
    console.log(accessToken ,'AccessToken' )
    if(accessToken){
        if(accessToken.isValid){
            return res.render('reset_password' , {
                title : 'Socialize | Reset Password',
                accessToken : accessToken.token
            })
        }
    }

    req.flash('error' , 'Token is Expired ! Pls regenerate it again.');
    return res.redirect('/auth');
}

module.exports.reset = async function(request , response){
    let accessToken = await AccessToken.findOne({token : request.query.accessToken});

    if(accessToken){
        
        if(accessToken.isValid){
            accessToken.isValid = false;

            if(request.body.password == request.body.confirm_password){
                
                let user = await User.findById(accessToken.user);
                if(user){
                    user.password = request.body.password;
                    accessToken.save();
                    user.save();

                    request.flash('success' , 'Password Changed');
                    return response.redirect('/users/sign-in');
                }
            }else{
                return response.redirect('back');
            }
            
           
        }
    }

    request.flash('error' , 'Token is Expired ! Pls regenerate it.');
    return response.redirect('/auth');
}