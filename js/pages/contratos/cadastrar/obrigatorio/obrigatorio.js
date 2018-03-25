$(function () {

    getUsuario();
    requiredSelect();

    if ($('.selectpicker').val() == null)
        $('.selectpicker').parents('.form-line').removeClass('focused');
    else {
        $('.selectpicker').parents('.form-line').each(function (e) {
            if (!$(this).hasClass('focused'))
                $(this).addClass('focused');
        });
    }

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


    $('#obrigatorio').validate({
        rules: {
            relatorioFinal: {
                requiredSelect: true
            },
            obrigatorio12: {
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

    $('#obrigatorio').submit(function (e) {
        if ($("#obrigatorio").valid()) {
            localStorage.setItem('obrigatorio', JSON.stringify({
                relatorioFinal: $('.selectpicker#relatorioFinal').val(),
                obrigatorio12: $('.selectpicker#obrigatorio12').val(),
                renovando: {
                    renovadoOrientador: $('.selectpicker#renovadoOrientador').val()
                },
                diasUteis: $('input[name="diasUteis"]').val(),
                cargaCalculada: $('input[name="cargaCalculada"]').val(),
                cargaMinima: $('input[name="cargaMinima"]').val()
            }));
            location.href = "../seguro/seguro.html";
            e.preventDefault();
        }
    });

});