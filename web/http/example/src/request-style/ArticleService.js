import HttpClient, { Path, POST, GET, Query, Body, Controller } from 'http-clienti';

@Controller('/articles')
export default class ArticleService extends HttpClient {

  @GET('/:category')
  fetchArticles(@Path('category') category, @Query('status') status) {
  }

  @POST()
  createArticle(@Body body) {
  }
}
