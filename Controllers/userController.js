const jwt = require('jsonwebtoken')
const bcrypt= require('bcryptjs')
const asyncHandler= require('express-async-handler')
const User= require('../Models/user')
const mongoose=require('mongoose')

const registerUser= asyncHandler(async (req,res)=>{
    const {firstname,lastname,email,password,conformpassword} = req.body

    
        const userExists= await User.findOne({email})

    if(!firstname|| !lastname || !email || !password|| !conformpassword){
        res.json('Please add all fields')
    }
    else if(password!=conformpassword)
    {
        res.json('Make sure password and conform password are same')
    }

    else if( userExists)
    {
        res.json('User already exists')
    }
    else{
        const user = new User({
            firstname,
            lastname,
            email,
            password
        })
        user.save()
        if (user)
        {
            res.json("user register"); 
        }
        else{
            res.status(400)
            throw new Error('Invalid user details')
        }
    }
        
})

const loginUser= asyncHandler(async (req,res)=>{

    const {email,password}=req.body
    const exists= await User.findOne({email})

    if(!exists){
        res.json('Email not found')
    }
    else if(exists.password!=password){
        res.json('Invalid Creadentials')
    }

    const secreatekey="EternalRobotics"
    const payload={
        user:{
            id: exists.id
        }
    }

    jwt.sign(payload,'EternalRobotics',{expiresIn:3600000},
        (err,token)=>{
            if(err) throw err;
            return res.json(token);
        }
    )
})

const myprofile= asyncHandler(async(req,res)=>{
    try{
        const id=req.user.id
        // console.log(id)
        let userexist=await User.findById(id)
        if(!userexist){
            res.json('user loged out')
        }
        res.json(userexist)
    }
    catch(err){
        console.log(err)
        res.json('Server Error')
    }
})

module.exports = {
    registerUser,
    loginUser,
    myprofile
  }