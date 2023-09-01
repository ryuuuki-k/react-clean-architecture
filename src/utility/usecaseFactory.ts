import { CreateUserUseCase } from "@/usecases/user/create";
import { GetUserUseCase } from "@/usecases/user/get";
import { GetUsersUseCase } from "@/usecases/user/list";
import { useCallback, useState } from "react";

type FactoryArg = {
  getUserUseCase: GetUserUseCase;
  getUsersUseCase: GetUsersUseCase;
  createUserUseCase: CreateUserUseCase;
};

export class UseCaseFactory<T> {
  constructor(arg: T) {
    Object.assign(this, arg);
  }

  public static create<T>(arg: T): T {
    const instance = new UseCaseFactory(arg);
    return instance as T;
  }
}

export const useUseCaseFactory = () => {
  const [state, setState] = useState("");

  const getUser: GetUserUseCase = useCallback(
    async (id, executor) => {
      console.log("state :>>", state);
      return await executor(id);
    },
    [state]
  );

  const getUsers: GetUsersUseCase = useCallback(
    async (executor) => {
      console.log("state :>>", state);
      return await executor();
    },
    [state]
  );

  const createUser: CreateUserUseCase = useCallback(
    async (user, executor) => {
      console.log("state :>>", state);
      return await executor(user);
    },
    [state]
  );

  const useCaseFactory = UseCaseFactory.create<FactoryArg>({
    getUsersUseCase: getUsers,
    getUserUseCase: getUser,
    createUserUseCase: createUser,
  });

  return useCaseFactory;
};
