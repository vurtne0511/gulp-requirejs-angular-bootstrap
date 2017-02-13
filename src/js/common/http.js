
'use strict';

define(['jquery'], function ($) {

    // HTTP 请求封装
    var http = {};

    /**
     * 发送异步请求。
     * @param {Object} [options] ajax option 配置
     */
    var send = http.send = function ($method, $url, $data, $callback) {

        // 请求方法
        var method = $method === 'upload' ? 'post' : $method;

        /** 
         * 异步回调函数。
         * @param {Object} e 错误信息
         * @param {*} [data] 返回数据
         * @private
         */
        var callback = function (e, data) {
            // 回调
            if (typeof $callback === 'function') {
                $callback(e, data);
            } else {
                // 若发生错误则显示错误信息
                // e && utils.notify.error(typeof e.error === 'object' ? e.error : e);
                alert(e);
            }
        };

        // 设置异步请求选项
        var options = {
            url: $url,
            method: method,
            data: $data,
            // dataType: method === "post" ? "json" : "json",
            dataType: "json",
            jsonp: method !== "post",
            timeout: 150000,  //设置超时时间15秒
            success: function (res) {
                if (res.success) {
                    callback(null, res.result || res.data);
                } else {
                    callback(res, res.result || res.data);
                }
            },
            error: function (e) {
                callback(e);
            }
        };

        // 当为上传处理时保持 FormData 格式
        if ($method === 'upload') {
            options.contentType = false;
            options.processData = false;
        }

        // 发送异步请求
        $.ajax(options);
    };

    /**
     * 异步 GET 请求。
     * @param {Object} [options] ajax option 配置
     */
    http.get = function (url, callback) {
        send('get', url, null, callback);
    };

    /**
     * 异步 POST 请求。
     * @param {Object} [options] ajax option 配置
     */
    http.post = function (url, data, callback) {
        send('post', url, data, callback);
    };

    /**
     * 异步上传请求。
     * @param {Object} [options] ajax option 配置
     */
    http.upload = function (url, data, callback) {
        send('upload', url, data, callback);
    };

    return http;

});