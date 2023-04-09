import { ApiResponseStatus } from './ApiResponseStatus';

type Entry<T extends object> = [keyof T, T[keyof T]];

export class ApiResponse<Data = unknown> {
  data: Data | null;
  status: ApiResponseStatus;
  error: unknown;

  constructor(response?: Partial<ApiResponse<Data>>) {
    this.status = ApiResponseStatus.Unknown;
    this.data = null;

    if (response) {
      (Object.entries(response) as Entry<ApiResponse<Data>>[]).forEach(
        ([propertyName, value]) => {
          type Value = ApiResponse<Data>[typeof propertyName];
          (this[propertyName] as Value) = value as Value;
        }
      );
    }
  }

  isOk(): boolean {
    return !this.isFailed();
  }

  isFailed(): boolean {
    return (
      this.status >= ApiResponseStatus.BadRequest ||
      this.status === ApiResponseStatus.Unknown
    );
  }

  isServerError() {
    return this.status >= ApiResponseStatus.InternalServerError;
  }

  isClientError() {
    return (
      !this.isTimeoutError() &&
      this.status >= ApiResponseStatus.BadRequest &&
      this.status < ApiResponseStatus.InternalServerError
    );
  }

  isTimeoutError() {
    return this.status === ApiResponseStatus.RequestTimeout;
  }
}
