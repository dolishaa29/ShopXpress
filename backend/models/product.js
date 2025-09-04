let mongo=require("mongoose");
let table2=mongo.Schema({
    id: {type:String},
    name: {type:String},
    type:{type:String},
    price:{type:Number},
    description:{type:String},
    sellerid:{type:Number},
    image:{type:String},
});
module.exports=mongo.model('product',table2); 
