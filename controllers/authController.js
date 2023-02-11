const User=require('../models/userModel');
const catchAsync=require('../utils/catchAsync');
const jwt=require('jsonwebtoken');




const signToken=function(id){
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE_T
    })
}

const creatSendToken=function(statusCode,user,res,req){

    let token=signToken(user._id);
    user.password=undefined;
    user.passwordConfirm=undefined;

    res.status(statusCode).json({
                
        token,  
        status:'success',
        data:{
            user
        }
    })

    

}

exports.signUp=async function(req,res,next){

try{

    const newUser=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.confirm_password,
        age:'12,110'.replaceAll(",","")
        })
        
        

       creatSendToken(201,newUser,res,req)


}catch(err){
    
    console.log(err);
}



}