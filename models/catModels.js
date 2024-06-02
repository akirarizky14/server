const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catSchema = new Schema({
    name_cat: {
        type: String,
        maxLength: 50,
        unique: true,
        required: true
    },
    desc: {
        type: String,
        maxLength: 200
    },
    user_id: {
        type: String,
        required: true
    }
});

catSchema.index({ name_cat: 1 }, { unique: true });

const Categories = mongoose.model('Categories', catSchema, 'Categories');


module.exports = Categories;
