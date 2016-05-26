myApp.onPageInit('login-screen', function (page) {

    var pageContainer = $$(page.container);
    localStorage.id = null;
    localStorage.correuelectronic = null;
    localStorage.tUruaru = null;
    console.log(localStorage.id);

    //Quan cliqui a un list-button de la pantalla login-screen es comprobaran es seguent:
    pageContainer.find('.iniciar-sessio').on('click', function () {

        var username = pageContainer.find('#user').val();
        var password = pageContainer.find('#pass').val();

        //Comprobar que los campos no esten vacios
        if (username == '' || password == '') {
            myApp.alert('Els camps d\'usuari i contrasenya són obligatoris', 'Alerta!', function () { });
            //Treure el focus dels textbox
            elemento = document.getElementById("pass");
            elemento.blur();
            elemento2 = document.getElementById("user");
            elemento2.blur();
        }

        else {

                //Petici�n al servidor para autentificaci�n
                $$.ajax({
                    url: url + 'Slim/api.php/usuarios/existe',
                    method: 'POST',
                    xhrFields: { withCredentials: true },
                    data: {
                        'lg_username': username,
                        'lg_password': password
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
                            localStorage.setItem("id", responseTextarray[1]);
                            localStorage.setItem("correuelectronic", responseTextarray[2]);
                            localStorage.setItem("tUsuari", responseTextarray[3]);

                            //Treure el focus dels textbox
                            elemento = document.getElementById("pass");
                            elemento.blur();
                            elemento2 = document.getElementById("user");
                            elemento2.blur();
                            setTimeout(function () {
                                pageContainer.find('#pass').val('');
                            }, 500);
                            password = '';
                            mainView.router.loadPage('pprincipal.html');
                        }
                        else if (responseTextarray[0] == "0") {
                            myApp.alert('Usuari o contrasenya incorrectes.', 'Alerta!', function () { });

                            //Treure el focus dels textbox
                            elemento = document.getElementById("pass");
                            elemento.blur();
                            elemento2 = document.getElementById("user");
                            elemento2.blur();
                            setTimeout(function () {
                                pageContainer.find('#pass').val('');
                            }, 500);
                            password = '';
                        }
                        else {
                            alert(responseText);
                        }
                    },
                    error: function () {
                        //myApp.hideIndicator();
                        myApp.alert('Error de connexió', 'Alerta!', function () { });

                    }
                });
            }
    });
});
