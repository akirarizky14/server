const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profSchema = new Schema({
    title : {
        type :String
    },
    pict : {
        type : String
    },
    post_by :{
        type : String
    },
    post_time :{
        type : Date
    }
})

const Professional = mongoose.model('Professional',profSchema);

module.exports = Professional;
