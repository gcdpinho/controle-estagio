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

    $('input[name="capitalSegurado"]').inputmask('R$ 99.999,99', {
        placeholder: 'R$ __.___,__'
    });


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
                vigencia: {
                    vigenciaDataInicial: $('input[name="vigenciaDataInicial"]').val(),
                    vigenciaDataFinal: $('input[name="vigenciaDataFinal"]').val()
                },
                capitalSegurado: $('input[name="capitalSegurado"]').val(),
                coberturas: {
                    mac: $('.selectpicker#mac').val(),
                    ipa: $('.selectpicker#ipa').val()
                },
                entregouApoliceProposta: $('.selectpicker#entregouApoliceProposta').val()
            }));
            location.href = "../documentos/documentos.html";
            e.preventDefault();
        }
    });

});