import { metadata } from '@food-captain/client-utils';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { API_BASE_URL } from './base/API_BASE_URL';
import { ApiResponse } from './base/ApiResponse';
import { ApiResponseStatus } from './base/ApiResponseStatus';
import { findErrorMessage } from './utils/findErrorMessage';
import { hasServerReturnedErrorPage } from './utils/hasServerReturnedErrorPage';
import { isAxiosError } from './utils/isAxiosError';

const SOMETHING_WRONG_MESSAGE = 'Something went wrong.';

export type LoggedApiRequest = AxiosRequestConfig;
export type LoggedApiResponse = AxiosResponse;
export type LoggedApiError =
  | AxiosError
  | {
      message: string;
      statusCode: number;
      error: any;
    };

@metadata
export class ApiInterceptor {
  static singleton: ApiInterceptor;
  public authorizationToken?: string;

  constructor(
    private readonly logApiRequest: (request: LoggedApiRequest) => void,
    private readonly logApiResponse: (response: LoggedApiResponse) => void,
    private readonly logError: (error: LoggedApiError) => void
  ) {
    if (ApiInterceptor.singleton) {
      return ApiInterceptor.singleton;
    }
    ApiInterceptor.singleton = this;

    const config: AxiosRequestConfig = {
      baseURL: API_BASE_URL,
      headers: {},
    };
    this.axios = axios.create(config);

    this.axios.interceptors.request.use(
      this.requestFulfilled,
      this.requestRejected
    );

    this.axios.interceptors.response.use(
      this.responseFulfilled,
      this.responseRejected
    );
  }

  // falsy ts error: TS2564: Property 'axios' has no initializer and is not definitely assigned in the constructor.
  // because of it is a singleton, the property will be settled anyway
  axios: AxiosInstance = null as any;

  private requestFulfilled = <Config extends AxiosRequestConfig>(
    config: Config
  ): Config => {
    if (!config.headers) {
      config.headers = {};
    }

    if (this.authorizationToken) {
      config.headers['Authorization'] = this.authorizationToken;
    }

    this.logApiRequest(config);

    return config;
  };

  private requestRejected = (error: AxiosError): Promise<AxiosError> => {
    this.logError(error);
    const response = new ApiResponse({
      error,
    });

    if (error.response) {
      response.status = error.response.status;
      response.data = error.response.data;
    }

    return Promise.reject(response);
  };

  private responseFulfilled = <Response extends AxiosResponse>(
    axiosResponse: Response
  ): Response => {
    this.logApiResponse(axiosResponse);
    return new ApiResponse({
      status: axiosResponse.status,
      data: axiosResponse.data,
    }) as unknown as Response;
  };

  private responseRejected = <ResponseData = unknown, ConfigData = any>(
    error: AxiosError<ResponseData, ConfigData> | Error
  ): ApiResponse<ResponseData> | Error => {
    const errorMessage = findErrorMessage(error);
    if (!isAxiosError(error)) {
      this.logError({
        message: errorMessage,
        statusCode: ApiResponseStatus.Unknown,
        error,
      });

      return new ApiResponse({
        error: errorMessage,
        status: ApiResponseStatus.Unknown,
      });
    }

    const axiosError = error as AxiosError<ResponseData, ConfigData>;

    // unknown error
    if (!axiosError.response) {
      return new ApiResponse({
        error: errorMessage ?? axiosError.code,
        status: ApiResponseStatus.Unknown,
      });
    }

    if (hasServerReturnedErrorPage(error)) {
      this.logError({
        message: SOMETHING_WRONG_MESSAGE,
        statusCode: ApiResponseStatus.InternalServerError,
        error,
      });
    } else {
      this.logError({
        message: errorMessage ?? SOMETHING_WRONG_MESSAGE,
        statusCode: axiosError.response.status,
        error,
      });
    }

    return new ApiResponse({
      status: axiosError.response.status,
      data: axiosError.response.data,
      error: errorMessage ?? SOMETHING_WRONG_MESSAGE,
    });
  };
}
