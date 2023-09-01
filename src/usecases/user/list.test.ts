import { getUsersUseCase } from "./list";
import { GetUsersExecutor } from "@/usecases/interfaces/repository/user";
import { User } from "@/domain/model/user";

describe("getUsers", () => {
  const user: User = { id: "id", name: "name", email: "email" };
  const getUsers: GetUsersExecutor = async () => [user];
  it("execute", async () => {
    const users = await getUsersUseCase(getUsers);
    expect(users[0]).toBe(user);
  });
});
