/**
 * 学生详细页
 */

'use strict';
define(function (require, exports, module) {
    module.exports = {
        'ClassDetailController': ['$rootScope', '$scope', '$state', '$stateParams', function ($root, $scope, $state, $stateParams) {
            
            var tabs = $scope.tabs = [
                { text: '基本信息', name: 'edu-class.detail.info' },
                { text: '班历', name: 'edu-class.detail.statis' },
                { text: '学生列表', name: 'edu-class.detail.student' },
                { text: '班务记录', name: 'edu-class.detail.record' },
                { text: '班务管理', name: 'edu-class.detail.lesson' }
            ];

            $scope.isCurrentState = function (stateName) {
                return $state.$current.name === stateName;
            };
        }]
    };
});