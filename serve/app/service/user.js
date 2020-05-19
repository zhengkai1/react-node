'use strict'

const Service = require('egg').Service;

class UserService extends Service {
  async checkLogin (loginInfo) {
    const adminDB = this.app.mysql.get('adminDB');
    const user = await adminDB.query('select * from user_login where username = ?', loginInfo.username)
    if (user.password == loginInfo.password) {
      return true
    } else {
      return false
    }
  }
}

module.exports = UserService;