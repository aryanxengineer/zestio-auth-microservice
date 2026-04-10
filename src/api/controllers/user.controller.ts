import type { Request, Response } from "express";

import { asyncHandler } from "@shared/utils/asyncHandler.js";
import { MongoUserRepository } from "@infrastructure/database/repositories/user.mongo.repository.js";
import { GetUserUseCase } from "@application/use-cases/get-user.usecase.js";
import { SetUserRoleUseCase } from "@application/use-cases/set-user-role.usecase.js";
import { ApiResponse } from "@shared/utils/apiResponse.js";
import { AuthError } from "@shared/errors/auth.error.js";
import { UserRoleDTO } from "@application/dto/user-role.dto";
import { TokenService } from "@application/services/token.service.js";

const userRepo = new MongoUserRepository();
const tokenService = new TokenService();
const getUserUseCase = new GetUserUseCase(userRepo);
const setUserRoleUseCase = new SetUserRoleUseCase(userRepo, tokenService);

export const getUser = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user?.sub;

  if (!userId) {
    throw new AuthError();
  }

  const result = await getUserUseCase.execute(userId);

  res
    .status(200)
    .json(new ApiResponse(true, result, "User fetched successfully"));
});

export const setRole = asyncHandler(
  async (req: Request<UserRoleDTO>, res: Response) => {
    const { role } = req.body;
    const userId = req.user?.sub;

    if (!userId) {
      throw new AuthError();
    }

    const result = await setUserRoleUseCase.execute(userId, role);

    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json(
      new ApiResponse(
        true,
        {
          role: result.role,
        },
        "Role selected successfully",
      ),
    );
  },
);
