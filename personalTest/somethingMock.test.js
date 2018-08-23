// __tests__/user-test.js
import * as user from '../src/services/apiList';
// const te=require('../src/services/request.js')
jest.mock('../src/services/request');


//断言必须返回一个primose
it('works with promises', () => {
  expect.assertions(1);
  return user.getUserName(4).then(data => expect(data).toEqual('Mark'));
});