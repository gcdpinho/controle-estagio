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


    $('#documentos').validate({
        rules: {
            tipo: {
                requiredSelect: true
            },
            constaNumero: {
                requiredSelect: true
            },
            assinados: {
                requiredSelect: true
            },
            dadosCertos: {
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

    $('#documentos').submit(function (e) {
        if ($("#documentos").valid()) {
            localStorage.setItem('documentos', JSON.stringify({
                tipo: $('.selectpicker#tipo').val(),
                numVias:{
                    termos: $('input[name="termos"]').val(),
                    pas: $('input[name="pas"]').val()
                },
                constaNumero: $('.selectpicker#constaNumero').val(),
                assinados: $('.selectpicker#assinados').val(),
                dadosCertos: $('.selectpicker#dadosCertos').val()
            }));
            location.href = "../matricula/matricula.html";
            e.preventDefault();
        }
    });

});