import jwt from "jsonwebtoken";
import User from "../models/User.js";

//middleware to protect routes
export const protectRoute = async (req, res, next)=>{
    try{
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
        return res.json({ success: false, message: "No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId).select("-password") //everything EXCEPT password

        if(!user) return res.json({success: false, message: "user not found"});

        req.user = user; //injecting user data into the request
        next(); //move to next step
    }
    catch(error){
        console.log(error.message);
        res.json({ success: false, message: "Not authorized, token failed" });
    }
}