myApp.onPageInit('addAnimal-screen', function (page) {
    var pageContainer = $$(page.container);

    $$(page.container).find('#id').val(localStorage.id);

    $$('form.ajax-submit').on('submitted', function (e) {
        var xhr = e.detail.xhr;

        var data = e.detail.data;
        console.log(data);

        var dataArray = data.split(" ");

        if (dataArray[0] == "1") {
            if (dataArray[1] == "1") {
                myApp.alert('Animal agregat correctament.', 'Informació!', function () {
                    mainView.router.loadPage('lostandfind.html');
                });
            } else {
                myApp.alert('No s\'ha pogut enviar la petició.', 'Alerta!', function () { });
            }
        }
    });
});