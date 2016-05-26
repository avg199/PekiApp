myApp.onPageInit('infoServei-screen', function (page) {

    var fechaString;

    dadesServei.forEach(function (item) {
        //Comprovar la id per saber l'animal
        if (page.query.id == item.id_SERVICIOS) {

            $$(".titol-empresa").html('');
            $$(".nomPesonal").html('');

            //titol de l'emprsa
            $$(".titol-empresa").append(item.nombre_SERVICIOS);

            $$(".infoOferta").append(
                '<div class="list-block">' +
                    '<div class="list-group">' +
                        '<ul>' +
                            '<li>' +
                                '<div class="item-content">' +
                                    '<div class="item-media">' +
                                        '<i class="icon icon-form-name"></i>' +
                                    '</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">' + item.nombre_SERVICIOS + '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<div class="item-content">' +
                                    '<div class="item-media">' +
                                        '<i class="icon icon-form-name"></i>' +
                                    '</div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title">' + item.horaMatiMin_SERVICIOS + ' - ' + item.horaMatiMax_SERVICIOS + ' i ' + item.horaTardaMin_SERVICIOS + ' - ' + item.horaTardaMax_SERVICIOS + '</div>' +
                                '</div>' +
                            '</div>' +
                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-location"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.ciudad_SERVICIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-location"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<div class="item-title">' + item.direccion_SERVICIOS + '</div>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                        '<li>' +
                                            '<div class="item-content">' +
                                                '<div class="item-media">' +
                                                    '<i class="icon icon-location"></i>' +
                                                '</div>' +
                                                '<div class="item-inner">' +
                                                    '<textarea">' + item.descripcion_SERVICIOS + '</textarea>' +
                                                '</div>' +
                                            '</div>' +
                                        '</li>' +
                                    '</ul>' +
                                '</div>' +
                            '</div>');
        }
    });

    var calendarDateFormat = myApp.calendar({
        value: [today],
        input: '#calendar-date-format',
        dateFormat: 'DD, dd MM yyyy',
        monthNames: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
        monthNamesShort: ['Gen', 'Febr', 'Març', 'Abr', 'Maig', 'Juny', 'Jul', 'Ag', 'Set', 'Oct', 'Nov', 'Des'],
        dayNames: ['Diumenge ', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
        dayNamesShort: ['Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'],
        toolbarCloseText: 'Aceptar',
        convertToPopover: false,
        onlyInPopover: false,
        onOpen: function (p) {
            if ($$(".page-mag").hasClass('hide')) {
                $$(".page-mag").removeClass('hide');
            }
        },
        onClose: function (p) {
            selectedDate = new Date(calendarDateFormat.value[0] + 3600 * 1000 * 12);
            fechaString = selectedDate.toISOString().substring(0, 10);

            //Petición con la fecha canviada.
            $$.ajax({
                url: url + 'Slim/api.php/horesDisponibles/' + page.query.id + '/' + fechaString,
                method: 'GET',
                xhrFields: { withCredentials: true },
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

                    var arrayHores = response.split(',');

                    $$("#horari").html('');

                    arrayHores.forEach(function (i, hora) {
                        if (hora == "") {
                            $$("#horari").append('<option value="default" selected="selected">Hores disponibles</option>');
                        } else {
                            $$("#horari").append('<option value="' + i + '">' + i + '</option>');
                        }
                    });
                }
            });
        }
    });

    var pageContainer = $$(page.container);

    pageContainer.find('.solicitarCita').on('click', function () {

        var hora = pageContainer.find('#horari').val();
        var descripcio = pageContainer.find('#descripcio').val();

        if (fechaString == null) {
            myApp.alert('Has de selccionar un dia i una hora.', 'Alerta!', function () { });
        } else{
            if (hora == "" || hora == "default") {
                myApp.alert('Selecciona una hora.', 'Alerta!', function () { });
            } else {
                //Petició solicitant una hora.
                $$.ajax({
                    url: url + 'Slim/api.php/insertarCita',
                    method: 'POST',
                    xhrFields: { withCredentials: true },
                    data: {
                        'id': localStorage.id,
                        'idServei': page.query.id,
                        'data': fechaString,
                        'horari': hora,
                        'descripcio': descripcio
                    },
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
                        if (response == "1") {
                            myApp.alert('Sol·licitud enviada, espera la confirmació.', 'Informació!', function () { });
                        }else{
                            myApp.alert('No s\'ha pogut enviar la sol·licitud.', 'Alerta!', function () { });
                        }
                    }
                });
            }
        }
    });
});
