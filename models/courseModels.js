const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    user_id:{
        type:String,
        required:true
    },
    title : {
        type : String,
        maxLength : 50
    },
    photos:{
        type : [String], 
        maxLength : 200
    },
    video:{
        type : [String], 
        maxLength : 200
    },
    description:{
        type: String,
    },
    price:{
        type: Number
    },
    stars:{
        type: Number
    },
    thumbnail:{
        type: String
    },
    file :{
        type: String
    },
    created_at: {
        type: Date
    },
    created_by:{
        type: String
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],
        required: true
    },
    cat_type:{
        type:String,
        required:true
    }
})

const Courses = mongoose.model('Courses',courseSchema,'Courses');

module.exports = Courses;
