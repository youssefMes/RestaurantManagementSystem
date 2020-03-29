const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    name: String,
    price: String,
    type: String,
    creation: String
});

module.exports=mongoose.model('Menu', menuSchema);