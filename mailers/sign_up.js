const nodemailer = require('../config/nodemailer');

exports.signUp = (user) =>{
    console.log('signup mail');
    let htmlString = nodemailer.renderTemplate({user: user}, '/users/sign_up.ejs');
    nodemailer.transporter.sendMail({
        from: 'pandey.himanshu1772@gmail.com',
        to: user.email,
        subject: 'A warm welcome to socialize',
        html: htmlString
    }, (err, info)=>{
        if(err){
            console.log("Error in sending sign up mail", err);
            return;
        }
        return;
    })
}