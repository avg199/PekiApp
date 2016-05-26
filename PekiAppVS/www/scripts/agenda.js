var selectedDate = null;
var bSort = false;
var idServeiAgenda;
var datosPeticio;

myApp.onPageInit('agenda-screen', function (page) {

    idServeiAgenda = page.query.id;

    var pageContainer = $$(page.container);

//////SWIPER///////////////////////////////
    var mySwiper = myApp.swiper('.swiper-container', {
        pagination:'.swiper-pagination',
        direction: 'horizontal',
        nextSlideMessage: 'Next slide',
        prevSlideMessage:'Previous slide',
        spaceBetween: 1000,

        //voltes
        loop: true,
        loopAdditionalSlides: 1,
        loopedSlides: 1

    });

    mySwiper.on('onSlideNextStart', function () {
        setTimeout(function(){
            $$(".programacio-dia").html('');
        },50);

        //Assignem un valor a fecha si ha seleccionat una data tindrà aquest valor sino serà null
        fecha = selectedDate;
        //Si la fecha no esta buit incrementem la selected date per canviar el dia que tenim seleccionat al calendari
        if (fecha!= null){
            //incrementem 1 dia a la dara selecionada despres d'agafarla
            selectedDate = selectedDate.addDays(1);
        }//Si fecha està buida hem d'agafar la d'avui
        else{
            fecha = calendarDateFormat.value[0];
        }
        //enviar la data per sumar 1 dia
        fecha = fecha.addDays(1);
        //Transformar la data a string
        fechaString = fecha.toISOString().substring(0, 10);
        calendarDateFormat.setValue([fecha]);

        peticioDades(fechaString, idServeiAgenda);
    });

    mySwiper.on('onSlidePrevStart', function () {
        setTimeout(function(){
            $$(".programacio-dia").html('');
        },50);
        fecha = selectedDate;
        if (fecha != null) {
            selectedDate = selectedDate.addDays(-1);
        }else{
            fecha = calendarDateFormat.value[0];
        }

        fecha = fecha.addDays(-1);
        fechaString = fecha.toISOString().substring(0,10);
        calendarDateFormat.setValue([fecha]);

        peticioDades(fechaString, idServeiAgenda);
    });

////////////////////////////////////////////////////////////////////////////////

    //if(isAndroid){
    //    $$(".back").addClass("material-margin-left")
    //}

    $$(".list-block").addClass('listblock-margin-top');

    var arrData=[];

    //Iniciem el calendari
        var calendarDateFormat = myApp.calendar({
            value: [today],
            input: '#calendar-date-format-serveis',
            dateFormat: 'DD, dd MM yyyy',
            monthNames: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'],
            monthNamesShort: ['Gen', 'Febr', 'Març', 'Abr', 'Maig', 'Juny', 'Jul', 'Ag', 'Set', 'Oct', 'Nov', 'Des'],
            dayNames: ['Diumenge ', 'Dilluns', 'Dimarts', 'Dimecres', 'Dijous', 'Divendres', 'Dissabte'],
            dayNamesShort: ['Dg', 'Dl', 'Dt', 'Dc', 'Dj', 'Dv', 'Ds'],
            toolbarCloseText: 'Aceptar',
            convertToPopover: false,
            onlyInPopover: false,
            events: arrData,
            onOpen: function (p) {
                if ($$(".page-mag").hasClass('hide')) {
                    $$(".page-mag").removeClass('hide');
                }
            },
            onClose: function (p) {
                selectedDate = new Date(calendarDateFormat.value[0] + 3600 * 1000 * 12);
                fechaString = selectedDate.toISOString().substring(0, 10);

                //Petición con la fecha canviada.
                peticioDades(fechaString, idServeiAgenda);

                if (!$$(".page-mag").hasClass('hide')) {
                    $$('.page-mag').addClass('hide');
                }
            }
        });

    //assignar la ultima data visitada
    if (selectedDate != null){
        calendarDateFormat.setValue([selectedDate]);

        fecha = calendarDateFormat.value[0];
        fechaString = fecha.toISOString().substring(0, 10);

        //Petición a servidor sobre los datos a agregar en agenda
        peticioDades(fechaString, idServeiAgenda);
    }
    else{
        var fecha = calendarDateFormat.value[0];
        var fechaString = fecha.toISOString().substring(0, 10);

        //Petición a servidor sobre los datos a agregar en agenda
        peticioDades(fechaString, idServeiAgenda);
    }

    //Cuando le das al boton con el dia vuelve al día de hoy
    pageContainer.find('.boto-avui').on('click', function () {
        calendarDateFormat.setValue([today]);

        var fecha = calendarDateFormat.value[0];
        var fechaString = fecha.toISOString().substring(0, 10);
        selectedDate = fecha;

         //Petición a servidor sobre los datos a agragar en agenda
        peticioDades(fechaString, idServeiAgenda);
    });

    pageContainer.find('.icon-drop').on('click', function () {
        calendarDateFormat.open();
    });

    day = today.getDate();
    $$('.icon-today').removeClass('icon-today').addClass('icon-today-'+day);

    if (bSort) {
        //Per si ha fet un logut canviar el dia
        calendarDateFormat.setValue([today]);
        bSort = false;
    }
});

//Funció per passar la data rebuda en STRING a tipo DATE
function stringToDate(_date, _format, _delimiter) {
    var formatLowerCase = _format.toLowerCase();
    var formatItems = formatLowerCase.split(_delimiter);
    var dateItems = _date.split(_delimiter);
    var monthIndex = formatItems.indexOf("mm");
    var dayIndex = formatItems.indexOf("dd");
    var yearIndex = formatItems.indexOf("yyyy");
    var month = parseInt(dateItems[monthIndex]);
    month -= 1;
    var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    return formatedDate;
}

//Funció per sumar o restar dies a la data
function sumaFecha(d, fecha) {
    var sepFecha = fecha.split('-');
    console.log(sepFecha);
    var dia = parseInt(sepFecha[2]);

    dia = dia + d;

    var fechaFinal = sepFecha[0] + "-" + sepFecha[1] + "-" + dia;
    console.log(fechaFinal);
    return (fechaFinal);
}

Date.prototype.addDays = function (days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

//funcion para la peticion de datos al clicar un dia de calendario
function peticioDades(fechaString, idDelServei) {

    $$.ajax({
        url: url + 'Slim/api.php/hores/horesOcupades/'+idDelServei+'/'+fechaString,
        method: 'GET',
        xhrFields: { withCredentials: true },
        //data: {
        //    'fecha': fechaString,
        //    'apikey': 'pi64YQliHELsj5oCVp1E/rtld53yXm3teTeAg+EBgC447xXtZtE5wPYPD8aw6w9pixtKsfS+XPRMVy5HkvRrXg=='
        //},
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

            datosPeticio = response;
            $$(".programacio-dia").html('');

            if (response == "") {
                $$(".programacio-dia").append(
                        '<li>' +
                        '<div class="item-inner">' +
                        '<div class="item-title-row">' +
                        '<div class="item-title item-content center">No hi ha cap activitat.</div>' +
                        '</div>' +
                        '</div>' +
                        '</li>'
                    );
            } else {

                response.forEach(function(item) {

                    $$(".programacio-dia").append(
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

                                '<a href="#" class="button button-fill button-raised color-red cancelar-cita" onClick=\'cancelarCitaAceptada(' + item.id_CITAS + ');\' id="cancelarCitaAceptada">Cancel·lar</a>' +

                                '</div>' +
                                '</div>' +
                                '</li>'
                                );
                });
            }
        }
    });
}

function cancelarCitaAceptada(idServeiAcceptada) {

        datosPeticio.forEach(function (item) {
            if (idServeiAcceptada == item.id_CITAS) {

                $$.ajax({
                    url: url + 'Slim/api.php/serveis/solicitudes/cancelar',
                    method: 'POST',
                    data: {
                        'idCita': idServeiAcceptada
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
                                mainView.router.loadPage('agenda.html?id='+page.query.id+'');
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
