const nodeMailer = require('../config/nodemailer');

module.exports.resetPassword = function(accessToken){

    let htmlString = nodeMailer.renderTemplate({accessToken:accessToken} , "/reset_password/reset_password.ejs");

    nodeMailer.transporter.sendMail({
        from: 'Socialize.com',
        to: accessToken.user.email, 
        subject: "Socialize : Reset Password",
        html: htmlString 
      } , function(error , info){
        if(error){console.log("Error in sending mail",error);return;}
        console.log("Message Sent" , info);
        return;
    });
}

