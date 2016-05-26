var dadesCites;
var idServei;

myApp.onPageInit('aceptarCites-screen', function (page) {

    $$('.titolServei').html('');
    $$('.butoAgenda').html('');

    $$('.butoAgenda').append('<a href="agenda.html?id='+page.query.id+'" class="button button-fill button-raised agenda">Agenda</a>');

    $$('.titolServei').append(page.query.nom);
    idServei = page.query.id;

    $$.ajax({
        url: url + 'Slim/api.php/citesServei/' + page.query.id,
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

            $$('.taula').html('');
            if (response == "") {
                $$(".taula").append(
                            '<li>' +
                                '<div class="item-content">' +
                                    '<div class="item-inner">' +
                                        '<div class="item-title">No hi ha cites noves.</div>' +
                                    '</div>' +
                                '</div>' +
                            '</li>');
            } else {

                response.forEach(function (item) {

                    dadesCites = response;

                    $$(".taula").append(
                        '<li>' +
                                '<div class="item-content">' +
                                '<div class="item-inner">' +

                                '<div class="item-title-row" style="margin-bottom: 5px;">' +
                                '<div class="item">' + item.descripcion_CITAS + '</div>' +
                                '</div>' +

                                '<div class="item-title-row">' +
                                '<div class="item">Client: <label style="color: #8E8E93;">' + item.nombre_USUARIOS + '</label></div>' +
                                '</div>' +

                                '<div class="item-title-row">' +
                                '<div class="item">Telèfon: <label style="color: #8E8E93;">' + item.telefono_USUARIOS + '</label></div>' +
                                '</div>' +

                                '<div class="item-title-row">' +
                                '<div class="item">email: <label style="color: #8E8E93;">' + item.email_USUARIOSl + '</label></div>' +
                                '</div>' +

                                '<div class="item-title-row">' +
                                '<div class="item">Població: <label style="color: #8E8E93;">' + item.poblacion_USUARIOS + '</label></div>' +
                                '</div>' +

                                '<div class="item-title-row">' +
                                '<div class="item">Hora: <label style="color: #8E8E93;">' + item.hora_CITAS + '</label></div>' +
                                '</div>' +

                                '<a href="#" class="button button-fill button-raised color-green acceptar-cita" onClick=\'acceptarCita(' + item.id_CITAS + ');\' id="acceptarCita">Acceptar</a>' +
                                '<a href="#" class="button button-fill button-raised color-red cancelar-cita" onClick=\'cancelarCita(' + item.id_CITAS + ');\' id="cancelarCita">Cancel·lar</a>' +

                                '</div>' +
                                '</div>' +
                                '</li>'
                                );
                });
            }
        }
    });
});

function acceptarCita(idCita) {
    var hora;
    var dia;

    dadesCites.forEach(function (item) {
        if (idCita == item.id_CITAS) {
            hora = item.hora_CITAS;
            dia = item.dia_CITAS;

            $$.ajax({
                url: url + 'Slim/api.php/serveis/solicitudes/aceptar',
                method: 'POST',
                data: {
                    'idServei': idServei,
                    'dia': dia,
                    'hora': hora,
                    'idCita': idCita
                },
                beforeSend: function () {
                   //myApp.showIndicator();
                },
                complete: function () {
                    //myApp.hideIndicator();
                },
                success: function (responseText) {

                    if (responseText == "111") {
                        myApp.alert('Cita acceptada correctament!', 'Alerta!', function () {
                            mainView.router.loadPage('perfil.html');
                        });
                    } else {
                        myApp.alert('No s\'ha pogut acceptar la cita!', 'Alerta!', function () { });
                    }
                },
                error: function () {
                    //myApp.hideIndicator();
                    myApp.alert('Error de connexió', 'Alerta!', function () { });
                }
            });
        }
    });
}

function cancelarCita(idCita) {

    dadesCites.forEach(function (item) {
        if (idCita == item.id_CITAS) {

            $$.ajax({
                url: url + 'Slim/api.php/serveis/solicitudes/cancelar',
                method: 'POST',
                data: {
                    'idCita': idCita
                },
                beforeSend: function () {
                    //myApp.showIndicator();
                },
                complete: function () {
                    //myApp.hideIndicator();
                },
                success: function (responseText) {
                    var responseTextarray = responseText.split(" ");

                    if (responseTextarray[0] == "1") {
                        myApp.alert('Cita cancel·lada correctament!', 'Alerta!', function () {
                            mainView.router.loadPage('perfil.html');
                        });
                    } else {
                        myApp.alert('No s\'ha pogut cancel·lar la cita!', 'Alerta!', function () { });
                    }
                },
                error: function () {
                    //myApp.hideIndicator();
                    myApp.alert('Error de connexió', 'Alerta!', function () { });
                }
            });
        }
    });
}