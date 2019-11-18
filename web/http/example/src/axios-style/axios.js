import axios from 'axios';

// axios instance style support
export default axios.create({
  baseURL: 'https://www.axios-http-client.com/',
  headers: {'X-Custom-Header': 'foobar'}
});
