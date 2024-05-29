const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    title : {
        type : String,
        maxLength : 50
    },
    photos:{
        type : String,
        maxLength : 200
    },
    video:{
        type : String,
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

const Products = mongoose.model('Products',productSchema);

module.exports = Products;