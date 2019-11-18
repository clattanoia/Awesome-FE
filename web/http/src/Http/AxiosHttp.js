import IHttp from './IHttp'

export default class AxiosHttp extends IHttp{
  constructor(client) {
    super(client);
  }

  request({url, baseURL, method, headers, data, credentials, ...rest}) {
    return this.client.request({
      url,
      method,
      data,
      headers,
      baseURL,
      withCredentials: !!credentials,
      ...rest
    });
  }
}
