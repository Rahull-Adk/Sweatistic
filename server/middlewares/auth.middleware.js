import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const protectRoutes = asyncHandler(async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      req.user = decodedToken;
      next();
    }
  } catch (error) {
    console.log(`Error in protect routes middleware: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default protectRoutes;
