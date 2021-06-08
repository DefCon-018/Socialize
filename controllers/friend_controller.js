const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.create = async function(req, res){
    try{
        const user = await User.findById(req.user.id);
        if(user){
            let friendship = await Friendship.create({
                                from_user: req.user.id,
                                to_user: req.params.id
                            })
            user.friendship.push(friendship);
            user.save();
            return res.status(200).json({
                message: 'friendship establised successfully',
                data: {
                    friend_id: req.params.id,
                    name: user.name
                }
            })
        }
        else{
            return res.status(401).json({
                message: 'unauthorized'
            })
        }
    }
    catch(err){
        return res.status(500).json({
            message: "internal server error"
        })
    }
}