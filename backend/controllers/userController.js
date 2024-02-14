import User from "../models/userModel.js";
import bcrypt from "bcrypt"
import { generateToken, handleServerError } from "../Utils/function.js";


const registerController = async (req, res) => {

  try {
    const { firstname, lastname, email, password } = req.body

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "incomplete data" });
    }

    const userExists = await User.findOne({ email });

    if (userExists){
      return res.status(400).json({ message: "User already exists." });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword
    })

    res.status(201).json({
      _id: newUser._id,
      token: generateToken(newUser)
    })
  } catch (error) {
    handleServerError(res, error)
  }

}

const loginController = async (req, res) => {

  try {
    const { email, password } = req.body;

    if (!email || !password){
      return res.status(400).json({ message: "incomplete data." });
    }

    const user = await User.findOne({ email });
    
    if (!user){
      return res.status(401).json({ message: "This user does not exits" })
    }

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid email or password." })
      }
    }

    res.status(200).json({
      _id: user._id,
      name: `${user.firstname} ${user.lastname}`,
      email: user.email,
      token: generateToken(user),
      message: "login successfully"
    })

  } catch (error) {
    handleServerError(res, error)
  }
}


export { registerController, loginController }