const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
    cat_type:{
        type:String,
        enum: ['Test','Hard','Soft','Consultation','Coaching']
    },
    name_cat : {
        type : String,
        maxLength : 50
    },
    desc:{
        type : String,
        maxLength : 200
    },
    level_cat:{
        type : String,
        enum : ['Beginner','Intermediate','Professional']
    },
    user_id:{
        type:String,
        required:true
    }
})

const Categories = mongoose.model('Categories', catSchema);

module.exports = Categories;