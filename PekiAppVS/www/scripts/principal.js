myApp.onPageInit('principal-screen', function (page) {

    var mySwiper = myApp.swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationHide: false,
        paginationClickable: true,
        loop: true,
        autoplay: 3000,
    });
});
