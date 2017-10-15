$(function() {

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

    $('.slider-fluid').slick({
        dots: false,
        infinite: true,
        speed: 1100,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: "<span class='custom-next'><i class=\"fa fa-long-arrow-right\" aria-hidden=\"true\"></i></span>",
        prevArrow: "<span class='custom-prev'><i class=\"fa fa-long-arrow-left\" aria-hidden=\"true\"></i></span>"
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

});
