import { CreateUserExecutor } from "@/usecases/interfaces/repository/user";
import { createUserUseCase } from "./create";

describe("createUser", () => {
  const createUser: CreateUserExecutor = async () => {};
  it("execute", async () => {
    createUserUseCase({ name: "name", email: "email" }, createUser);
  });
});
