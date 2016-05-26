myApp.onPageInit('solicitudAdopcio-screen', function (page) {
    var idAnimal;

    dadesAnimals.forEach(function(item) {
        //Comprovar la id per saber l'animal
        if (page.query.id == item.id_ANIMALES) {

            $$(".solicitud").append(
                '<div class="contact-header">'+
                    '<div class="item-photo">'+
                        '<img src="'+ item.url_ANIMALES +'">'+
                    '</div>'+
                    '<div class="header-text">'+
                        '<h3>'+ item.nombre_ANIMALES +'</h3>'+
                        '<p>'+ item.sexo_ANIMALES +'</p>'+
                    '</div>'+
                '</div>'+
                '<div class="list-block">'+
                    '<div class="list-group">'+
                        '<ul>'+
                            '<li class="item-content">' +
                                    '<div class="item-title label">Tamany:</div>'+
                                    '<div class="item-inner">'+
                                        '<div class="item-title">'+ item.medida_ANIMALES +'</div>'+
                                    '</div>'+
                            '</li>'+
                            '<li class="item-content">' +
                                    '<div class="item-title label">Edat:</div>' +
                                    '<div class="item-inner">'+
                                        '<div class="item-title">'+ item.edad_ANIMALES +'</div>'+
                                    '</div>'+
                            '</li>'+
                            '<li class="item-content">'+
                                '<div class="item-title label">Color:</div>' +
                                '<div class="item-inner">'+
                                    '<div class="item-title">'+ item.color_ANIMALES +'</div>'+
                                '</div>'+
                            '</li>' +
                            '<li class="item-content">' +
                                '<div class="item-title label">Raça:</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">' + item.raza_ANIMALES + '</div>' +
                                '</div>' +
                            '</li>' +
                        '</ul>'+
                    '</div>'+
                '</div>' +
                '<div class="content-block-title">Sol·licitant:</div>' +
                '<div class="list-block">'+
                    '<div class="list-group">'+
                        '<ul>'+
                            '<li class="item-content">' +
                                    '<div class="item-title label">Nom:</div>'+
                                    '<div class="item-inner">'+
                                        '<div class="item-title">'+ item.nombre_USUARIOS +'</div>'+
                                    '</div>'+
                            '</li>' +
                            '<li class="item-content">' +
                                    '<div class="item-title label">Telèfon:</div>' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title">' + item.telefono_USUARIOS + '</div>' +
                                    '</div>' +
                            '</li>' +
                            '<li class="item-content">' +
                                    '<div class="item-title label">Email:</div>' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title">' + item.email_USUARIOS + '</div>' +
                                    '</div>' +
                            '</li>' +
                            '<li class="item-content">' +
                                    '<div class="item-title label">Població:</div>' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title">' + item.poblacion_USUARIOS + '</div>' +
                                    '</div>' +
                            '</li>' +
                            '<li class="item-content">' +
                                    '<div class="item-title label">Codi Postal:</div>' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title">' + item.CP_USUARIOS + '</div>' +
                                    '</div>' +
                            '</li>' +
                        '</ul>'+
                    '</div>'+
                '</div>'+
                '<p class="buttons-row myapp-margin-bottom">' +
                    '<a href="#" class="button button-big button-fill button-raised color-green acceptar-adopcio">Acceptar</a>' +
                    '<a href="#" class="button button-big button-fill button-raised color-red cancelar-adopcio">Cancel·lar</a>' +
                '</p>');
        }
    });

    var pageContainer = $$(page.container);

    //Capturar el clic acceptar o cancelar
    pageContainer.find('.acceptar-adopcio').on('click', function () {
        console.log('acceptar');
        $$.ajax({
            url: url + 'Slim/api.php/protectora/solicitudes/aceptar',
            method: 'POST',
            data: {
                'token_usuario': localStorage.id,
                'id_animal': page.query.id
            },
            beforeSend: function () {
                myApp.showPreloader();
            },
            complete: function () {
                myApp.hidePreloader();
            },
            success: function (responseText) {
                var responseTextarray = responseText.split(" ");

                if (responseTextarray[0] == "1") {
                    myApp.alert('Sol·licitud acceptada correctament!', 'Alerta!', function () {
                        mainView.router.loadPage('perfil.html');
                    });
                } else {
                    myApp.alert('No s\'ha pogut acceptar la sol·licitud!', 'Alerta!', function () { });
                }
            },
            error: function () {
                myApp.hidePreloader();
                myApp.alert('Error de connexió', 'Alerta!', function () { });
            }
        });
    });
    pageContainer.find('.cancelar-adopcio').on('click', function () {
        console.log('cancel·lar');
        $$.ajax({
            url: url + 'Slim/api.php/protectora/solicitudes/cancelar',
            method: 'POST',
            data: {
                'token_usuario': localStorage.id,
                'id_animal': page.query.id
            },
            beforeSend: function () {
                myApp.showPreloader();
            },
            complete: function () {
                myApp.hidePreloader();
            },
            success: function (responseText) {
                var responseTextarray = responseText.split(" ");

                if (responseTextarray[0] == "1") {
                    myApp.alert('Sol·licitud cancel·lat correctament!', 'Alerta!', function () {
                        mainView.router.loadPage('perfil.html');
                    });
                } else {
                    myApp.alert('No s\'ha pogut cancel·lar la sol·licitud!', 'Alerta!', function () { });
                }
            },
            error: function () {
                myApp.hidePreloader();
                myApp.alert('Error de connexió', 'Alerta!', function () { });
            }
        });
    });
});