import fetch from 'dva/fetch';

const JSON_CONTENT_TYPE = 'application/json;charset=utf-8';

const header = {
  'x-requested-with': 'XMLHttpRequest',
  Accept: 'application/json',
  'Content-Type': JSON_CONTENT_TYPE,
};

function checkStatus(response) {
  return response.text();
}

function isJSONContentType(type) {
  return type === JSON_CONTENT_TYPE;
}

export default function request(url, options = {}) {
  const { method = 'GET', headers = {}, body, ...rest } = options;

  let newBody = body;
  const newHeader = Object.assign({}, header, headers);

  if (isJSONContentType(newHeader['Content-Type'])) {
    newBody = JSON.stringify(body);
  }

  const newOptions = {
    credentials: 'same-origin',
    method,
    headers: newHeader,
    ...rest,
  };

  if (newBody && method !== 'GET') newOptions.body = newBody;

  if(method === 'GET') {
    if(body) {
      const keys = Object.keys(body)
      if (keys.length) {
        url += '?'
        for(let i = 0; i < keys.length; i++) {
          url += `${keys[i]}=${body[keys[i]]}&`
        }
        url = url.slice(0, -1)
      }
    }
  }

  return fetch(url, newOptions).then(checkStatus).then(respose => JSON.parse(respose));
}
