const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    full_name: {
        type: String,
        maxlength: 50,
        minlength: 3
    },
    nick_name: {
        type: String,
        maxlength: 20
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'Rather Not to Say']
    },
    email: {
        type: String,
        maxlength: 50,
        required :true
    },
    password: {
        type: String,
        required: true
    },
    born: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    ads: {
        type: String,
        maxlength: 20
    },
    job_positions: {
        type: String,
        maxlength: 30
    },
    job_industries: {
        type: String,
        maxlength: 30
    },
    countries: {
        type: String,
        maxlength: 30
    },
    provinces: {
        type: String,
        maxlength: 30
    },
    cities: {
        type: String,
        maxlength: 30
    },
    district: {
        type: String,
        maxlength: 30
    },
    roles: {
        type: String,
        enum: ['Customer', 'Admin', 'Trainers', 'Marketing']
    },
    photos: {
        type: String,
        maxlength: 100
    },
    isEmailVerified :{
        type: Boolean,
        default : false
    },
    otp:{
        type: Number,
        minlength:1,
        maxlength:10
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
