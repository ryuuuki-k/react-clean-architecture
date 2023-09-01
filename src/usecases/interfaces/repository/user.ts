import { User } from "@/domain/model/user";
import { Executor } from "@/usecases/interfaces/executor";

export type GetUserExecutor = Executor<string, User>;
export type GetUsersExecutor = Executor<null | undefined, User[]>;
export type CreateUserExecutor = Executor<Omit<User, "id">, void>;

export type UserUseCases = {
  getUser: GetUserExecutor;
  getUsers: GetUsersExecutor;
  createUser: CreateUserExecutor;
};
