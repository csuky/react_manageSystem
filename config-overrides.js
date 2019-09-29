/**

 * @author Kang Yang

 * @date 2019-09-26 22:20

 */
const {override, fixBabelImports, addLessLoader} = require('customize-cra');

module.exports = override(
    fixBabelImports('import', { // 配置babel-plugin-import
        libraryName: 'antd', // 针对的是antd
        libraryDirectory: 'es', // 源码文件夹中的es文件夹
        style: 'css', // 自动打包相关的css
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'}
    })
);