$(function () {

    getUsuario();
    requiredSelect();

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
    var periodo = JSON.parse(localStorage.getItem('periodo'));

    $('input[name="diasUteis"]').on('input', function () {
        if ($(this).val() != "") {
            $('input[name="cargaCalculada"]').val($(this).val() * periodo.cargaHorario.cargaDiaria)
            $('input[name="cargaCalculada"]').parents('.form-line').addClass('focused');
        }
    });

    var obrigatorio = JSON.parse(localStorage.getItem('obrigatorio'));

    if (obrigatorio != null) {
        $('.selectpicker#relatorioFinal').selectpicker('val', obrigatorio.relatorioFinal);
        $('.selectpicker#obrigatorio12').selectpicker('val', obrigatorio.obrigatorio12);
        $('.selectpicker#renovadoOrientador').selectpicker('val', obrigatorio.renovando.renovadoOrientador);
        $('input[name="diasUteis"]').val(obrigatorio.diasUteis);
        $('input[name="diasUteis"]').focus();
        if (obrigatorio.diasUteis != null) {
            $('input[name="cargaCalculada"]').val(obrigatorio.diasUteis * periodo.cargaHorario.cargaDiaria)
            $('input[name="cargaCalculada"]').parents('.form-line').addClass('focused');
        }
    }

    $('input[name="cargaMinima"]').val(getCargaMinima());
    $('input[name="cargaMinima"]').parents('.form-line').addClass('focused');

    if ($('.selectpicker').val() == null)
        $('.selectpicker').parents('.form-line').removeClass('focused');
    else {
        $('.selectpicker').parents('.form-line').each(function (e) {
            if (!$(this).hasClass('focused'))
                $(this).addClass('focused');
        });
    }

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
                cargaHorario: {
                    cargaCalculada: $('input[name="cargaCalculada"]').val(),
                    cargaMinima: $('input[name="cargaMinima"]').val()
                }
            }));
            location.href = "../seguro/seguro.html";
            e.preventDefault();
        }
    });

});