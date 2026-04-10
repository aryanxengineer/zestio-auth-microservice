import { Router } from "express";
import { getUser, setRole } from "@api/controllers/user.controller";
import { authMiddleware } from "@api/middlewares/auth.middleware";
import { validate } from "@api/middlewares/validate.middleware";
import { userRoleSchema } from "@application/dto/user-role.dto";

const router = Router();

router.use(authMiddleware);

router.get("/user-me", getUser);
router.patch("/role", validate(userRoleSchema), setRole);

export default router;
