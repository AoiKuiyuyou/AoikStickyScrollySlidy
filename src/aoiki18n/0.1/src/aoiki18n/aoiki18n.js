//
// Modified from:
// https://github.com/jlguenego/jlg-i18n/blob/f51d3aff2e3cfb006c9daab4de08263b87f289a3/src/jlg-i18n.js
(function () {
    'use strict';

    var app = angular.module('AoikI18n', []);

    var AoikI18nServiceProvider = function () {
        this.$get = function () {
            var service = {};

            service.tran_d = null;

            service.tran_d_set = function (tran_d) {
                this.tran_d = tran_d;
            };

            return service;
        };
    };

    // "AoikI18nService" is an injection at 6gHaFzQ
    var i18n_filter_make = function (AoikI18nService) {
        var filter = function (text) {
            var result = text;

            var tran_d = AoikI18nService.tran_d;

            if (!tran_d) {
                return text;
            }

            if (tran_d.hasOwnProperty(text)) {
                // 8nuq1o8
                result = tran_d[text];
            }

            // Copy pluralization and interpolation arguments into an array.
            // Start from the second because the first is the translation
            // key.
            var args = Array.prototype.slice.call(arguments, 1);

            //
            var field_wildcard = '@';

            var field_sep = '_';

            var get_plural_keys = function () {
                // 9bTswGk
                // Each "plural key field" can be an exact value given by
                // corresponding plural argument, or a wildcard value "@". E.g.
                // 1 or @. So each "plural key field" has two possible values.
                // This function produces a combination of all the possible
                // plural key field values, resulting in an array of all
                // possible plural keys.
                var plural_key_s = [];

                for (var i = 0; i < Math.pow(2, args.length); i++) {
                    var field_s = [];
                    for (var j = 0; j < args.length; j++) {
                        // "i" contains one bit that by ANDing with
                        // "Math.pow(2, j)", indicates whether the j-th
                        // plural key part should use the exact value given
                        // by the j-th plural argument or a default "@".
                        //
                        // Notice because i increments from 0, for each
                        // plural key part, the exact value given is pushed
                        // before the default "@". This means an exact
                        // plural key appears earlier than its corresponding
                        // default, e.g. "1_1" is earlier than "1_@".
                        // This is important because at 3ph4rlZ, the first
                        // plural key that exists in the pluralization dict
                        // is used.
                        //
                        // jshint bitwise:false
                        var is_wildcard = i & Math.pow(2, j);

                        // 4oVtJPb
                        // jshint ignore:line
                        if (is_wildcard) {
                            field_s.push(field_wildcard);
                        } else {
                            field_s.push(args[j]);
                        }
                    }
                    var plural_key = field_s.join(field_sep);
                    plural_key_s.push(plural_key);
                }
                return plural_key_s;
            };

            // Init a plural key using "field_wildcard" for each field.
            // E.g. "@_@".
            var plural_key = Array.apply(null, new Array(args.length))
                    .map(function () {
                        return field_wildcard;
                    })
                    .join(field_sep);

            // If after translation at 8nuq1o8, result is a pluralization dict.
            // E.g.
            //  {
            //      "You have [[nbr]] message(s) and [[err]] error(s)": {
            //          "1_1": "You have [[nbr]] message and [[err]] error",
            //          "1_@": "You have [[nbr]] message and [[err]] errors",
            //          "@_1": "You have [[nbr]] messages and [[err]] error",
            //          "@_@": "You have [[nbr]] messages and [[err]] errors"
            //  }
            if (typeof result === 'object') {
                // Make a list of possible plural keys.
                // E.g. for args [1, 2], the list of possible plural keys is:
                // ['1_2', '1_@', '@_2', '@_@'].
                var plural_key_s = get_plural_keys();

                // 3ph4rlZ
                // From the list of possible plural keys, find the most accurate
                // one that also exists in the pluralization dict.
                //
                // Starting from index 0 and using the first one found. The
                // first one is the most accurate one is guaranteed by algorithm
                // at 9bTswGk's insertion order at 4oVtJPb.
                var found = false;

                for (var i = 0; i < plural_key_s.length; i++) {
                    // If the plural key exists
                    if (result.hasOwnProperty(plural_key_s[i])) {
                        plural_key = plural_key_s[i];
                        result = result[plural_key];
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    result = text;
                }
            }

            // Interpolation
            var field_s = plural_key.split('_');

            for (var i = 0; i < args.length; i++) {
                if (field_s[i] === '@') {
                    result = result.replace(/\[\[.*?\]\]/, args[i]);
                }
            }

            //
            return result;
        };

        return filter;
    };

    //
    app.provider('AoikI18nService', AoikI18nServiceProvider);

    // 6gHaFzQ
    app.filter('i18n', ['AoikI18nService', i18n_filter_make]);
})();
