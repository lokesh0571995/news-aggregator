const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required:true,
        min:3,
        max:100,
        unique:true
    },
    email: { 
        type: String, 
        required: true, 
        max:100,
        unique: true 
    },
    password: { 
        type: String, 
        required: true,
        min:6,
    },
    preferences: { 
        type: Array, 
        default: [] 
    },
    readArticles: { 
        type: Array, 
        default: [] 
    },
    favoriteArticles: { 
        type: Array, 
        default: [] 
    },
});

module.exports = mongoose.model('User', userSchema);