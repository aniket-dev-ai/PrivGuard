import jwt from "jsonwebtoken";
import User from "../Model/UserModel.js";

export const protect = async (req, res, next) => {
 
    
  let token =
    req.cookies.token ||
    req.query.token || 
    req.headers["x-auth-token"] ||
    req.headers["authorization"];
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log("Token:", token);
  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }

  try {
    console.log("Verifying token...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded:", decoded);
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
        console.log("User not found");
      return res.status(401).json({ msg: "Not authorized, no user" });
    }
    console.log("User:", req.user.FirstName);
    next();
  } catch (err) {
    res.status(401).json({ msg: "Not authorized" });
  }
};
