myApp.onPageInit('editperfil-screen', function (page) {

    //var page = e.detail.page;

    dadesUsuari.forEach(function (item) {

        if (item.fotoPerfil_USUARIOS == null) {
            item.fotoPerfil_USUARIOS = "images/perfil/User.png"
        }

        $$(".capcelera_editperfil").append(
            '<div class="item-photo">' +
                '<img class="dimensio_foto" src="' + item.fotoPerfil_USUARIOS + '" />' +
            '</div>' +
            '<div class="header-text">' +
                '<h3>' + item.nombre_USUARIOS + ' ' + item.apellido_USUARIOS + '</h3>' +
                '<p>Usuari</p>' +
            '</div>'
            );

        $$(page.container).find('#nom').val(item.nombre_USUARIOS);
        $$(page.container).find('#cognom').val(item.apellido_USUARIOS);
        $$(page.container).find('#email').val(item.email_USUARIOSl);
        $$(page.container).find('#direccio').val(item.direccion_USUARIOS);
        $$(page.container).find('#poblacio').val(item.poblacion_USUARIOS);
        $$(page.container).find('#cp').val(item.CP_USUARIOS);
        $$(page.container).find('#telefon').val(item.telefono_USUARIOS);

    });

    var pageContainer = $$(page.container);

    var nom_nou = pageContainer.find('#nom').val();
    var cognom_nou = pageContainer.find('#cognom').val();
    var telefon_nou = pageContainer.find('#telefon').val();
    var cp_nou = pageContainer.find('#cp').val();
    var poblacio_nou = pageContainer.find('#poblacio').val();

    pageContainer.find('.butoActualitzar').on('click', function () {
        console.log('butoActualitzar');
        $$.ajax({
            url: url + "Slim/api.php/usuarios/actualizar/" + localStorage.id,
            type: "POST",
            xhrFields: { withCredentials: true },
            data: {
                'nom_nou': nom_nou,
                'cognom_nou': cognom_nou,
                'telefon_nou': telefon_nou,
                'cp_nou': cp_nou,
                'poblacio_nou': poblacio_nou,
            },
            beforeSend: function () {
                //myApp.showIndicator();
            },
            complete: function () {
                //myApp.hideIndicator();
            },
            success: function (response) {
                if (response == "1") {

                    myApp.alert('Dades actualitzades correctament!', 'Informació', function () { });

                } else if (response == "2") {

                    myApp.alert('Error en l\'actualització de perfil. Hi ha camps sense completar', 'Alerta!', function () { });

                } else {

                    myApp.alert('Error en l\'actualització de perfil. Comprova que els tipus de dades siguin correctes', 'Alerta!', function () { });

                }
            },
            error: function () {
                //myApp.hideIndicator();
                myApp.alert('Error de connexió', 'Alerta!', function () { });
            }
        });
    });
});
