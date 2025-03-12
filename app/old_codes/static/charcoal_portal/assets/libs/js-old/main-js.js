jQuery(document).ready(function($) {
    'use strict';
    if ($(".notification-list").length) { $('.notification-list').slimScroll({ height: '250px' }); }
    if ($(".menu-list").length) { $('.menu-list').slimScroll({}); }
    if ($(".sidebar-nav-fixed a").length) {
        $('.sidebar-nav-fixed a').click(function(event) {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({ scrollTop: target.offset().top - 90 }, 1000, function() {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { return false; } else {
                            $target.attr('tabindex', '-1');
                            $target.focus();
                        };
                    });
                }
            };
            $('.sidebar-nav-fixed a').each(function() { $(this).removeClass('active'); })
            $(this).addClass('active');
        });
    }
    if ($('[data-toggle="tooltip"]').length) { $('[data-toggle="tooltip"]').tooltip() }
    if ($('[data-toggle="popover"]').length) { $('[data-toggle="popover"]').popover() }
    if ($('.chat-list').length) { $('.chat-list').slimScroll({ color: 'false', width: '100%' }); }
});



!(function(n, i, e, a) {
  (n.navigation = function(t, s) {
    var o = {
        responsive: !0,
        mobileBreakpoint: 991,
        showDuration: 200,
        hideDuration: 200,
        showDelayDuration: 0,
        hideDelayDuration: 0,
        submenuTrigger: "hover",
        effect: "fade",
        submenuIndicator: !0,
        submenuIndicatorTrigger: !1,
        hideSubWhenGoOut: !0,
        visibleSubmenusOnMobile: !1,
        fixed: !1,
        overlay: !0,
        overlayColor: "rgba(0, 0, 0, 0.5)",
        hidden: !1,
        hiddenOnMobile: !1,
        offCanvasSide: "left",
        offCanvasCloseButton: !0,
        animationOnShow: "",
        animationOnHide: "",
        onInit: function() {},
        onLandscape: function() {},
        onPortrait: function() {},
        onShowOffCanvas: function() {},
        onHideOffCanvas: function() {}
      },
      r = this,
      u = Number.MAX_VALUE,
      d = 1,
      l = "click.nav touchstart.nav",
      f = "mouseenter focusin",
      c = "mouseleave focusout";
    r.settings = {};
    var t = (n(t), t);
    n(t).find(".nav-search").length > 0 &&
      n(t)
        .find(".nav-search")
        .find("form")
        .prepend(
          "<span class='nav-search-close-button' tabindex='0'>&#10005;</span>"
        ),
      (r.init = function() {
        (r.settings = n.extend({}, o, s)),
          r.settings.offCanvasCloseButton &&
            n(t)
              .find(".nav-menus-wrapper")
              .prepend(
                "<span class='nav-menus-wrapper-close-button'>&#10005;</span>"
              ),
          "right" == r.settings.offCanvasSide &&
            n(t)
              .find(".nav-menus-wrapper")
              .addClass("nav-menus-wrapper-right"),
          r.settings.hidden &&
            (n(t).addClass("navigation-hidden"),
            (r.settings.mobileBreakpoint = 99999)),
          v(),
          r.settings.fixed && n(t).addClass("navigation-fixed"),
          n(t)
            .find(".nav-toggle")
            .on("click touchstart", function(n) {
              n.stopPropagation(),
                n.preventDefault(),
                r.showOffcanvas(),
                s !== a && r.callback("onShowOffCanvas");
            }),
          n(t)
            .find(".nav-menus-wrapper-close-button")
            .on("click touchstart", function() {
              r.hideOffcanvas(), s !== a && r.callback("onHideOffCanvas");
            }),
          n(t)
            .find(".nav-search-button, .nav-search-close-button")
            .on("click touchstart keydown", function(i) {
              i.stopPropagation(), i.preventDefault();
              var e = i.keyCode || i.which;
              "click" === i.type ||
              "touchstart" === i.type ||
              ("keydown" === i.type && 13 == e)
                ? r.toggleSearch()
                : 9 == e && n(i.target).blur();
            }),
          n(t).find(".megamenu-tabs").length > 0 && y(),
          n(i).resize(function() {
            r.initNavigationMode(C()), O(), r.settings.hiddenOnMobile && m();
          }),
          r.initNavigationMode(C()),
          r.settings.hiddenOnMobile && m(),
          s !== a && r.callback("onInit");
      });
    var h = function() {
        n(t)
          .find(".nav-submenu")
          .hide(0),
          n(t)
            .find("li")
            .removeClass("focus");
      },
      v = function() {
        n(t)
          .find("li")
          .each(function() {
            n(this).children(".nav-dropdown,.megamenu-panel").length > 0 &&
              (n(this)
                .children(".nav-dropdown,.megamenu-panel")
                .addClass("nav-submenu"),
              r.settings.submenuIndicator &&
                n(this)
                  .children("a")
                  .append(
                    "<span class='submenu-indicator'><span class='submenu-indicator-chevron'></span></span>"
                  ));
          });
      },
      m = function() {
        n(t).hasClass("navigation-portrait")
          ? n(t).addClass("navigation-hidden")
          : n(t).removeClass("navigation-hidden");
      };
    (r.showSubmenu = function(i, e) {
      C() > r.settings.mobileBreakpoint &&
        n(t)
          .find(".nav-search")
          .find("form")
          .fadeOut(),
        "fade" == e
          ? n(i)
              .children(".nav-submenu")
              .stop(!0, !0)
              .delay(r.settings.showDelayDuration)
              .fadeIn(r.settings.showDuration)
              .removeClass(r.settings.animationOnHide)
              .addClass(r.settings.animationOnShow)
          : n(i)
              .children(".nav-submenu")
              .stop(!0, !0)
              .delay(r.settings.showDelayDuration)
              .slideDown(r.settings.showDuration)
              .removeClass(r.settings.animationOnHide)
              .addClass(r.settings.animationOnShow),
        n(i).addClass("focus");
    }),
      (r.hideSubmenu = function(i, e) {
        "fade" == e
          ? n(i)
              .find(".nav-submenu")
              .stop(!0, !0)
              .delay(r.settings.hideDelayDuration)
              .fadeOut(r.settings.hideDuration)
              .removeClass(r.settings.animationOnShow)
              .addClass(r.settings.animationOnHide)
          : n(i)
              .find(".nav-submenu")
              .stop(!0, !0)
              .delay(r.settings.hideDelayDuration)
              .slideUp(r.settings.hideDuration)
              .removeClass(r.settings.animationOnShow)
              .addClass(r.settings.animationOnHide),
          n(i)
            .removeClass("focus")
            .find(".focus")
            .removeClass("focus");
      });
    var p = function() {
        n("body").addClass("no-scroll"),
          r.settings.overlay &&
            (n(t).append("<div class='nav-overlay-panel'></div>"),
            n(t)
              .find(".nav-overlay-panel")
              .css("background-color", r.settings.overlayColor)
              .fadeIn(300)
              .on("click touchstart", function(n) {
                r.hideOffcanvas();
              }));
      },
      g = function() {
        n("body").removeClass("no-scroll"),
          r.settings.overlay &&
            n(t)
              .find(".nav-overlay-panel")
              .fadeOut(400, function() {
                n(this).remove();
              });
      };
    (r.showOffcanvas = function() {
      p(),
        "left" == r.settings.offCanvasSide
          ? n(t)
              .find(".nav-menus-wrapper")
              .css("transition-property", "left")
              .addClass("nav-menus-wrapper-open")
          : n(t)
              .find(".nav-menus-wrapper")
              .css("transition-property", "right")
              .addClass("nav-menus-wrapper-open");
    }),
      (r.hideOffcanvas = function() {
        n(t)
          .find(".nav-menus-wrapper")
          .removeClass("nav-menus-wrapper-open")
          .on(
            "webkitTransitionEnd moztransitionend transitionend oTransitionEnd",
            function() {
              n(t)
                .find(".nav-menus-wrapper")
                .css("transition-property", "none")
                .off();
            }
          ),
          g();
      }),
      (r.toggleOffcanvas = function() {
        C() <= r.settings.mobileBreakpoint &&
          (n(t)
            .find(".nav-menus-wrapper")
            .hasClass("nav-menus-wrapper-open")
            ? (r.hideOffcanvas(), s !== a && r.callback("onHideOffCanvas"))
            : (r.showOffcanvas(), s !== a && r.callback("onShowOffCanvas")));
      }),
      (r.toggleSearch = function() {
        "none" ==
        n(t)
          .find(".nav-search")
          .find("form")
          .css("display")
          ? (n(t)
              .find(".nav-search")
              .find("form")
              .fadeIn(200),
            n(t)
              .find(".nav-search")
              .find("input")
              .focus())
          : (n(t)
              .find(".nav-search")
              .find("form")
              .fadeOut(200),
            n(t)
              .find(".nav-search")
              .find("input")
              .blur());
      }),
      (r.initNavigationMode = function(i) {
        r.settings.responsive
          ? (i <= r.settings.mobileBreakpoint &&
              u > r.settings.mobileBreakpoint &&
              (n(t)
                .addClass("navigation-portrait")
                .removeClass("navigation-landscape"),
              S(),
              s !== a && r.callback("onPortrait")),
            i > r.settings.mobileBreakpoint &&
              d <= r.settings.mobileBreakpoint &&
              (n(t)
                .addClass("navigation-landscape")
                .removeClass("navigation-portrait"),
              k(),
              g(),
              r.hideOffcanvas(),
              s !== a && r.callback("onLandscape")),
            (u = i),
            (d = i))
          : (n(t).addClass("navigation-landscape"),
            k(),
            s !== a && r.callback("onLandscape"));
      });
    var b = function() {
        n("html").on("click.body touchstart.body", function(i) {
          0 === n(i.target).closest(".navigation").length &&
            (n(t)
              .find(".nav-submenu")
              .fadeOut(),
            n(t)
              .find(".focus")
              .removeClass("focus"),
            n(t)
              .find(".nav-search")
              .find("form")
              .fadeOut());
        });
      },
      C = function() {
        return (
          i.innerWidth || e.documentElement.clientWidth || e.body.clientWidth
        );
      },
      w = function() {
        n(t)
          .find(".nav-menu")
          .find("li, a")
          .off(l)
          .off(f)
          .off(c);
      },
      O = function() {
        if (C() > r.settings.mobileBreakpoint) {
          var i = n(t).outerWidth(!0);
          n(t)
            .find(".nav-menu")
            .children("li")
            .children(".nav-submenu")
            .each(function() {
              n(this)
                .parent()
                .position().left +
                n(this).outerWidth() >
              i
                ? n(this).css("right", 0)
                : n(this).css("right", "auto");
            });
        }
      },
      y = function() {
        function i(i) {
          var e = n(i)
              .children(".megamenu-tabs-nav")
              .children("li"),
            a = n(i).children(".megamenu-tabs-pane");
          n(e).on("click.tabs touchstart.tabs", function(i) {
            i.stopPropagation(),
              i.preventDefault(),
              n(e).removeClass("active"),
              n(this).addClass("active"),
              n(a)
                .hide(0)
                .removeClass("active"),
              n(a[n(this).index()])
                .show(0)
                .addClass("active");
          });
        }
        if (n(t).find(".megamenu-tabs").length > 0)
          for (var e = n(t).find(".megamenu-tabs"), a = 0; a < e.length; a++)
            i(e[a]);
      },
      k = function() {
        w(),
          h(),
          navigator.userAgent.match(/Mobi/i) ||
          navigator.maxTouchPoints > 0 ||
          "click" == r.settings.submenuTrigger
            ? n(t)
                .find(".nav-menu, .nav-dropdown")
                .children("li")
                .children("a")
                .on(l, function(e) {
                  if (
                    (r.hideSubmenu(
                      n(this)
                        .parent("li")
                        .siblings("li"),
                      r.settings.effect
                    ),
                    n(this)
                      .closest(".nav-menu")
                      .siblings(".nav-menu")
                      .find(".nav-submenu")
                      .fadeOut(r.settings.hideDuration),
                    n(this).siblings(".nav-submenu").length > 0)
                  ) {
                    if (
                      (e.stopPropagation(),
                      e.preventDefault(),
                      "none" ==
                        n(this)
                          .siblings(".nav-submenu")
                          .css("display"))
                    )
                      return (
                        r.showSubmenu(n(this).parent("li"), r.settings.effect),
                        O(),
                        !1
                      );
                    if (
                      (r.hideSubmenu(n(this).parent("li"), r.settings.effect),
                      "_blank" === n(this).attr("target") ||
                        "blank" === n(this).attr("target"))
                    )
                      i.open(n(this).attr("href"));
                    else {
                      if (
                        "#" === n(this).attr("href") ||
                        "" === n(this).attr("href") ||
                        "javascript:void(0)" === n(this).attr("href")
                      )
                        return !1;
                      i.location.href = n(this).attr("href");
                    }
                  }
                })
            : n(t)
                .find(".nav-menu")
                .find("li")
                .on(f, function() {
                  r.showSubmenu(this, r.settings.effect), O();
                })
                .on(c, function() {
                  r.hideSubmenu(this, r.settings.effect);
                }),
          r.settings.hideSubWhenGoOut && b();
      },
      S = function() {
        w(),
          h(),
          r.settings.visibleSubmenusOnMobile
            ? n(t)
                .find(".nav-submenu")
                .show(0)
            : (n(t)
                .find(".submenu-indicator")
                .removeClass("submenu-indicator-up"),
              r.settings.submenuIndicator && r.settings.submenuIndicatorTrigger
                ? n(t)
                    .find(".submenu-indicator")
                    .on(l, function(i) {
                      return (
                        i.stopPropagation(),
                        i.preventDefault(),
                        r.hideSubmenu(
                          n(this)
                            .parent("a")
                            .parent("li")
                            .siblings("li"),
                          "slide"
                        ),
                        r.hideSubmenu(
                          n(this)
                            .closest(".nav-menu")
                            .siblings(".nav-menu")
                            .children("li"),
                          "slide"
                        ),
                        "none" ==
                        n(this)
                          .parent("a")
                          .siblings(".nav-submenu")
                          .css("display")
                          ? (n(this).addClass("submenu-indicator-up"),
                            n(this)
                              .parent("a")
                              .parent("li")
                              .siblings("li")
                              .find(".submenu-indicator")
                              .removeClass("submenu-indicator-up"),
                            n(this)
                              .closest(".nav-menu")
                              .siblings(".nav-menu")
                              .find(".submenu-indicator")
                              .removeClass("submenu-indicator-up"),
                            r.showSubmenu(
                              n(this)
                                .parent("a")
                                .parent("li"),
                              "slide"
                            ),
                            !1)
                          : (n(this)
                              .parent("a")
                              .parent("li")
                              .find(".submenu-indicator")
                              .removeClass("submenu-indicator-up"),
                            void r.hideSubmenu(
                              n(this)
                                .parent("a")
                                .parent("li"),
                              "slide"
                            ))
                      );
                    })
                : n(t)
                    .find(".nav-menu, .nav-dropdown")
                    .children("li")
                    .children("a")
                    .on(l, function(e) {
                      if (
                        (e.stopPropagation(),
                        e.preventDefault(),
                        r.hideSubmenu(
                          n(this)
                            .parent("li")
                            .siblings("li"),
                          r.settings.effect
                        ),
                        r.hideSubmenu(
                          n(this)
                            .closest(".nav-menu")
                            .siblings(".nav-menu")
                            .children("li"),
                          "slide"
                        ),
                        "none" ==
                          n(this)
                            .siblings(".nav-submenu")
                            .css("display"))
                      )
                        return (
                          n(this)
                            .children(".submenu-indicator")
                            .addClass("submenu-indicator-up"),
                          n(this)
                            .parent("li")
                            .siblings("li")
                            .find(".submenu-indicator")
                            .removeClass("submenu-indicator-up"),
                          n(this)
                            .closest(".nav-menu")
                            .siblings(".nav-menu")
                            .find(".submenu-indicator")
                            .removeClass("submenu-indicator-up"),
                          r.showSubmenu(n(this).parent("li"), "slide"),
                          !1
                        );
                      if (
                        (n(this)
                          .parent("li")
                          .find(".submenu-indicator")
                          .removeClass("submenu-indicator-up"),
                        r.hideSubmenu(n(this).parent("li"), "slide"),
                        "_blank" === n(this).attr("target") ||
                          "blank" === n(this).attr("target"))
                      )
                        i.open(n(this).attr("href"));
                      else {
                        if (
                          "#" === n(this).attr("href") ||
                          "" === n(this).attr("href") ||
                          "javascript:void(0)" === n(this).attr("href")
                        )
                          return !1;
                        i.location.href = n(this).attr("href");
                      }
                    }));
      };
    (r.callback = function(n) {
      s[n] !== a && s[n].call(t);
    }),
      r.init();
  }),
    (n.fn.navigation = function(i) {
      return this.each(function() {
        if (a === n(this).data("navigation")) {
          var e = new n.navigation(this, i);
          n(this).data("navigation", e);
        }
      });
    });
})(jQuery, window, document);



(function ($) {
    'use strict';

    var $window = $(window);

    if ($.fn.navigation) {
        $("#navigation1").navigation();
        $("#always-hidden-nav").navigation({
            hidden: true
        });
    }

            $window.on('load', function () {
        $('#preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

})(jQuery);


// var basemapCont = 'off';
var box = 'off';
var box1 = 'off';
var box2 = 'off';
var box3 = 'off';

function shutallboxes() {
    $(".cardbox1").css('display', 'none');
    $(".cardbox2").css('display', 'none');
    $(".iconbox").removeClass("active");
    box1 = 'off';
    box2 = 'off';
    box = 'off';
    box3 = 'off';
}


function cardbox1() {
    $("#cardbox1").css('display', 'block');
    $("#cardbox2").css('display', 'none');
    $("#cardbox3").css('display', 'none');
    $(".iconbox").removeClass("active");
    $("#iconbox1").addClass("active");
    box1 = 'on';
    box2 = 'off';
    box = 'on';
    box3 = 'off';
}

function cardbox2() {
    $("#cardbox1").css('display', 'none');
    $("#cardbox2").css('display', 'block');
    $("#cardbox3").css('display', 'none');
    $(".iconbox").removeClass("active");
    $("#iconbox2").addClass("active");
    box1 = 'off';
    box2 = 'on';
    box = 'on';
    box3 = 'off';
}

function cardbox3() {
    $("#cardbox1").css('display', 'none');
    $("#cardbox2").css('display', 'none');
    $("#cardbox3").css('display', 'block');
    $(".iconbox").removeClass("active");
    $("#iconbox3").addClass("active");
    box1 = 'off';
    box2 = 'off';
    box = 'on';
    box3 = 'on';
}
function togglebox() {
    $(".box").animate({
        width: "toggle"
    });
}


$('#iconbox1').click(function() {

    if (box == 'off') {
        togglebox();
        cardbox1();
        // alert('only box1');
    } else if (box == 'on' && box1 == 'on') {
        // alert('box1 already on shutting down entire box');
        shutallboxes()
        togglebox();
    } else if (box == 'on' && box2 == 'on') {
        // alert('box2 is on turning on box1');
        cardbox1()
    } else if (box == 'on' && box3 == 'on') {
        // alert('box2 is on turning on box1');
        cardbox1()
    }
});



$('#iconbox2').click(function() {

    if (box == 'off') {
        togglebox();
        cardbox2();
        // alert('only box2');
    } else if (box == 'on' && box2 == 'on') {
        // alert('box2 already on shutting down entire box');
        shutallboxes()
        togglebox();
    } else if (box == 'on' && box1 == 'on') {
        // alert('box1 is on turning on box2');
        cardbox2()
    } else if (box == 'on' && box3 == 'on') {
        // alert('box1 is on turning on box2');
        cardbox2()
    }
});

$('#iconbox3').click(function() {

    if (box == 'off') {
        togglebox();
        cardbox3();
        // alert('only box2');
    } else if (box == 'on' && box3 == 'on') {
        // alert('box2 already on shutting down entire box');
        shutallboxes()
        togglebox();
    } else if (box == 'on' && box1 == 'on') {
        // alert('box1 is on turning on box2');
        cardbox3()
    } else if (box == 'on' && box2 == 'on') {
        // alert('box1 is on turning on box2');
        cardbox3()
    }
});


$('.slide-toggle').click(function() {
        shutallboxes()
        togglebox();
});





var mainbox = 'off';

// function togglemainbox() {
//     $(".cardbox").fadeToggle(slow);
// }

$('#iconbox4').click(function() {
    if (mainbox == 'off') {
        $(".cardbox").fadeIn(200);
        $("#iconbox4").addClass("active");
        mainbox = 'on'
    } else if (mainbox == 'on') {
        $(".cardbox").fadeOut(300);
        $("#iconbox4").removeClass("active");
        mainbox = 'off'
    } 
});

// $('.iconbox4').click(function() {
//     if (mainbox == 'off') {
//         $(".cardbox").fadeIn(200);
//         $("#iconbox4").addClass("active");
//         mainbox = 'on'
//     } else if (mainbox == 'on') {
//         $(".cardbox").fadeOut(300);
//         $("#iconbox4").removeClass("active");
//         mainbox = 'off'
//     } 
// });

$('.cardbox_close').click(function() {
        $(".cardbox").fadeOut(500);
        $("#iconbox4").removeClass("active");
        mainbox = 'off'
});





$('.collapse').on('shown.bs.collapse', function() {
    $(this).parent().find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-up");
}).on('hidden.bs.collapse', function() {
    $(this).parent().find(".fa-angle-up").removeClass("fa-angle-up").addClass("fa-angle-down");
});
$('.panel-heading a').click(function() {
    $('.panel-heading').removeClass('active');
    //If the panel was open and would be closed by this click, do not active it
    if (!$(this).closest('.panel').find('.panel-collapse').hasClass('in'))
        $(this).parents('.panel-heading').addClass('active');
});
