$(function () {

    getUsuario();

    //Datetimepicker plugin
    $('.datetimepicker').bootstrapMaterialDatePicker({
        format: 'DD/MM/YYYY',
        lang: "pt-br",
        clearButton: true,
        time: false,
        weekStart: 1,
        cancelText: "Cancelar",
        clearText: "Apagar"
    });

    $('.datetimepicker').on('change', function (e) {
        if ($(this).val() == "")
            $(this).parents('.form-line').removeClass('focused');
        else
            $(this).parents('.form-line').addClass('focused');
        $(this).valid();
    });

    $('input[name="capitalSegurado"]').inputmask('decimal', {
        'alias': 'numeric',
        'groupSeparator': '.',
        'autoGroup': true,
        'digits': 2,
        'radixPoint': ",",
        'digitsOptional': false,
        'allowMinus': false,
        'prefix': 'R$ ',
        'placeholder': ''
});

    $('.selectpicker#cargo').on('changed.bs.select', function (e) {
        if ($(this).val() != "Agente Integr." && $(this).val() != "Inst. Ensino")
            $('.seguro-display').css('display', 'block');
        else
            $('.seguro-display').css('display', 'none');
    });


    var seguro = JSON.parse(localStorage.getItem('seguro'));
    if (seguro != null) {
        $('.selectpicker#cargo').selectpicker('val', seguro.cargo);
        if (seguro.cargo != "Agente Integr." && seguro.cargo != "Inst. Ensino")
            $('.seguro-display').css('display', 'block');
        $('input[name="vigenciaDataInicial"]').val(seguro.vigenciaDataInicial);
        $('input[name="vigenciaDataInicial"]').parents('.form-line').addClass('focused');
        $('input[name="vigenciaDataFinal"]').val(seguro.vigenciaDataFinal);
        $('input[name="vigenciaDataFinal"]').parents('.form-line').addClass('focused');
        $('input[name="capitalSegurado"]').val(seguro.capitalSegurado);
        $('input[name="capitalSegurado"]').parents('.form-line').addClass('focused');
        $('.selectpicker#mac').selectpicker('val', seguro.mac);
        $('.selectpicker#ipa').selectpicker('val', seguro.ipa);
        $('.selectpicker#entregouApoliceProposta').selectpicker('val', seguro.entregouApoliceProposta);
    }

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


    $('#seguro').validate({
        rules: {
            cargo: {
                requiredSelect: true
            },
            mac: {
                requiredSelect: true
            },
            ipa: {
                requiredSelect: true
            },
            entregouApoliceProposta: {
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

    $('#seguro').submit(function (e) {
        if ($("#seguro").valid()) {
            localStorage.setItem('seguro', JSON.stringify({
                cargo: $('.selectpicker#cargo').val(),
                vigenciaDataInicial: $('input[name="vigenciaDataInicial"]').val(),
                vigenciaDataFinal: $('input[name="vigenciaDataFinal"]').val(),
                capitalSegurado: $('input[name="capitalSegurado"]').val(),
                mac: $('.selectpicker#mac').val(),
                ipa: $('.selectpicker#ipa').val(),
                entregouApoliceProposta: $('.selectpicker#entregouApoliceProposta').val()
            }));
            location.href = "../documentos/documentos.html";
            e.preventDefault();
        }
    });

});