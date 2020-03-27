const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Menu = require('./menu');


const orderSchema = new Schema({
    name: String,
    price: String,
    userId: String,
    menuId: String
});

module.exports=mongoose.model('Order', orderSchema);