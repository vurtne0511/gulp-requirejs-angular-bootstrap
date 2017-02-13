'use strict';

define(function (require, exports, module) {

    module.exports = {

        "common.network.connected": "网络已链接",
        "common.network.closed": "网络已断开",
        "common.network.failed": "网络链接失败",
        "common.network.rejected": "网络异常",

        "common.data.none": "暂无可显示的数据",
        "common.data.search.none": "没有找到您所查找的信息",

        "common.http.failed": "请求失败，请重试",

        "common.add.success": "{0}保存成功",
        "common.add.failed": "{0}保存失败",

        "common.edit.success": "{0}变更成功",
        "common.edit.failed": "{0}变更失败",

        "common.delete.success": "{0}删除成功",
        "common.delete.failed": "{0}删除失败",

        "common.upload.success": "{0}上传成功",
        "common.upload.failed": "{0}上传失败，请重试",
        "common.upload.format.failed": "文件格式不支持，请上传{0}格式的文件",
        "common.upload.size.max": "请上传小于{0}的{1}",
        "common.upload.size.min": "请上传大于{0}的{1}",
        "common.upload.size.range": "请上传大小在{0}~{1}的{2}",

        "form.validate.required": "请填写{0}",
        "form.validate.selected": "请选择{0}",
        "form.validate.email": "{0}不是邮箱格式",
        "form.validate.tel": "{0}不是电话格式",
        "form.validate.date": "{0}不是日期格式",
        "form.validate.number": "{0}不是数字",
        "form.validate.number.min": "{0}必须输入大于{1}的数字",
        "form.validate.number.max": "{0}必须输入小于{1}的数字",
        "form.validate.number.range": "{0}必须输入大于{1}~{2}之间的数字",
        "form.validate.digits": "{0}必须输入大于{1}的数字",
        "form.validate.pattern": "{0}不是合法的数据",
        "form.validate.equalTo": "{0}必须和{1}相同",
        "form.validate.length.max": "{0}长度为最大{1}",
        "form.validate.length.min": "{0}长度为最小{1}",
        "form.validate.length.range": "{0}长度为{1}~{2}个字符"
    };
});