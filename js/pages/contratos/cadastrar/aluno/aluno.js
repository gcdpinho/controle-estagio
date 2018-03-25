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


    $('#aluno').validate({
        rules: {
            idade: {
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

    $('#aluno').submit(function (e) {
        if ($("#aluno").valid()) {
            localStorage.setItem('aluno', JSON.stringify({
                nome: $('input[name="nome"]').val(),
                idade: $('.selectpicker#idade').val()
            }));
            location.href = "../matricula/matricula.html";
            e.preventDefault();
        }
    });

});