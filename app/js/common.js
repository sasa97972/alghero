$(document).ready(function() {

    var body = $("body");
    //---------------------
    //----SLOW REDIRECT----
    //---------------------
    body.css("display", "none");
    body.fadeIn(3000);
    $("a.transition").click(function(event){
        event.preventDefault();
        linkLocation = this.href;
        body.fadeOut(1000, redirectPage);
    });
    function redirectPage() {
        window.location = linkLocation;
    }

    $(".nav__lang-link_active").on("click", function(){
        return false;
    });

    //---------------------
    //-FULL SCREEN SLIDER--
    //---------------------
    function heightDetect() {
        $(".slider__item").css("height", $(window).height());
    }
    heightDetect();
    $(window).on("resize", function() {
        heightDetect();
    });

    var slider = $('.slider-fluid');
    slider.slick({
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        speed: 1000,
        cssEase: "ease",
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        nextArrow: "<span class='custom-next'><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>",
        prevArrow: "<span class='custom-prev'><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>"
    });

    //---------------------
    //-SLIDER KEY CONTROL--
    //---------------------
    $(".gallery-fluid").on("mouseover", function (e) {
        document.querySelector("body").addEventListener("keydown", keyControl($(this), e));
    });
    $(".gallery-fluid").on("mouseout", function (e) {
        document.querySelector("body").removeEventListener("keydown", keyControl($(this), e));
    });

   function keyControl(slider, e) {
        switch (e.keyCode) {
            case 37: // влево
                slider.slick("slickPrev");
                break;
            case 39: // вправо
                slider.slick("slickNext");
                break;
        }
   }

    //---------------------
    //----HIDE CONTROL-----
    //---------------------
    var timeout = setTimeout(hide, 3000);
    function hide() {
        $(".slick-arrow").fadeOut();
    }
    body.on("mousemove", function () {
        if($(document).width() > 576) {
            $(".slick-arrow").fadeIn();
            clearTimeout(timeout);
            timeout = setTimeout(hide, 3000);
        }
    });

    //------------------------------
    //-----NESTED MENU POSITION-----
    //------------------------------
    var menu1 = $(".menu1");
    var menu2 = $(".menu2");
    var lang = $(".nav__lang-list");
    var itemNested = $(".nav__item-nested");
    function autoHeightMenu() {
        var menu1Bottom = -menu1.outerHeight(false);
        var menu2Bottom = -menu2.height() + itemNested.outerHeight(false);
        var menu2Right = -menu2.outerWidth(false);
        var langBottom = -lang.outerHeight(false);
        menu1.css("bottom", menu1Bottom);
        lang.css("bottom", langBottom);
        menu2.css("bottom", menu2Bottom);
        menu2.css("right", menu2Right);
    }
    $(window).on("resize", autoHeightMenu);
    autoHeightMenu();
    autoHeightMenu();

    //------------------------------
    //----------OPEN MENU-----------
    //------------------------------
    var mobileMenu = $(".nav__menu_mobile");
    var hamburger = $(".nav__menu-open-btn");
    hamburger.on("click", function () {
        $(this).toggleClass("is-active");
        mobileMenu.slideToggle(400);
    });
    $(".nav__link:not(.nav__link-open)").on("click", function () {
        hamburger.toggleClass("is-active");
        mobileMenu.slideToggle(400);
    });
    $(".nav__link-open").on("click", function () {
        $(this).next().slideToggle(400);
        $(this).find(".fa").toggleClass("toggle_rotate");
        return false;
    });
    $(window).on("resize", function () {
       if($(document).width() > 576) {
           if(mobileMenu.is(":visible")) {
               hamburger.toggleClass("is-active");
               mobileMenu.css("display", "none");
           }
       }
    });

    //------------------------------
    //--------SCROLLED MENU---------
    //------------------------------
    var menu = $("nav");
    var scrollPrev = 0;
    $(window).scroll(function() {
        var header = $(".nav_fixed");
        if(header.is(":visible")) {
            var scrolled = $(window).scrollTop();
            var firstScrollUp = false;
            var firstScrollDown = false;

            if ( scrolled > 100 ) {
                if ( scrolled > scrollPrev ) {
                    firstScrollUp = false;
                    if ( scrolled < header.height() + header.offset().top ) {
                        if ( firstScrollDown === false ) {
                            var topPosition = header.offset().top;
                            header.css({
                                "top": topPosition + "px"
                            });
                            firstScrollDown = true;
                        }
                        header.css({
                            "position": "absolute"
                        });
                    } else {
                        header.css({
                            "position": "fixed",
                            "top": "-" + header.height() + "px"
                        });
                    }
                } else {
                    firstScrollDown = false;
                    if ( scrolled > header.offset().top ) {
                        if ( firstScrollUp === false ) {
                            var topPosition = header.offset().top;

                            header.css({
                                "top": topPosition + "px"
                            });
                            firstScrollUp = true;
                        }
                        header.css({
                            "position": "absolute"
                        });
                        header.addClass("nav_collapse");
                    } else {
                        header.removeAttr("style");
                    }
                }
                scrollPrev = scrolled;
            }
        }
    });

    //------------------------------
    //----------FIXED MENU----------
    //------------------------------
        $(window).scroll(function () {
            if ($(this).scrollTop() > menu.outerHeight(false)) {
                menu.addClass("nav_fixed");
            } else {
                menu.removeClass("nav_fixed");
                menu.removeClass("nav_collapse");
            }
        });

});