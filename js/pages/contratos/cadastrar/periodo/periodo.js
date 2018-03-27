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


    var periodo = JSON.parse(localStorage.getItem('periodo'));
    if (periodo != null) {
        $('input[name="dataInicial"]').val(periodo.dataInicial);
        $('input[name="dataInicial"]').parents('.form-line').addClass('focused');
        $('input[name="dataFinal"]').val(periodo.dataFinal);
        $('input[name="dataFinal"]').parents('.form-line').addClass('focused');
        $('input[name="cargaDiaria"]').val(periodo.cargaDiaria);
        $('input[name="cargaDiaria"]').focus();
        $('input[name="cargaSemanal"]').val(periodo.cargaSemanal);
        $('input[name="cargaSemanal"]').focus();
        $('.selectpicker#doisAnos').selectpicker('val', periodo.doisAnos);
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


    $('#periodo').validate({
        rules: {
            doisAnos: {
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

    $('#periodo').submit(function (e) {
        if ($("#periodo").valid()) {
            localStorage.setItem('periodo', JSON.stringify({
                dataInicial: $('input[name="dataInicial"]').val(),
                dataFinal: $('input[name="dataFinal"]').val(),
                cargaDiaria: $('input[name="cargaDiaria"]').val(),
                cargaSemanal: $('input[name="cargaSemanal"]').val(),
                doisAnos: $('.selectpicker#doisAnos').val()
            }));
            if (JSON.parse(localStorage.getItem('estagio')).modalidade == "Obrigatório")
                location.href = "../obrigatorio/obrigatorio.html";
            else
                location.href = "../naoObrigatorio/naoObrigatorio.html";
            e.preventDefault();
        }
    });

});