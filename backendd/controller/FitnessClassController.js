const express=require('express')
const User=require('../model/Loginmodel')

exports.LoginForm=async(req,res)=>{
    try{
    const{username,password}=req.body
    const user=await User.findOne({username,password})
    if(!user){
        return res.status(401).json({message:'invalid user'})

    }
    return res.status(200).json({
        username:user.username,
        usertype:user.usertype
    })
}
catch(error){
        console.error(error)
        return res.status(500).json("server error")
    }
}
    