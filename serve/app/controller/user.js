'use strict';
const Controller = require('egg').Controller;
const isJSON = require('koa-is-json');

class UserController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hello egg !';
  }
  async login() {
    const { ctx } = this;
    let params = ctx.request.body;
    if (isJSON(params)) {
      if (!params.username || !params.password) {
        ctx.body = {
          code: 400,
          msg: '用户名或密码不能为空'
        }
      } else {
        const loginFlag = await ctx.service.user.checkLogin(params);
        if(loginFlag){
          ctx.body = {
            code: 200,
            msg: '登录成功'
          };
        }else{
          ctx.body = {
            code: 400,
            msg: '登录失败'
          };
        }
      }
    } else {
      ctx.body = {
        code: 403,
        msg: '参数格式不正确'
      }
    }
  }
  async reg() {
    const { ctx } = this;
    ctx.body = 'this is reg';
  }
}

module.exports = UserController;
