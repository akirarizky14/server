const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
    name_cat : {
        type : String,
        maxLength : 50
    },
    desc:{
        type : String,
        maxLength : 200
    },
    user_id:{
        type:String,
        required:true
    }
})

const Categories = mongoose.model('Categories', catSchema);

module.exports = Categories;