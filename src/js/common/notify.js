/**
 * 基于 PNotify 的通知组件
 */

'use strict';

define(function (require, exports, module) {

    var $ = require('jquery');

    var PNotify = require('pnotify');

    var errorNotify, successNotify, warningNotify, infoNotify, systemNotify;

    var stack_topleft = { "dir1": "down", "dir2": "right", "push": "top" };
    var stack_bottomleft = { "dir1": "right", "dir2": "up", "push": "top" };
    var stack_modal = { "dir1": "down", "dir2": "right", "push": "top", "modal": true, "overlay_close": true };
    var stack_bar_top = { "dir1": "down", "dir2": "right", "push": "top", "spacing1": 0, "spacing2": 0 };
    var stack_bar_bottom = { "dir1": "up", "dir2": "right", "spacing1": 0, "spacing2": 0 };
    var stack_context = { "dir1": "down", "dir2": "left", "context": $("#stack-context") };

    // 通知封装
    var notify = {};

    /**
     * @param  {any} type
     * @param  {any} msg
     */
    var show = function (type, msg) {

        var options = {
            title: false,
            text: msg,
            type: type,
            icon: false,
            mouse_reset: false,
            animate_speed: 'fast',
            styling: 'bootstrap3',
            // 根据内容长度调整隐藏时间
            delay: 2000 + (msg.length * 100),
            buttons: {
                sticker: false
            }
            // animate: {
            //     animate: true,
            //     in_class: 'bounceInRight',
            //     out_class: 'fadeOut'
            // },
            // stack: stack_bottomright
        };

        return typeof PNotify === 'function' ? new PNotify(options) : alert(options.text);
    };

    /**
     * 通知错误
     * @param {String} error 信息内容
     */
    notify.error = function (error) {

        if (typeof error === 'function' && error.responseText) {
            try {
                error = JSON.parse(error.responseText);
            } catch (jsonParseError) {
                void (0);
            }
        }

        var msg = "";
        if (typeof error === 'string') {
            msg = error;
        } else {
            error.errors.forEach(function (e) {
                msg += e.message + '\n';
            });
        }

        // 判断如果提示窗口已存在 则更新信息
        if (errorNotify && errorNotify.state !== 'closed') {
            errorNotify.update({ text: msg });
            errorNotify.queueRemove();
            return errorNotify;
        }
        return errorNotify = show('error', msg);
    };

    /**
     * 警告信息
     * @param {String} msg 信息内容
     */
    notify.warning = function (msg) {

        // 判断如果提示窗口已存在 则更新信息
        if (warningNotify && warningNotify.state !== 'closed') {
            warningNotify.update({ text: msg });
            warningNotify.queueRemove();
            return warningNotify;
        }
        return warningNotify = show('warning', msg);
    };

    /**
     * 通知信息
     * @param {String} msg 信息内容
     */
    notify.info = function (msg) {

        // 判断如果提示窗口已存在 则更新信息
        if (infoNotify && infoNotify.state !== 'closed') {
            infoNotify.update({ text: msg });
            infoNotify.queueRemove();
            return infoNotify;
        }
        return infoNotify = show('info', msg);
    };

    /**
     * 通知成功
     * @param {String} msg 信息内容
     */
    notify.success = function (msg) {

        // 判断如果提示窗口已存在 则更新信息
        if (successNotify && successNotify.state !== 'closed') {
            successNotify.update({ text: msg });
            successNotify.queueRemove();
            return successNotify;
        }
        return successNotify = show('success', msg);
    };

    module.exports = notify;
});