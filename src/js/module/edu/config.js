/**
 * 教务模块路由配置文件
 */
'use strict';

define(function (require, exports, module) {
    module.exports = function ($stateProvider, $urlRouter) {
        $stateProvider
            // 建班
            .state('edu-class-add', {
                title: '新建班级',
                url: '^/edu/class-add',
                templateUrl: 'views/edu/class/add.html',
                controller: 'ClassAddController'
            })
            // 开课
            .state('edu-class-pending', {
                title: '开课',
                url: '^/edu/class-pending',
                templateUrl: 'views/edu/class/list-pending.html',
                controller: 'ClassPendingController'
            })
            .state('edu-class-pending.open', {
                title: '开课',
                url: '^/edu/class-pending/:classId/open',
                views: {
                    'sub@': {
                        templateUrl: 'views/edu/class/open.html',
                        controller: 'ClassOpenController'
                    }
                }
            })
            // 班级管理
            .state('edu-class', {
                title: '班级管理',
                url: '^/edu/class',
                templateUrl: 'views/edu/class/list.html',
                controller: 'ClassListController'
            })
            .state('edu-class.detail', {
                title: '班级详情',
                url: '^/edu/class/:classId',
                // abstract: true,
                // redirectTo: function (params) {
                //     this.go('edu-class.detail.info', params);
                // },
                redirectTo: 'edu-class.detail.info',
                views: {
                    'sub@': {
                        templateUrl: 'views/edu/class/detail.html',
                        controller: 'ClassDetailController'
                    }
                },
                resolve: {
                    classId: ['$stateParams', function ($stateParams) {
                        return $stateParams.classId;
                    }]
                }
            })
            .state('edu-class.detail.info', {
                title: '班级详情-基本信息',
                url: '^/edu/class/:classId/info',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/class/detail-info.html',
                        controller: 'ClassInfoController'
                    }
                }
            })
            .state('edu-class.detail.statis', {
                title: '班级详情-班历',
                url: '^/edu/class/:classId/statis',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/class/detail-statis.html',
                        controller: 'ClassStatisController'
                    }
                }
            })
            .state('edu-class.detail.student', {
                title: '班级详情-学生',
                url: '^/edu/class/:classId/student',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/class/detail-student.html',
                        controller: 'ClassStudentController'
                    }
                }
            })
            .state('edu-class.detail.record', {
                title: '班级详情-班务记录',
                url: '^/edu/class/:classId/record',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/class/detail-record.html',
                        controller: 'ClassDetailRecordController'
                    }
                }
            })
            .state('edu-class.detail.lesson', {
                title: '班级详情-班务管理',
                url: '^/edu/class/:classId/lesson',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/class/detail-lesson.html',
                        controller: 'ClassLessonController'
                    }
                }
            })
            .state('edu-class.detail.lesson.adjust', {
                title: '班级详情-班务管理-调课',
                url: '^/edu/class/:classId/lesson/:lessonId/adjust',
                views: {
                    'sub@': {
                        templateUrl: 'views/edu/class/detail-lesson-adjust.html',
                        controller: 'ClassLessonAdjustController'
                    }
                }
            })
            .state('edu-class.detail.lesson.suspend', {
                title: '班级详情-班务管理-停课',
                url: '^/edu/class/:classId/lesson/:lessonId/suspend',
                views: {
                    'sub@': {
                        templateUrl: 'views/edu/class/detail-lesson-suspend.html',
                        controller: 'ClassLessonSuspendController'
                    }
                }
            })
            .state('edu-class.detail.lesson.substitute', {
                title: '班级详情-班务管理-代课',
                url: '^/edu/class/:classId/lesson/:lessonId/substitute',
                views: {
                    'sub@': {
                        templateUrl: 'views/edu/class/detail-lesson-substitute.html',
                        controller: 'ClassLessonSubstituteController'
                    }
                }
            })
            // 续班
            .state('edu-class-opened', {
                title: '续班',
                url: '^/edu/class-opened',
                templateUrl: 'views/edu/class/list-opened.html',
                controller: 'ClassOpenedController'
            })
            .state('edu-class-opened.renew', {
                title: '续班',
                url: '^/edu/class-opened/:classId/renew',
                views: {
                    'sub@': {
                        templateUrl: 'views/edu/class/renew.html',
                        controller: 'ClassRenewController'
                    }
                }
            })
            // 学生管理
            .state('edu-student', {
                title: '学生管理',
                url: '^/edu/student',
                templateUrl: 'views/edu/student/list.html',
                controller: 'StudentListController'
            })
            .state('edu-student.detail', {
                title: '学生详情',
                url: '^/edu/student/:studentId',
                abstract: true,
                views: {
                    'sub@': {
                        templateUrl: 'views/edu/student/detail.html',
                        controller: 'StudentDetailController'
                    }
                },
                resolve: {
                    studentId: ['$stateParams', function ($stateParams) {
                        return $stateParams.studentId;
                    }]
                }
            })
            .state('edu-student.detail.info', {
                url: '/info',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/student/detail-info.html',
                        controller: 'StudentInfoController'
                    }
                }
            })
            .state('edu-student.detail.course', {
                url: '/course',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/student/detail-course.html',
                        controller: 'StudentCourseController'
                    }
                }
            })
            .state('edu-student.detail.lesson', {
                url: '/lesson',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/student/detail-lesson.html',
                        controller: 'StudentLessonController'
                    }
                }
            })
            .state('edu-student.detail.record', {
                url: '/record',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/student/detail-record.html',
                        controller: 'StudentRecordController'
                    }
                }
            })
            .state('edu-student.detail.attendance', {
                url: '/attendance',
                views: {
                    'tab-panel': {
                        templateUrl: 'views/edu/student/detail-attendance.html',
                        controller: 'StudentAttendanceController'
                    }
                }
            })
            // 班务记录
            .state('edu-class-record', {
                title: '班务记录',
                url: '^/edu/class-record',
                templateUrl: 'views/edu/class/list-record.html',
                controller: 'ClassRecordController'
            })
            // 公告
            .state('edu-notice', {
                title: '公告',
                url: '^/edu/notice',
                templateUrl: 'views/edu/notice/list.html',
                controller: 'NoticeListController'
            })
            // 课程表
            .state('edu-schedule', {
                title: '课程表',
                url: '^/edu/schedule',
                templateUrl: 'views/edu/schedule.html',
                controller: 'ScheduleController'
            })
            // 查班级
            .state('edu-class-search', {
                title: '查班级',
                url: '^/edu/class-search',
                templateUrl: 'views/edu/class/search.html',
                controller: 'ClassSearchController'
            })
            // 已归档班级
            .state('edu-class-archived', {
                title: '已归档班级',
                url: '^/edu/class-archived',
                templateUrl: 'views/edu/class/list-archived.html',
                controller: 'ClassArchivedController'
            });
    };
});