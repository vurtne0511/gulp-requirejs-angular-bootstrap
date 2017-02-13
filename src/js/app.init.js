
'use strict';

define(function (require, exports, module) {

    var _ = require('underscore');

    var message = require('constants/message');

    var menu = require('constants/menu');

    var notify = require('common/notify');

    var base64 = require('common/base64');

    var themes = [
        { text: '经典蓝', name: 'default' },
        { text: '暗蓝色', name: 'flatly' },
        { text: '天空蓝', name: 'cerulean' },
        { text: '橘子橙', name: 'superhero' },
        { text: '深蓝色', name: 'sandstone' },
        { text: '黑色', name: 'cyborg' }
    ];

    module.exports = ['$rootScope', '$state', '$location', function ($root, $state, $location) {

        var $window = angular.element(window);

        $root.getMessage = function (code, ...args) {
            return message[code].format(args);
        };

        $root.getMessage = (code, ...args) => message[code].format(args);

        $root.back = function (path) {
            if (path) {
                $location.path(path).replace();
            }
            else {
                history.back();
            }
        };

        $root.$on('$stateChangeStart', function (event, toState, toParams) {
            var redirect = toState.redirectTo;
            if (redirect) {
                event.preventDefault();
                if (angular.isFunction(redirect)) {
                    redirect.call($state, toParams);
                }
                else {
                    $state.go(redirect, toParams);
                }
            }
        });

        $window.on('online', function () {
            notify.success(message['common.network.connected']);
        });

        $window.on('offline', function () {
            notify.warning(message['common.network.closed']);
        });

        var navs = $root.navs = {};

        navs.main = menu;

        navs.shortcut = _.chain(navs.main).pluck('items').flatten().where({ shortcut: true }).value();

        $root.theme = themes[4].name;

        $root.$on('$destroy', function () {
            $window.off('online offline');
        });
    }];
});