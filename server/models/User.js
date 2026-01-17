import mongoose from "mongoose";

//Model basically means defining what database would look like, how we want it to be
const userSchema = new mongoose.Schema({
    email: {type:String, required: true, unique:true},
    fullName: {type:String, required: true},
    password: {type:String, required: true, minLength:6},
    profilePic: {type:String, default: ""},
    bio: {type:String}
}, {timestamps: true}); //this line will add timeline to the database as well

const User = mongoose.model("User", userSchema);

export default User;