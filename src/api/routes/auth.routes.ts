import { Router } from "express";
import {
  login,
  refreshToken,
  register,
} from "@api/controllers/auth.controller.js";
import { validate } from "@api/middlewares/validate.middleware.js";
import { RegisterSchema } from "@application/dto/register.dto.js";
import { LoginSchema } from "@application/dto/login.dto";

const router = Router();

router.get("/new-tokens", refreshToken);
router.post("/register", validate(RegisterSchema), register);
router.post("/login", validate(LoginSchema), login);

export default router;
