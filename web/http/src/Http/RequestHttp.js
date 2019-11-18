import IHttp from './IHttp'

export default class RequestHttp extends IHttp{
  constructor(client) {
    super(client);
  }

  request({url, baseURL, method, headers, data, ...rest}) {
    return new Promise((resolve, reject) => {
      this.client({
        url,
        method,
        baseUrl: baseURL,
        body: data && JSON.stringify(data),
        headers,
        ...rest
      }, function(error, response, body) {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }
}
