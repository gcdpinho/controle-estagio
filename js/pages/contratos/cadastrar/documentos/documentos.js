$(function () {

    getUsuario();
    requiredSelect();

    $('input[name="termos"]').val(getTermos());
    $('input[name="termos"]').parents('.form-line').addClass('focused');

    $('.selectpicker#tipo').on('changed.bs.select', function (e) {
        $('input[name="pas"]').val(getPAS($('.selectpicker#tipo').val()));
        $('input[name="pas"]').parents('.form-line').addClass('focused');
    });


    var documentos = JSON.parse(localStorage.getItem('documentos'));
    if (documentos != null) {
        $('.selectpicker#tipo').selectpicker('val', documentos.tipo);
        $('.selectpicker#constaNumero').selectpicker('val', documentos.constaNumero);
        $('.selectpicker#assinados').selectpicker('val', documentos.assinados);
        $('.selectpicker#dadosCertos').selectpicker('val', documentos.dadosCertos);
        if (documentos.numVias.pas != null){
            $('input[name="pas"]').val(documentos.numVias.pas);
            $('input[name="pas"]').parents('.form-line').addClass('focused');
        }

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
                numVias: {
                    termos: $('input[name="termos"]').val(),
                    pas: $('input[name="pas"]').val()
                },
                constaNumero: $('.selectpicker#constaNumero').val(),
                assinados: $('.selectpicker#assinados').val(),
                dadosCertos: $('.selectpicker#dadosCertos').val()
            }));

            $('#confirmModal').modal('show');
            /*
            $('.table-responsive').css('top', 'calc(50% - ' + $('.table-responsive').height() / 2 + 'px)');
            if ($(window).width() > 1024)
                $('.table-responsive').css('left', 'calc(50% - ' + ($('.table-responsive').width() / 2 - $('#leftsidebar').width() / 2) + 'px)');
            else
                $('.table-responsive').css('left', $(window).width() <= 768 ? 0 : $(window).width() / 2 - $('.table-responsive').width() / 2);
            $('.table-responsive').css('display', 'block');
            $('.background-table').css('display', 'block');
            */
            e.preventDefault();
        }
    });

});