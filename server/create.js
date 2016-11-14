module.exports = function (config, koa, logger, ip, port, middleware) {
  const server = createServer(config, koa, ip, port, logger);
  const { hooks, plugins } = middleware;

  hooks.errorHandler.register(server, logger);

  plugins.register(server, logger);

  hooks.router.register(server, logger);

  return server;
}


function createServer(config, koa, ip, port, logger) {
  const SERVER_LISTENING_MSG = `Koa server listening on ${ip}:${port} in ${app.env} mode`;
  const SERVER_CLOSED_MSG = `Koa server closed on ${ip}:${port} in ${app.env} mode`;
  const app = new koa();

  let server = null;
  const listen = () => {
    return new Promise(function(resolve, reject) {
      server = app.listen(port, ip, (error) => {
        if(error) {
          reject(error);
        } else {
          logger.info(SERVER_LISTENING_MSG);
          resolve();
        }
      });
    });
  };

  const close = () => {
    return new Promise((resolve, reject) => {
      if(!server) resolve();

      server.close((error) => {
        if(error) {
          reject(error);
        } else {
          server = null;
          logger.info(SERVER_CLOSED_MSG);
          resolve();
        }
      });
    });
  };

  const start = (beforeStart) => {
    return beforeStart ? beforeStart().then(() => { return listen(); }) : listen();
  };

  const stop = (beforeStop) => {
    return beforeStop ? beforeStop().then(() => { return close(); }) : close();
  };

  return {
    root: __dirname,
    config,
    start,
    stop,

    app,
    use: app.use.bind(app),
    emit: app.emit.bind(app),
    get env() {
      return app.env || config.env;
    }
  };
}
