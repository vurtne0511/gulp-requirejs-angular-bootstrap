
'use strict';

define(function () {

    // 将参数拼接入url
    String.prototype.RESTful = function (params) {
        var url = this.replace(/[\\/]$/, '');
        for (var k in params) {
            if (k.match('^__')) {
                continue;
            }
            var v = params[k];
            if (v !== undefined && v !== null && v !== '' && !(v instanceof Array && v.length === 0)) {
                url += '/' + k.replace(/(?!^)([A-Z])/g, '_$1').toLowerCase() + '/' + v;
            }
        }
        return url;
    };

    /**
     * 字符串格式化函数
     * sample : '第一个参数是 = {0},第二个参数是 = {1}, 第三个参数是 = {2}...{N}'.format(arg0,arg1,arg2,...);
     */
    String.prototype.format = function () {
        var args = arguments && arguments.length && arguments[0] instanceof Array ? arguments[0] : arguments;
        return this.replace(/\{(\d+)\}/g, function (match, number) {
            return typeof args[number] !== 'undefined' ? args[number] : match;
        });
    };

    /**
     * 对Date的扩展，将 Date 转化为指定格式的String
     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
     * 例子：
     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
     */
    Date.prototype.format = function (fmt) {
        fmt = fmt || 'yyyy-MM-dd hh:mm:ss';
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length))
        };
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }
        return fmt;
    };

    Number.prototype.padLeft = function (len, chr) {
        var str = this.toString();
        while (str.length < len) {
            str = (chr || '0') + str;
        }
        return str;
    };
});