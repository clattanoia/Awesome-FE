import IHttp from './IHttp'

export default class FetchHttp extends IHttp {
  constructor(client) {
    super(client);
  }

  request({ url, baseURL, method, headers, data, ...rest }) {
    const realURL = `${baseURL || ''}${url}`.replace(/\/\//g, '/');

    return this.client.bind(window)(realURL, {
      method,
      body: data && JSON.stringify(data),
      headers,
      ...rest
    });
  }
}
