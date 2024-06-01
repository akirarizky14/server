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
        type : [String], // Menggunakan array untuk menyimpan banyak URL gambar
        maxLength : 200
    },
    video:{
        type : [String], // Menggunakan array untuk menyimpan banyak URL video
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
    }
})

const Courses = mongoose.model('Products',courseSchema);

module.exports = Courses;
