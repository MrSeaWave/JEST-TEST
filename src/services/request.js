// request.js
const http = require('http');

export default function request(url) {
  console.log('哪一个')
  return new Promise(resolve => {
    // 这是一个HTTP请求的例子, 用来从API获取用户信息
    // This module is being mocked in __mocks__/request.js
    http.get({path: url}, response => {
      let data = '';
      response.on('data', _data => (data += _data));
      response.on('end', () => resolve(data));
    });
  });
}