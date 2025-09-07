import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Token not found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) return res.status(401).json({ message: "Token invalid" });

    const currentUser = await User.findById(decoded.id);
    if (!currentUser) return res.status(401).json({ message: "User not found" });

    req.user = currentUser; // نضيف المستخدم للـ req
    next(); // استمرار الوصول للراوت المحمي
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}