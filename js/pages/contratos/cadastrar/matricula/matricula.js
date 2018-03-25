$(function () {

    getUsuario();
    requiredSelect();

    if ($('.selectpicker').val() == null) {
        $('.selectpicker').parents('.form-line').removeClass('focused');
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

    $('#matricula').validate({
        rules: {
            dependencia: {
                requiredSelect: true
            },
            formado: {
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

    $('#matricula').submit(function (e) {
        if ($("#matricula").valid()) {
            localStorage.setItem('matricula', JSON.stringify({
                numero: $('input[name="numero"]').val(),
                periodo: $('input[name="periodo"]').val(),
                semestre: $('input[name="semestre"]').val(),
                dependencia: $('.selectpicker#dependencia').val(),
                formado: $('.selectpicker#formado').val()
            }));
            location.href = "../curso/curso.html";
            e.preventDefault();
        }
    });

});