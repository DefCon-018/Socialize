const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: 'Invalid Email / Password'
            })
        }
        return res.status(200).json({
            message: 'sign in successfully, here is your token keep it safe',
            data: {
                token: jwt.sign(user.toJSON(), 'socialize', {expiresIn: '1000000'})
            }
        })
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}

