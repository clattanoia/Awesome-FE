import queryString from 'query-string';
import HttpFactory from './Http/HttpFactory'

export default class HttpClient {
  static defaults = {
    baseURL: null,
    engine: null
  };

  constructor(engine = HttpClient.defaults.engine) {
    this.http = HttpFactory.resolve(engine);
  }

  getBaseURL() {
    return HttpClient.defaults.baseURL;
  }
}

function isNullOrUndefined(value) {
  return value == undefined;
}

function isObject(value) {
  return !isNullOrUndefined(value) && typeof value === 'object';
}

function brewByPath(target, methodName, url, args) {
  const pathMetadata = target[`${methodName}_Path_parameters`] || [];
  for (const param of pathMetadata) {
    url = url.replace(`:${param.key}`, args[param.paramIndex]);
  }
  return url;
}


function brewByQuery(target, methodName, url, args) {
  const queryMetadata = target[`${methodName}_Query_parameters`] || [];
  const URI = queryString.parseUrl(url);
  const urlQuery = URI.query;

  for (const param of queryMetadata) {
    const key = param.key;
    const value = args[param.paramIndex];

    if (value instanceof Date) {
      urlQuery[key] = value.getTime().toString();
    } else if (Array.isArray(value)) {
      urlQuery[key] = value.map((item) => item).join(',');
    } else if (isObject(value)) {
      Object.keys(value)
        .filter(k => value[k] !== undefined)
        .forEach(k => {
          urlQuery[k] = value[k];
        });
    } else if (!isNullOrUndefined(value)) {
      urlQuery[key] = value.toString();
    } else {
      urlQuery[key] = '';
    }
  }

  const stringifiedQueries = queryString.stringify(urlQuery);

  return stringifiedQueries ? `${URI.url}?${stringifiedQueries}` : URI.url;
}

function brewByBody(target, methodName, args) {
  let body = null;
  const bodyMetadata = target[`${methodName}_Body_parameters`];
  if (bodyMetadata) {
    body = args[bodyMetadata[0].paramIndex];
  }
  return body;
}

function brewByHeader(target, methodName, args) {
  const headers = {};
  const headerMetadata = target[`${methodName}_Header_parameters`] || [];
  for (const param of headerMetadata) {
    const key = param.key;
    const value = args[param.paramIndex];
    headers[key] = value;
  }
  return headers;
}

function brewByOptions(url, options) {
  const URI = queryString.parseUrl(url);
  const urlQuery = URI.query;

  const params = options ? options.params || {} : {};

  Object.keys(params).forEach(key => {
    urlQuery[key] = params[key].toString();
  });

  const stringifiedQueries = queryString.stringify(urlQuery);

  return stringifiedQueries ? `${URI.url}?${stringifiedQueries}` : URI.url;
}

function methodBuilder(method) {
  return function (url = '') {
    return function (target, methodName, descriptor) {
      descriptor.value = function (...args) {
        const pathPrefix = target['path_prefix'] || '';

        let realURL = `${pathPrefix}${url}`;

        // RequestOptions
        const options = descriptor.requestOptions;

        // Path
        realURL = brewByPath(target, methodName, realURL, args);

        // Query
        realURL = brewByQuery(target, methodName, realURL, args);

        // Options
        realURL = brewByOptions(realURL, options);

        // Body
        const body = brewByBody(target, methodName, args);

        // Header
        const headers = brewByHeader(target, methodName, args);

        const { headers: headersOption = {}, credentials, withCredentials, ...otherOptions } = options || {};
        const baseURL = this.getBaseURL() || (this.http.client.defaults && this.http.client.defaults.baseURL);

        return this.http.request({
          method,
          url: realURL,
          data: body,
          headers: {
            ...headers,
            ...headersOption,
          },
          ...otherOptions,
          baseURL,
          credentials: credentials || withCredentials
        })
      };

      return descriptor;
    };
  };
}

function paramBuilder(type, optional = false) {
  return function (key) {
    if (!optional && !key) {
      throw new Error('Param key required!');
    }
    return function (target, methodName, paramIndex) {
      const metadataKey = `${methodName}_${type}_parameters`;
      target[metadataKey] = [
        ...target[metadataKey] || [],
        {
          key,
          paramIndex,
        },
      ];
    };
  };
}

export function RequestOptions(options) {
  return function (target, propertyKey, descriptor) {
    const defaultOptions = {
      responseType: 'json',
    };

    descriptor.requestOptions = {
      ...defaultOptions,
      ...descriptor.requestOptions,
      ...options
    };

    return descriptor;
  };
}

export const Headers = function (headers) {
  return RequestOptions({ headers });
};

export const Path = paramBuilder('Path');
export const Query = paramBuilder('Query');
export const Header = paramBuilder('Header');
export const Body = paramBuilder('Body', true)();

export const GET = methodBuilder('GET');
export const POST = methodBuilder('POST');
export const PUT = methodBuilder('PUT');
export const DELETE = methodBuilder('DELETE');
export const PATCH = methodBuilder('PATCH');
export const OPTIONS = methodBuilder('OPTIONS');

export const Controller = (prefix = '') => (target) => {
  target.prototype['path_prefix'] = prefix;
};
