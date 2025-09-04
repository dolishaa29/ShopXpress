let rec=require("../models/seller");
let bct=require("bcryptjs");
let jwt=require("jsonwebtoken");

exports.sellerregister=async(req,res)=>
{
      let semail=req.body.semail;
      let sname=req.body.sname;
      let spassword=req.body.spassword;
      let scontact=req.body.scontact;
      let companyname=req.body.companyname;
      let hp=await bct.hash(spassword,10);
      let exist=await rec.findOne({semail:semail});
      
      if(exist)
      {
          return {success:false}
      }
      else{
     let data=await rec.find();
     if(data.length==0){
     const sid=1;
     let record=new rec({semail:semail,sname:sname,spassword:hp,scontact:scontact,companyname:companyname,sid:sid});
     await record.save();
     return res.status(201).json({success: true,msg:'user registered successfully'}) 
     }
     else{
          const sid=data.length+1;
          let record=new rec({semail:semail,sname:sname,spassword:hp,scontact:scontact,companyname:companyname,sid:sid});
          await record.save();
          return res.status(201).json({success: true,msg:'user registered successfully'}) 
     }
    }    
}


exports.sellerlogin=async(req,res)=>
{
    let semail=req.body.semail;
    let spassword=req.body.spassword;

    let data=await rec.findOne({semail:semail});
    if(!data)
    {      
            return res.status(404).json({success: false,msg:'email not found'})
    }
  
    
    lpass=data.spassword;
    pass=await bct.compare(spassword,lpass); 
    if(pass)
        {
            let token=jwt.sign({token:data.semail},"aabb",{
                    expiresIn:"1d"
                });
            res.cookie('emstoken', token);
            console.log("send token"+token);
            return res.status(200).json({success: true,msg:'user login successfully',token})                          
        }
        else
        {
            return res.status(400).json({success: false,msg:'user login failed'})
        }
    }



exports.sellerlogout=async(req,res)=>
{  
        const seller = req.seller;
        res.clearCookie('emtoken', " ");
        return {success:true}

}


exports.sellerprofile=async(req,res)=>
{
const seller = req.seller;
return res.status(200).json({success: true,msg: "User profile fetched successfully",profile:
     {sname: seller.sname,semail: seller.semail,scontact: seller.scontact,comapnyname: seller.comapnyname,sid: seller.sid,
      },
    });
}


