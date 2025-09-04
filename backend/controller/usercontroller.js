let {userlogin,userregister,userlogout,userprofile}=require('../service/userservice');

exports.home=(req,res)=>
{
    res.render("dashboard.ejs");
}

exports.usershowregister=async(req,res)=>
{
  res.render("userregister.ejs");
}

exports.userregister= async (req,res)=>
{
    await userregister(req,res);
    
}
exports.usershowlogin=async(req,res)=>
{
res.render("userlogin.ejs");
}


exports.userlogin=async(req,res)=>
{
    await userlogin(req,res);
   
}

exports.userlogout=async(req,res)=>
{
  
    a=await userlogout(req,res);
    if(a.success)
    {
      res.render("userlogin.ejs");
    }
  
}

exports.userprofile=async(req,res)=>
{
  await userprofile(req,res);
}