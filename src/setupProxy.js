const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(proxy(['/api'], {
    target: 'http://91.228.152.166',
    changeOrigin: true,
    logLevel: "debug",
  }));
};
