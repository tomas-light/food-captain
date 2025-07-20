export interface ApiMiddleware<TApi extends object = object> {
  <MethodName extends string & keyof TApi>(
    options: ApiMiddlewareOptions<TApi, MethodName>
  ):
    | ApiMiddlewareOptions<TApi, MethodName>
    | Promise<ApiMiddlewareOptions<TApi, MethodName>>;
}

export interface ApiMiddlewareOptions<
  TApi extends object,
  MethodName extends string & keyof TApi,
> {
  methodName: MethodName;
  method: TApi[MethodName] & ((...args: unknown[]) => Promise<unknown>);
  extra: ExtendedPluginOptions;
}

// place to extends data passed between plugins
interface ExtendedPluginOptions {
  methodWasMocked?: boolean;
}
