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


    $('#naoObrigatorio').validate({
        rules: {
            auxTransp: {
                requiredSelect: true
            },
            horarioDist: {
                requiredSelect: true
            },
            repFalta: {
                requiredSelect: true
            },
            rep50: {
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

    $('#naoObrigatorio').submit(function (e) {
        if ($("#naoObrigatorio").valid()) {
            localStorage.setItem('naoObrigatorio', JSON.stringify({
                auxTransp: $('.selectpicker#auxTransp').val(),
                horarioDist: $('.selectpicker#horarioDist').val(),
                formatura: $('input[name="formatura"]').val(),
                repFalta: $('.selectpicker#repFalta').val(),
                rep50: $('.selectpicker#rep50').val()
            }));
            location.href = "../seguro/seguro.html";
            e.preventDefault();
        }
    });

});