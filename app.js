/*!
 * 家校邦运营平台接口入口。
 * @date 2015-11-25
 * @author jinhy
 * @copyright jxbapp.com
 */
'use strict';

// 加载 OS 模块
var os = require('os');

// 设置工程绝对路径
process.env.PWD = process.env.PWD || __dirname;

// 默认以产品环境方式启动
process.env.NODE_ENV = process.env.NODE_ENV || (os.platform() === 'win32' ? 'development' : 'production');

// 载入配置信息
global.config = require('./config');

// 载入 Express 及其中间件
var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ejs = require('ejs');
var markdown = require('express-markdown');

// 载入路径处理模块
var path = require('path');

// 静态文件目录
var publicDir = process.env.NODE_ENV === 'production' ? config.gulp.path.dist : config.gulp.path.src;

// 配置 Express 应用
var app = express()

	// 压缩响应数据
	.use(compression())

	// 解析 JSON 格式数据
	.use(bodyParser.json({ limit: '20mb' }))

	// 解析 URL 参数数据
	.use(bodyParser.urlencoded({ limit: '20mb', extended: true }))

	// 解析 Cookie 数据
	.use(cookieParser('secret'))

	// 视图文件存放路径
	.set('views', path.join(__dirname, 'views'))

	// 页面模版引擎默认扩展名
	.set('view engine', 'ejs')

	// 使用 EJS 页面模版引擎
	.engine('html', ejs.renderFile)

	// Markdown 解析及显示
	.use(markdown({ directory: './routes', view: 'markdown', variable: 'markdown' }))

	// 静态资源文件存放路径
	.use(express.static(path.join(__dirname, publicDir)));

// 配置监听端口及回调
if (!module.parent) {
	app.listen(config.port, () => {
		console.info('jxb-saas-operation HTTP server started.');
	});
}

module.exports = app;
