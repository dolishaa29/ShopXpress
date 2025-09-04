let usermodel=require("../models/user");
const jwt = require("jsonwebtoken");

async function auth(req, res, next) {
  try {
    if (req.cookies.emtoken != undefined && req.cookies.emtoken != "") {
      const token = req.cookies.emtoken;
      
      const data = jwt.verify(token, "aabb");
      let user = await usermodel.findOne({ uemail: data.token })
        
      //console.log("user data---", user);
      
      if (!user) return res.status(403).json({ msg: "User not found" });
      else{
      req.user = user;
      next();
      }
    } else {
      //res.redirect("/usershowlogin");
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
