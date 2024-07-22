import { Router } from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import protectRoutes from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.post("/logout", protectRoutes, logout);
export default router;
