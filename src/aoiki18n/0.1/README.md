# AoikI18n-AngularJS
I18n library for AngularJS.

Modified from [jlg-i18n](https://github.com/jlguenego/jlg-i18n).

Differences compared to **jlg-i18n**:
- Only implement translation of keys to values. Do not handle locale settings
  like date and currency.

- Loading a translation dict is not bound to using XMLHttpRequest. Client code
  can prepare a translation dict in whatever way prefered, and then use service
  method **tran_d_set** to set the translation dict for use.
  Below is an example:

  ```
(function () {
    var app = angular.module('Example', ['AoikI18n']);

    app.controller('app_ctlr', ['$scope', 'AoikI18nService',
        function ($scope, AoikI18nService) {
            var tran_d = {
                'name': 'Aoik'
            };
            AoikI18nService.tran_d_set(tran_d);
        }
    ]);
})();
  ```

- Filter **i18n** is not set to stateful. Instead it is recommended to manually
  pass an **i18n_update_flag** to the filter as the second argument to make the
  filter expression stateful. Alternatively, an **i18n** directive can be
  defined that watches the **i18n_update_flag** and updates accordingly. Below
  is an example of the two methods:

  ```
<script>
(function () {
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
})();
</script>

<a href="{{'name'|i18n:i18n_update_flag}}" data-i18n="name"></a>
  ```
  - `'name'` is the I18n key. For **i18n** directive, the quotes are not needed.
  - Translation result of **i18n** filter can not contain html tags.
  - Translation result of **i18n** directive can contain html tags.

See [AoikStickyScrollySlidy](https://github.com/AoiKuiyuyou/AoikStickyScrollySlidy)
for an example of this library in use.
