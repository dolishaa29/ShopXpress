let mongo=require("mongoose");
let table3=mongo.Schema({
   sid:{type:Number},
   sname:{type:String},
   companyname:{type:String},
   semail:{type:String},
   scontact:{type:Number},
   spassword:{type:String},
});
module.exports=mongo.model('seller',table3);