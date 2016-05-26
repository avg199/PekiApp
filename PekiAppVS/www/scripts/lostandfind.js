
myApp.onPageInit('lostandfind-screen', function (page) {

    if (localStorage.tUsuari == "normal") {
        $$(".botoAfegirLostAndFind").append(
            '<a href="addAnimal.html" class="floating-button">' +
                '<i class="icon icon-plus"></i>' +
            '</a>'
            );
    }

    //Recuperar informació usuari
    $$.ajax({
        url: url + 'Slim/api.php/animalesPerdidos',
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

            dadesPerduts = response;

            $$(".lostandfind").html('');

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
                    item.tipo_ANIMALES = "Gos";
                }
                if (item.tipo_ANIMALES == "gato") {
                    item.tipo_ANIMALES = "Gat";
                }

                dataPerdua = timeConverter(item.fecha_PIERDE);

                $$(".lostandfind").append(
                    '<li>' +
                        '<input type="hidden" name="idAnimalLF" id="idAnimalLF" value="' + item.id_ANIMALES + '"/>' +
                        '<div class="card demo-card-header-pic">'+
                            '<div style="background-image:url(' + item.urlGran_ANIMALES + ')" valign="bottom" class="card-header color-white no-border">Perdut a '+item.ciudad_PIERDE+'</div>' +
                            '<div class="card-content">'+
                                '<div class="card-content-inner">'+
                                    '<p class="color-gray">'+dataPerdua+'</p>'+
                                    '<p>'+item.direccion_PIERDE+'</p>'+
                                '</div>'+
                            '</div>'+
                            '<div class="card-footer">'+
                                '<a href="infoAnimalL.html?id=' + item.id_ANIMALES + '" class="link">+ Informació</a>' +
                            '</div>'+
                        '</div>'+
                    '</li>');
            });
        }
    });
});
