import { User } from "@/domain/model/user";
import { GetUserExecutor } from "@/usecases/interfaces/repository/user";

export type GetUserUseCase = (
  id: string,
  executor: GetUserExecutor
) => Promise<User>;

export const getUserUseCase: GetUserUseCase = async (
  id: string,
  executor: GetUserExecutor
) => {
  return await executor(id);
};
