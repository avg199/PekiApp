myApp.onPageInit('adopcions-screen', function (page) {

    if (localStorage.tUsuari == "protectora") {
        $$(".botoAfegirAdopcio").append(
            '<a href="addAdopcio.html" class="floating-button">' +
                '<i class="icon icon-plus"></i>' +
            '</a>'
            );
    }

    $$.ajax({
        url: url + 'Slim/api.php/animalesAdopcion',
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
            myApp.alert('Error de connexió', 'Alerta!', function () { });
        },
        success: function (response) {

            dadesAdoptals = response;

            $$(".adop-gossos").html('');
            $$(".adop-gats").html('');

            response.forEach(function (item) {

                if (item.url_ANIMALES == null) {
                    item.url_ANIMALES = "images/no_foto.png";
                } else {
                    item.url_ANIMALES = url + item.url_ANIMALES;
                }
                if (item.urlGran_ANIMALES == null) {
                    item.urlGran_ANIMALES = "images/no_foto.png";
                } else {
                    item.urlGran_ANIMALES = url + item.urlGran_ANIMALES;
                }

                if (item.tipo_ANIMALES == "perro") {
                    $$(".adop-gossos").append(
                    '<li>' +
                        '<div class="card demo-card-header-pic">' +
                            '<div style="background-image:url(' + item.urlGran_ANIMALES + ')" valign="bottom" class="card-header color-white no-border">' + item.nombre_ANIMALES + '</div>' +
                            '<div class="card-content">' +
                                '<div class="card-content-inner">' +
                                    '<p class="color-gray">' + item.medida_ANIMALES + '</p>' +
                                    '<div class="item-text">' + item.descripcion_ANIMALES + '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="card-footer">' +
                                '<a href="infoAnimalA.html?id=' + item.id_ANIMALES + '" class="link">+ Informació</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>');
                } else {
                    $$(".adop-gats").append(
                    '<li>' +
                        '<div class="card demo-card-header-pic">' +
                            '<div style="background-image:url(' + item.urlGran_ANIMALES + ')" valign="bottom" class="card-header color-white no-border">' + item.nombre_ANIMALES + '</div>' +
                            '<div class="card-content">' +
                                '<div class="card-content-inner">' +
                                    '<p class="color-gray">Mida: ' + item.medida_ANIMALES + '</p>' +
                                    '<div class="item-text">' + item.descripcion_ANIMALES + '</div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="card-footer">' +
                                '<a href="infoAnimalA.html?id=' + item.id_ANIMALES + '" class="link">+ Informació</a>' +
                            '</div>' +
                        '</div>' +
                    '</li>');
                }
            });
        }
    });
});
