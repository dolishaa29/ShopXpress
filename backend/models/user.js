let mongo=require("mongoose");
let table1=mongo.Schema({
   uid:{type:Number},
   uname:{type:String},
   uemail:{type:String},
   ucontact:{type:Number},
   address:{type:String},
   upassword:{type:String},
});
module.exports=mongo.model('user',table1);