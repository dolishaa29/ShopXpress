let rec=require("../models/user");
let jwt=require("jsonwebtoken");
let bct=require("bcryptjs");
exports.userregister=async(req,res)=>
{
    console.log("req.body--",req.body);
     let uname=req.body.uname;
      let uemail=req.body.uemail;
     
      let upassword=req.body.upassword;
      let ucontact=req.body.ucontact;
      let address=req.body.address;
      
      let hp=await bct.hash(upassword,10);
      let exist=await rec.findOne({uemail:uemail});
      
      if(exist)
      {
          return {success:false}
      }
      else{
     let data=await rec.find();
     if(data.length==0){
     const uid=1;
     let record=new rec({uemail:uemail,uname:uname,upassword:hp,ucontact:ucontact,address:address,uid:uid});
     await record.save();
     return res.status(201).json({success: true,msg:'user registered successfully'}) 
     }
     else{
          const uid=data.length+1;
          let record=new rec({uemail:uemail,uname:uname,upassword:hp,ucontact:ucontact,address:address,uid:uid});
          await record.save();
          return res.status(201).json({success: true,msg:'user registered successfully'}) 
     }
    }    
}


exports.userlogin=async(req,res)=>
{
    let uemail=req.body.uemail;
    let upassword=req.body.upassword;

    let data=await rec.findOne({uemail:uemail});
    if(!data)
    {
        return res.status(404).json({success: false,msg:'email not found'})
    }
        lpass=data.upassword;
        pass=await bct.compare(upassword,lpass); 
        if(pass)
            {
                let token=jwt.sign({token:data.uemail},"aabb",{
                    expiresIn:"1d"
                });
                res.cookie('emtoken', token);
                console.log("send token"+token);
                 return res.status(200).json({success: true,msg:'user login successfully',token})                            
            }
            else
            {
                return res.status(400).json({success: false,msg:'user login failed'})
            }

}




exports.userprofile=async(req,res)=>
{
const user = req.user;
return res.status(200).json({success: true,msg: "User profile fetched successfully",profile:
     {uname: user.uname,uemail: user.uemail,ucontact: user.ucontact,address: user.address,uid: user.uid,
      },
    });
}

exports.userlogout=async(req,res)=>
{
    const user = req.user;
    res.clearCookie('emtoken', "");
    return {success:true}
}