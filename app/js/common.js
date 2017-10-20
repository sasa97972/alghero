$(document).ready(function() {

    var body = $("body");
    //---------------------
    //----SLOW REDIRECT----
    //---------------------
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
    //------SCROLL TOP-----
    //---------------------
    var topButton = $(".top");
    topButton.fadeOut(1);
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            topButton.fadeIn();
        } else {
            topButton.fadeOut();
        }
    });
    topButton.on("click", function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1200);
        return false;
    });

    //---------------------
    //-----CHANGE LOGO-----
    //---------------------
    $(window).on("resize", function () {
       if($(".nav__mobile-wrapper").is(":visible")) {
           $(".nav__logo-img").attr("src", "img/logo.png");
       }
    }).resize();

    //---------------------
    //-FULL SCREEN SLIDER--
    //---------------------
    function heightDetect() {
        if($(window).width() < 577) {
            $(".slider__item").css("height", $(window).height()-$(".nav").outerHeight(false));
            $(".gallery-fluid").css("paddingTop", $(".nav").outerHeight(false));
        } else {
            $(".gallery-fluid").css("paddingTop", 0);
            $(".slider__item").css("height", $(window).height());
        }
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
    var activeSlider;
    $(".slider").on("mouseover", function (e) {
        (function (event, slider) {
            activeSlider = slider;
            window.addEventListener("keydown", keyControl, false);
        })(e, $(this));
    });
    $(".slider").on("mouseout", function (e) {
        window.removeEventListener("keydown", keyControl, false);
    });

   function keyControl(e) {
        switch (e.keyCode) {
            case 37: // влево
                activeSlider.slick("slickPrev");
                break;
            case 39: // вправо
                activeSlider.slick("slickNext");
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
    $(window).on("resize", autoHeightMenu).resize();

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

            if ( scrolled > menu.outerHeight(false) ) {
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
            $(window).width() > 576 ? $(".nav__logo-img").attr("src", "img/logo.png") : "";
        } else if ($(this).scrollTop() === 0) {
            menu.removeClass("nav_fixed");
            menu.removeClass("nav_collapse");
            $(window).width() > 576 ? $(".nav__logo-img").attr("src", "img/logo_black.png") : "";
        }
    });

    //---------------------
    //----SLIDER GALLERY---
    //---------------------
    var gallery = $('.slider__gallery');
    gallery.slick({
        dots: false,
        infinite: true,
        centerMode: true,
        centerPadding: '70px',
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: "<span class='custom-next'><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>",
        prevArrow: "<span class='custom-prev'><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>",
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: true
                }
            }]
    });

    //---------------------
    //----PLANNER SLIDER---
    //---------------------
    var planner = $('.planner__slider');
    planner.slick({
        dots: false,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: "<span class='custom-next'><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>",
        prevArrow: "<span class='custom-prev'><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>",
        responsive: [
            {
                breakpoint: 576,
                settings: {
                    dots: true,
                    slidesToShow: 1
                }
            }]
    });

    //------------------------------
    //---PLANNER ITEM AUTO HEIGHT---
    //------------------------------
    function PlannerAutoHeight() {
        var sliders = $(".planner__slider-item");
        sliders.css("height", "auto");
        sliders.css("height", $('.planner__slider').outerHeight(false));
    }
    PlannerAutoHeight();
    $(window).on("resize", PlannerAutoHeight);


    //---------------------
    //-TESTIMONIALS SLIDER-
    //---------------------
    var testimonials = $('.testimonials__slider');
    testimonials.slick({
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: "<span class='custom-next'><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>",
        prevArrow: "<span class='custom-prev'><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>"
    });

    //---------------------
    //---CONTACTS SLIDER---
    //---------------------
    var contacts = $('.contacts__row-slider');
    contacts.slick({
        dots: true,
        arrows: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 1000,
        centerMode: true,
        nextArrow: "<span class='custom-next'><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>",
        prevArrow: "<span class='custom-prev'><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>",
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                }
            }]
    });

    //------------------------------
    //--------SHOW CONTENT----------
    //------------------------------
    body.animate({
    	opacity: 1
    }, 3000);

    //------------------------------
    //----------IMG HEIGHT----------
    //------------------------------
    function autoImgHeight() {
        $(".slider__gallery-image").css("width", $(".container").outerWidth(false));
    }
    autoImgHeight();
    $(window).on("resize", autoImgHeight);

});

//------------------------------
//----------GOOGLE MAP----------
//------------------------------
var slider = $(".contacts__row-slider");
function initMap() {
    var map = new google.maps.Map(document.querySelector('.contacts__row-map'), {
        zoom: 14,
        center: {lat: 40.5705125, lng: 8.3129463},
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}]
    });

    //MARKER 1
    var marker1 = new google.maps.Marker({
        position: {lat: 40.5821677, lng: 8.3156581},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|f4ffbf",
    });
    var infoWindow1 = new google.maps.InfoWindow({
        content: "Officine di Idee (photo & video production)"
    });
    marker1.addListener("mouseover", function () {
        infoWindow1.open(map, marker1);
    });
    marker1.addListener("mouseout", function () {
        infoWindow1.close(map, marker1);
    });
    marker1.addListener("click", function () {
        slider.slick("slickGoTo", 1)
    });

    //MARKER 2
    var marker2 = new google.maps.Marker({
        position: {lat: 40.557562, lng: 8.3114933},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffdcbf",
    });
    var infoWindow2 = new google.maps.InfoWindow({
        content: "Ep Events Planning & Consulting"
    });
    marker2.addListener("mouseover", function () {
        infoWindow2.open(map, marker2);
    });
    marker2.addListener("mouseout", function () {
        infoWindow2.close(map, marker2);
    });
    marker2.addListener("click", function () {
        slider.slick("slickGoTo", 2)
    });

    //MARKER 3
    var marker3 = new google.maps.Marker({
        position: {lat: 40.559076, lng: 8.3113893},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|c6f7c3",
    });
    var infoWindow3 = new google.maps.InfoWindow({
        content: "Gioielleria Marti"
    });
    marker3.addListener("mouseover", function () {
        infoWindow3.open(map, marker3);
    });
    marker3.addListener("mouseout", function () {
        infoWindow3.close(map, marker3);
    });
    marker3.addListener("click", function () {
        slider.slick("slickGoTo", 3)
    });
}