import { User } from "@/domain/model/user";
import { CreateUserExecutor } from "@/usecases/interfaces/repository/user";

type CreateUser = Omit<User, "id">;

export type CreateUserUseCase = (
  user: CreateUser,
  executor: CreateUserExecutor
) => Promise<void>;

export const createUserUseCase: CreateUserUseCase = async (
  user: CreateUser,
  executor: CreateUserExecutor
) => {
  await executor(user);
};
