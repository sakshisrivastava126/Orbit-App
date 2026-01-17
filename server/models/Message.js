import mongoose from "mongoose";

//Model basically means defining what database would look like, how we want it to be
const messageSchema = new mongoose.Schema({
    senderId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    receiverId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    text: {type: String},
    image: {type: String},
    seen: {type: Boolean, default: false}
}, {timestamps: true}); //this line will add timeline to the database as well

const Message = mongoose.model("Message", messageSchema);

export default Message;