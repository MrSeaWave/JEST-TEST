// __mocks__/request.js
// 在需要mock的模块目录临近建立目录mocks
const users = {
  4: {name: 'Mark'},
  5: {name: 'Paul'},
};

export default function request(url) {
  return new Promise((resolve, reject) => {
    console.log('调用mock request数据')
    const userID = parseInt(url.substr('/users/'.length), 10);
    process.nextTick(
      () =>
        users[userID]
          ? resolve(users[userID])
          : reject({
            error: 'User with ' + userID + ' not found.',
          }),
    );
  });
}