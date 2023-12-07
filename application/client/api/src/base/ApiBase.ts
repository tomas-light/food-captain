import { AxiosRequestConfig } from 'axios';
import { ApiInterceptor } from '../ApiInterceptor';
import { API_BASE_URL } from './API_BASE_URL';
import { ApiResponse } from './ApiResponse';

type Url =
  | string
  | {
      url: string;
      searchParams: {
        [name: string]: string;
      };
    };

export abstract class ApiBase {
  constructor(private interceptor: ApiInterceptor) {
    if (!interceptor) {
      throw new Error("Can't instantiate Api. Have not enough arguments.");
    }
  }

  setAuthorizationTokenToApiInterceptor(authorizationToken: string) {
    if (this.interceptor) {
      this.interceptor.authorizationToken = authorizationToken;
    }
  }

  removeAuthorizationToken() {
    if (this.interceptor) {
      this.interceptor.authorizationToken = undefined;
    }
  }

  get axios() {
    return this.interceptor.axios;
  }

  protected get<Data = unknown>(
    url: Url,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<Data>> {
    let urlString: string;
    if (typeof url === 'object') {
      // we can't build url without mandatory part (https://my-site.com/)
      const _url = new URL(API_BASE_URL + url.url);

      Object.entries(url.searchParams).forEach(([name, value]) => {
        _url.searchParams.append(name, value.toString());
      });

      // remove extra part in url
      urlString = _url.toString().substring(API_BASE_URL.length);
    } else {
      urlString = url;
    }

    return this.axios.get<Data>(urlString, config) as unknown as Promise<
      ApiResponse<Data>
    >;
  }

  protected post<Data = unknown>(
    url: string,
    data?: any
  ): Promise<ApiResponse<Data>> {
    return this.axios.post<Data>(url, data) as unknown as Promise<
      ApiResponse<Data>
    >;
  }

  protected put<Data = unknown>(
    url: string,
    data?: any
  ): Promise<ApiResponse<Data>> {
    return this.axios.put<Data>(url, data) as unknown as Promise<
      ApiResponse<Data>
    >;
  }

  protected patch<Data = unknown>(
    url: string,
    data?: any
  ): Promise<ApiResponse<Data>> {
    return this.axios.patch<Data>(url, data) as unknown as Promise<
      ApiResponse<Data>
    >;
  }

  protected delete<Data = unknown>(url: string): Promise<ApiResponse<Data>> {
    return this.axios.delete<Data>(url) as unknown as Promise<
      ApiResponse<Data>
    >;
  }
}

export type { Url };
