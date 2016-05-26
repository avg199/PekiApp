myApp.onPageInit('addServeis-screen', function (page) {

    var pageContainer = $$(page.container);

    $$(page.container).find('#id').val(localStorage.id);

    $$('form.ajax-submit').on('submitted', function (e) {
        var xhr = e.detail.xhr;

        var data = e.detail.data;
        console.log(data);

        if (data == "1") {
            myApp.alert('Servei agregat correctament.', 'Informació!', function () {
                mainView.router.loadPage('serveis.html');
            });
        } else {
            myApp.alert('No s\'ha pogut agregar el servei.', 'Alerta!', function () { });
        }
    });
});