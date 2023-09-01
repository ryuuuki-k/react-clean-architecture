import { User } from "@/domain/model/user";
import { GetUsersExecutor } from "@/usecases/interfaces/repository/user";

export type GetUsersUseCase = (executor: GetUsersExecutor) => Promise<User[]>;

export const getUsersUseCase: GetUsersUseCase = async (
  executor: GetUsersExecutor
) => {
  return await executor(null);
};
