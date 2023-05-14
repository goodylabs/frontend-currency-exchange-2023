const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(
  '/api',
  createProxyMiddleware({
    target: 'http://api.nbp.pl',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
  })
);

app.listen(5000, () => {
  console.log('Proxy server is running on port 5000');
});