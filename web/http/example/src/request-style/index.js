import request from 'request';
import HttpClient from 'http-clienti';
import ArticleService from './ArticleService'

// globally setting
HttpClient.defaults = {
  engine: request,
  baseURL: 'http://www.request-http-client.com/'
};

export default ArticleService
