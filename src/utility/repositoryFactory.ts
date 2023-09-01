import { useUserRepository } from "@/infrastructure/api/repository/user";

export class RepositoryFactory<T> {
  constructor(arg: T) {
    Object.assign(this, arg);
  }
  public static create<T>(arg: T): T {
    const instance = new RepositoryFactory(arg);
    return instance as T;
  }
}

export const useRepositoryFactory = () => {
  const { getUser, getUsers, createUser } = useUserRepository();

  const useCaseFactory = RepositoryFactory.create({
    getUsersExecutor: getUsers,
    getUserExecutor: getUser,
    createUserExecutor: createUser,
  });

  return useCaseFactory;
};
