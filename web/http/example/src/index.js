// import ArticleService from './axios-style'
// import ArticleService from './fetch-style'
import ArticleService from './request-style'

const articleService = new ArticleService();
articleService.fetchArticles('financial', false);
articleService.createArticle({
  title: 'article title',
  author: 'Warner'
});
