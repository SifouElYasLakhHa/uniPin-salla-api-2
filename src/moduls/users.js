const mongoose = require('mongoose');


require('dotenv').config();

const { Schema } = mongoose;

const usersSchema = new Schema({
    user: {
        type: Number,
        required: true,
    },
    role: {
        type: Number,
        required: true,
        default: 1,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        unique: true,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now,
    },
    updateAt: {
        type: Date,
        default: Date.now,
    },
});

const Users = mongoose.model('Users', usersSchema);
module.exports = Users;
