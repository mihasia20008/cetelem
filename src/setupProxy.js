const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy(['/api', '/rails', '/logo'], {
    target: 'http://91.228.152.166',
    changeOrigin: true,
    logLevel: "debug",
  }));
};
