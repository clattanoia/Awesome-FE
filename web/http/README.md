# axiosClient

## Usage
Declare your requests as a service, e.g *ArticleService.js*.

```javascript
import axios from 'axios';
import HttpClient, { Path, Query, Body, DELETE, POST, PATCH, GET, Headers, RequestOptions, Controller } from 'http-clienti';

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
  fetchArticles(@Query('author') author) {
  }

}

```

Then just call the methods, which will return the same result with the http you provided (axios here). e.g *index.js*.

```javascript
import ArticleService from './ArticleService'

const articleService = new ArticleService();
articleService.fetchArticles('Warner')
  .then(response => {
    console.log(response);
  });
```

This demonstrating a basic usage with HttpClient. Check out the `/example` for more details.

## Document

### Inject your request engine

Only axios / fetch / request are supported currently. We provided two approaches to inject your request engine.

1\. Inject with constructor.

```javascript
import axios from 'axios';
import HttpClient, { Controller } from 'http-clienti';

@Controller('/articles')
export default class ArticleService extends HttpClient {
  constructor() {
    // axios, fetch or request
    super(axios);
  }
  
  ...
}
```

2\. Inject with `defaults`.

```javascript
import request from 'request';
import HttpClient, { Controller } from 'http-clienti';

// This may be declared in some entry or main file.
HttpClient.defaults = {
  // axios, fetch or request
  engine: request,
};

// Then declare your services
@Controller('/articles')
export default class ArticleService extends HttpClient {
  /* This is no need any more
  constructor() {
    // axios, fetch or request
    super(axios);
  }
  */
  
  ...
}
```

### Declare the baseURL

1\. Overwrite the `getBaseURL` method. It's useful declaring a base class for baseURL along with engine injected.

*BaseHttpClient.js*
```javascript
import HttpClient from 'http-clienti';

export default class BaseHttpClient extends HttpClient {
  constructor() {
    super(fetch/axios/request);
  }

  getBaseURL() {
    return 'http://www.test.com/'
  }
}
```

*ArticleService.js*
```javascript
import { Body, GET, Path, POST, Query, Controller } from 'http-clienti';
import BaseHttpClient from './BaseHttpClient';

@Controller('/articles')
export default class ArticleService extends BaseHttpClient {

  @GET('/:category')
  fetchArticles(@Path('category') category, @Query('status') status) {
  }

  @POST()
  createArticle(@Body body) {
  }

}
```

2\. Inject with `defaults`, you may declare the engine at the mean time.

*main.js*
```javascript
import request from 'request';
import HttpClient from 'http-clienti';

HttpClient.defaults = {
  // axios, fetch or request
  engine: request,
  baseURL: 'http://www.test.com/'
};
```

*ArticleService.js*
```javascript
import HttpClient, { Body, GET, Path, POST, Query, Controller } from 'http-clienti';

@Controller('/articles')
export default class ArticleService extends HttpClient {
  constructor() {
    super(axios);
  }

  @GET('/:category')
  fetchArticles(@Path('category') category, @Query('status') status) {
  }

  @POST()
  createArticle(@Body body) {
  }
}
```

3\. Axios specifically, you can also define the baseURL in axios directly.

*localAxios.js*
```javascript
import axios from 'axios';

export default axios.create({
  baseURL: 'https://www.test.com/',
  // Other config
  headers: {'X-Custom-Header': 'foobar'}
});
```

```javascript
import axios from './localAxios'
import HttpClient, { Body, GET, Path, POST, Query, Controller } from 'http-clienti';

@Controller('/articles')
export default class ArticleService extends HttpClient {
  constructor() {
    super(axios);
  }

  @GET('/:category')
  fetchArticles(@Path('category') category, @Query('status') status) {
  }

  @POST()
  createArticle(@Body body) {
  }
}
```

## :)

Hope you enjoy this declarative request lib. Feel free to open an issue if you get any problem. I will keep my eyes on it.
