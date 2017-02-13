'use strict';

define(function (require, exports, module) {

    var $ = require('jquery');

    var notify = require('notify.js');

    var INPUT_ELEMENT_TAG_NAMES = ['INPUT', 'TEXTAREA', 'SELECT'];

    var VALID_MESSAGE = {
        "common.input.required": "请填写{0}",
        "common.select.required": "请选择{0}",
        "common.format.error": "{0}格式不正确",
        "common.number.format_error": "必须输入大于0的数字",
        "common.length.range": "{0}长度为{1}~{2}个字符",
        "common.length.max": "{0}长度最大不能超过{1}个字符",
        "common.length.min": "{0}长度大于{1}个字符",
    };

    var regex_number = /^[0-9]*$/;
    var regex_number_r = /^[1-9]\d*$/;
    var regex_mobile = /^1[345678]\d{9}$/;
    var regex_tel = /^((\([0-9]{3,4}\)|[0-9]{3,4})-?)?[0-9]{6,8}$/;
    var regex_mobile_or_tel = function (val) {
        return regex_mobile.test(val) || regex_tel.test(val);
    };
    var regex_money = /^([1-9]\d*|0)(\.\d+)?$/;
    var regex_email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

    /**
     * 设置表单项目的值。
     * @param {Object|String} panel DOM 元素面板
     * @param {String|Number} value 值
     */
    var setValue = function (panel, value) {

        panel = typeof panel === 'string' ? $(panel) : panel;
        if (INPUT_ELEMENT_TAG_NAMES.indexOf(panel.prop('tagName')) > -1) {
            panel.val(value);
        } else {
            panel.data('value', value);
        }
    };

    /**
     * 设置表单项目的值。
     * @param {Object|String} panel DOM 元素面板
     */
    var getValue = function (panel) {

        panel = typeof panel === 'string' ? $(panel) : panel;
        if (INPUT_ELEMENT_TAG_NAMES.indexOf(panel.prop('tagName')) > -1) {
            return panel.val();
        } else {
            return panel.data('value') || panel.text();
        }
    };

    /**
     * 过滤重复元素
     * @param  {Array} array 要过滤的数组
     */
    var unique = function (array) {
        var newArray = [];
        for (var index = 0; index < array.length; index++) {
            newArray.indexOf(array[index]) < 0 && newArray.push(array[index]);
        }
        return newArray;
    };

    /**
    * 字段校验。
    * @param {Object} panel DOM 元素面板
    */
    var valid = function (panel) {
        var types = unique((panel.data('validate') || '').split(' '));

        var value = getValue(panel).trim();

        // setValue(panel, value);

        var fieldName = panel.data('field');

        for (var index = 0; index < types.length; index++) {

            if (types[index] === 'empty' && !value) {
                return VALID_MESSAGE['common.input.required'].format(fieldName);
            }
            else if (types[index] === 'select' && !value) {
                return VALID_MESSAGE['common.select.required'].format(fieldName);
            }
            else if (value && types[index] === 'number' && !regex_number.test(value)) {
                return VALID_MESSAGE['common.format.error'].format(fieldName);
            }
            else if (value && types[index] === 'number-r' && !regex_number_r.test(value)) {
                return VALID_MESSAGE['common.number.format_error'];
            }
            else if (value && types[index] === 'email' && !regex_email.test(value)) {
                return VALID_MESSAGE['common.format.error'].format(fieldName);
            }
            else if (value && types[index] === 'mobile' && !regex_mobile.test(value)) {
                return VALID_MESSAGE['common.format.error'].format(fieldName);
            }
            else if (value && types[index] === 'tel' && !regex_tel.test(value)) {
                return VALID_MESSAGE['common.format.error'].format(fieldName);
            }
            else if (value && types[index] === 'mobile-or-tel' && !regex_mobile_or_tel(value)) {
                return VALID_MESSAGE['common.format.error'].format(fieldName);
            }
            else if (value && types[index] === 'money' && !regex_money.test(value)) {
                return VALID_MESSAGE['common.format.error'].format(fieldName);
            }

        }

        var length_msg = '';

        var maxLength = panel.data('length-max');
        var minLength = panel.data('length-min');

        if (value && maxLength && getValue(panel).length > maxLength) {
            if (minLength > 0) {
                length_msg = VALID_MESSAGE['common.length.range'].format(fieldName, minLength, maxLength);
            } else {
                length_msg = VALID_MESSAGE['common.length.max'].format(fieldName, maxLength);
            }
        }

        if (value && minLength && getValue(panel).length < minLength) {
            if (maxLength > 0) {
                length_msg = VALID_MESSAGE['common.length.range'].format(fieldName, minLength, maxLength);
            } else {
                length_msg = VALID_MESSAGE['common.length.min'].format(fieldName, minLength);
            }
        }

        if (length_msg.length > 0) {
            return length_msg;
        }

        return null;
    };

    /**
     * @param  {function} successHandler 必须 验证成功回调
     * @param  {function} errorHandler 可选 自定义错误处理
     */
    function validate(successHandler, errorHandler) {
        var validPanel = $(this);
        if (!validPanel) {
            console.error('无效的元素名称。');
            return;
        }
        // 声明参数对象、字段名称及上传的文件
        var fieldName;

        // 定义校验错误
        var errors = null, error;

        // 设置参数字段
        validPanel.find('*[data-field]').each(function (index, fieldPanel) {

            fieldPanel = $(fieldPanel);

            // 将项目的 ID 作为字段名
            fieldName = fieldPanel.data('field');

            // 若存在校验错误则略过
            if (error = valid(fieldPanel)) {
                errors = errors || [];
                errors.push({
                    field: fieldName,
                    element: fieldPanel,
                    message: error
                });
            }
        });

        // 若存在错误则结束
        if (errors) {
            typeof errorHandler === 'function' ? errorHandler(errors) : notify.error({ message: "", errors: errors });
            // 否则发送请求
        } else {
            typeof successHandler === 'function' && successHandler();
        }
    }

    $.fn.validate = validate;

});