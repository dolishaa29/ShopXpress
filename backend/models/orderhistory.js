const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderData: [
    {
      id: { type: String },       
      name: { type: String},        
      type: { type: String },     
      price: { type: Number },      
      description: { type: String },                
      sellerid: { type: Number },    
      image: { type: String },                      
      quantity: { type: Number, min: 1 }, 
   }
],
parentid: { type: String},
  orderStatus: { type: String, default: "Pending" }, 
  orderDate: { type: Date, default: Date.now }      
});

module.exports = mongoose.model("order", orderSchema);
