
'use strict';

require.config({
    baseUrl: '/js/',
    paths: {
        'underscore': '/libs/underscore/underscore',
        'jquery': '/libs/jquery/dist/jquery',
        'bootstrap': '/libs/bootstrap/dist/js/bootstrap',
        'angular': '/libs/angular/angular',
        'ui-router': '/libs/angular-ui-router/release/angular-ui-router',
        'ui-bootstrap': '/libs/angular-bootstrap/ui-bootstrap.min',
        'pnotify': '/libs/pnotify/dist/pnotify'
    },
    shim: {
        'bootstrap': { deps: ['jquery'] },
        'angular': { deps: ['jquery'] },
        'ui-router': { deps: ['angular'] },
        'ui-bootstrap': { deps: ['angular'] }
    }
});

require([
    'jquery',
    'app',
    'common/browserdetect',
    'common/prototype'
], function ($, app) {

    var $ = require('jquery');

    var browserdetect = require('common/browserdetect');

    // 浏览器检测
    browserdetect.init();

    angular.bootstrap(document, [app.name]);
});