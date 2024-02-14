import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: [true, "Email address already taken"] },
    password: { type: String, required: true }
},
{
    timestamps: true
});

const User = mongoose.model("users", userSchema);

export default User;