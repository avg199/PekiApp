myApp.onPageInit('tipuServei-screen', function (page) {

    if (localStorage.tUsuari == "empresa") {
        $$(".botoAfegirServeis").append(
            '<a href="addServeis.html" class="floating-button">' +
                '<i class="icon icon-plus"></i>' +
            '</a>'
            );
    }

    var titolservei;

    if (page.query.id == "Guarderies Canines") {
        titolservei = "Residències";
    } else {
        if (page.query.id == "Educadors Canins") {
            titolservei = "Educadors";
        } else {
            titolservei = page.query.id;
        }
    }
    $$(".titol-tipuservei").append(titolservei);

    $$.ajax({
        url: url + 'Slim/api.php/profesionales/' + page.query.id,
        method: 'GET',
        xhrFields: { withCredentials: true },
        dataType: 'json',
        beforeSend: function () {
            //myApp.showIndicator();
        },
        complete: function () {
            //myApp.hideIndicator();
        },
        error: function () {
            //myApp.hideIndicator();
            myApp.alert('Error de comnexió', 'Alerta!', function () { });
        },
        success: function (response) {

            dadesServei = response;

            $$(".serveis").html('');

            if (response == "") {
                $$(".serveis").append(
                    '<div class="list-block" style="margin-top:0px;">' +
                        '<ul>' +
                            '<li>' +
                                    '<div class="item-content">' +
                                        '<div class="item-inner">' +
                                            '<div class="item-title">No hi ha serveis disponibles.</div>' +
                                        '</div>' +
                                    '</div>' +
                            '</li>' +
                        '</ul>' +
                    '</div>'
                    );
            } else {

                response.forEach(function (item) {

                    $$(".serveis").append(
                                '<li>' +
                                    '<a class="item-link close-panel" href="infoServei.html?id=' + item.id_SERVICIOS + '">' +
                                        '<div class="item-content">' +
                                            '<div class="item-media">' +
                                                '<img class="dimensioAnimalPerfil" src="images/no_foto.png" />' +
                                            '</div>' +
                                            '<div class="item-inner">' +
                                                '<div class="item-title">' +
                                                    '<div class="item-title-row">' +
                                                        '<div class="item-title">' + item.nombre_SERVICIOS + '</div>' +
                                                    '</div>' +
                                                    '<div class="item-subtitle">' + item.ciudad_SERVICIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</a>' +
                                '</li>'
                            );
                });
            }
        }
    });
});
