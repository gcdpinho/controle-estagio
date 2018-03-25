$(function () {

    getUsuario();
    requiredSelect();

    var matricula = JSON.parse(localStorage.getItem('matricula'));
    if (matricula != null) {
        $('input[name="numero"]').val(matricula.numero);
        $('input[name="numero"]').focus();
        $('input[name="periodo"]').val(matricula.periodo);
        $('input[name="periodo"]').focus();
        $('input[name="semestre"]').val(matricula.semestre);
        $('input[name="semestre"]').focus();
        $('.selectpicker#dependencia').selectpicker('val', matricula.dependencia);
        $('.selectpicker#formado').selectpicker('val', matricula.formado);
    }

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

    $('input[name="periodo"]').inputmask('9999/9', {
        placeholder: '____/_'
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