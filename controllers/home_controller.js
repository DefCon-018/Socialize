const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function(req, res){
    try{
        let peoples = await User.find({});
        let posts = await Post.find({}).sort('-createdAt').populate('user').populate('likes').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        })

        let friends = [];
        if(req.user){
            let user_detail = await User.findById(req.user.id).populate({
                path: 'friendship',
                populate:{
                    path: 'to_user',
                    populate: 'user'
                },
            });
            for(let friend of user_detail.friendship){
                friends.push(friend.to_user);
            }
        }
        // console.log(user_detail.friendship[0].to_user);
        let people = [];
        for(let person of peoples){
            let flag = 0;
            for(let friend of friends){
                if(person.id == friend.id){
                    flag = 1;
                    break;
                }
            }
            if(flag == 0){
                people.push(person);
            }
        }
        // console.log(people);
        // console.log(friends);
        return res.render('home', {
            title: 'Socialize | Home',
            posts: posts,
            people: people ,
            friends: friends 
        })
    }
    catch(err){
        console.log("error", err);
        return res.redirect('back');
    }
}