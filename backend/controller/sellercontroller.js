let {sellerregister,sellerlogin,sellerlogout,sellerprofile}=require('../service/sellerservice');

exports.home=(req,res)=>
{
    res.render("dashboard.ejs");
}

exports.sellershowregister=async(req,res)=>
{
  res.render("sellerregister.ejs");
}

exports.sellerregister= async (req,res)=>
{
    a=await sellerregister(req,res);

}
exports.sellershowlogin=async(req,res)=>
{
res.render("sellerlogin.ejs");
}


exports.sellerlogin=async(req,res)=>
{
    a=await sellerlogin(req,res);
}

exports.sellerlogout=async(req,res)=>
{
  a=await sellerlogout(req,res);
  if(a.success)
  {
    res.render("sellerlogin.ejs");
  }
}


exports.sellerprofile=async(req,res)=>
{
  await sellerprofile(req,res);
}