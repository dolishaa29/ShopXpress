let rec=require("../models/product");
let cart=require("../models/cart")
let order=require("../models/orderhistory");
exports.addproducts=async (req,res)=>
{
  console.log('hello')
  let name=req.body.name;
  let type=req.body.type;
  let price=req.body.price;
  let description=req.body.description;
  let image=req.file.filename;
  console.log("image--",image)
  console.log("data fetched", req.body, req.file.filename);
 const seller = req.seller;
 
  let data=await rec.find();
       if(data.length==0){
       const id=1;
       let record=new rec({id:id,name:name,type:type,price:price,description:description,sellerid:seller.sid,image:image});
       await record.save();
       console.log("saved successfully");
       
        return res.status(201).json({success: true,msg:'product added successfully'})
       }
       else{
            const id=data.length+1;
            let record=new rec({id:id,name:name,type:type,price:price,description:description,sellerid:seller.sid,image:image});
            await record.save();
            console.log("saved successfully");
            
             return res.status(201).json({success: true,msg:'product adeded successfully'})
       }
  
}


exports.viewproducts=async(req,res)=>
{
     seller=req.seller;
     record=await rec.find({sellerid:seller.sid});

     if(record.length>0)
     {
          return res.status(201).json({success: true,msg:'product fetch successfully',product:record})
     }
     else{
          return res.status(400).json({success: false,msg:'product fetc failed'})
     }
}

exports.updateproduct=async(req,res)=>
{
     const id=req.params.id;
     record=await rec.find({id:id});
     if(id)
     {
          return {success:true , record:record}
     }
     else{
          return {success:false}
     }
}


exports.updateproducts=async(req,res)=>
{
  const id=req.params.id;
  let name=req.query.name;
   let price=req.query.price;
  let description=req.query.description;
    let image=req.file.filename;
  console.log("image--",image)
  console.log("data fetched", req.body, req.file.filename);
 console.log(id);
 console.log(name);
 console.log(price);
 console.log(description);
updatedata=req.query;
  let newdata = await rec.findOneAndUpdate({id:id}, {name: name, price: price, description: description,image:image });
  console.log(newdata)
  if(newdata)
  {
     await newdata.save();
     console.log(rec);
     return {success:true}
  }
}

exports.deleteproduct=async(req,res)=>
{ 
     const id=req.params.id;
     console.log(id);
     let newdata=await rec.deleteOne({id:id});
      if(newdata)
     {
     console.log(rec);
     return {success:true}
     }
     

}

exports.viewallproducts=async(req,res)=>
{
     record=await rec.find({});

     if(record.length>0)
     {
           return res.status(201).json({success: true,msg:'product fetch successfully',product:record})
     }
     else{
          return res.status(400).json({success: false,msg:'product fetch failed'})
     }
}


exports.addcart = async (req, res) => {    
  try {
    const user = req.user;
    const { id, quantity } = req.body;   

    const record = await rec.findById(id);  
    if (!record) {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }

    let carts = new cart({
      id: record._id,
      name: record.name,
      type: record.type,
      price: record.price,
      description: record.description,
      sellerid: record.sellerid,
      parentid: user.uid,
      image: record.image,
      quantity: quantity 
    });

    await carts.save();
    return res.status(201).json({ success: true, msg: 'Product added successfully' });

  } catch (err) {
    console.error("Add to cart error:", err);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};


exports.viewcart=async(req,res)=>
{    
     user=req.user;
      record=await cart.find({parentid:user.uid});
    console.log(record)
     if(record.length>0)
     {
          return res.status(201).json({success: true,msg:'product fetch successfully',product:record})
     }
     else{
          return res.status(400).json({success: false,msg:'product fetch failed'})
     }
}


exports.removeproduct = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Deleting:", id);

    const del = await cart.deleteOne({ id: id });

    if (del.deletedCount > 0) {
      return res
        .status(200)
        .json({ success: true, msg: "Product removed successfully" });
    } else {
      return res.status(404).json({ success: false, msg: "Product not found" });
    }
  } catch (error) {
    console.error("Error removing product:", error);
    return res.status(500).json({ success: false, msg: "Server error" });
  }
};



exports.getProductsByCategory = async (req, res) => {
    const { type } = req.query;  

    try {
 
        const products = await rec.find({ type: type });

        if (!products || products.length === 0) {
            return res.status(404).json({ success: false, msg: 'No products found for this category' });
        }

        return res.status(200).json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        return res.status(500).json({ success: false, msg: 'Server error' });
    }
};



exports.placeorder = async (req, res) => {
  console.log("User placing order: ", req.user.uid);

  try {
    const { cartItems } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ success: false, msg: "Cart is empty" });
    }

    const orders = new order({
      orderData: cartItems.map(item => ({
        id: item._id,  
        name: item.name,
        type: item.type,
        price: item.price,
        description: item.description,
        sellerid: item.sellerid,
        image: item.image,
        quantity: item.quantity,
      }),
    ),
    parentid: req.user.uid,
    });

    await orders.save();
    await cart.deleteMany({ parentid: req.user.uid });

    res.json({ success: true, msg: "Order placed successfully, cart cleared", orders });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ success: false, msg: "Error placing order" });
  }
};


exports.orderhistory = async (req, res) => {
  try {
    const user = req.user;

    const orders = await order.find({ parentid: user.uid });

    if (!orders || orders.length === 0) {
      return res.json({ success: false, msg: "No orders found" });
    }

    res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, msg: "Error fetching orders" });
  }
};
