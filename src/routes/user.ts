import { Router } from "express";
import { signIn, newUser } from "../controllers/user.controller";

const router = Router();

router.post("/login", signIn);
router.post("/signIn", newUser);

export { router };
