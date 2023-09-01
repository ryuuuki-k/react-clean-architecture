export type Executor<Request, Result> = (
  ...request: Request[]
) => Promise<Result>;
