myApp.onPageInit('infoAnimalL-screen', function (page) {
    
    dadesPerduts.forEach(function (item) {
        //Comprovar la id per saber l'animal
        if (page.query.id == item.id_ANIMALES) {

            //Trobat
            $$(".titol").html('');
            $$(".infoAnimalL").html('');

            $$(".titol").append(item.nombre_ANIMALES);
            $$(".infoAnimalL").append(
                '<div class="row">' +
                    '<div class="col-100 tablet-50 centre"><img src="' + item.urlGran_ANIMALES + '" style="width: 250px;" /></div>' +
                '</div>' +
                '<div class="content-block-title">Informació de l\'animal</div>' +
                '<div class="list-block">' +
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

                        '</li>' +
                    '</ul>' +
                '</div>' +
                '<div class="content-block-title">Informació de la localització</div>' +
                '<div class="list-block">' +
                    '<ul>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Ciutat:</div>' +
                                    '<div class="item-input">' +
                                        '<input type="text" value="' + item.ciudad_PIERDE + '" disabled>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Direcció:</div>' +
                                    '<div class="item-input">' +
                                        '<input type="text" value="' + item.direccion_PIERDE + '" disabled>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Recompensa:</div>' +
                                    '<div class="item-input">' +
                                        '<input type="text" value="' + item.recompensa_PIERDE + '" disabled>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                '<div class="item-inner">' +
                                    '<div class="item-title label">Descripció:</div>' +
                                    '<div class="item-input">' +
                                        '<input type="text" value="' + item.descripcion_PIERDE + '" disabled>' +
                                    '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                    '</ul>' +
                '</div>'+
                '<div class="content-block myapp-margin-bottom">' +
                    '<a class="button button-big button-fill lhevist">L\'he vist!</a>'+
                '</div>'
                );
        }
    });
    
    var pageContainer = $$(page.container);

    pageContainer.find('.lhevist').on('click', function () {

        var idanimal = pageContainer.find('#idanimal').val();

        myApp.confirm('Vols enviar un correu al propietari?', 'Informació', function () {

            $$.ajax({
                url: url + "Slim/api.php/animales/animalesPerdidos/email/" + idanimal,
                method: 'GET',
                xhrFields: { withCredentials: true },
                succes: function (responseText) {
                    if (responseText == "1") {
                        mainView.router.loadPage('lostandfind.html');
                    } else {
                        myApp.alert('No s\'ha pogut enviar el correu.', 'Alerta!', function () { });
                    }
                },
                error: function () {
                    //myApp.hideIndicator();
                    myApp.alert('Error de connexió', 'Alerta!', function () { });

                }
            });
        });
    });
});