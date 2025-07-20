import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  ResponseType,
  GenericAbortSignal,
} from 'axios';

export class ApiBaseClient {
  constructor(protected instance: AxiosInstance) {}

  public request = async <ResponseData = unknown>(
    fullRequestParams: FullRequestParams
  ): Promise<AxiosResponse<ResponseData>> => {
    const { type, query, data, signal, ...requestParams } = fullRequestParams;

    let preparedData = data;

    if (
      type === ContentType.FormData &&
      preparedData &&
      typeof preparedData === 'object'
    ) {
      preparedData = this.createFormData(
        preparedData as Record<string, unknown>
      );
    }

    if (
      type === ContentType.Text &&
      preparedData &&
      typeof preparedData !== 'string'
    ) {
      preparedData = JSON.stringify(preparedData);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData
          ? { 'Content-Type': type }
          : {}),
      },
      params: query,
      data: preparedData,
      signal,
      paramsSerializer: {
        indexes: null,
      },
    });
  };

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: unknown[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem)
        );
      }

      return formData;
    }, new FormData());
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }
}

interface FullRequestParams extends Omit<AxiosRequestConfig, 'params'> {
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: object;
  /** abort signal */
  signal?: GenericAbortSignal;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}
