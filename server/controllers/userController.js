import mongoose from "mongoose";
import User from "../models/User.js";
import { generateToken } from "../lib/utils.js";
import cloudinary from "../lib/cloudinary.js";
import bcrypt from "bcryptjs";

//signup a new user
export const signup = async (req, res)=>{
    const {fullName, email, password, bio} = req.body;
    try{
        if(!fullName || !email || !password || !bio){
            return res.json({success: false, message: "Missing details"})
        }
        const user = await User.findOne({email});

        if(user){
            return res.json({success: false, message: "Account already exist"})
        }

        const salt = await bcrypt.genSalt(10); //salt is random string added to the password before hashing to make it more secure
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({fullName, email, password: hashedPassword, bio});

        //token
        const token = generateToken(newUser._id)
        res.json({success: true, userData: newUser, token, message: "Account created successfully!"})
    }
    catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//controller for login
export const login = async (req, res)=>{
    try{
        const {email, password} = req.body;
        
        if(!email || !password){
            return res.json({success: false, message: "Email and password are required"})
        }

        const userData = await User.findOne({email})

        if(!userData){
            return res.json({success: false, message: "User not found"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, userData.password);

        if(!isPasswordCorrect){
            return res.json({success: false, message: "enter correct password"});
        }
        const token = generateToken(userData._id)
        res.json({success: true, userData, token, message: "Login successful"})
    }
    catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
}

//controller to confirm if user is authenticated
export const checkAuth = (req, res)=>{
    res.json({success: true, user: req.user});
}

//controller to update user file details
export const updateProfile = async(req, res)=>{
    try{
        const {profilePic, bio, fullName} = req.body;

        const userId = req.user._id;
        let updatedUser;

        if(!profilePic){
            updatedUser = await User.findByIdAndUpdate(userId, {bio, fullName}, {new: true}) //when we do new: true the returned value is updated value otherwise it would update but return the old value
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);

            updatedUser = await User.findByIdAndUpdate(userId, {profilePic: upload.secure_url, bio, fullName}, {new: true})
        }
        res.json({success: true, user: updatedUser})
    }
    catch(error){
        console.log(error.message);
        res.json({success: false, message: error.message})
    }
}