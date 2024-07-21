import { Router } from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import protectRoutes from "../middlewares/auth.middleware.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", protectRoutes, logout);
export default router;
