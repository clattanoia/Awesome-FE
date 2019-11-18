export const invalidError = new Error("Invalid ajax http client. `axios/fetch/request` supported");

export default class IHttp {
  constructor(client) {
    this.client = client;
  }

  request() {
    throw invalidError;
  }
}
