// @NOTE Do synchronous things like require newrelic before server is started up
const server = require('./server');


//@NOTE: Ensure to only call start if this is the entry point
if(!module.parent) {
  console.log('###', server)
  server.start(beforeStart);
}

function beforeStart (app, config, logger) {
  logger.trace(`server.beforeStart > : setting up ${config.app.name}`);

  // @NOTE: Write code you want to execute before server starts

  logger.trace('server.beforeStart <');
  return Promise.resolve();
}
