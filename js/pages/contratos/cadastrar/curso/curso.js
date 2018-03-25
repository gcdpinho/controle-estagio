$(function () {

    getUsuario();
    requiredSelect();

    if ($('.selectpicker').val() == null)
        $('.selectpicker').parents('.form-line').removeClass('focused');


    $('.selectpicker').on('changed.bs.select', function (e) {
        if (!$(this).parents('.form-line').hasClass('focused')) {
            $(this).parents('.form-line').addClass('focused');
            $(this).focusout();
        }

        if ($(this).parents('.form-line').hasClass('error')) {
            $(this).parents('.form-line').removeClass('error');
            $(this).focusout();
        }
    });


    $('#curso').validate({
        rules: {
            curso: {
                requiredSelect: true
            },
            modalidade: {
                requiredSelect: true
            }
        },
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.form-group').append(error);
        }
    });

    $('.page-loader-wrapper').fadeOut();

    $('#curso').submit(function (e) {
        if ($("#curso").valid()) {
            localStorage.setItem('curso', JSON.stringify({
                curso: $('.selectpicker#curso').val(),
                modalidade: $('.selectpicker#modalidade').val()
            }));
            location.href = "../estagio/estagio.html";
            e.preventDefault();
        }
    });

});