myApp.onPageInit('infoAnimalA-screen', function (page) {
    
    dadesAdoptals.forEach(function(item) {

        //Comprovar la id per saber l'animal
        if (page.query.id == item.id_ANIMALES) {

            //Trobat
            $$(".titol").html('');
            $$(".infoAnimalA").html('');

            $$(".titol").append(item.nombre_ANIMALES);
            $$(".infoAnimalA").append(
                '<div class="row">' +
                    '<div class="col-100 tablet-50 centre"><img src="' + item.urlGran_ANIMALES + '" style="width: 250px;"/></div>' +
                '</div>' +
                '<div class="content-block-title">Informació de l\'animal</div>' +
                '<div class="list-block myapp-margin-bottom">' +
                    '<ul>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Nom:</div>' +
                                    '<div class="item-input">' +
                                        '<input type="hidden" id="idanimal" value="' + item.id_ANIMALES + '" />' +
                                        '<input type="text" value="' + item.nombre_ANIMALES + '" disabled>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Xip:</div>' +
                                    '<div class="item-input">' +
                                        '<input type="text" value="' + item.chip_ANIMALES + '" disabled>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Animal:</div>' +
                                        '<div class="item-input">' +
                                            '<input type="text" value="' + item.tipo_ANIMALES + '" disabled>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Sexe:</div>' +
                                        '<div class="item-input">' +
                                            '<input type="text" value="' + item.sexo_ANIMALES + '" disabled>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Tamany:</div>' +
                                        '<div class="item-input">' +
                                            '<input type="text" value="' + item.medida_ANIMALES + '" disabled>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Raça:</div>' +
                                        '<div class="item-input">' +
                                            '<input type="text" value="' + item.raza_ANIMALES + '" disabled>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Edat:</div>' +
                                        '<div class="item-input">' +
                                            '<input type="text" value="' + item.edad_ANIMALES + '" disabled>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Color:</div>' +
                                        '<div class="item-input">' +
                                            '<input type="text" value="' + item.color_ANIMALES + '" disabled>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +

                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Vacunes:</div>' +
                                        '<div class="item-input">' +
                                            '<input type="text" value="' + item.vacunes_ANIMALES + '" disabled>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</div>'+
                        '</li>' +
                        '<div class="aqui"></div>' +
                    '</ul>' +
                '</div>'
                );
        }
    });

    if (localStorage.tUsuari == "normal") {

        $$('.list-block').removeClass('myapp-margin-bottom');

        $$(".aqui").append('<a class="button button-big button-fill myapp-margin-bottom adoptaranimal">Adoptar</a>');
        var pageContainer = $$(page.container);

        pageContainer.find('.adoptaranimal').on('click', function () {

            var idanimal = pageContainer.find('#idanimal').val();

            myApp.confirm('Vols enviar una petició a la protectora?', 'Informació', function () {

                $$.ajax({
                    url: url + "Slim/api.php/animales/adoptar",
                    method: 'POST',
                    xhrFields: { withCredentials: true },
                    data: {
                        'token_usuario': localStorage.id,
                        'id_animal': idanimal
                    },
                    success: function (responseText) {

                        responseTextArray = responseText.split(" ");

                        if (responseTextArray[0] == "1") {
                            if(responseTextArray[1] == "1") {
                                mainView.router.loadPage('adopcions.html');
                            } else {
                                myApp.alert('No s\'ha pogut enviar la petició.', 'Alerta!', function () { });
                            }
                        } else {
                            myApp.alert('No s\'ha pogut enviar la petició.', 'Alerta!', function () { });
                        }
                    },
                    error: function () {
                        //myApp.hideIndicator();
                        myApp.alert('Error de connexió', 'Alerta!', function () { });

                    }
                });
            });
        });
    }
});
    