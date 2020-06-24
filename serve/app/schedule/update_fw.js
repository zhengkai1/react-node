const Subscription = require('egg').Subscription;

const accounts = ['00022877', 'N0033585', 'N0057128', 'N0031511']

module.exports = {
  schedule: {
    interval: '10s',
    type: 'all', // 指定所有的 worker 都需要执行
  },
  async task(ctx) {
    for (var m = 0; m < accounts.length; m ++) {
      console.log('正在执行：' + accounts[m]);
      const res_wd = await ctx.curl('http://ecds.goldmantis.com:8901/ecdsRead/message/list', {
        method: 'GET',
        data: {
          pageIndex: 1,
          pageSize: 100,
          type: 1
        },
        headers: {
          'jobNumber': accounts[m],
          'Content-Type': 'application/json;charset=UTF-8'
        },
        dataType: 'json',
      });
      if (res_wd.data && res_wd.data.data && res_wd.data.data.list && res_wd.data.data.list.length > 0) {
        for (var i = 0; i < res_wd.data.data.list.length; i ++) {
          const res_detail = await ctx.curl('http://ecds.goldmantis.com:8901/ecdsRead/message/' + res_wd.data.data.list[i].messageId, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json;charset=UTF-8',
              'jobNumber': accounts[m],
            },
            dataType: 'json',
          });
        }
      }
    }
  },
};