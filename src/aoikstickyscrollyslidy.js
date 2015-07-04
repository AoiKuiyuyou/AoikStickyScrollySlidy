//
(function () {
    'use strict';

    //
    var debug = false;

    //
    if (debug === false) {
        if (typeof (window.console) === 'undefined') {
            window.console = {};
        }
        window.console.log = function () {
        };
        window.console.assert = function () {
        };
    }

    //
    window.aoikstickyscrollyslidy = {};

    var aoiksss = window.aoikstickyscrollyslidy;

    // 9uWxgFX
    // Map locale name to normalized locale name.
    // Normalized locale name has a corresponding i18n file.
    aoiksss.i18n_locale_d = {
        'en': 'en',
        'en-us': 'en',
        'us': 'en',
        'zh': 'zh-cn',
        'zh-cn': 'zh-cn',
        'cn': 'zh-cn',
        'zh-tw': 'zh-hant',
        'zh-hk': 'zh-hant',
        'zh-hant': 'zh-hant',
        'tw': 'zh-hant',
        'hk': 'zh-hant',
        'hant': 'zh-hant',
        'ja': 'ja',
        'ja-jp': 'ja',
        'jp': 'ja'
    };

    aoiksss.i18n_locale_dft = 'en';

    aoiksss.i18n_locale_is_valid = function (locale) {
        return aoiksss.i18n_locale_d.hasOwnProperty(locale);
    };

    console.assert(aoiksss.i18n_locale_is_valid(aoiksss.i18n_locale_dft));

    // Used in translation files at 8cOvJKM
    aoiksss.i18n_tran_d = {};

    // 5btZ4Bx
    aoiksss.i18n_tran_dir = './aoiki18n/tran/';

    aoiksss.i18n_param = 'i18n';
    aoiksss.i18n_param_v_off = null;

    aoiksss.i18n_nav_css_active = 'active';
    aoiksss.i18n_nav_mask_id = 'i18n_nav_mask';
    aoiksss.i18n_nav_id = 'i18n_nav';
    aoiksss.i18n_nav_toggle_id = 'i18n_nav_toggle';
    aoiksss.i18n_nav_toggle2_id = 'i18n_nav_toggle2';
    aoiksss.i18n_nav_items_id = 'i18n_nav_items';
    aoiksss.i18n_nav_item_locale_attr = 'data-i18n-locale';

    // Same with the value at 8iyPXBJ
    aoiksss.i18n_locale_root_css = 'locale_root';

    //
    aoiksss.content_page_id = 'content_page';

    aoiksss.content_page_show_css = 'content_page_show';

    aoiksss.content_page_nav_id = 'content_page_nav';

    aoiksss.contact_age_num_id = 'contact_age_num';

    //
    aoiksss.section_show_css = 'section_show';

    //
    aoiksss.section_menu_id = 'content_section_menu';

    aoiksss.section_menu_item_active_css = 'active';

    //
    aoiksss.slidy_menu_id = 'slidy_menu';

    aoiksss.slidy_menu_active_css = 'active';

    aoiksss.slidy_param = 'slidy';
    aoiksss.slidy_param_v_on = '1';
    aoiksss.slidy_param_v_off = null;

    //
    aoiksss.hello_toggle_id = 'hello_toggle';
    aoiksss.hello_toggle_active_css = 'active';

    aoiksss.hello_page_id = 'hello_page';

    aoiksss.hello_param = 'hello';
    aoiksss.hello_param_v_on = '1';
    aoiksss.hello_param_v_off = null;

    //
    aoiksss.attribution_page_id = 'attribution_page';

    aoiksss.attribution_page_show_css = 'attribution_page_show';

    aoiksss.attribution_toggle_id = 'attribution_toggle';

    aoiksss.attribution_toggle_active_css = 'active';

    aoiksss.attribution_page_close_button_id =
            'attribution_page_close_button';
    aoiksss.attribution_page_close_button_active_css = 'active';

    aoiksss.attribution_param = 'cc';
    aoiksss.attribution_param_v_on = '1';
    aoiksss.attribution_param_v_off = null;
})();

(function () {
    'use strict';

    var app = angular.module('AoikStickyScrollySlidy',
            ['angularLoad', 'AoikI18n']);

    app.directive('log', [
        function () {
            var attr_name = 'log';
            return {
                restrict: 'A',
                compile: function (element, attrs) {
                    var log_text = attrs[attr_name];
                    console.log('7kw7gc0', 'compile', log_text);

                    return function link(scope, element, attr) {
                        console.log('5aSyUkj', 'link', log_text);
                    };
                }
            };
        }
    ]);

    app.filter('emit', [
        function () {
            return function (text, scope, event, event_arg) {
                console.log('8kW8R1a', 'emit', event, event_arg);
                scope.$emit(event, event_arg);
                return text;
            };
        }
    ]);

    app.directive('i18n', ['$sce', '$parse', '$compile',
        function ($sce, $parse, $compile) {
            var attr_name = 'i18n';
            return {
                restrict: 'A',
                compile: function (element, attrs) {
                    // "i18n" below is AoikI18n's filter registered at 6gHaFzQ.
                    var expr = "'" + attrs[attr_name] + "'" + '|i18n';
                    var expr_getter = $parse(expr);
                    $compile.$$addBindingClass(element);

                    return function link(scope, element, attr) {
                        $compile.$$addBindingInfo(element, attr.ngBindHtml);
                        scope.$watch('i18n_update_flag', function (val_new,
                                val_old) {
                            if (val_new === val_old) {
                                return;
                            }
                            var x = $sce.trustAsHtml(expr_getter(scope));
                            element.html(x.toString());
                        });
                    };
                }
            };
        }
    ]);

    app.controller('app_ctlr', [
        '$scope', '$timeout', '$location', '$filter',
        'angularLoad', 'AoikI18nService',
        function ($scope, $timeout, $location, $filter,
                angularLoad, AoikI18nService) {
            //
            console.log('7vZWuLm', 'app_ctlr');

            //
            console.log('8wubmuN', 'absUrl', $location.absUrl());

            //
            var aoiksss = window.aoikstickyscrollyslidy;

            // Indicates whether "$locationChangeSuccess" handlers should ignore
            // a change.
            // Set true at 4jM5Vq4, 7bvvgnF, 3b8XC97.
            // Set false at 4fXNT1K.
            var location_hdlrs_skip = false;

            // Valid locales are defined at 9uWxgFX.
            // Will be set to a valid value at 9whlwTb or 4sNgYHY.
            $scope.i18n_locale = null;

            // This flag is changed every time a new locale file has been
            // loaded at 6r1eSvn or 8eQyL62.
            $scope.i18n_update_flag = false;

            // 8dZEUhE
            // Indicates whether function 6tFundU should run.
            // Will be set to true when "i18n_update_flag" changes at 7tDViCc.
            // Will be set to false when function 6tFundU is run at 6ibxvBK.
            var i18n_update_flag_v2 = false;

            $scope.i18n_nav_bool = null;

            // 5h64JC3
            // An array of tuples.
            // Used by function 9zgl1VO.
            var dict_to_tuples = function (item_d) {
                var tuple_s = [];
                for (var key in item_d) {
                    if (item_d.hasOwnProperty(key)) {
                        tuple_s.push([key, item_d[key]]);
                    }
                }
                return tuple_s;
            };

            var locale_info_s = dict_to_tuples(aoiksss.i18n_locale_d);

            // Sort in order to make longer names appear earlier
            locale_info_s.sort(function (a, b) {
                return b[0].length - a[0].length;
            });

            var i18n_tran_is_first = true;

            // Class name for locale root div at 8iyPXBJ
            var i18n_locale_root_css_name = null;

            var i18n_nav_active_class = aoiksss.i18n_nav_css_active;

            var i18n_nav_mask = $('#' + aoiksss.i18n_nav_mask_id);
            console.assert(i18n_nav_mask.length);

            var i18n_nav = $('#' + aoiksss.i18n_nav_id);
            console.assert(i18n_nav.length);

            var i18n_nav_toggle = $('#' + aoiksss.i18n_nav_toggle_id);
            console.assert(i18n_nav_toggle.length);

            var i18n_nav_toggle2 = $('#' + aoiksss.i18n_nav_toggle2_id);
            console.assert(i18n_nav_toggle2.length);

            var i18n_filter = $filter('i18n');

            var i18n_locale_is_valid = aoiksss.i18n_locale_is_valid;

            // Set to a non-null value at 7uwhulK, according to url routing.
            // 
            // Watch handlers should take care of null values because "watch"
            // events will fire before the first "$locationChangeSuccess" event.
            $scope.section_active_id = null;

            // Indicates whether window is being scrolled by function 9eNzxvo.
            // Set true at 6fiGm4b.
            // Set false at 4iJkX33.
            var section_active_is_updating_v1 = false;

            // Indicates whether active section is being changed by function
            // 9yMNgBc.
            // Set true at 2yqyug0.
            // Set true at 2c7MPl7.
            var section_active_is_updating_v2 = false;

            // Indicates slidy mode is on
            $scope.slidy_bool = null;

            var slidy_param = aoiksss.slidy_param;
            var slidy_param_v_on =
                    aoiksss.slidy_param_v_on;
            var slidy_param_v_off =
                    aoiksss.slidy_param_v_off;

            //
            var slidy_menu = $('#' + aoiksss.slidy_menu_id);
            console.assert(slidy_menu.length);

            var slidy_menu_item_s = slidy_menu.children();
            console.assert(slidy_menu_item_s.length === 2);

            var slidy_off_button = slidy_menu_item_s.eq(0);
            console.assert(slidy_off_button.length);

            var slidy_on_button = slidy_menu_item_s.eq(1);
            console.assert(slidy_on_button.length);

            var slidy_mousewheel_delta_sum = 0;
            var slidy_mousewheel_delta_sum_min = -3;
            var slidy_mousewheel_delta_sum_max = 3;

            // Indicates hello mode is on
            $scope.hello_bool = null;

            // Indicates whether "hello_bool" is changed by user click
            // Set true at 6vIzSHb.
            // Set false at 2iMcPC6.
            var hello_toggle_clicked = false;

            var hello_toggle = $('#' + aoiksss.hello_toggle_id);
            console.assert(hello_toggle.length);

            var hello_page = $('#' + aoiksss.hello_page_id);
            console.assert(hello_page.length);

            var hello_page_hide_timer = null;

            var hello_page_hide_is_changing = false;

            // Indicates attribution page shows
            $scope.attribution_bool = null;

            //
            var attribution_toggle =
                    $('#' + aoiksss.attribution_toggle_id);
            console.assert(attribution_toggle.length);

            var attribution_page = $('#' + aoiksss.attribution_page_id);
            console.assert(attribution_page.length);

            var attribution_page_close_button =
                    $('#' + aoiksss.attribution_page_close_button_id);
            console.assert(attribution_page_close_button.length);

            //
            var content_page = $('#' + aoiksss.content_page_id);
            console.assert(content_page.length);

            var content_page_nav = $('#' + aoiksss.content_page_nav_id);
            console.assert(content_page_nav.length);

            var content_page_is_shown = false;

            var section_info_s = [];

            var section_info_d = {};

            var section_info_d_init = function () {
                var menu_li_s = $('#' + aoiksss.section_menu_id).children();
                console.assert(menu_li_s.length);

                for (var i = 0; i < menu_li_s.length; i++) {
                    var li = menu_li_s.eq(i);
                    var anchor = li.find('a');
                    var href = anchor.attr('href');
                    // Href format see 2ijzX9N.
                    // E.g. "#/contact"
                    var section_id = href.substring(2);
                    var selector = '#' + section_id;
                    var section_info = {
                        'index': i,
                        'toc_li': li,
                        'section_id': section_id,
                        'elem': $(selector)
                    };
                    section_info_s.push(section_info);
                    section_info_d[section_id] = section_info;
                }
            };

            section_info_d_init();

            //
            var i18n_update_html_head_title = function () {
                console.log('9okDfmA', 'i18n_update_html_head_title');
                $('html head title').html(i18n_filter('3sSgz8T'));
            };

            var i18n_tran_start_hdlr = function () {
                console.log('3g4mePL', 'i18n_tran_start_hdlr');
            };

            var i18n_tran_end_hdlr = function () {
                console.log('6tFundU', 'i18n_tran_end_hdlr',
                        content_page_is_shown, $scope.i18n_locale);
                if (!i18n_update_flag_v2) {
                    console.log('8jLxV0F', 'locale is not new');
                    return;
                }
                // 6ibxvBK
                i18n_update_flag_v2 = false;

                if (i18n_tran_is_first) {
                    console.log('3sv7ZNA', 'i18n_tran_is_first');
                    i18n_tran_is_first = false;
                }

                console.log('7kdJZK5', 'i18n_update_html_head_title before');
                i18n_update_html_head_title();

                if ($scope.attribution_bool) {
                    console.log('9yBPYeL', 'attribution_bool is on');

                    if ($scope.hello_bool) {
                        hello_page_show();
                    }

                    return;
                }

                console.log('2mNfl1G', 'content_page_show_v2 before');
                // Show content oage only after url routing has settled.
                // This avoids a flash on the screen.
                if (!content_page_is_shown) {
                    content_page_show_v2();
                }
            };

            // 9zgl1VO
            // Find locale name from filename in url
            var i18n_find_locale = function () {

                var abs_url = $location.absUrl().toLowerCase();
                console.log('9qApoKo', abs_url);

                for (var i = 0; i < locale_info_s.length; i++) {
                    // "locale_info_s"'s format is determined at 9uWxgFX and
                    // 5h64JC3.
                    var locale_info = locale_info_s[i];
                    var locale_name = locale_info[0];
                    console.log('7wKRq8n', locale_name, locale_info[1]);
                    if (abs_url.indexOf(locale_name) !== -1) {
                        // Return normalized locale name.
                        return locale_info[1];
                    }
                }

                return null;
            };

            var i18n_nav_update_css = function (i18n_nav_bool, old) {
                console.log('4zi3OgE', 'i18n_nav_update_css',
                        i18n_nav_bool);
                if (i18n_nav_bool === null || i18n_nav_bool === old) {
                    console.log('6qa5eB5', 'ignore', i18n_nav_bool, old);
                    return;
                }
                if (i18n_nav_bool) {
                    i18n_nav_mask.addClass(i18n_nav_active_class);
                    i18n_nav.addClass(i18n_nav_active_class);
                    i18n_nav_toggle.addClass(i18n_nav_active_class);
                    i18n_nav_toggle2.addClass(i18n_nav_active_class);
                }
                else {
                    i18n_nav_mask.removeClass(i18n_nav_active_class);
                    i18n_nav.removeClass(i18n_nav_active_class);
                    i18n_nav_toggle.removeClass(i18n_nav_active_class);
                    i18n_nav_toggle2.removeClass(i18n_nav_active_class);
                }
            };

            var i18n_nav_set_off = function (e) {
                e.preventDefault();

                $timeout(function () {
                    $scope.i18n_nav_bool = false;
                });
                // If user clicks on the i18n nav mask without selecting a
                // locale
                if (!$scope.i18n_locale) {
                    $timeout(function () {
                        // 9whlwTb
                        // Use the default locale
                        $scope.i18n_locale = aoiksss.i18n_locale_dft;
                    });
                }
            };

            var i18n_nav_set_on = function (e) {
                e.preventDefault();

                $timeout(function () {
                    $scope.i18n_nav_bool = true;
                });
            };

            var i18n_locale_update_by_url = function () {
                console.log('5m6m8iG', 'i18n_locale_update_by_url');

                var locale = $location.search().i18n;
                // can undefined

                if (!i18n_locale_is_valid(locale)) {
                    locale = i18n_find_locale();
                    // can null
                    console.log('4brQBot', locale);
                }

                if (locale) {
                    console.assert(i18n_locale_is_valid(locale));
                    $timeout(function () {
                        $scope.i18n_locale = locale;

                        // hide i18n nav
                        $scope.i18n_nav_bool = false;
                    });
                }
                else {
                    $timeout(function () {
                        // show i18n nav
                        $scope.i18n_nav_bool = true;
                    });
                }
            };

            var i18n_locale_update_css = function (val_new, val_old) {
                console.log('4a2O2ka', 'i18n_locale_update_css',
                        i18n_locale_root_css_name);

                if (!i18n_locale_root_css_name || val_new === val_old) {
                    console.log('2wr6k0z', 'ignore', val_new, val_old);
                    return;
                }

                console.assert(i18n_locale_is_valid(i18n_locale_root_css_name));
                var locale_root = $('#locale_root');
                // 2hV0jxb
                locale_root.removeClass();
                locale_root.addClass(aoiksss.i18n_locale_root_css);
                locale_root.addClass(i18n_locale_root_css_name);
            };

            var i18n_locale_update_url = function (i18n_locale, old) {
                console.log('4v0wPah', 'i18n_locale_update_url', i18n_locale);
                if (i18n_locale === null || i18n_locale === old) {
                    console.log('5y5HhGE', 'ignore', i18n_locale, old);
                    return;
                }
                $timeout(function () {
                    console.log('7hluXLh', 'i18n_locale', i18n_locale);
                    location_hdlrs_skip = true;
                    if (i18n_locale) {
                        console.log('6z9atUZ', 'i18n_locale_update_url timeout',
                                'i18n_locale', i18n_locale);
                        $location.search(aoiksss.i18n_param, i18n_locale);
                    }
                    else {
                        console.log('9tPhRVq', 'i18n_locale_update_url timeout',
                                'i18n_locale', i18n_locale);
                        $location.search(aoiksss.i18n_param,
                                aoiksss.i18n_param_v_off);
                    }
                });
            };

            var i18n_locale_update = function () {
                console.log('9vAiLw5', 'i18n_locale_update');
                var locale_filename =
                        aoiksss.i18n_locale_d[$scope.i18n_locale];

                console.assert(locale_filename);

                // 5btZ4Bx
                var tran = aoiksss.i18n_tran_d[locale_filename];
                // can undefined

                if (tran) {
                    console.log('6hE36De');
                    AoikI18nService.tran_d_set(tran);

                    i18n_locale_root_css_name = locale_filename;

                    // 6r1eSvn
                    $scope.i18n_update_flag = !$scope.i18n_update_flag;
                }
                else {
                    console.log('7rvBjmm', 'locale_filename "' +
                            locale_filename + '" not loaded');

                    var locale_file_url = aoiksss.i18n_tran_dir +
                            locale_filename + '.js';

                    angularLoad.loadScript(locale_file_url).then(function () {
                        console.log('3z0pMUs', locale_file_url);

                        tran = aoiksss.i18n_tran_d[locale_filename];
                        console.assert(tran);

                        AoikI18nService.tran_d_set(tran);

                        i18n_locale_root_css_name = locale_filename;

                        // 8eQyL62
                        $scope.i18n_update_flag = !$scope.i18n_update_flag;
                    });
                }
            };

            var i18n_locale_update_v2 = function (i18n_locale, old) {
                console.log('2frTadu', 'i18n_locale_update_v2');
                if (i18n_locale === null || i18n_locale === old) {
                    console.log('9bw4TN4', 'ignore', i18n_locale, old);
                    return;
                }

                console.log('5qm9bvY', 'i18n_locale_update_v2');
                if (content_page_is_shown) {
                    console.log('4gfh7mr', 'call content_page_hide');
                    content_page_hide();
                }
                $timeout(i18n_locale_update);
            };

            var i18n_update_flag_v2_update = function (val_new, val_old) {
                console.log('2w1QNgM', 'i18n_update_flag_v2_update',
                        val_new, val_old);

                if (val_new === val_old) {
                    console.log('9olzBv8', 'ignore', val_new, val_old);
                    return;
                }

                // 7tDViCc
                // Explained at 8dZEUhE.
                // Set false at 6ibxvBK.
                i18n_update_flag_v2 = true;
            };

            var hello_bool_update_by_url = function () {
                if (location_hdlrs_skip) {
                    console.log('2pv5kgY', 'ignore');
                    return;
                }
                $scope.hello_bool = $location.search().hello === '1';
                console.log('4dXtjwl', 'hello_bool_update_by_url',
                        $scope.hello_bool);
            };

            var hello_bool_update_url = function (hello_bool, old) {
                console.log('6sPiIug', 'hello_bool_update_url');
                if (hello_bool === null || hello_bool === old) {
                    console.log('9nJA8IN', 'ignore', hello_bool, old);
                    return;
                }
                console.log('6vadzq5', 'hello_bool_update_url', hello_bool);
                $timeout(function () {
                    console.log('4mztG2k', 'hello_bool', hello_bool);
                    location_hdlrs_skip = true;
                    if (hello_bool) {
                        console.log('4a5P6I3');
                        $location.search(aoiksss.hello_param,
                                aoiksss.hello_param_v_on);
                    }
                    else {
                        console.log('4u8a7Wz');
                        $location.search(aoiksss.hello_param,
                                aoiksss.hello_param_v_off);
                    }
                });
            };

            var hello_bool_update_css = function (hello_bool, old) {
                console.log('2r8Uppx', 'hello_bool_update_css');
                if (hello_bool === null || hello_bool === old) {
                    console.log('8yucQ3Z', 'ignore', hello_bool, old);
                    return;
                }
                if (hello_bool) {
                    hello_toggle.addClass(
                            aoiksss.hello_toggle_active_css);
                }
                else {
                    hello_toggle.removeClass(
                            aoiksss.hello_toggle_active_css);
                }
            };

            var hello_toggle_clicked_set_true = function () {
                console.log('9uImEMC', 'hello_toggle_clicked_set_true');
                $timeout(function () {
                    $scope.hello_bool = !$scope.hello_bool;
                    console.log('9zQSaPL',
                            'hello_toggle_clicked_set_true timeout',
                            $scope.hello_bool);
                    // 6vIzSHb
                    hello_toggle_clicked = true;
                });
            };

            var hello_toggle_clicked_set_false = function (hello_bool) {
                console.log('2vqOt5I', 'hello_toggle_clicked_set_false',
                        hello_bool);
                if (hello_toggle_clicked === null) {
                    console.log('6f10ej0', 'ignore');
                    return;
                }
                // 2iMcPC6
                hello_toggle_clicked = false;
            };

            var hello_toggle_clicked_show_page = function (hello_bool, old) {
                console.log('4fYKefI', 'hello_toggle_clicked_show_page');
                if (hello_bool === null || hello_bool === old) {
                    console.log('7c40WGQ', 'ignore');
                    return;
                }
                if (hello_toggle_clicked) {
                    if (hello_bool) {
                        hello_page_show();
                    }
                }
            };

            var attribution_toggle_click = function () {
                console.log('7osd5A1', 'attribution_toggle_click');
                $timeout(function () {
                    $scope.attribution_bool = !$scope.attribution_bool;
                    console.log('6iifMjf', 'attribution_toggle_click timeout',
                            $scope.attribution_bool);
                });
            };

            var attribution_bool_hdlr = function (attribution_bool, old) {
                console.log('2vCKlsS', 'attribution_bool_hdlr');
                if (attribution_bool === null || attribution_bool === old) {
                    console.log('3vURyeT', 'ignore', attribution_bool, old);
                    return;
                }
                if (attribution_bool) {
                    attribution_page.addClass(
                            aoiksss.attribution_page_show_css);

                    // If not running in a timeout, the animation for the
                    // close button is not visible.
                    $timeout(function () {
                        attribution_page_close_button.addClass(
                                aoiksss.attribution_page_close_button_active_css
                                );

                        $('html,body').animate({
                            scrollLeft: 0,
                            scrollTop: 0
                        }, {
                            easing: 'swing',
                            duration: 500
                        });
                    });

                    if (!i18n_tran_is_first) {
                        if (content_page_is_shown) {
                            content_page_hide();
                        }
                    }
                    // If the first i18n translation is not done yet
                    else {
                        console.log('9eKL4eh', 'i18n_tran_is_first',
                                i18n_tran_is_first);
                        // Let code 2mNfl1G to manage content page instead.
                    }
                }
                else {
                    attribution_page.removeClass(
                            aoiksss.attribution_page_show_css);

                    attribution_page_close_button.removeClass(
                            aoiksss.attribution_page_close_button_active_css
                            );

                    if (!i18n_tran_is_first) {
                        if (!content_page_is_shown) {
                            content_page_show();
                        }
                    }
                    // If the first i18n translation is not done yet
                    else {
                        console.log('2nVf079', 'i18n_tran_is_first',
                                i18n_tran_is_first);
                        // Let code 2mNfl1G to manage content page instead.
                    }
                }
            };

            var attribution_page_close = function () {
                $timeout(function () {
                    $scope.attribution_bool = false;
                });
            };

            var attribution_bool_update_url = function (attribution_bool,
                    old) {
                console.log('9xz0feu', 'attribution_bool_update_url');
                if (attribution_bool === null || attribution_bool === old) {
                    console.log('9ria0t6', 'ignore', attribution_bool, old);
                    return;
                }
                console.log('8nFfhfP', 'attribution_bool_update_url',
                        attribution_bool);
                $timeout(function () {
                    console.log('2q3f7tb', 'attribution_bool',
                            attribution_bool);
                    location_hdlrs_skip = true;
                    if (attribution_bool) {
                        console.log('5jsUch0');
                        $location.search(
                                aoiksss.attribution_param,
                                aoiksss.attribution_param_v_on);
                    }
                    else {
                        console.log('7hZjsuC');
                        $location.search(
                                aoiksss.attribution_param,
                                aoiksss.attribution_param_v_off);
                    }
                });
            };

            var attribution_bool_update_by_url = function () {
                var attribution_bool_new = $location.search()[
                        aoiksss.attribution_param]
                        === aoiksss.attribution_param_v_on;

                console.log('2cSVjea', 'attribution_bool_update_by_url',
                        attribution_bool_new);

                if ($scope.attribution_bool !== attribution_bool_new) {
                    $timeout(function () {
                        $scope.attribution_bool = attribution_bool_new;
                    });
                }
            };

            var content_page_hide = function () {
                console.log('4e1NQRr', 'content_page_hide');
                if (!content_page_is_shown) {
                    console.log('7wHChp0', 'BUG');
                    return;
                }
                console.log('8qxxEmd');
                content_page_is_shown = false;
                content_page.removeClass(aoiksss.content_page_show_css);
            };

            var content_page_show = function () {
                console.log('4uRYe0o', 'content_page_show');
                if (content_page_is_shown) {
                    console.log('3cyL2Ip', 'content_page_is_shown',
                            content_page_is_shown, 'BUG');
                    return;
                }
                content_page_is_shown = true;
                // 7iHzdVZ
                content_page.addClass(aoiksss.content_page_show_css);

                // Use timeout because need to wait CSS added at 7iHzdVZ to
                // show the tag, otherwise the scrolling below gets wrong
                // coordinates.
                console.log('8x1Gv3m', 'schedule section_active_scrollto');
                $timeout(function () {
                    console.log('6q1iN2i', 'section_active_scrollto before');
                    section_active_scrollto($scope.section_active_id);
                });
            };

            var content_page_show_v2 = function () {
                console.log('7st0ZiS', 'content_page_show_v2',
                        $scope.hello_bool);
                if ($scope.hello_bool) {
                    // "content_page_show" is called at 2nw4Yp9.
                    console.log('8sFVAwo',
                            'i18n_tran_end_hdlr call hello_page_show');
                    hello_page_show();
                }
                else {
                    console.log('9qHYECq',
                            'i18n_tran_end_hdlr call content_page_show');
                    content_page_show();
                }
            };

            var contact_age_num_update = function () {
                var contact_age_num = $('#' + aoiksss.contact_age_num_id);
                console.assert(contact_age_num.length);
                var age = new Date().getFullYear() - 1987;
                contact_age_num.html(age);
                console.log('7aLOSIr',
                        'contact_age_num_update', age);
            };

            var section_id_from_anchor = function (anchor) {
                var section_id = anchor.hash.substring(2);
                var index = section_id.indexOf('?');
                if (index !== -1) {
                    section_id = section_id.substring(0, index);
                }

                console.log('8iTL0oo', section_id);
                return section_id;
            };

            var section_menu_click = function (e) {
                console.log('5emUXsP', 'section_menu_click');
                e.preventDefault();
                if (section_active_is_updating_v1) {
                    console.log('9aWccbh');
                    return;
                }
                if (section_active_is_updating_v2) {
                    console.log('6cjSpgT');
                    return;
                }
                var anchor = e.currentTarget;
                var section_id = section_id_from_anchor(anchor);
                $timeout(function () {
                    $scope.section_active_id = '';
                });
                $timeout(function () {
                    $scope.section_active_id = section_id;
                });
            };

            var section_id_from_path = function () {
                // E.g. /contact -> contact
                var path = $location.path();
                console.assert(!path || path[0] === '/');
                return path.substring(1);
                // Result can be invalud section id.
            };

            var section_id_from_path_v2 = function () {
                // Remove heading "/"
                var section_id = section_id_from_path();

                var section_id_dft = section_info_s[0].section_id;

                var info_d = section_info_d;

                var section_id_new = null;

                if (!section_id) {
                    section_id_new = section_id_dft;
                }
                else {
                    // E.g. contact123 -> contact
                    for (var i = 0; i < section_id.length; i++) {
                        var section_id_maybe = section_id.substring(0,
                                section_id.length - i);
                        if (info_d.hasOwnProperty(section_id_maybe)) {
                            section_id_new = section_id_maybe;
                            break;
                        }
                    }

                    if (!section_id_new) {
                        section_id_new = section_id_dft;
                    }
                }

                console.assert(info_d.hasOwnProperty(section_id_new));

                return section_id_new;
                // Result is valud section id.
            };

            $scope.section_is_hidden = function (section_id) {
                console.log('2idvIq3', 'section_is_hidden', section_id);
                if (!$scope.section_active_id) {
                    console.log('3q3QaCt', 'ignore');
                    return false;
                }
                var is_hidden = $scope.slidy_bool &&
                        (section_id !== $scope.section_active_id);
                console.log('9hZYdq1', is_hidden);
                return is_hidden;
            };

            var hello_page_show = function () {
                console.log('5mIsXGL');
                hello_page.removeClass("hello_page_hide");
                hello_page.addClass("hello_page_show");

                console.log('6xMXB78');
                hello_page_hide_timer = $timeout(function () {
                    console.log('8t99HeY');
                    hello_page_hide();
                }, 800);
            };

            var hello_page_hide = function () {
                console.log('7aWeJfg');
                //
                if (hello_page_hide_timer !== null) {
                    console.log('6rcMIeV', hello_page_hide_timer);
                    $timeout.cancel(hello_page_hide_timer);
                    hello_page_hide_timer = null;
                }
                //
                if (hello_page_hide_is_changing) {
                    console.log('9sjVNiU');
                    return;
                }
                // Set false at 5uaA90I
                hello_page_hide_is_changing = true;

                // Tag is at 9tDwytO
                // CSS is at 7pYItvP
                hello_page.removeClass("hello_page_show");
                hello_page.addClass("hello_page_hide");

                //
                console.log('3g1xIq9');
                $timeout(function () {
                    console.log('2nw4Yp9');
                    // 5uaA90I
                    hello_page_hide_is_changing = false;

                    if (!$scope.attribution_bool) {
                        content_page_show();
                    }
                });
            };

            var content_page_nav_set_css_sticky_on_scroll = function () {
                // Stick toc to window if the window has gone past the contact
                // section's heading. "stick" class is at 5wlFOGq.
                var window_top = $(window).scrollTop();
                if (window_top > 75) {
                    content_page_nav.addClass('stick');
                } else {
                    content_page_nav.removeClass('stick');
                }
            };

            var section_active_update_url = function (section_active_id, old)
            {
                console.log('2t15FKm', 'section_active_update_url',
                        section_active_id);

                // Due to 4fKBq80 and 8cEcF71
                if (!section_active_id || section_active_id === old) {
                    console.log('5exwNMG', 'ignore', section_active_id, old);
                    return;
                }

                if (section_id_from_path() !== section_active_id) {
                    $timeout(function () {
                        console.log('5roYQDx', section_active_id,
                                $scope.section_active_id);

                        // 4jM5Vq4
                        // Set false at 4fXNT1K
                        location_hdlrs_skip = true;
                        $location.path(section_active_id);
                    });
                }
                else {
                    console.log('3ye7ZmS');
                }
            };

            var slidy_menu_click = function (slidy_bool) {
                console.log('9qCNRDd', 'slidy_menu_click', slidy_bool);
                if ($scope.slidy_bool !== slidy_bool) {
                    $timeout(function () {
                        console.log('9dIlleW', 'slidy_menu_click timeout',
                                slidy_bool);
                        $scope.slidy_bool = slidy_bool;
                    });
                }
            };

            var slidy_menu_click_on = function () {
                console.log('8ch4ict', 'slidy_menu_click_on');
                return slidy_menu_click(true);
            };

            var slidy_menu_click_off = function () {
                console.log('5wVdaeC', 'slidy_menu_click_on');
                return slidy_menu_click(false);
            };

            var slidy_menu_update_css = function (slidy_bool, old) {
                console.log('4sZvJBt', 'slidy_menu_update_css',
                        slidy_bool);

                if (slidy_bool === null || slidy_bool === old) {
                    console.log('9oKmHF8', 'ignore', slidy_bool, old);
                    return;
                }

                if (slidy_bool) {
                    slidy_on_button.addClass(
                            aoiksss.slidy_menu_active_css);
                    slidy_off_button.removeClass(
                            aoiksss.slidy_menu_active_css);
                }
                else {
                    slidy_on_button.removeClass(
                            aoiksss.slidy_menu_active_css);
                    slidy_off_button.addClass(
                            aoiksss.slidy_menu_active_css);
                }
            };

            var slidy_bool_update_url = function (slidy_bool, old) {
                console.log('9pB7Mhc', 'slidy_bool_update_url', slidy_bool);

                if (slidy_bool === null || slidy_bool === old) {
                    console.log('3s2AARy', 'ignore', slidy_bool, old);
                    return;
                }

                if (!$scope.section_active_id) {
                    console.log('5jtlcLm', 'ignore');
                    return;
                }

                if (slidy_bool) {
                    if ($location.search()[slidy_param] !==
                            slidy_param_v_on) {
                        $timeout(function () {
                            console.log('4g5BtMz');

                            // 7bvvgnF
                            // Set false at 4fXNT1K
                            location_hdlrs_skip = true;

                            $location.search(slidy_param,
                                    slidy_param_v_on);
                        });
                    }
                    else {
                        console.log('4qjSfZV');
                    }
                }
                else {
                    if ($location.search().hasOwnProperty(
                            slidy_param)) {
                        $timeout(function () {
                            console.log('7ayqfNl');

                            // 3b8XC97
                            // Set false at 4fXNT1K
                            location_hdlrs_skip = true;

                            $location.search(slidy_param,
                                    slidy_param_v_off);
                        });
                    }
                    else {
                        console.log('6mOapxh');
                    }
                }
            };

            var slidy_bool_update_by_url = function () {
                console.log('7a3T9iu', 'slidy_bool_update_by_url');
                if (location_hdlrs_skip) {
                    console.log('5vlmgSW');
                    return;
                }
                var slidy_bool_new = ($location.search()[slidy_param]
                        === slidy_param_v_on);
                if ($scope.slidy_bool !== slidy_bool_new) {
                    $timeout(function () {
                        console.log('7x1h94K', 'slidy_bool_new',
                                slidy_bool_new);
                        $scope.slidy_bool = slidy_bool_new;
                    });
                }
            };

            var section_active_update_by_url = function () {
                console.log('8fDTfF2', 'section_active_update_by_url',
                        $location.path(), location_hdlrs_skip);
                //
                if (location_hdlrs_skip) {
                    console.log('5nftW4G');
                    return;
                }

                // If "section_id_v1" is valid, "section_id_v2" is equal to
                // "section_id_v1".
                // If "section_id_v1" is invalid, "section_id_v2" is a valid
                // fallback.
                var section_id_v1 = section_id_from_path();
                var section_id_v2 = section_id_from_path_v2();
                console.log('5aKJD9P', section_id_v1, section_id_v2);

                if (section_id_v1 !== section_id_v2) {
                    console.log('6dVieeg');
                    $timeout(function () {
                        console.log('6tQB10u');
                        $location.path(section_id_v2).replace();
                    });
                }
                else {
                    console.log('2uxTRwH',
                            $scope.section_active_id, section_id_v2);

                    if ($scope.section_active_id !== section_id_v2) {
                        console.log('9ycKhuw',
                                'section_active_update_by_url schedule');
                        $timeout(function () {
                            console.log('7uwhulK');
                            $scope.section_active_id = section_id_v2;
                        });
                    }
                }
            };

            // CSS is at 4ogZkkT and 4f0RuB8.
            var section_menu_item_set_css_active = function (li) {
                li.addClass(aoiksss.section_menu_item_active_css);
            };

            var section_menu_item_set_css_inactive = function (li) {
                li.removeClass(aoiksss.section_menu_item_active_css);
            };

            var section_active_update_on_scroll = function () {
                console.log("9yMNgBc", 'section_active_update_on_scroll',
                        $scope.slidy_bool,
                        section_active_is_updating_v1);

                if ($scope.slidy_bool) {
                    console.log('2yoLYTk');
                    return;
                }

                if (!content_page_is_shown) {
                    console.log('7c5mGce', 'not content_page_is_shown');
                    return;
                }

                // If the scrolling is caused by code 4zgL62C,
                // do not interfere with it here.
                if (section_active_is_updating_v1) {
                    console.log('5rOT8af', 'is_updating_v1');
                    return;
                }


                if (section_active_is_updating_v2) {
                    console.log('9jpVMdU', 'is_updating_v2');
                    return;
                }

                var win_top = Math.ceil($(window).scrollTop());
                for (var i = 0; i < section_info_s.length; i++) {
                    var item = section_info_s[i];
                    var item_next = section_info_s[i + 1];
                    // can undefined

                    var elem_top = Math.floor(item.elem.offset().top);
                    if ((win_top >= elem_top && (item_next ?
                            (win_top < Math.floor(item_next.elem.offset().top))
                            : true))
                            || i === 0 && win_top < elem_top) {
                        //
                        var cur_sec_id = item.section_id;

                        if ($scope.section_active_id !== cur_sec_id) {
                            // 2yqyug0
                            section_active_is_updating_v2 = true;
                            $scope.section_active_id = cur_sec_id;
                            $scope.$digest();
                            // 2c7MPl7
                            section_active_is_updating_v2 = false;
                        }
                        break;
                    }
                }
            };

            var section_nav_toc_update_css = function (section_active_id,
                    old) {
                console.log('8gilQOT', 'section_nav_toc_update_css',
                        section_active_id);

                // Due to 4fKBq80 and 8cEcF71
                if (!section_active_id || section_active_id === old) {
                    console.log('6tcTSwx', 'ignore', section_active_id, old);
                    return;
                }

                for (var i = 0; i < section_info_s.length; i++) {
                    var item = section_info_s[i];

                    if (item.section_id === section_active_id) {
                        section_menu_item_set_css_active(item.toc_li);
                    } else {
                        section_menu_item_set_css_inactive(item.toc_li);
                    }
                }
            };

            var section_nav_toc_update_href = function () {
                console.log('3ztgqbj', 'section_nav_toc_update_href');
                var url = $location.url();
                var qmark_index = url.indexOf('?');
                var url_query = (qmark_index === -1) ?
                        '' : url.substring(qmark_index);
                for (var i = 0; i < section_info_s.length; i++) {
                    var info = section_info_s[i];
                    var href_new = '#/' + info.section_id + url_query;
                    var anchor = info.toc_li.find('a');
                    anchor.attr('href', href_new);
                }
            };

            var section_active_move_next = function () {
                var cur_idx = section_info_d[$scope.section_active_id].index;
                var next_idx = (cur_idx + 1) % 5;
                $scope.section_active_id = section_info_s[next_idx].section_id;
            };

            var section_active_move_prev = function () {
                var cur_idx = section_info_d[$scope.section_active_id].index;
                var prev_idx = (cur_idx - 1 + 5) % 5;
                $scope.section_active_id = section_info_s[prev_idx].section_id;
            };

            var section_active_scrollto = function (section_active_id, old) {
                console.log('9eNzxvo', 'section_active_scrollto',
                        section_active_id);

                // Due to 4fKBq80 and 8cEcF71
                if (!section_active_id || section_active_id === old) {
                    console.log('4yjC3Ch', 'ignore', section_active_id, old);
                    return;
                }

                if (!content_page_is_shown) {
                    console.log('4jqyLLp');
                    return;
                }

                if (section_active_is_updating_v1) {
                    console.log('6yRPpfb');
                    return;
                }

                if (section_active_is_updating_v2) {
                    console.log('9dy4RZE');
                    return;
                }

                var section_info = section_info_d[$scope.section_active_id];
                console.assert(section_info);

                var elem = section_info.elem;

                if (!$scope.slidy_bool) {
                    var y;
                    if (section_info.index === 0) {
                        y = 0;
                        console.log('4x7Kou8', 'first section');
                    }
                    else {
                        y = Math.floor(elem.offset().top);
                        console.log('2m3Xtgd', 'not first section');
                    }

                    var win_y = Math.floor($(window).scrollTop());

                    console.log('6xaWIiM', $scope.section_active_id, win_y, y);

                    if (win_y === y) {
                        console.log('3nzCuwn', win_y, y);
                        return;
                    }

                    // 6fiGm4b
                    // Set false at 4iJkX33
                    section_active_is_updating_v1 = true;

                    // 4zgL62C
                    $('html,body').animate({
                        scrollLeft: 0,
                        scrollTop: y
                    }, {
                        easing: 'swing',
                        duration: 500,
                        always: function () {
                            console.log('3flncgY');
                            $timeout(function () {
                                console.log('4iJkX33',
                                        'section_active_scrollto timeout');
                                section_active_is_updating_v1 = false;
                            });

                        }
                    });
                }
                else {
                    $('html,body').animate({
                        scrollLeft: 0,
                        scrollTop: 0
                    }, {
                        duration: 0
                    });

                    elem.css({
                        opacity: 0
                    });
                    elem.animate({opacity: 1}, {
                        duration: 700
                    });
                }
            };

            // For slidy mode
            var section_active_update_on_wheel = function (event) {
                console.log('2wcdodj: ', event.deltaY, event.deltaFactor);

                if (event.deltaY < 0) {
                    // "Math.ceil" and "+ 1" is for Chrome.
                    // Chrome's "$(window).scrollTop()" may return
                    // fractional number. And the added total is one
                    // short in the page bottom.
                    if ($(document).height() <=
                            Math.ceil($(window).scrollTop() +
                                    $(window).height()) + 1) {
                        slidy_mousewheel_delta_sum += 1;
                        if (slidy_mousewheel_delta_sum >=
                                slidy_mousewheel_delta_sum_max) {
                            slidy_mousewheel_delta_sum = 0;

                            event.preventDefault();

                            section_active_move_next();
                            console.log('6oENUu1: ' + $scope.section_active_id);

                            $scope.$digest();
                        }
                    }
                }
                else if (event.deltaY > 0) {
                    if ($(window).scrollTop() === 0) {
                        slidy_mousewheel_delta_sum -= 1;

                        if (slidy_mousewheel_delta_sum <=
                                slidy_mousewheel_delta_sum_min) {
                            slidy_mousewheel_delta_sum = 0;

                            event.preventDefault();

                            section_active_move_prev();
                            console.log('6fQ5S7S: ' + $scope.section_active_id);

                            $scope.$digest();
                        }
                    }
                }
            };

            var section_update_css = function (slidy_bool, old) {
                console.log('8rNm3WU', 'section_update_css',
                        slidy_bool);

                if (slidy_bool === null || slidy_bool === old) {
                    console.log('8buN3IY', 'ignore', slidy_bool, old);
                    return;
                }

                if (!$scope.section_active_id) {
                    console.log('6rpY73V', 'ignore');
                    return;
                }

                for (var i = 0; i < section_info_s.length; i++) {
                    var item = section_info_s[i];

                    var section = $('#' + item.section_id);
                    console.assert(section.length === 1);

                    if (!$scope.slidy_bool ||
                            item.section_id === $scope.section_active_id) {
                        section.addClass(aoiksss.section_show_css);
                    }
                    else {
                        section.removeClass(aoiksss.section_show_css);
                    }
                }
            };

            var slidy_bool_scroll_to_section_active = function (slidy_bool,
                    old) {
                console.log('3aqvxgY', 'slidy_bool_scroll_to_section_active',
                        slidy_bool);

                if (slidy_bool === null || slidy_bool === old) {
                    console.log('5z4K9yi', 'ignore', slidy_bool, old);
                    return;
                }

                if (!$scope.section_active_id) {
                    console.log('6xnFLZt', 'ignore');
                    return;
                }

                if (slidy_bool) {
                    console.log('4rbZI5Q');

                    $(window).off('scroll', section_active_update_on_scroll);

                    $timeout(function () {
                        section_active_scrollto($scope.section_active_id);
                    });

                    $timeout(function () {
                        console.log('3a7h6F9');
                        $(document).mousewheel(
                                section_active_update_on_wheel);
                    });
                }
                else {
                    console.log('5nH6U2p');

                    $(document).off('mousewheel',
                            section_active_update_on_wheel);

                    // Running in a timeout is required because need to
                    // wait sections are shown before scrolling.
                    $timeout(function () {
                        console.log('4bTpvuH');
                        section_active_scrollto(
                                $scope.section_active_id);
                    });

                    $timeout(function () {
                        console.log('2hoEGQQ');
                        $(window).scroll(
                                section_active_update_on_scroll);
                    });
                }
            };

            var location_hdlrs_skip_set_false = function () {
                console.log('5nftW4G', 'location_hdlrs_skip_set_false');
                location_hdlrs_skip = false;
            };

            //
            contact_age_num_update();

            //
            $(window).scroll(content_page_nav_set_css_sticky_on_scroll);

            $(window).scroll(section_active_update_on_scroll);

            //
            i18n_nav_mask.click(i18n_nav_set_off);

            i18n_nav_toggle.click(i18n_nav_set_off);

            i18n_nav_toggle2.click(i18n_nav_set_on);

            var i18n_nav_item_init = function () {
                var i18n_li_s = $('#' + aoiksss.i18n_nav_items_id + ' li');
                console.assert(i18n_li_s.length);

                i18n_li_s.each(function () {
                    var i18n_li = $(this);
                    var locale = i18n_li.attr(
                            aoiksss.i18n_nav_item_locale_attr);
                    console.assert(locale);
                    console.assert(i18n_locale_is_valid(locale));

                    var i18n_nav_item_click_hdlr = function (e) {
                        e.preventDefault();
                        $timeout(function () {
                            $scope.i18n_locale = null;
                        });
                        $timeout(function () {
                            console.log('6ehtj0U', locale);
                            // 4sNgYHY
                            $scope.i18n_locale = locale;
                            $scope.i18n_nav_bool = false;
                        });
                    };

                    i18n_li.click(i18n_nav_item_click_hdlr);
                });
            };

            i18n_nav_item_init();

            $scope.$watch('i18n_nav_bool', i18n_nav_update_css);

            $scope.$watch('i18n_locale', i18n_locale_update_url);

            $scope.$watch('i18n_locale', i18n_locale_update_v2);

            $scope.$watch('i18n_update_flag', i18n_locale_update_css);

            $scope.$watch('i18n_update_flag', i18n_update_flag_v2_update);

            $scope.$on('i18n_tran_start', i18n_tran_start_hdlr);

            $scope.$on('i18n_tran_end', i18n_tran_end_hdlr);

            $scope.$on('$locationChangeSuccess', i18n_locale_update_by_url);

            //
            slidy_off_button.click(slidy_menu_click_off);

            slidy_on_button.click(slidy_menu_click_on);

            $scope.$on('$locationChangeSuccess', slidy_bool_update_by_url);

            $scope.$watch('slidy_bool', slidy_bool_update_url);

            $scope.$watch('slidy_bool', slidy_menu_update_css);

            $scope.$watch('slidy_bool', slidy_bool_scroll_to_section_active);

            $scope.$watchGroup(['slidy_bool', 'section_active_id'],
                    section_update_css);

            //
            hello_toggle.click(hello_toggle_clicked_set_true);

            hello_page.click(hello_page_hide);

            $scope.$watch('hello_bool', hello_bool_update_url);

            $scope.$watch('hello_bool', hello_bool_update_css);

            $scope.$watch('hello_bool', hello_toggle_clicked_show_page);

            // Must be the last listener on "hello_bool".
            $scope.$watch('hello_bool', hello_toggle_clicked_set_false);

            $scope.$on('$locationChangeSuccess', hello_bool_update_by_url);

            //
            attribution_toggle.click(attribution_toggle_click);

            attribution_page_close_button.click(attribution_page_close);

            $scope.$watch('attribution_bool', attribution_bool_update_url);

            $scope.$watch('attribution_bool', attribution_bool_hdlr);

            $scope.$on('$locationChangeSuccess',
                    attribution_bool_update_by_url);

            //
            var section_menu_init = function () {
                var menu_li_s = $('#' + aoiksss.section_menu_id).children();
                console.assert(menu_li_s.length);

                for (var i = 0; i < menu_li_s.length; i++) {
                    var anchor = menu_li_s.eq(i).find('a');
                    console.assert(anchor.length);

                    // 6kxQD2q
                    anchor.click(section_menu_click);
                }
            };

            section_menu_init();

            $scope.$watch('section_active_id', section_active_update_url);

            $scope.$watch('section_active_id', section_nav_toc_update_css);

            $scope.$watch('section_active_id', section_active_scrollto);

            $scope.$on('$locationChangeSuccess', section_active_update_by_url);

            $scope.$on('$locationChangeSuccess', section_nav_toc_update_href);

            // Must be the last listener on "$locationChangeSuccess".
            $scope.$on('$locationChangeSuccess', location_hdlrs_skip_set_false);

            //
            console.log('5zNKk4f', 'app_ctlr end');
        }
    ]);
})();
