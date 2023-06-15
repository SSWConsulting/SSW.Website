// custom.d.ts
declare global {
  interface NodeRequire {
    context: (
      directory: string,
      useSubdirectories?: boolean,
      regExp?: RegExp
    ) => __WebpackModuleApi.RequireContext;
  }
}

export {};
