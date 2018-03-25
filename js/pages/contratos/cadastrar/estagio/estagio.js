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


    $('#estagio').validate({
        rules: {
            outro: {
                requiredSelect: true
            },
            agente: {
                requiredSelect: true
            },
            concedente: {
                requiredSelect: true
            },
            modalidade: {
                requiredSelect: true
            },
            area: {
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

    $('#estagio').submit(function (e) {
        if ($("#estagio").valid()) {
            localStorage.setItem('estagio', JSON.stringify({
                outro: $('.selectpicker#outro').val(),
                agente: $('.selectpicker#agente').val(),
                concedente: $('.selectpicker#concedente').val(),
                cidade: $('input[name="cidade"]').val(),
                modalidade: $('.selectpicker#modalidade').val(),
                area: $('.selectpicker#area').val()
            }));
            location.href = "../periodo/periodo.html";
            e.preventDefault();
        }
    });

});