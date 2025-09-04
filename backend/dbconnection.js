let mongo=require("mongoose");
exports.eco=()=>
{
mongo.connect("mongodb://localhost:27017/ecommerce")
console.log('successfully connected')
}