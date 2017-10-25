$(document).ready(function() {

    var body = $("body");
    //---------------------
    //----SLOW REDIRECT----
    //---------------------
    var linkLocation;
    $("a[href^='/']").click(function(event){
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
    //-----SLOW SCROLL-----
    //---------------------
    $('a[href^="#"]:not(.nav__link-open)').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top
        }, 1000);
        e.preventDefault();
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
    var menu = $(".nav");
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
    //--------POPUP--------
    //---------------------
    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
        e = e || window.event;
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
        window.onwheel = preventDefault; // modern standard
        window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
        window.ontouchmove  = preventDefault; // mobile
        document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    $(".contacts__button").on("click", function () {
        $(".overlay__form").fadeIn(500, function () {
            popupForm();
        });
        disableScroll();
    });
    $(".popup__close").on("click", function () {
        $(".overlay__form").fadeOut(500);
        enableScroll();
    });

    //------------------------------
    //-------AJAX FORM FOOTER-------
    //------------------------------
    $(".form__button").on("click", function(){
        var value = $(".form__email").val().trim();
        if(value && value.match(/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/gim)){
            var msg  = $('#footer-form').serialize();
            $.ajax({
                type: 'POST',
                url: '/api/newsletter',
                data: msg,
                success: function(data) {
                    $('#footer-form').html("Thank you for your subscribe!");
                },
                error:  function(xhr, str){
                    alert('Возникла ошибка: ' + xhr.responseCode);
                }
            });
        } else {
            alert("Напишите, пожалуйста, ваш e-mail");
        }
        return false;
    });

    //------------------------------
    //------AJAX FORM CONTACT-------
    //------------------------------
    function popupForm() {
        $(".popup__button").on("click", function() {
            var email = $(".popup__email").val().trim();
            var message = $(".popup__message").val().trim();
            if(email && email.match(/^(|(([A-Za-z0-9]+_+)|([A-Za-z0-9]+\-+)|([A-Za-z0-9]+\.+)|([A-Za-z0-9]+\++))*[A-Za-z0-9]+@((\w+\-+)|(\w+\.))*\w{1,63}\.[a-zA-Z]{2,6})$/gim) && message){
                var msg  = $('#popup-form').serialize();
                $.ajax({
                    type: 'POST',
                    url: '/api/newsletter',
                    data: msg,
                    success: function(data) {
                        $('#popup-form').html("Thank you for your message!");
                    },
                    error:  function(xhr, str){
                        alert('Возникла ошибка: ' + xhr.responseCode);
                    }
                });
            } else {
                alert("Напишите, пожалуйста, ваш e-mail и сообщение");
            }
            return false;
        });
    }

    //---------------------
    //FULL SCREEN CONTACTS-
    //---------------------
    function heightDetectContact() {
            $(".hero-fluid__content").css("height", $(window).height()-$(".nav_static").outerHeight(false));
    }
    heightDetectContact();
    $(window).on("resize", function() {
        heightDetectContact();
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


//---------------------
//---CONTACTS SLIDER---
//---------------------
var contacts = $('.contacts__row-slider');
contacts.slick({
    dots: true,
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    centerMode: true,
    centerPadding: "23px",
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

var firstWindow = true;
var animStart = false;
var marker;
var infoWindow;

contacts.on('beforeChange', function(event, slick, currentSlide, nextSlide){
    var slide = $(".contacts__slider-item[data-slick-index="+nextSlide+"]");
    var data = slide.data("marker");
    if(data && !animStart) {
        var marker = slide.data("marker");
        map.setZoom(16);
        var lat = window[marker].getPosition().lat();
        var lng = window[marker].getPosition().lng();
        map.panTo(new google.maps.LatLng(lat, lng));

        if(!firstWindow) {
            window[infoWindow].close(map, window[marker]);
        }
        window[slide.data("info")].open(map, window[slide.data("marker")]);
        marker = slide.data("marker");
        infoWindow = slide.data("info");
        firstWindow = false;
    }
    animStart = true;
});

contacts.on('afterChange', function(event, slick, currentSlide, nextSlide) {
  animStart = false;
});

$(".contacts__slider-item").on("click", function(){
    if(!animStart) {
        slider.slick("slickGoTo", $(this).data("slick-index"));
        if(!firstWindow) {
            window[infoWindow].close(map, window[marker]);
        }
        window[$(this).data("info")].open(map, window[$(this).data("marker")]);
        marker = $(this).data("marker");
        infoWindow = $(this).data("info");
        firstWindow = false;
    }
});


var isOpen = true;
//------------------------------
//----------GOOGLE MAP----------
//------------------------------
var slider = $(".contacts__row-slider");
function initMap() {
    window.map = new google.maps.Map(document.querySelector('.contacts__row-map'), {
        zoom: 14,
        center: {lat: 40.5705125, lng: 8.3129463},
        styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}],
        disableDefaultUI: true
    });

    //MARKER 1
    window.marker1 = new google.maps.Marker({
        position: {lat: 40.5821677, lng: 8.3156581},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|f4ffbf",
    });
    window.infoWindow1 = new google.maps.InfoWindow({
        content: "<div class='marker__info'>" +
        "<span class='marker__name'>Officine di Idee (photo & video production)</span>" +
        "<span class='marker__address'>Alghero, via Don Minzoni 198</span>" +
        "</div>"
    });
    marker1.addListener("mouseover", function () {
        infoWindow1.open(map, marker1);
    });
    marker1.addListener("mouseout", function () {
        if(isOpen) {
            infoWindow1.close(map, marker1);
        }
        isOpen = true;
    });
    marker1.addListener("click", function () {
        slider.slick("slickGoTo", 0);
        isOpen = false;
    });

    //MARKER 2
    window.marker2 = new google.maps.Marker({
        position: {lat: 40.557562, lng: 8.3114933},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffdcbf",
    });
    window.infoWindow2 = new google.maps.InfoWindow({
        content: "<div class='marker__info'>" +
        "<span class='marker__name'>Ep Events Planning & Consulting</span>" +
        "<span class='marker__address'>Alghero, Via Gilbert Ferret 52</span>" +
        "</div>"
    });
    marker2.addListener("mouseover", function () {
        infoWindow2.open(map, marker2);
    });
    marker2.addListener("mouseout", function () {
        if(isOpen) {
            infoWindow2.close(map, marker2);
        }
        isOpen = true;
    });
    marker2.addListener("click", function () {
        slider.slick("slickGoTo", 1);
        isOpen = false;
    });

    //MARKER 3
    window.marker3 = new google.maps.Marker({
        position: {lat: 40.559076, lng: 8.3113893},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|c6f7c3",
    });
    window.infoWindow3 = new google.maps.InfoWindow({
        content: "<div class='marker__info'>" +
        "<span class='marker__name'>Gioielleria Marti</span>" +
        "<span class='marker__address'>Alghero, via Carlo Alberto 12</span>" +
        "</div>"
    });
    marker3.addListener("mouseover", function () {
        infoWindow3.open(map, marker3);
    });
    marker3.addListener("mouseout", function () {
        if(isOpen) {
            infoWindow3.close(map, marker3);
        }
        isOpen = true;
    });
    marker3.addListener("click", function () {
        slider.slick("slickGoTo", 3);
        isOpen = false;
    });

}

//------------------------------
//-----GOOGLE MAP CONTACT-------
//------------------------------
function initContactMap() {
    var map = new google.maps.Map(document.querySelector('.contact__map-map'), {
        zoom: 14,
        center: {lat: 40.5705125, lng: 8.3129463},
        styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}],
        disableDefaultUI: true
    });

    //MARKER 1
    var marker1 = new google.maps.Marker({
        position: {lat: 40.5821677, lng: 8.3156581},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|f4ffbf",
    });
    var infoWindow1 = new google.maps.InfoWindow({
        content: "<div class='marker__info'>" +
        "<span class='marker__name'>Officine di Idee (photo & video production)</span>" +
        "<span class='marker__address'>Alghero, via Don Minzoni 198</span>" +
        "</div>"
    });
    marker1.addListener("mouseover", function () {
        infoWindow1.open(map, marker1);
    });
    marker1.addListener("mouseout", function () {
        infoWindow1.close(map, marker1);
    });

    //MARKER 2
    var marker2 = new google.maps.Marker({
        position: {lat: 40.557562, lng: 8.3114933},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|ffdcbf",
    });
    var infoWindow2 = new google.maps.InfoWindow({
        content: "<div class='marker__info'>" +
        "<span class='marker__name'>Ep Events Planning & Consulting</span>" +
        "<span class='marker__address'>Alghero, Via Gilbert Ferret 52</span>" +
        "</div>"
    });
    marker2.addListener("mouseover", function () {
        infoWindow2.open(map, marker2);
    });
    marker2.addListener("mouseout", function () {
        infoWindow2.close(map, marker2);
    });

    //MARKER 3
    var marker3 = new google.maps.Marker({
        position: {lat: 40.559076, lng: 8.3113893},
        map: map,
        icon: "http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|c6f7c3",
    });
    var infoWindow3 = new google.maps.InfoWindow({
        content: "<div class='marker__info'>" +
        "<span class='marker__name'>Gioielleria Marti</span>" +
        "<span class='marker__address'>Alghero, via Carlo Alberto 12</span>" +
        "</div>"
    });
    marker3.addListener("mouseover", function () {
        infoWindow3.open(map, marker3);
    });
    marker3.addListener("mouseout", function () {
        infoWindow3.close(map, marker3);
    });
}