import React from 'react';
import { Modal } from 'antd';
import fetch from 'dva/fetch';
import checkUserData from './checkUserData';

const JSON_CONTENT_TYPE = 'application/json;charset=utf-8';

const header = {
  'x-requested-with': 'XMLHttpRequest',
  Accept: 'application/json',
  'Content-Type': JSON_CONTENT_TYPE,
};

const throwError = (status, message) => {
  throw {
    status,
    message,
  };
};

function checkStatus(response) {
  return response.text().then((data) => {
    let dataJson = data;

    try {
      dataJson = JSON.parse(data);
      if (dataJson.success === false || response.status >= 400) {
        if (response.status === 403) {
          // checkUserData();
          // Modal.confirm({
          //   title: 'Design用户授权申请',
          //   content: (
          //     <div>
          //       <span>用户账号: </span>
          //       <span>
          //         {
          //           JSON.parse(window.localStorage.getItem('currentUser'))
          //             .userName
          //         }
          //       </span>
          //     </div>
          //   ),
          //   okText: '发起申请',
          //   cancelText: '取消',
          //   onOk() {
          //     fetch('/api/flow/userInfos/auth').then(checkStatus);
          //   },
          // });
          window.location.href = '/403';
        } else if (response.status === 401) {
          window.location.href = `${
            process.env.LOGIN_URL
          }?target=${encodeURIComponent(window.location.href)}`;
        }
        // return throwError(response.status, dataJson.message || dataJson);
      }
      return dataJson;
    } catch (e) {
      if (response.status >= 200 && response.status < 400) {
        return data;
      } else if (response.status >= 500) {
        Modal.error({ title: '接口错误', content: e.message });
      }

      // return throwError(response.status, dataJson.message || dataJson);
    }
  });
}

function isJSONContentType(type) {
  return type === JSON_CONTENT_TYPE;
}


/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
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

  if (newBody) newOptions.body = newBody;

  return fetch(url, newOptions).then(checkStatus);
}
