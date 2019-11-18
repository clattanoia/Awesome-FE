import HttpClient from "../../../lib/HttpClient";

// The base custom HttpClient to set requests are via 'fetch' with given baseURL
export default class FetchHttpClient extends HttpClient {
  constructor() {
    super(fetch);
  }

  getBaseURL() {
    return 'http://www.fetch-http-client.com/'
  }
}
