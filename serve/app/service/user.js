'use strict'

const Service = require('egg').Service;

class UserService extends Service {
  async checkLogin (loginInfo) {
    const adminDB = this.app.mysql.get('adminDB');
    let user = await adminDB.query('select * from user_login where username = ?', loginInfo.username)
    user = JSON.parse(JSON.stringify(user))[0];
    console.log(user)
    if (user.password == loginInfo.password) {
      return true
    } else {
      return false
    }
  }
}

module.exports = UserService;