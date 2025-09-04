let express=require("express");
let router=express.Router();
let auth=require("./midware/seller_auth");
let auths=require("./midware/user_auth");

const multer = require("multer");
let upload =multer({ 
    storage:multer.diskStorage({
        destination:(req, file, cb)=>{
            cb(null,"./public/images");
        },
        filename:(req,file,cb)=>{
            cb(null, file.originalname);
        }
    })
})

let {home,userlogin,usershowlogin,userregister,usershowregister,userlogout,userprofile}=require("./controller/usercontroller");
let {sellerlogin,sellershowlogin,sellerregister,sellershowregister,sellerlogout, sellerprofile}=require("./controller/sellercontroller");
let {addproduct,addproducts,viewproducts,updateproduct,deleteproduct,updateproducts,viewallproducts,addcart,removeproduct, viewcart,getProductsByCategory,placeorder, orderhistory}=require("./controller/productcontroller");

// let upload = require('./midware/upload');
// console.log('uploads:', upload);
router.get("/",home);
router.post("/userlogin",userlogin);
router.get("/usershowlogin",usershowlogin);
router.post("/userregister",userregister);
router.get("/usershowregister",usershowregister);
router.post("/sellerlogin",sellerlogin);
router.post("/sellerregister",sellerregister);
router.get("/sellershowlogin",sellershowlogin);
router.get("/sellershowregister",sellershowregister);
router.get("/sellerlogout",auth,sellerlogout);
router.get("/userlogout",auths,userlogout);
router.get("/addproduct",auth,  addproduct);
router.post("/addproducts", auth, upload.single("image"), addproducts);
router.get("/viewproducts",auth,viewproducts);
router.get("/updateproduct/:id",updateproduct);
router.post("/updateproducts/:id",upload.single("image"),updateproducts);
router.get("/deleteproduct/:id",deleteproduct);
router.get("/viewallproduct",viewallproducts);
router.post("/addcart",auths, addcart);
router.get("/viewcart",auths,viewcart);
router.delete("/removeproduct/:id",removeproduct);
router.get('/profile', auths, userprofile);
router.get('/sellerprofile',auth,sellerprofile);
router.get('/getProductsByCategory',getProductsByCategory);
router.post("/placeorder",auths,placeorder);
router.get("/orderhistory",auths,orderhistory);
module.exports=router;