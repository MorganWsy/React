const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#282c34' 
            },
            javascriptEnabled: true
          }
        }
      }
    }
  ],
  babel: {
    plugins: [
      ['import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      }]
    ]
  }
}