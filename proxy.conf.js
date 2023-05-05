const { env } = require('process');

const httpUrl = env.ASPNETCORE_URLS
  ? env.ASPNETCORE_URLS.split(';')[0]
  : 'http://localhost:18078';
const target = env.ASPNETCORE_HTTPS_PORT
  ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}`
  : httpUrl;

const PROXY_CONFIG = [
  {
    context: ['/weatherforecast'],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
];

module.exports = PROXY_CONFIG;
