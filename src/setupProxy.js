const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(proxy(['/api'], {
    target: 'http://185.87.193.115:3333',
    changeOrigin: true,
    logLevel: "debug",
  }));
};
