myApp.onPageInit('serveis-screen', function (page) {

    if (localStorage.tUsuari == "empresa") {
        $$(".botoAfegirServeis").append(
            '<a href="addServeis.html" class="floating-button">' +
                '<i class="icon icon-plus"></i>' +
            '</a>'
            );
    }
});