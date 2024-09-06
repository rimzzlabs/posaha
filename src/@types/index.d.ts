declare global {
  type TPrettify<T> = {
    [K in keyof T]: T[K];
  } & {};

  type TApiErrorResponse = {
    errors: Array<string>;
    code: number;
    status: "error";
  };

  type TApiSuccessResponse<D> = {
    code: number;
    errors: Array<never>;
    status: "success";
    data: D;
  };

  type TApiResponse<D> = TPrettify<TApiSuccessResponse<D> | TApiErrorResponse>;
}

export {};
