myApp.onPageInit('registre-screen', function (page) {
    //
    var pageContainer = $$(page.container);
    //
    pageContainer.find('.registrar-te').on('click', function () {
        console.log($$('#reg_agree')[0].checked);
        console.log(pageContainer.find('#reg_email').val());

    });

    $$('form.ajax-submit').on('beforesubmit', function (event) {
        console.log('ola');
        // Required attribute HTML5 info http://stackoverflow.com/a/25010485
        missingMessages = [];
        $$('form [required]').each(function (key, value) {
            trimmedVal = $$(this).val().replace(/^\s+|\s+$/g, '');
            if (trimmedVal === '') {
                missingMessages.push($$(this).attr('name') + ' is missing.');
            }
        })
        if (missingMessages.length !== 0) {
            myApp.alert(missingMessages.join('<br/>'));
            event.preventDefault();
            event.stopPropagation();
        }
    });
});