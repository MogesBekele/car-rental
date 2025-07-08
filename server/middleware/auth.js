// middleware/verifyToken.js
import jwt from "jsonwebtoken";

export const protect = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
  try {
    const userId = jwt.decode(token, process.env.JWT_SECRET);
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });
    }
    req.user = await userModel.findById(userId).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "Not authorized" });
  }
};
