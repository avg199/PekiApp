
//variables
var url = 'http://pekiapp.azurewebsites.net/'
var dadesUsuari;
var dadesAnimals;
var dadesAdoptals;
var dadesPerduts;
var dadesServei;
var dataPerdua;
var today = new Date();

// Export selectors engine
var $$ = Dom7;

$$('.view.navbar-through').removeClass('navbar-through').addClass('navbar-fixed');
$$('.view .navbar').prependTo('.view .page');

// Initialize your app
var myApp = new Framework7({});

// Add view
var mainView = myApp.addView('.view-main', {
    dynamicNavbar: false
});

//Amagar la pagina magica blanca al engegar la app
setTimeout(function () {
    $$(".page-mag1").addClass('hide');
}, 200);

setTimeout(function () {
    mainView.router.loadPage('login.html');
}, 1500);

myApp.onPageInit('index', function (page) {

    setTimeout(function () {
        $$(".page-mag1").addClass('hide');
    }, 200);

    if (localStorage.id == null) {

        //Redirigir al login desde el loading o principal
        setTimeout(function () {
            mainView.router.loadPage('login.html');
        }, 1500);
    }
});

// Comprovem a quina pàgina està per si pot anar enrere o no!!!
document.addEventListener("deviceready", appReady, false);

function appReady() {

    //escoltar el botó d'anar enrere del mobil (no de la app)
    document.addEventListener("backbutton", function (e) {

        //per saber en quina pagina està en el moment que li dona al botó físic del mobil
        var page = myApp.getCurrentView().activePage;
        myApp.hidePreloader();
        if (page.name == "login-screen") {
            e.preventDefault();

            //Està al login si fa atras surt de la aplicació
            myApp.confirm('Vols sortir de l\'aplicació?', 'Alerta!', function () {
                navigator.app.clearHistory();
                navigator.app.exitApp();
            });
        } else {
            if (page.name == "principal-screen") {
                e.preventDefault();

                //és la pantalla principal de la app si fa un atras amb el back button li preguntarem si vols sortir de la app
                myApp.confirm('Vols sortir de l\'aplicació?', 'Alerta!', function () {
                    navigator.app.clearHistory();
                    navigator.app.exitApp();
                });
            } else {

                //no esta ni al layout login ni al de agenda i pot fer un atras normal fins a al layout agenda
                mainView.router.back();
            }
        }
    }, false);
}

//aquesta funcio es per quan li dona al salir del menu
function salir() {
    myApp.confirm('Vols tancar la sessió?', 'Alerta!', function () {
        mainView.router.loadPage('login.html');
    });
}

//Convertir data
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' de ' + month + ' del ' + year;
    return time;
}
