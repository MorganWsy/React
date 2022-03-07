# Ant Design 基本使用

## 下载和配置 Ant Design

1. 下载 antd：`yarn add antd`

2. 在需要 UI 库的组件中引入 antd：`import {Button} from 'antd`，并引入 antd 样式文件：import 'antd/dist/antd.css'
- 这样引入样式的问题是所有 antd 提供的组件的样式都引入项目中了(大概 60kb)，即使有些组件在项目并没有用到，所以需要要按引入样式；
3. 设置样式按需引入：
   1. 依据 Ant Design 官方文档，下载`yarn add @craco/craco`包；
   2. 修改项目中的*package.json*文件（*@craco/craco*包可以帮助我们自定义修改和启动*create-react-app*脚手架创建的项目）

```javascript
``` json
  /* package.json */
  "scripts": {
  -   "start": "react-scripts start",
  -   "build": "react-scripts build",
  -   "test": "react-scripts test",

  +   "start": "craco start",
  +   "build": "craco build",
  +   "test": "craco test",
  }
```
```

3. 在项目根目录创建一个 _craco.config.js_ 用于修改 webpack.config.js 中的默认配置；
4. 下载`yarn add babel-plugin-import -D`（可以实现按需加载样式），并对 _craco.config.js_ 文件进行修改：

```javascript
``` js
  module.exports = {
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,// 或者 'css'
          },
        ],
      ],
    }
  }
```
```

5. 第 4 步已实现按需加载样式。现在实现自定义 antd 主题：

```javascript
- 下载`yarn add craco-less`包，可以帮助我们加载 less 样式和修改less变量。
- 修改 craco.config.js 文件：
``` js
  + const CracoLessPlugin = require('craco-less');
  module.exports = {
  + plugins: [
  +   {
  +     // 使用CracoLessPlugin自定义主题颜色
  +     plugin: CracoLessPlugin,
  +     options: {
  +       lessLoaderOptions: {
  +         lessOptions: {
  +           // 自定义less变量
  +           modifyVars: {
  +             '@primary-color': '#282c34', 
  +             '@success-color': '#5ecdc4', 
  +             '@warning-color': '#6d4cc2', 
  +             '@error-color': '#e64a19', 
  +           },
  +           javascriptEnabled: true, 
  +         },
  +       },
  +     },
  +   },
  + ],
    babel: {
      plugins: [
        [
          'import',
          {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
          },
        ],
      ],
    }
  };
```
```
