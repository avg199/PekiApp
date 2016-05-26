myApp.onPageInit('perfil-screen', function (page) {

    switch (localStorage.tUsuari) {
        case "normal":
            //Recuperar informaci� usuari
            $$.ajax({
                url: url + 'Slim/api.php/usuariosToken/' + localStorage.id,
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

                    dadesUsuari = response;

                    $$(".nomPesonal").html('');

                    response.forEach(function (item) {

                        if (item.fotoPerfil_USUARIOS == null) {
                            item.fotoPerfil_USUARIOS = "images/perfil/User.png"
                        }else {
                            item.fotoPerfil_USUARIOS = url + item.fotoPerfil_USUARIOS;
                        }
                        $$(".nomPersonal").append(
                            '<div class="contact-header">' +
                                '<div class="item-photo">' +
                                    '<img class="dimensio_foto" src="' + item.fotoPerfil_USUARIOS + '" />' +
                                '</div>' +
                                '<div class="header-text">' +
                                    '<h3>' + item.nombre_USUARIOS + '</h3>' +
                                    '<p>Particular</p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="list-block">' +
                                '<div class="list-group">' +
                                    '<ul>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-form-name"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.nombre_USUARIOS + ' ' + item.apellido_USUARIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-form-email"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.email_USUARIOSl + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-location"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.poblacion_USUARIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>'
                            );
                    });
                    $$(".subtitol-perfil").append("Els meus animals perduts:");
                }
            });

            //Recuperar els animals perduts per usuari
            $$.ajax({
                url: url + 'Slim/api.php/animalesPerdidos/' + localStorage.id,
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

                    $$(".perfilAnimalPerdut").html('');

                    dadesAnimals = response;

                    if (response == "") {
                        $$(".perfilAnimalPerdut").append(
                            '<li>' +
                                '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title">No hi ha animals perduts.</div>' +
                                    '</div>' +
                                '</div>' +
                            '</li>'
                            );
                    } else {

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

                            $$(".perfilAnimalPerdut").append(
                                '<li>' +
                                    '<a class="item-link close-panel" href="infoAnimalP.html?id=' + item.id_ANIMALES + '">' +
                                        '<div class="item-content">' +
                                            '<div class="item-media">' +
                                                '<img class="dimensioAnimalPerfil" src="'+item.url_ANIMALES+'" />' +
                                            '</div>' +
                                            '<div class="item-inner">' +
                                                '<div class="item-title">' +
                                                    '<div class="item-title-row">' +
                                                        '<div class="item-title">' + item.nombre_ANIMALES + '</div>' +
                                                    '</div>' +
                                                    '<div class="item-subtitle">' + item.tipo_ANIMALES + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</a>' +
                                '</li>'
                            );
                        });
                    }
                    $$(".subsubtitol-perfil").append("Sol·licituds acceptades:");
                }
            });

            //Recuperar Serveis Acceptats o no
            $$.ajax({
                url: url + 'Slim/api.php/citesAceptades/' + localStorage.id,
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
                    if (response == "") {
                        $$(".perfilCitesSolicitades").append(
                            '<li>' +
                                '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title">No hi ha serveis acceptats o concel·lats.</div>' +
                                    '</div>' +
                                '</div>' +
                            '</li>');
                    } else {
                        var color;
                        response.forEach(function (item) {
                            if (item.estado_CITAS == "aceptada") {
                                color = "00FF00";
                            } else {
                                color = "FF0000";
                            }
                            $$(".perfilCitesSolicitades").append(
                                '<li>' +
                                    '<div class="item-content">' +
                                    '<div class="item-inner">' +

                                    '<div class="item-title-row" style="margin-bottom: 5px;">' +
                                    '<div class="item">' + item.descripcion_CITAS + '</div>' +
                                    '</div>' +

                                    '<div class="item-title-row">' +
                                    '<div class="item">Dia: <label style="color: #8E8E93;">' + item.dia_CITAS + '</label></div>' +
                                    '</div>' +

                                    '<div class="item-title-row">' +
                                    '<div class="item">Hora: <label style="color: #8E8E93;">' + item.hora_CITAS + '</label></div>' +
                                    '</div>' +

                                    '<div class="item-title-row">' +
                                    '<div class="item">Estat: <label style="color: #'+color+';">' + item.estado_CITAS + '</label></div>' +
                                    '</div>' +

                                    '</div>' +
                                    '</div>' +
                                    '</li>'
                                );
                        });
                    }
                }
            });

            break;

        case "empresa":
            //Recuperar informaci� empresa
            $$.ajax({
                url: url + 'Slim/api.php/usuariosToken/' + localStorage.id,
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

                    dadesUsuari = response;

                    $$(".nomPesonal").html('');

                    response.forEach(function (item) {

                        if (item.fotoPerfil_USUARIOS == null) {
                            item.fotoPerfil_USUARIOS = "images/perfil/User.png"
                        }

                        $$(".nomPersonal").append(
                            '<div class="contact-header">' +
                                '<div class="item-photo">' +
                                    '<img class="dimensio_foto" src="' + item.fotoPerfil_USUARIOS + '" />' +
                                '</div>' +
                                '<div class="header-text">' +
                                    '<h3>' + item.nombre_USUARIOS + '</h3>' +
                                    '<p>Servei</p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="list-block">' +
                                '<div class="list-group">' +
                                    '<ul>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-form-name"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.nombre_USUARIOS + ' ' + item.apellido_USUARIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-form-email"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.email_USUARIOSl + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-location"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.poblacion_USUARIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>'
                            );
                    });
                    $$(".subtitol-perfil").append("Els meus serveis:");
                }
            });

            $$.ajax({
                url: url + 'Slim/api.php/serveisUsuari/' + localStorage.id,
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

                    $$("perfilAnimalPerdut").html('');

                    if (response == "") {
                        $$(".perfilAnimalPerdut").append(
                            '<div class="list-block" style="margin-top:0px;">' +
                                '<ul>' +
                                    '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">No hi ha sol·licituds pendents.</div>' +
                                                '</div>' +
                                            '</div>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</div>'
                            );
                    } else {

                        response.forEach(function (servicio) {
                            $$(".perfilAnimalPerdut").append(
                                '<li>' +
                                    '<a class="item-link close-panel" href="aceptarcites.html?id=' + servicio.id_SERVICIOS + '&nom='+servicio.nombre_SERVICIOS+'">' +
                                        '<div class="item-content">' +
                                            '<div class="item-inner">' +
                                                '<div class="item-title">' +
                                                    '<div class="item-title-row">' +
                                                        '<div class="item-title">' + servicio.nombre_SERVICIOS + '</div>' +
                                                    '</div>' +
                                                    '<div class="item-subtitle">' + servicio.tipus_SERVICIOS + '</div>' +
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
            break;
        case "protectora":
            //Recuperar informaci� protectora
            $$.ajax({
                url: url + 'Slim/api.php/usuariosToken/' + localStorage.id,
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

                    dadesUsuari = response;

                    $$(".nomPesonal").html('');

                    response.forEach(function (item) {

                        if (item.fotoPerfil_USUARIOS == null) {
                            item.fotoPerfil_USUARIOS = "images/perfil/User.png"
                        }

                        $$(".nomPersonal").append(
                            '<div class="contact-header">' +
                                '<div class="item-photo">' +
                                    '<img class="dimensio_foto" src="' + item.fotoPerfil_USUARIOS + '" />' +
                                '</div>' +
                                '<div class="header-text">' +
                                    '<h3>' + item.nombre_USUARIOS + '</h3>' +
                                    '<p>Protectora</p>' +
                                '</div>' +
                            '</div>' +
                            '<div class="content-block-title">Informació del compte:</div>'+
                            '<div class="list-block">' +
                                '<div class="list-group">' +
                                    '<ul>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-form-name"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.nombre_USUARIOS + ' ' + item.apellido_USUARIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-form-email"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.email_USUARIOSl + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-location"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.poblacion_USUARIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>'
                            );
                    });
                    $$(".subtitol-perfil").append("Peticions d'adopció:");
                }
            });

            //Recuperar Peticions d'adopci�
            $$.ajax({
                url: url + 'Slim/api.php/protectora/solicitudesAnimales/' + localStorage.id,
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

                    $$(".perfilAnimalPerdut").html('');

                    dadesAnimals = response;

                    if (response == "") {
                        $$(".perfilAnimalPerdut").append(
                            '<div class="list-block" style="margin-top:0px;">' +
                                '<ul>' +
                                    '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">No hi ha sol·licituds pendents.</div>' +
                                                '</div>' +
                                            '</div>' +
                                    '</li>' +
                                    '</ul>' +
                                    '</div>'
                            );
                    } else {

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

                            $$(".perfilAnimalPerdut").append(
                                '<li>' +
                                    '<a class="item-link close-panel" href="solicitudAdopcio.html?id=' + item.id_ANIMALES + '">' +
                                        '<div class="item-content">' +
                                            '<div class="item-media">' +
                                                '<img class="dimensioAnimalPerfil" src="' + item.url_ANIMALES + '" />' +
                                            '</div>' +
                                            '<div class="item-inner">' +
                                                '<div class="item-title">' +
                                                    '<div class="item-title-row">' +
                                                        '<div class="item-title">' + item.nombre_ANIMALES + '</div>' +
                                                    '</div>' +
                                                    '<div class="item-subtitle">' + item.tipo_ANIMALES + '</div>' +
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
            break;
    }
});
