import axios from 'axios';
import HttpClient, { Path, Query, Body, DELETE, POST, PATCH, GET, Headers, RequestOptions, Controller } from "../../lib/HttpClient";

@Controller('/articles')
export default class ArticleService extends HttpClient {
  constructor() {
    super(axios);
  }

  @POST()
  @RequestOptions({
    withCredentials: true
  })
  createArticle(@Body body) {
  }

  @DELETE('/:id')
  @Headers({
    'X-TOKEN': 'x-token'
  })
  deleteArticle(@Path('id') id) {
  }

  @PATCH('/:id')
  updateArticle(@Path('id') id, @Body body) {
  }

  @GET()
  fetchArticles(@Query('author') author, @Query('since') since) {
  }

  @GET()
  searchArticles(@Query('label') label, @Query('pager') pager, @Query('active') active, @Query('optional') optional) {
  }

}
