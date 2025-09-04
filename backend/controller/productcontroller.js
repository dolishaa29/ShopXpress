let {addproducts,viewproducts,deleteproduct,updateproducts,updateproduct,viewallproducts, addcart, viewcart,removeproduct,getProductsByCategory,orderhistory, placeorder}=require('../service/productservice')

exports.addproduct=(req,res)=>
{
  res.render("addproduct.ejs");
}

exports.addproducts=async(req,res)=>
{
  await addproducts(req,res);

  
}

exports.viewproducts=async (req,res)=>
{
  await viewproducts(req,res);
 
}

exports.deleteproduct=async(req,res)=>
{
a=await deleteproduct(req,res);
if(a.success)
{
  res.redirect("viewproduct");
}
}

exports.updateproduct=async(req,res)=>
{
  a=await updateproduct(req,res);
  if(a.success)
{
  res.render("updateproduct.ejs",{record:a.record});
}
else{
  res.redirect("viewproduct");
}
}

exports.updateproducts=async(req,res)=>
{
a=await updateproducts(req,res);
if(a.success)
{
  res.redirect("viewproduct");
}

}

exports.viewallproducts=async(req,res)=>
{
  await viewallproducts(req,res);
}

exports.addcart=async(req,res)=>
{
  await addcart(req,res);

}

exports.viewcart=async(req,res)=>
{
  await viewcart(req,res);


}

exports.removeproduct=async(req,res)=>
{
  await removeproduct(req,res);


}

exports.getProductsByCategory=async(req,res)=>
{
  await getProductsByCategory(req,res);
}

exports.orderhistory=async(req,res)=>
{
  await orderhistory(req,res);
}

exports.placeorder=async(req,res)=>
{
  await placeorder(req,res);
}