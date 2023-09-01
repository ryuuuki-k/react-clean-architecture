import { User } from "@/domain/model/user";
import {
  CreateUserExecutor,
  GetUserExecutor,
  GetUsersExecutor,
} from "@/usecases/interfaces/repository/user";

const UsersState: User[] = [
  { id: "1", name: "Test", email: "email@email.com" },
  { id: "2", name: "Test2", email: "email2@email.com" },
];

export const getUserExecutor: GetUserExecutor = async (request: string) => {
  const user = UsersState.find((i) => i.id === request);
  if (!user) throw new Error();
  return user;
};

export const getUsersExecutor: GetUsersExecutor = async (
  request: null | undefined
) => {
  return UsersState;
};

export const createUserExecutor: CreateUserExecutor = async (
  request: Omit<User, "id">
) => {
  UsersState.push({ id: `${UsersState.length + 1}`, ...request });
};
