import { getUserUseCase } from "./get";
import { GetUserExecutor } from "@/usecases/interfaces/repository/user";
import { User } from "@/domain/model/user";

describe("getUser", () => {
  const user: User = { id: "id", name: "name", email: "email" };
  const getUser: GetUserExecutor = async () => user;
  it("execute", async () => {
    const user = await getUserUseCase("id", getUser);
    expect(user).toBe(user);
  });
});
