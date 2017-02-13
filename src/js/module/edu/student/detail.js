/**
 * 学生详细页
 */

'use strict';

define(function (require, exports, module) {
    module.exports = {
        'StudentDetailController': ['$rootScope', '$scope', '$state', function ($root, $scope, $state) {

            var tabs = $scope.tabs = [
                { text: '基本信息', name: 'edu-student.detail.info' },
                { text: '所学课程', name: 'edu-student.detail.course' },
                { text: '教务记录', name: 'edu-student.detail.record' },
                { text: '课耗记录', name: 'edu-student.detail.lesson' },
                { text: '考勤记录', name: 'edu-student.detail.attendance' }
            ];

            $scope.isCurrentState = function (stateName) {
                return $state.$current.name === stateName;
            };
        }]
    };
});