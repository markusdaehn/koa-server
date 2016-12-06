module.exports = function registerHooks(getHooks, router, server, logger) {
  logger.trace('server.middleware.hooks.router.register-hooks > : registering router hooks');
  let hooks = getHooks(server, logger);

  Object.keys(hooks).forEach((hookName)=> {
    logger.debug({hooks: {router: {name: hookName}}}, `registering router hook ${hookName}`)
    hooks[hookName].register(router, server, logger);
  });

  logger.trace('server.middleware.hooks.router.register-hooks <');
}