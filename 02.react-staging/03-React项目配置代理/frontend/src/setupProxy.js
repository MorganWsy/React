/* 
  在React项目中可以在src/setupProxy.js文件中配置代理，"setupProxy"这个名称不能变！！
  - React项目在运行时，会自动找到这个文件，并将其内容配置到webpack的配置文件中（需要使用commonJS规范，不能用es6）
  - 当setupProxy.js文件发生更改时，需要重新启动前端。
*/
// 引入代理模块
const proxy = require('http-proxy-middleware');

module.exports = function(app){
  app.use(proxy.createProxyMiddleware('/api1',{
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/api1': ''
      }
    }),
    proxy.createProxyMiddleware('/api2',{
      target: 'http://localhost:5001',
      changeOrigin: true,
      pathRewrite: {
        '^/api2': ''
      }
    })
  );
}