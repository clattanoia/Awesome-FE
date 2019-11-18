import axios from './axios';

import HttpClient, { Path, POST, GET, Query, Headers, Body, Controller } from 'http-clienti';

@Controller('/articles')
export default class ArticleService extends HttpClient {
  constructor() {
    super(axios);
  }

  @GET('/:category')
  @Headers({'X-TOKEN': 'SECURITY'})
  fetchArticles(@Path('category') category, @Query('status') status) {
  }

  @POST()
  createArticle(@Body body) {
  }
}
