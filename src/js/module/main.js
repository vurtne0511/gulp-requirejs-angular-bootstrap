/**
 * UI Controller
 */

'use strict';

define(function (require, exports, module) {

    var _ = require('underscore');

    require('bootstrap');

    MainController.$inject = ['$rootScope', '$scope', '$state', '$location', '$http', '$uibModal'];

    function MainController($root, $scope, $state, $location, $http, $modal) {

        var $window = $(window), $wrapper = $('.wrapper');

        // User Interface 设置
        var UI = $scope.UI = {

            // 左侧主菜单展开开关
            sidebarFolded: false,

            // 个人偏好设置控制栏开关
            controlSidebarFolded: false,

            // 二级菜单展开开关
            navbarFolded: true,

            // 二级菜单展开按钮可视开关，逻辑上依赖二级菜单的数量
            navbarToggleVisibled: true,

            // 当前侧边栏对象
            targetSidebar: $root.navs.main[0],

            // 当前菜单对象
            targetNavbar: {}
        };

        var currentState = {};

        $scope.resetPassword = function () {
            // var modalInstance = $modal.open({
            //     templateUrl: 'views/frame/password.html',
            //     windowTemplateUrl: 'views/template/modal.html',
            //     controller: 'PasswordController',
            // });
            // modalInstance.result.then();
        };

        $scope.signout = function () {
            if (confirm('你确定要退出吗')) {

            }
        };

        $scope.changeSidebar = function (menu) {
            UI.targetSidebar = menu;
            menu.sref && $state.go(menu.sref);
        };

        var state = $scope.state = {};

        state.back = $state.go;

        state.includes = $state.includes;

        state.active = function (name) {
            return currentState.views.hasOwnProperty(name);
        };

        // 监听 sidebar的选中情况，根绝选中情况改变 sidebar/navbar 的展开效果
        $scope.$watch('UI.targetSidebar', function (sidebar) {
            UI.navbarFolded = UI.navbarToggleVisible = sidebar.items.length > 0;
        });

        var getRootState = function ($stateObject) {
            if ($stateObject.views.hasOwnProperty('@') ||
                $stateObject.views.hasOwnProperty('sub@') ||
                $stateObject.views.hasOwnProperty('sub2@')) {
                return $stateObject;
            }
            return $stateObject.parent && getRootState($stateObject.parent) || $stateObject;
        };

        var stateChangedHandler = function (event, toState, fromState) {

            currentState = getRootState($state.$current);

            $.each($root.navs.main, function () {
                var target = _.filter(this.items, function (item) { return item.name && $state.includes(item.name); });

                if (target.length > 0) {
                    UI.targetSidebar = this;
                    UI.targetNavbar = target[0];
                    return false;
                } else {
                    UI.targetNavbar = {};
                }
            });
        };

        $root.$on('$stateChangeSuccess', stateChangedHandler);

        stateChangedHandler();
    };

    module.exports = {
        'MainController': MainController
    };
});