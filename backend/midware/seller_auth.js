let sellermodel=require("../models/seller");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    if (req.cookies.emstoken != undefined && req.cookies.emstoken != "") {
      const token = req.cookies.emstoken;
      
      const data = jwt.verify(token, "aabb");
      let seller = await sellermodel.findOne({ semail: data.token })
        
      if (!seller) return res.status(403).json({ msg: "User not found" });
      else{
      req.seller = seller;
      next();
      }
    } else {
      // res.redirect("/sellershowlogin");
      console.log("Please Login First");
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Server Error",
      message: err.message,
    });
  }
}

module.exports = auth;
