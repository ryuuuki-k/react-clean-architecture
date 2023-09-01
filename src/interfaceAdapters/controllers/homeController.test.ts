import {
  renderHook,
  act,
  // RenderResult
} from "@testing-library/react-hooks";
import { useHomeController } from "./homeController";
import { createUserUseCase } from "@/usecases/user/create";
import { getUsersUseCase } from "@/usecases/user/list";
import {
  GetUsersExecutor,
  CreateUserExecutor,
} from "@/usecases/interfaces/repository/user";

const user = { id: "1", name: "name", email: "email" };
const getUsers: GetUsersExecutor = async () => [user];
const createUser: CreateUserExecutor = async () => {};

describe("useHomeController", () => {
  it("users", async () => {
    let { result, waitForNextUpdate } = renderHook(() =>
      useHomeController(
        { list: getUsersUseCase, create: createUserUseCase },
        { list: getUsers, create: createUser }
      )
    );
    await waitForNextUpdate();
    expect(result.current.users[0].id).toBe(user.id);
  });
  it("name", async () => {
    let { result, waitForNextUpdate } = renderHook(() =>
      useHomeController(
        { list: getUsersUseCase, create: createUserUseCase },
        { list: getUsers, create: createUser }
      )
    );
    expect(result.current.name).toBe(null);
    const name = "name";
    act(() => result.current.setName(name));
    await waitForNextUpdate();
    expect(result.current.name).toBe(name);
  });
  it("email", async () => {
    let { result, waitForNextUpdate } = renderHook(() =>
      useHomeController(
        { list: getUsersUseCase, create: createUserUseCase },
        { list: getUsers, create: createUser }
      )
    );
    expect(result.current.email).toBe(null);
    const email = "email";
    act(() => result.current.setEmail(email));
    await waitForNextUpdate();
    expect(result.current.email).toBe(email);
  });
});
