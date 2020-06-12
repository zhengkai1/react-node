'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.user.index);
  router.post('/api/login', controller.user.login); /** 登录 */
  router.post('/reg', controller.user.reg); /** 注册 */
};
