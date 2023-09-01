import { User } from "@/domain/model/user";
import { UserUseCases } from "@/usecases/interfaces/repository/user";
import { useCallback } from "react";
import { useAsyncFn } from "react-use";

export const useUserRepository = (): UserUseCases => {
  const [, getUser] = useAsyncFn(async (id: string): Promise<User> => {
    return {} as User;
  }, []);

  const getUsers = useCallback(async (): Promise<User[]> => {
    return [] as User[];
  }, []);

  const createUser = useCallback(async (user: Omit<User, "id">) => {}, []);

  return {
    getUser,
    getUsers,
    createUser,
  };
};
