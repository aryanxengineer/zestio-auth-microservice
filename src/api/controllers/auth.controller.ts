import type { Request, Response } from "express";

import { LoginDTO } from "@application/dto/login.dto.js";
import { RegisterDTO } from "@application/dto/register.dto.js";
import { ApiResponse } from "@shared/utils/apiResponse.js";
import { asyncHandler } from "@shared/utils/asyncHandler.js";
import { PasswordService } from "@application/services/password.service.js";
import { RegisterUserUseCase } from "@application/use-cases/register-user.usecase.js";
import { MongoUserRepository } from "@infrastructure/database/repositories/user.mongo.repository.js";
import { LoginUserUseCase } from "@application/use-cases/login-user.usecase.js";
import { TokenService } from "@application/services/token.service.js";
import { RefreshTokenUseCase } from "@application/use-cases/refresh-token.usecase";

const userRepo = new MongoUserRepository();
const tokenService = new TokenService();
const passwordService = new PasswordService();
const registerUserUseCase = new RegisterUserUseCase(
  userRepo,
  passwordService,
  tokenService,
);
const loginUserUseCase = new LoginUserUseCase(
  userRepo,
  passwordService,
  tokenService,
);
const refreshTokenUseCase = new RefreshTokenUseCase(tokenService);

export const register = asyncHandler(
  async (req: Request<RegisterDTO>, res: Response) => {
    const { name, email, password } = req.body;

    const result = await registerUserUseCase.execute(name, email, password);

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

    res.status(201).json(
      new ApiResponse(
        true,
        {
          id: result.id,
          email: result.email,
          role: result.role,
        },
        "User registered successfully",
      ),
    );
  },
);

export const login = asyncHandler(
  async (req: Request<LoginDTO>, res: Response) => {
    const { email, password } = req.body;

    const result = await loginUserUseCase.execute(email, password);

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
          id: result.id,
          email: result.email,
        },
        "User Login successfully",
      ),
    );
  },
);

export const refreshToken = asyncHandler(
  async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;

    const result = await refreshTokenUseCase.execute(refreshToken);

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
          id: result.id,
          email: result.email,
        },
        "Token refreshed successfully",
      ),
    );
  },
);
