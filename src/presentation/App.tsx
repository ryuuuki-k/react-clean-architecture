import { useHomeController } from "@/interfaceAdapters/controllers/homeController";
import { useRepositoryFactory } from "@/utility/repositoryFactory";
import { useUseCaseFactory } from "@/utility/usecaseFactory";

function App() {
  const { createUserUseCase, getUsersUseCase, getUserUseCase } =
    useUseCaseFactory();
  const { getUserExecutor, getUsersExecutor, createUserExecutor } =
    useRepositoryFactory();

  const { users, name, setName, email, setEmail, createUser } =
    useHomeController(
      { create: createUserUseCase, list: getUsersUseCase },
      { create: createUserExecutor, list: getUsersExecutor }
    );

  return (
    <div className="App">
      {users.map((user, index) => (
        <>
          <p>{user?.id}</p>
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </>
      ))}
      <input
        type="text"
        value={name ?? undefined}
        onChange={(e) => {
          setName(e.target.value ?? null);
        }}
      />
      <input
        type="text"
        value={email ?? undefined}
        onChange={(e) => {
          setEmail(e.target.value ?? null);
        }}
      />
      <button onClick={() => createUser()}>send</button>
    </div>
  );
}

export default App;
