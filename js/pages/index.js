$(function () {

    $('#sign_in').validate({
        highlight: function (input) {
            $(input).parents('.form-line').addClass('error');
        },
        unhighlight: function (input) {
            $(input).parents('.form-line').removeClass('error');
        },
        errorPlacement: function (error, element) {
            $(element).parents('.input-group').append(error);
        }
    });

    $('.page-loader-wrapper').fadeOut();
    $('#sign_in').submit(function (e) {
        if ($("#sign_in").valid()) {
            localStorage.setItem("username", $('input[name="username"]').val());
            localStorage.setItem("password", $('input[name="password"]').val())
            console.log("Login efetuado com sucesso");
            location.href = "pages/home/home.html";
            e.preventDefault();
        }
    });


    // if (localStorage.getItem('lembrarSenha') == "true" || localStorage.getItem('lembrarSenha') == true)
    //     location.href = "../../index.html";
    // else
    //     $('.page-loader-wrapper').fadeOut();
    // if (performance.navigation.type == 1 && localStorage.getItem('msgError') != "")
    //     localStorage.setItem('msgError', "");

    // $('#sign_in').submit(function (e) {
    //     if ($("#sign_in").valid()) {
    //         $('.page-loader-wrapper').fadeIn();
    //         localStorage.setItem('lembrarSenha', $('input#rememberme').is(":checked"));
    //         $.ajax({
    //             type: "POST",
    //             url: "https://tvgaspar-server.herokuapp.com/login",
    //             data: {
    //                 login: $('input[name="username"]').val(),
    //                 senha: $('input[name="password"]').val()
    //             },
    //             success: function (response) {
    //                 console.log(response.message);
    //                 if (response.success) {
    //                     localStorage.setItem('token', response.token);
    //                     localStorage.setItem('msgError', "");
    //                     $('.page-loader-wrapper').fadeOut();
    //                     location.href = "../../index.html";
    //                 } else {
    //                     localStorage.setItem('msgError', "Usuário ou senha inválido, tente novamente.");
    //                     $(".msgError").html(localStorage.getItem('msgError'));
    //                     $('.page-loader-wrapper').fadeOut();
    //                 }
    //             },
    //             error: function (error) {
    //                 console.log(error);
    //                 $('.page-loader-wrapper').fadeOut();
    //             }
    //         });
    //         e.preventDefault();
    //     }
    // });

    // $(".msgError").html(localStorage.getItem('msgError'));


});