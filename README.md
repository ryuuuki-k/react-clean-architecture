# React Clean Architecture

React のプロジェクトを、クリーンアーキテクチャで実装した場合のサンプル  
![CleanArchitectureImage](image/CleanArchitecture.jpg)

# 構成

- domain
  - クリーンアーキテクチャの Entities の層だが、DDD の思想も取り入れ domain としている
    - model
      - DDD のドメインモデル。ビジネスロジックのモデルを定義する。Typescript なので、型がメインになる。
- infrastructure
  - クリーンアーキテクチャの Frameworks & Drivers の UI 以外。
- interfaceAdapters
  - クリーンアーキテクチャの InterfaceAdapters。
    - controllers
      - usecase を利用しつつ、presentation で利用する ViewModel を生成する。一時的なフラグなど UI で使うステートもここに保持する。
- presentation
  - クリーンアーキテクチャの Frameworks & Drivers の UI。コンポーネント群やページが入る。
- usecases
  - クリーンアーキテクチャの UseCases の層。ビジネスロジックにおけるユースケースを定義する。
    - interfaces
      - レポジトリなどのインターフェースを定義し、usecases はこのインターフェースに依存するように実装する。
- utility
  - 上記以外のユーティリティ系の処理を入れる

<pre>
.
└── src
    ├── domain
    │   └── model
    ├── infrastructure
    │   ├── graphql
    │   └── inMemory
    ├── interfaceAdapters
    │   └── controllers
    ├── presentation
    ├── usecases
    │   ├── interfaces
    │   │   └── repository
    │   └── user
    └── utility
        ├── repositoryFactory.ts
        └── usecaseFactory.ts
</pre>

# DI

usecases は外部からレポジトリなどを受け取るようにしておく。  
(例)

```
export type GetUserUseCase = (
  id: String,
  // レポジトリなどの関数
  executor: GetUserExecutor
) => Promise<User>;

export const getUserUseCase: GetUserUseCase = async (
  id: String,
  executor: GetUserExecutor
) => {
  return await executor(id);
};

```

controllers は usecases とレポジトリなどを受け取り、uecases に注入しつつ利用する。  
(例)

```

export const useHomeController = (
  // usecase群
  userUseCase: {
    create: CreateUserUseCase;
    list: GetUsersUseCase;
  },
  // レポジトリ群
  userRepository: {
    create: CreateUserExecutor;
    list: GetUsersExecutor;
  }
) => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const createUser = useCallback(async () => {
    if (!name || !email) return;
    // レポジトリを注入しながら利用する
    await userUseCase.create(name, email, userRepository.create);
    setName("");
    setEmail("");
  }, [name, email, setName, setEmail, userUseCase, userRepository]);

  useEffect(() => {
    // レポジトリを注入しながら利用する
    userUseCase.list(userRepository.list).then((res) => setUsers(res));
  }, []);

  return {
    users,
    name,
    setName,
    email,
    setEmail,
    createUser,
  };
};
```

presentation で controllers に usecase ととレポジトリなどを注入しつつ ViewModel を利用する。  
(例)

```
 const { users, name, setName, email, setEmail, createUser } =
    useHomeController(
      {
        create: useCaseFactory.createUserUseCase,
        list: useCaseFactory.getUsersUseCase,
      },
      {
        create: memoryRepositoryFactory.createUserExecutor,
        list: memoryRepositoryFactory.getUsersExecutor,
      }
    );
```
