(function() {

  $(function() {
      var local = asus ? asus.script.get_local() : "",
          mobileString, localCookiePolicyString;

      $.ajax({
          method: "GET",
          // https://blog.johnsonlu.org/javascript%E9%80%8F%E9%81%8Ejsonp%E5%AE%8C%E6%88%90%E8%B7%A8%E7%AB%99%E8%AB%8B%E6%B1%82/ 
          url: location.protocol + "//" + location.host + "/assets/plugin_split/asus/alert/asus_alert/cookienotice.json",
          dataType: "jsonp",
          cache: true,
          jsonpCallback: "cookie",
          success: function(data) {
              var localString = local.toUpperCase().replace('NEW', '');

              if (data[localString]) {
                  mobileString = data[localString].mobile;
                  localCookiePolicyString = data[localString].desktop;

                  localCookieYes = data[localString].yes;
                  localCookieNo = data[localString].no;

                  localCookiePolicyString = $("body").hasClass("mobile") ? mobileString : localCookiePolicyString;
                  showTopBar(localCookiePolicyString, localCookieYes, localCookieNo);
              }
          }
      });

  });

  function showTopBar(_string, _yes, _no) {
      /*prevent ga undefined*/
      var getCookiePolicy = asus ? asus.cookie.get('isReadCookiePolicyDNT') : "";

      if (getCookiePolicy == '' || getCookiePolicy == undefined || getCookiePolicy == 'No') {
          window.ga = function() {
              return;
          }
      }

      if (asus.cookie.get('isReadCookiePolicyDNT') == undefined) {
          asus.cookie.set('isReadCookiePolicyDNT', '');
      }

      if (asus.cookie.get('isReadCookiePolicyDNT') != '' && asus.cookie.get('isReadCookiePolicyDNT') != undefined) {
          return;
      } else {
          var newDom = "<div id='cookie-policy-info'>" + "<div class='wrap' style='box-sizing: initial;font-size:14px;background-color: #424242;'>" + _string + "<br>" + "<a id='btn-read-ck' class='btn-asus btn-ok' style='box-sizing: initial;'>" + _yes + "</a>" + "<a id='btn-noread-ck' class='btn-asus btn-reject' style='box-sizing: initial;'>" + _no + "</a>" + "</div><span id='btn-close-ck' class='close'>x</span></div>";

          $(newDom).prependTo("body");
          $("body").addClass('show-cookie-policy-info').css({
              'overflow-x': 'visible',
              'top': '220px',
              'font-family': '"Segoe UI", "微軟正黑體", "Microsoft JhengHei", "Arial", "新細明體"'
          });
          $("#cookie-policy-info p").css({
              'font-size': '14px',
              'line-height': '19px',
              'font-family': '"Segoe UI", "微軟正黑體", "Microsoft JhengHei", "Arial", "新細明體"',
              'font-weight': '400'
          })

          $("#cookie-policy-info")
              .find(".btn-ok")
              .on("click", function() {
                  asus.cookie.set('isReadCookiePolicyDNT', 'Yes', 60 * 60 * 24 * 3650);
                  $("body").removeClass('show-cookie-policy-info').css({
                      'overflow-x': 'hidden',
                      'top': 'initial'
                  });
                  $("#cookie-policy-info").hide();
              }).end()
              .find(".close")
              .on("click", function() {
                  asus.cookie.set('isReadCookiePolicyDNT', 'X', 60 * 30);
                  $("body").removeClass('show-cookie-policy-info').css({
                      'overflow-x': 'hidden',
                      'top': 'initial'
                  });
              }).end()
              .find(".btn-reject")
              .on("click", function() {
                  asus.cookie.set('isReadCookiePolicyDNT', 'No', 60 * 60 * 24 * 2);
                  $("body").removeClass('show-cookie-policy-info').css({
                      'overflow-x': 'hidden',
                      'top': 'initial'
                  });
                  $("#cookie-policy-info").hide();
              });
      }
  }
})();