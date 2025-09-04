const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  id: { type: String},         
  name: { type: String },       
  type: { type: String},     
  price: { type: Number },      
  description: { type: String },                 
  sellerid: { type: Number},    
  parentid: { type: String },   
  image: { type: String },                       
  quantity: { type: Number, default: 1, min: 1 } 
});                        

module.exports = mongoose.model('cart', cartSchema);
