const bcrypt = require('bcrypt')
const config = require('../config/db')
const jwtProvider = require("../config/jwtProvider")
const User = require("../models/user_model")
require('dotenv').config();


exports.signup = async(req,res)=>{
    try{
        const {username, email, password, role} = req.body;

        //all validations
        if(!username || !email || !password || !role){
            res.status(400).json({
                success: false,
                msg: "enter details carefully!!"
            })
        }

        const user = await User.findOne({username})
        if(user){
            res.status(400).json({
                success: false,
                msg: "user with this username already exists!!"
            })
        }

        //hashed the given password
        const hashedPassword = await bcrypt.hash(password,10)

        const newUser = await User.create({username, email, password: hashedPassword, role})

        res.status(200).json({
            success: true,
            message:"User registered successfully.",
            newUser
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message:"Error found",
            error
        })
    }
}

exports.login = async(req,res)=>{
    const {username,password} = req.body;
    // console.log(req.body)
    try{
        const user = await User.findOne({username})
        console.log('User:', user);
        if(!user){
            return res.status(404).send({message: 'user not found with this username.'})
        }
        if(password!=user.password) return res.status(401).send({message: 'Invalid Password...'})
        console.log(user.role)
        
        const jwtToken = jwtProvider.generateToken(user._id, user.role);
        console.log(user.role)
        return res.status(200).send({message:'User login successfully.',jwtToken})

    }catch(error){
        return res.status(500).send({error:error.message})

    }
}



