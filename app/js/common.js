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
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: false,
        nextArrow: "<span class='custom-next'><i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i></span>",
        prevArrow: "<span class='custom-prev'><i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i></span>"
    });

    //---------------------
    //----HIDE CONTROL-----
    //---------------------
    var timeout = setTimeout(hide, 3000);
    function hide() {
        $(".slick-arrow").fadeOut();
    }
    body.on("mousemove", function () {
        $(".slick-arrow").fadeIn();
        clearTimeout(timeout);
        timeout = setTimeout(hide, 3000);
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
        var menu2Bottom = -menu2.height() + itemNested.outerHeight(false)/2 ;
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


});
