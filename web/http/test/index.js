import test from 'ava';
import axios from 'axios';
import sinon from 'sinon';

import ArticleService from './lib/ArticleService';

test.before(t => {
  axios.defaults.baseURL = 'http://www.test.com/';
  sinon.spy(axios, 'request');
});

test('Should create an article with POST method and body.', t => {
  // given
  const articleService = new ArticleService();
  const data = {
    author: 'Warner',
    title: 'Http Client',
    content: 'A declarative http request lib.',
  };

  // when
  articleService.createArticle(data);

  // then
  const matcher = sinon.match({
    method: 'POST',
    url: '/articles',
    data: data,
    baseURL: 'http://www.test.com/',
    withCredentials: true
  });
  t.is(true, axios.request.calledWith(matcher));
});

test('Should delete an article with DELETE method.', t => {
  // given
  const articleService = new ArticleService();

  // when
  articleService.deleteArticle(1);

  // then
  const matcher = sinon.match({
    method: 'DELETE',
    url: '/articles/1',
    headers: {
      'X-TOKEN': 'x-token'
    },
    data: null,
    baseURL: 'http://www.test.com/',
    withCredentials: false
  });
  t.is(true, axios.request.calledWith(matcher));
});

test('Should modify an article with PATCH method.', t => {
  // given
  const articleService = new ArticleService();
  const data = {
    content: 'An awesome declarative http request lib.',
  };

  // when
  articleService.updateArticle(1, data);

  // then
  const matcher = sinon.match({
    method: 'PATCH',
    url: '/articles/1',
    data: data,
    baseURL: 'http://www.test.com/',
    withCredentials: false
  });
  t.is(true, axios.request.calledWith(matcher));
});


test('Should fetch articles with GET method.', t => {
  // given
  const articleService = new ArticleService();
  const timestamp = 1558228748487;
  const date = new Date(timestamp);

  // when
  articleService.fetchArticles('Warner', date);

  // then
  const matcher = sinon.match({
    method: 'GET',
    url: '/articles?author=Warner&since=1558228748487',
    data: null,
    baseURL: 'http://www.test.com/',
    withCredentials: false
  });
  t.is(true, axios.request.calledWith(matcher));
});

test('Should search articles with multiple filters.', t => {
  // given
  const articleService = new ArticleService();
  const label = ['JAVA', 'JS'];
  const pager = {
    pageIndex: 2,
    pageSize: 10,
  };

  // when
  articleService.searchArticles(label, pager, false);

  // then
  const matcher = sinon.match({
    method: 'GET',
    url: '/articles?active=false&label=JAVA%2CJS&optional=&pageIndex=2&pageSize=10',
    data: null,
    baseURL: 'http://www.test.com/',
    withCredentials: false
  });
  t.is(true, axios.request.calledWith(matcher));
});

