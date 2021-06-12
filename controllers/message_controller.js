const User = require('../models/user');
const Message = require('../models/message');

module.exports.create = async function(req, res){
    try{
        let user1 = await User.findById(req.user.id);
        let user2 = await User.findById(req.query.id);
        let message = await Message.create({
            msg: req.query.msg,
            from_user: req.user.id,
            to_user: req.query.id
        })
        user1.message.push(message);
        user1.save();
        user2.message.push(message);
        user2.save();
        return res.status(200).json({
            message: 'Message created successfully'
        })
    }
    catch(err){
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

module.exports.getMessages = async function(req, res){
    try{
        let messages = await User.findById(req.user.id).populate('message');
        // console.log(messages);
        return res.status(200).json({
            msg: 'get message successfully',
            messages: messages
        })
    }
    catch(err){
        return res.status(500).json({
            message: 'Internal server error'
        })
    }
}