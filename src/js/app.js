/**
 * Angular Application
 */
'use strict';

// 依赖
var depends = ['angular', 'ui-router', 'ui-bootstrap', 'app.config', 'app.init'];

// 路由文件路径
var controllers = [

    /*
     * 控制器注册
     * angular 提供了以下三种注册控制器的方法
     * app.controller(String, Array);
     * app.controller(String, Function);
     * app.controller(Object);  Object = { key = controllerName , value = Array | Function }
     * 为了阅读方便 使用第三种注册方法，保持 require 引用树的对齐。
     */
    'module/main',
    'module/home/dashboard',

    // 教务
    'module/edu/class/add',
    'module/edu/class/pending',
    'module/edu/class/open',

    'module/edu/class/list',
    'module/edu/class/detail',
    'module/edu/class/detail-info',
    'module/edu/class/detail-student',
    'module/edu/class/detail-statis',
    'module/edu/class/detail-record',
    'module/edu/class/detail-lesson',
    'module/edu/class/detail-lesson-adjust',
    'module/edu/class/detail-lesson-suspend',
    'module/edu/class/detail-lesson-substitute',

    'module/edu/class/opened',
    'module/edu/class/renew',

    'module/edu/student/list',
    'module/edu/student/detail',
    'module/edu/student/detail-info',
    'module/edu/student/detail-lesson',
    'module/edu/student/detail-record',
    'module/edu/student/detail-course',
    'module/edu/student/detail-attendance',

    'module/edu/class/record',
    'module/edu/notice/list',
    'module/edu/schedule',
    'module/edu/class/search',
    'module/edu/class/archived'
];

define(depends.concat(controllers), function () {

    // 注册 module
    var app = angular.module('app', ['ui.router', 'ui.bootstrap']);

    // 加载路由配置信息
    app.config(require('app.config'));

    // 初始化逻辑
    app.run(require('app.init'));

    // 注册路由
    Array.prototype.slice
        // 从 arguments 截取控制器对象数组
        .call(arguments, depends.length)
        // 循环注册路由
        .forEach(app.controller);

    return app;
});