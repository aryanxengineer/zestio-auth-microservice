import { UserRepository } from "@domain/repositories/user.repository";
import { ApiError } from "@shared/errors/api.error";

export class GetUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(id: string) {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new ApiError("User not found", 404);
    }

    return {
      id: user.id,
      email: user.email,
    };
  }
}