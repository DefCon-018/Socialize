const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    from_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    to_user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
},{
    timestamps: true
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;