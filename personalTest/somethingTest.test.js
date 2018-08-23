function sum(a, b) {
  return a + b;
}
function fetchData(cb) {
  cb('peanut butter');
}

test('adds 1 + 2 to equal 3', () => {
  console.log('????');
  expect(sum(1, 2)).toBe(3);
});

// Don't do this!
// 默认情况下，一旦到达运行上下文底部，jest测试立即结束。这样意味着这个测试将不能按预期工作。
// test('the data is peanut butter', () => {
//   function callback(data) {
//     expect(data).toBe('peanut butter');
//   }
//
//   fetchData(callback);
// });
// 问题在于一旦fetchData执行结束，此测试就在没有调用回调函数前结束。
//
// 还有另一种形式的 test，解决此问题。 使用单个参数调用 done，而不是将测试放在一个空参数的函数。 Jest会等done回调函数执行结束后，结束测试。
test('the data is peanut butter', done => {
  function callback(data) {
    expect(data).toBe('peanut butter');
    done();
  }

  fetchData(callback);
});

// 如果使用Promise，一定要加上return，测试返回一个 Promise, Jest 会等待这一 Promise 来解决。 如果承诺被拒绝，则测试将自动失败
// 一定要返回 Promise - 如果你省略 return 语句，您的测试将在 fetchDataPromise 完成之前完成
// 添加 expect.assertions 来验证一定数量的断言被调用
const fetchDataPromise = data =>
  new Promise((resolve, reject) => {
    const val = Math.random() * 3;
    console.log('valFetchDataPromise', val);
    if (data === 'peanut butter') {
      resolve('peanut butter');
    } else {
      console.log('扔出錯誤？')
      reject('peanut butter is error');
    }
  });
test('the returnPromiseData is peanut butter', () => {
  expect.assertions(1);
  return fetchDataPromise('peanut butter').then(data => {
    expect(data).toBe('peanut butter');
  });
});
test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchDataPromise().catch(e => {
    console.log('運行到catch')
    expect(e).toMatch('error')
  });
});
