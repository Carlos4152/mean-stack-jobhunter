import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const payload = jwt.sign({ userID: user._id, userEmail: user.email}, process.env.JWT_SECRET)
  return payload;
}

const handleServerError = (res, error) => {
  console.log(error);
  res.status(500).json({ message: "Interval Server Error" });
};

export { generateToken, handleServerError };



