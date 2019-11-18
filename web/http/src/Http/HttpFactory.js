import FetchHttp from "./FetchHttp";
import AxiosHttp from "./AxiosHttp";
import RequestHttp from "./RequestHttp";
import IHttp, { invalidError } from "./IHttp";

let instance = null;

export default class HttpFactory {

  static resolve(http) {
    if (!instance) {
      if (typeof http !== 'function') {
        throw invalidError;
      }

      const name = http.name;
      switch (name) {
        case 'fetch':
          instance = new FetchHttp(http);
          break;
        case 'wrap':
          instance = new AxiosHttp(http);
          break;
        case 'request':
          instance = new RequestHttp(http);
          break;
        default:
          instance = new IHttp(http);
      }
    }

    return instance;
  }
}
