if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}

$.AdminBSB = {};
$.AdminBSB.options = {
    colors: {
        red: '#F44336',
        pink: '#E91E63',
        purple: '#9C27B0',
        deepPurple: '#673AB7',
        indigo: '#3F51B5',
        blue: '#2196F3',
        lightBlue: '#03A9F4',
        cyan: '#00BCD4',
        teal: '#009688',
        green: '#4CAF50',
        lightGreen: '#8BC34A',
        lime: '#CDDC39',
        yellow: '#ffe821',
        amber: '#FFC107',
        orange: '#FF9800',
        deepOrange: '#FF5722',
        brown: '#795548',
        grey: '#9E9E9E',
        blueGrey: '#607D8B',
        black: '#000000',
        white: '#ffffff'
    },
    leftSideBar: {
        scrollColor: 'rgba(0,0,0,0.5)',
        scrollWidth: '4px',
        scrollAlwaysVisible: false,
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        scrollActiveItemWhenPageLoad: true,
        breakpointWidth: 1170
    },
    dropdownMenu: {
        effectIn: 'fadeIn',
        effectOut: 'fadeOut'
    }
}

/* Left Sidebar - Function =================================================================================================
 *  You can manage the left sidebar menu options
 *  
 */
$.AdminBSB.leftSideBar = {
    activate: function () {
        var _this = this;
        var $body = $('body');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') {
                $target = $(e.target).parent();
            }

            if (!$target.hasClass('bars') && _this.isOpen() && $target.parents('#leftsidebar').length === 0) {
                if (!$target.hasClass('js-right-sidebar')) $overlay.fadeOut();
                $body.removeClass('overlay-open');
            }
        });

        $.each($('.menu-toggle.toggled'), function (i, val) {
            $(val).next().slideToggle(0);
        });

        //When page load
        $.each($('.menu .list li.active'), function (i, val) {
            var $activeAnchors = $(val).find('a:eq(0)');

            $activeAnchors.addClass('toggled');
            $activeAnchors.next().show();
        });

        //Collapse or Expand Menu
        $('.menu-toggle').on('click', function (e) {
            var $this = $(this);
            var $content = $this.next();

            if ($($this.parents('ul')[0]).hasClass('list')) {
                var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

                $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
                    if ($(val).is(':visible')) {
                        $(val).prev().toggleClass('toggled');
                        $(val).slideUp();
                    }
                });
            }

            $this.toggleClass('toggled');
            $content.slideToggle(320);
        });

        //Set menu height
        _this.setMenuHeight();
        _this.checkStatuForResize(true);
        $(window).resize(function () {
            _this.setMenuHeight();
            _this.checkStatuForResize(false);
        });

        //Set Waves
        Waves.attach('.menu .list a', ['waves-block']);
        Waves.init();
    },
    setMenuHeight: function (isFirstTime) {
        if (typeof $.fn.slimScroll != 'undefined') {
            var configs = $.AdminBSB.options.leftSideBar;
            var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
            var $el = $('.list');

            $el.slimscroll({
                height: height + "px",
                color: configs.scrollColor,
                size: configs.scrollWidth,
                alwaysVisible: configs.scrollAlwaysVisible,
                borderRadius: configs.scrollBorderRadius,
                railBorderRadius: configs.scrollRailBorderRadius
            });

            //Scroll active menu item when page load, if option set = true
            if ($.AdminBSB.options.leftSideBar.scrollActiveItemWhenPageLoad) {
                var activeItemOffsetTop = $('.menu .list li.active')[0];
                if (activeItemOffsetTop) {
                    activeItemOffsetTop = activeItemOffsetTop.offsetTop
                    if (activeItemOffsetTop > 150) $el.slimscroll({
                        scrollTo: activeItemOffsetTop + 'px'
                    });
                }
            }
        }
    },
    checkStatuForResize: function (firstTime) {
        var $body = $('body');
        var $openCloseBar = $('.navbar .navbar-header .bars');
        var width = $body.width();

        if (firstTime) {
            $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function () {
                $(this).removeClass('no-animate').dequeue();
            });
        }

        if (width < $.AdminBSB.options.leftSideBar.breakpointWidth) {
            $body.addClass('ls-closed');
            $openCloseBar.fadeIn();
        } else {
            $body.removeClass('ls-closed');
            $openCloseBar.fadeOut();
        }
    },
    isOpen: function () {
        return $('body').hasClass('overlay-open');
    }
};
//==========================================================================================================================

/* Right Sidebar - Function ================================================================================================
 *  You can manage the right sidebar menu options
 *  
 */
$.AdminBSB.rightSideBar = {
    activate: function () {
        var _this = this;
        var $sidebar = $('#rightsidebar');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).click(function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') {
                $target = $(e.target).parent();
            }

            if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && $target.parents('#rightsidebar').length === 0) {
                if (!$target.hasClass('bars')) $overlay.fadeOut();
                $sidebar.removeClass('open');
            }
        });

        $('.js-right-sidebar').on('click', function () {
            $sidebar.toggleClass('open');
            if (_this.isOpen()) {
                $overlay.fadeIn();
            } else {
                $overlay.fadeOut();
            }
        });
    },
    isOpen: function () {
        return $('.right-sidebar').hasClass('open');
    }
}
//==========================================================================================================================

/* Searchbar - Function ================================================================================================
 *  You can manage the search bar
 *  
 */
var $searchBar = $('.search-bar');
$.AdminBSB.search = {
    activate: function () {
        var _this = this;

        //Search button click event
        $('.js-search').on('click', function () {
            _this.showSearchBar();
        });

        //Close search click event
        $searchBar.find('.close-search').on('click', function () {
            _this.hideSearchBar();
        });

        //ESC key on pressed
        $searchBar.find('input[type="text"]').on('keyup', function (e) {
            if (e.keyCode == 27) {
                _this.hideSearchBar();
            }
        });
    },
    showSearchBar: function () {
        $searchBar.addClass('open');
        $searchBar.find('input[type="text"]').focus();
    },
    hideSearchBar: function () {
        $searchBar.removeClass('open');
        $searchBar.find('input[type="text"]').val('');
    }
}
//==========================================================================================================================

/* Navbar - Function =======================================================================================================
 *  You can manage the navbar
 *  
 */
$.AdminBSB.navbar = {
    activate: function () {
        var $body = $('body');
        var $overlay = $('.overlay');

        //Open left sidebar panel
        $('.bars').on('click', function () {
            $body.toggleClass('overlay-open');
            if ($body.hasClass('overlay-open')) {
                $overlay.fadeIn();
            } else {
                $overlay.fadeOut();
            }
        });

        //Close collapse bar on click event
        $('.nav [data-close="true"]').on('click', function () {
            var isVisible = $('.navbar-toggle').is(':visible');
            var $navbarCollapse = $('.navbar-collapse');

            if (isVisible) {
                $navbarCollapse.slideUp(function () {
                    $navbarCollapse.removeClass('in').removeAttr('style');
                });
            }
        });
    }
}
//==========================================================================================================================

/* Input - Function ========================================================================================================
 *  You can manage the inputs(also textareas) with name of class 'form-control'
 *  
 */
$.AdminBSB.input = {
    activate: function () {
        //On focus event
        $('.form-control').focus(function () {
            $(this).parents('.form-line').addClass('focused');
        });

        //On focusout event
        $('.form-control').focusout(function () {
            var $this = $(this);
            if ($this.parents('.form-group').hasClass('form-float')) {
                if (($this.val() == '' && $this.prop('files') == null) || ($this.prop('files') != null && $this.prop('files').length <= 0)) {
                    $this.parents('.form-line').removeClass('focused');
                }
            } else {
                $this.parents('.form-line').removeClass('focused');
            }
        });

        //On label click
        $('body').on('click', '.form-float .form-line .form-label', function () {
            $(this).parent().find('input').focus();
        });

        //Not blank form
        $('.form-control').each(function () {
            if ($(this).val() !== '') {
                $(this).parents('.form-line').addClass('focused');
            }
        });
    }
}
//==========================================================================================================================

/* Form - Select - Function ================================================================================================
 *  You can manage the 'select' of form elements
 *  
 */
$.AdminBSB.select = {
    activate: function () {
        if ($.fn.selectpicker) {
            $('select:not(.ms)').selectpicker();
        }
    }
}
//==========================================================================================================================

/* DropdownMenu - Function =================================================================================================
 *  You can manage the dropdown menu
 *  
 */

$.AdminBSB.dropdownMenu = {
    activate: function () {
        var _this = this;

        $('.dropdown, .dropup, .btn-group').on({
            "show.bs.dropdown": function () {
                var dropdown = _this.dropdownEffect(this);
                _this.dropdownEffectStart(dropdown, dropdown.effectIn);
            },
            "shown.bs.dropdown": function () {
                var dropdown = _this.dropdownEffect(this);
                if (dropdown.effectIn && dropdown.effectOut) {
                    _this.dropdownEffectEnd(dropdown, function () {});
                }
            },
            "hide.bs.dropdown": function (e) {
                var dropdown = _this.dropdownEffect(this);
                if (dropdown.effectOut) {
                    e.preventDefault();
                    _this.dropdownEffectStart(dropdown, dropdown.effectOut);
                    _this.dropdownEffectEnd(dropdown, function () {
                        dropdown.dropdown.removeClass('open');
                    });
                }
            }
        });

        //Set Waves
        Waves.attach('.dropdown-menu li a', ['waves-block']);
        Waves.init();
    },
    dropdownEffect: function (target) {
        var effectIn = $.AdminBSB.options.dropdownMenu.effectIn,
            effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
        var dropdown = $(target),
            dropdownMenu = $('.dropdown-menu', target);

        if (dropdown.length > 0) {
            var udEffectIn = dropdown.data('effect-in');
            var udEffectOut = dropdown.data('effect-out');
            if (udEffectIn !== undefined) {
                effectIn = udEffectIn;
            }
            if (udEffectOut !== undefined) {
                effectOut = udEffectOut;
            }
        }

        return {
            target: target,
            dropdown: dropdown,
            dropdownMenu: dropdownMenu,
            effectIn: effectIn,
            effectOut: effectOut
        };
    },
    dropdownEffectStart: function (data, effectToStart) {
        if (effectToStart) {
            data.dropdown.addClass('dropdown-animating');
            data.dropdownMenu.addClass('animated dropdown-animated');
            data.dropdownMenu.addClass(effectToStart);
        }
    },
    dropdownEffectEnd: function (data, callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        data.dropdown.one(animationEnd, function () {
            data.dropdown.removeClass('dropdown-animating');
            data.dropdownMenu.removeClass('animated dropdown-animated');
            data.dropdownMenu.removeClass(data.effectIn);
            data.dropdownMenu.removeClass(data.effectOut);

            if (typeof callback == 'function') {
                callback();
            }
        });
    }
}
//==========================================================================================================================

/* Browser - Function ======================================================================================================
 *  You can manage browser
 *  
 */
var edge = 'Microsoft Edge';
var ie10 = 'Internet Explorer 10';
var ie11 = 'Internet Explorer 11';
var opera = 'Opera';
var firefox = 'Mozilla Firefox';
var chrome = 'Google Chrome';
var safari = 'Safari';

$.AdminBSB.browser = {
    activate: function () {
        var _this = this;
        var className = _this.getClassName();

        if (className !== '') $('html').addClass(_this.getClassName());
    },
    getBrowser: function () {
        var userAgent = navigator.userAgent.toLowerCase();

        if (/edge/i.test(userAgent)) {
            return edge;
        } else if (/rv:11/i.test(userAgent)) {
            return ie11;
        } else if (/msie 10/i.test(userAgent)) {
            return ie10;
        } else if (/opr/i.test(userAgent)) {
            return opera;
        } else if (/chrome/i.test(userAgent)) {
            return chrome;
        } else if (/firefox/i.test(userAgent)) {
            return firefox;
        } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            return safari;
        }

        return undefined;
    },
    getClassName: function () {
        var browser = this.getBrowser();

        if (browser === edge) {
            return 'edge';
        } else if (browser === ie11) {
            return 'ie11';
        } else if (browser === ie10) {
            return 'ie10';
        } else if (browser === opera) {
            return 'opera';
        } else if (browser === chrome) {
            return 'chrome';
        } else if (browser === firefox) {
            return 'firefox';
        } else if (browser === safari) {
            return 'safari';
        } else {
            return '';
        }
    }
}
//==========================================================================================================================

$(function () {
    $.AdminBSB.browser.activate();
    $.AdminBSB.leftSideBar.activate();
    $.AdminBSB.rightSideBar.activate();
    $.AdminBSB.navbar.activate();
    $.AdminBSB.dropdownMenu.activate();
    $.AdminBSB.input.activate();
    $.AdminBSB.select.activate();
    $.AdminBSB.search.activate();
});


/* CUSTOM SCRIPTS GLOBAIS */

//Função de logout do sistema
var logout = function (msgError) {
    localStorage.clear();
    var path = location.pathname;
    if (path.indexOf('home') >= 0)
        location.href = "../../index.html"
    else if (path.indexOf('listar') >= 0)
        location.href = "../../../index.html"
    else
        location.href = "../../../../index.html";

}

$('#logout').click(logout);

//Notificação de sucesso ou erro
var showNotification = function (text, state) {
    var color = "bg-green";
    if (state == "error")
        color = "bg-red";

    $.notify({
        message: text
    }, {
        type: color,
        allow_dismiss: true,
        newest_on_top: true,
        timer: 1000,
        placement: {
            from: "top",
            align: "center"
        },
        animate: {
            enter: "animated fadeInDown",
            exit: "animated fadeOutUp"
        },
        template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (true ? "p-r-35" : "") + '" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
    });
}

//Teste de sucesso para elementos cadastrados
var registerMessage = function (response, form, text, notification) {
    if (response.sqlMessage) {
        if (response.sqlMessage.indexOf("Duplicate") >= 0) {
            var entry = response.sqlMessage.split('\'')[3].replace('\'', '');
            var name;
            $('.form-control').each(function (index) {
                if ($(this).attr('name') == entry) {
                    name = $(this).attr("name");
                    return;
                }
            });
            var error = {};
            error[name] = name.toUpperCase() + " já cadastrado";
            $(form).validate().showErrors(error);
            $('.page-loader-wrapper').fadeOut();

        } else
        if (response.sqlMessage.indexOf("foreign key") >= 0) {
            showNotification("Não é possível excluir " + (text == "VIDEO" ? "este " : "esta ") + acentuacaoTable(text.toLowerCase()).toUpperCase() + ".", "error");
            $('.page-loader-wrapper').fadeOut();
        } else {
            showNotification("Erro ao cadastrar " + acentuacaoTable(text.toLowerCase()).toUpperCase() + ", tente novamente.", "error");
            $('.page-loader-wrapper').fadeOut();
        }
        return false;
    } else
    if (response.success == false) {
        switch (response.message) {
            case "Senha atual incorreta.":
                var error = {};
                error["senhaAtual"] = response.message;
                $(form).validate().showErrors(error);
                break;
        }

        return false;
    } else
    if (notification) {
        $('.form-control').each(function (index) {
            $(this).val("");
            $(this).parents('.form-line').removeClass("focused");
            $(this).parents('.bootstrap-tagsinput').find('span').each(function (index) {
                $(this).find('span[data-role="remove"]').click();
            });
            if ($(this).parents('.dropify-clear'))
                $('.dropify-clear').click();
        });

        $('.page-loader-wrapper').fadeOut();

        showNotification(acentuacaoTable(text.toLowerCase()).toUpperCase() + (text == "VIDEO" ? " cadastrado" : " cadastrada") + "com sucesso!", "success");
    }


    return true;
}

var requiredSelect = function () {
    $.validator.addMethod("requiredSelect", function (value, element, config) {
        return $('.selectpicker#' + $(element).attr('id')).val() != null;
    }, "Escolha uma opção.");

}

//Get todas as tags
var getAllTags = function (close, listar) {
    $.validator.addMethod("invalidTag", function (value, element, config) {
        return $('.label-info.error').length > 0 ? false : true;
    }, "Existem TAGS não cadastradas.");

    $.validator.addMethod("requiredTag", function (value, element, config) {
        return $('.label-info').length > 0 ? true : false;
    }, "Preencha esse campo.");

    $(".bootstrap-tagsinput").find('input').focus(function () {
        $(this).parents(".form-line").addClass("focused");
    });

    $(".bootstrap-tagsinput").find('input').focusout(function () {
        if ($(this).parents(".bootstrap-tagsinput").find('span').length <= 0)
            $(this).parents(".form-line").removeClass("focused");
        $(this).parents(".form-line").removeClass("error");
    });

    $('.bootstrap-tagsinput').find('input').addClass('form-control');
    $('.bootstrap-tagsinput').find('input').attr('name', 'tag');

    $.ajax({
        type: "POST",
        url: "https://tvgaspar-server.herokuapp.com/getAllTags",
        //async: false,
        data: {
            token: localStorage.getItem('token')
        },
        success: function (response) {
            console.log(response);
            var tags = [];
            $(response).each(function (index) {
                tags.push($(this)[0]);
            });
            localStorage.setItem("tag", JSON.stringify(tags));
            if (listar)
                search("tag", close);
            else
            if (close)
                $('.page-loader-wrapper').fadeOut();
            //else

        },
        error: function (error) {
            console.log(error.message);
            logout('Sessão inválida. Faça o login novamente.');
        }
    });

}

//Get todas imagens
var getAllImagens = function (listar) {
    $.validator.addMethod("invalidImagem", function (value, element, config) {
        if (value == "")
            return true;
        else {
            var imagens = value.split(", ");
            for (var element in imagens)
                if (getDataId("imagem", imagens[element], "link") == undefined)
                    return false;

            return true;
        }
    }, "Existem IMAGENS não cadastradas.");

    $.validator.addMethod("oneImagem", function (value, element, config) {
        if (value == "")
            return true;
        else {
            if (value.indexOf(",") >= 0)
                return false;

            return true;
        }
    }, "É permitido apenas uma IMAGEM.");

    $.ajax({
        type: "POST",
        url: "https://tvgaspar-server.herokuapp.com/getAllImagens",
        //async: false,
        data: {
            token: localStorage.getItem('token')
        },
        success: function (response) {
            console.log(response);
            var imagens = [];
            $(response).each(function (index) {
                imagens.push($(this)[0]);
            });
            localStorage.setItem("imagem", JSON.stringify(imagens));
            if (listar)
                search("imagem", true);
            else
                $('.page-loader-wrapper').fadeOut();
        },
        error: function (error) {
            console.log(error.message);
            logout('Sessão inválida. Faça o login novamente.');
        }
    });

}

//Get todos os vídeos
var getAllVideos = function (close, listar) {
    $.validator.addMethod("invalidVideo", function (value, element, config) {
        if (value == "")
            return true;
        else {
            var videos = value.split(", ");
            for (var element in videos)
                if (getDataId("video", videos[element], "link") == undefined)
                    return false;

            return true;
        }
    }, "Existem VÍDEOS não cadastradas.");

    $.ajax({
        type: "POST",
        url: "https://tvgaspar-server.herokuapp.com/getAllVideos",
        //async: false,
        data: {
            token: localStorage.getItem('token')
        },
        success: function (response) {
            console.log(response);
            var videos = [];
            $(response).each(function (index) {
                videos.push($(this)[0]);
            });
            localStorage.setItem("video", JSON.stringify(videos));
            if (listar)
                search("video", close);
            else
            if (close)
                $('.page-loader-wrapper').fadeOut();
        },
        error: function (error) {
            console.log(error.message);
            logout('Sessão inválida. Faça o login novamente.');
        }
    });
}

//Get todas as categorias
var getAllCategorias = function (close, listar) {
    $.validator.addMethod("invalidCategoria", function (value, element, config) {
        if (value == "")
            return true;
        else {
            var categorias = value.split(", ");
            for (var element in categorias)
                if (getDataId("categoria", categorias[element], "titulo") == undefined)
                    return false;

            return true;
        }
    }, "Existem CATEGORIAS não cadastradas.");

    $.ajax({
        type: "POST",
        url: "https://tvgaspar-server.herokuapp.com/getAllCategorias",
        //async: false,
        data: {
            token: localStorage.getItem('token')
        },
        success: function (response) {
            console.log(response);
            var categorias = [];
            $(response).each(function (index) {
                categorias.push($(this)[0]);
            });
            localStorage.setItem("categoria", JSON.stringify(categorias));
            if (listar)
                search("categoria", close);
            else
            if (close)
                $('.page-loader-wrapper').fadeOut();

        },
        error: function (error) {
            console.log(error.message);
            logout('Sessão inválida. Faça o login novamente.');
        }
    });

}

//Get id (para inserção) by params
var getDataId = function (data, element, diff) {
    var datas = JSON.parse(localStorage.getItem(data));
    for (var e in datas) {
        if (datas[e][diff] == element) {
            return datas[e].id;
        }
    }

    return undefined;
}

//Abre o modal com a tabela (param)
var search = async function (params, close) {
    dataTableParam = params;
    var list = JSON.parse(localStorage.getItem(params));
    if ($('.js-basic-example.' + params).find('td').length <= 0 && list.length > 0) {
        if (close)
            $('.page-loader-wrapper').fadeIn();
        var colunaAux = Object.keys(list[0]);
        var colunas = [];
        colunaAux.shift();
        if (params == "noticia" || params == "aprovacao") {
            colunaAux.pop();
            colunaAux.pop();
            colunaAux.pop();
        } else if (params == "publicidade") {
            colunaAux.pop();
            colunaAux.pop();
        }
        for (var element in colunaAux) {
            var coluna = {};
            coluna["title"] = colunaAux[element].toUpperCase();
            colunas.push(coluna);
        }
        if ($('.js-basic-example.' + params).attr("value") == "listar")
            colunas.push({
                title: "Ações".toUpperCase()
            });
        var data = [];
        var imagens = []
        for (var index in list) {
            var row = [];
            for (var element in list[index]) {
                if ((params == "noticia" || params == "aprovacao") && element == "texto")
                    row.push('<div class="innerTd">' + list[index][element] + '</div>');
                else
                if (element == "dtCadastro")
                    row.push(Date.parse(list[index][element].split('.')[0]).toString("dd/MM/yyyy H:mm"));
                else
                    row.push(list[index][element]);
            }
            row.shift();
            if (params == "noticia" || params == "aprovacao") {
                row.pop();
                row.pop();
                row.pop();
            } else if (params == "publicidade") {
                row.pop();
                row.pop();
            }
            if (params == "imagem")
                imagens.push(row[row.length - 1]);

            if ($('.js-basic-example.' + params).attr("value") == "listar")
                row.push(
                    '<i class="material-icons">edit</i>' +
                    '<i class="material-icons ml-20px">delete</i>'
                );

            data.push(row);
        }
        var urls = await getUrls(imagens);
        var pos = $('.js-basic-example.' + params).attr("value") == "listar" ? 2 : 1;
        for (url in urls)
            data[url][data[url].length - pos] = "<img class='img-preview' src='" + urls[url] + "'>" + data[url][data[url].length - pos];

        if (data.length > 0 && $('.js-basic-example').length > 0)
            tableFunction(data, colunas, params, close);

    } else {
        if (list.length <= 0) {
            $('.div-table').html("Não há registros de " + acentuacaoTable(params) + ".");
            $('.div-table').css('margin-top', '30px');
            $('.page-loader-wrapper').fadeOut();
        } else
        if (params != "aprovacao" && $('.js-basic-example.' + params).attr("value") != "listar") {
            $('.background-table').fadeIn();
            $('.js-basic-example.' + params).parents('.table-responsive').fadeIn();
        }
    }
}

//Get URL da imagem Firebase
var getUrls = async function (arrayDeImagens) {
    return Promise.all(arrayDeImagens.map(async nome =>
        await firebase.storage().ref().child('imagens/' + nome).getDownloadURL()
    )).then();
}

//Acentua as palavras das tabelas
var acentuacaoTable = function (table) {
    switch (table) {
        case "aprovacao":
            return "aprovação";
            break;
        case "noticia":
            return "notícia";
            break;
        case "video":
            return "vídeo";
            break;
        default:
            return table;
            break;
    }
}

//Incializa a tabela by params
var dataTableParam; //Variável de controle para limpeza de campos em outra função fora
var dataTableArr = [];
var tableFunction = function (data, colunas, params, close) {
    var table = $('.js-basic-example.' + params).DataTable({
        data: data,
        columns: colunas,
        responsive: true,
        bLengthChange: false,
        bDestroy: true,
        pageLength: 10,
        language: {
            zeroRecords: "Nenhum registro encontrado",
            info: "Exibindo _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Exibindo 0 a 0 de 0 registros",
            infoFiltered: "",
            search: "",
            searchPlaceholder: "Pesquisar " + acentuacaoTable(params),
            paginate: {
                "next": "Próximo",
                "previous": "Anterior"
            },
        },
    });
    if (params != "aprovacao") {
        if ($(window).width() >= 768)
            $('.js-basic-example.' + params).parents('.table-responsive').css('top', 'calc(50% - ' + $('.js-basic-example.' + params).parents('.table-responsive').height() / 2 + 'px)');
        else
            $('.js-basic-example.' + params).parents('.table-responsive').css('top', '30px');
        if ($(window).width() > 1024)
            $('.js-basic-example.' + params).parents('.table-responsive').css('left', 'calc(50% - ' + ($('.js-basic-example.' + params).parents('.table-responsive').width() / 2 - $('#leftsidebar').width() / 2) + 'px)');
        else
            $('.js-basic-example.' + params).parents('.table-responsive').css('left', $(window).width() <= 768 ? 0 : $(window).width() / 2 - $('.js-basic-example.' + params).parents('.table-responsive').width() / 2);
    } else {
        $('.table-responsive').css('top', 'calc(50% - ' + $('.table-responsive').height() / 2 + 'px)');
        if ($(window).width() > 1024)
            $('.table-responsive').css('left', 'calc(50% - ' + ($('.table-responsive').width() / 2 - $('#leftsidebar').width() / 2) + 'px)');
        else
            $('.table-responsive').css('left', $(window).width() <= 768 ? 0 : $(window).width() / 2 - $('.table-responsive').width() / 2);
    }

    $('.js-basic-example.' + params).find("tbody").on('click', 'tr', function (e, dt, type, indexes) {
        if ($('.js-basic-example.' + params).attr('value') != "listar") {
            $(this).css('background-color', '#007fff');
            $(this).css('color', '#fff');
            switch (params) {
                case "tag":
                    dataTableArr.push(table.row(this).data()[0]);
                    break;
                case "imagem":
                    if ($('input[name="imagem"]').hasClass('oneImagem')) {
                        $('tr.even').css('background-color', '#ffffff');
                        $('tr.even').css('color', '#000000');
                        $('tr.odd').css('color', '#000000');
                        $('.table-striped > tbody > tr:nth-of-type(odd)').css('background-color', '#f9f9f9');
                        $(this).css('background-color', '#007fff');
                        $(this).css('color', '#fff');
                        dataTableArr = [];
                    }
                    dataTableArr.push(table.row(this).data()[1].split('>')[1]);
                    break;
                case "video":
                    dataTableArr.push(table.row(this).data()[2]);
                    break;
                case "categoria":
                    dataTableArr.push(table.row(this).data()[0]);
                    break;
                case "aprovacao":
                    $('input[name="manchete"]').val(table.row(this).data()[0]);
                    $('input[name="subManchete"]').val(table.row(this).data()[1]);
                    tinymce.activeEditor.setContent(table.row(this).data()[2]);
                    tinymce.activeEditor.setMode('readonly');
                    $('input[name="autor"]').val(table.row(this).data()[3]);
                    $('input[name="dtCadastro"]').val(table.row(this).data()[4]);
                    $('.background-table').fadeIn();
                    $('.table-responsive').fadeIn();
                    break;
            }
        }
    });

    $('.js-basic-example.' + params).find("tbody").on('click', 'i.material-icons', function (e, dt, type, indexes) {
        switch ($(this).text()) {
            case "edit":
                var data = {};
                switch (params) {
                    case "tag":
                        data = {
                            titulo: table.row($(this).parents("tr")).data()[0],
                            id: getDataId(params, table.row($(this).parents("tr")).data()[0], "titulo"),
                        }
                        break;
                    case "imagem":
                        data = {
                            titulo: table.row($(this).parents("tr")).data()[0],
                            id: getDataId(params, $(this).parents("tr").find('img').parent('td').text(), "link"),
                        }
                        break;
                    case "video":
                        data = {
                            titulo: table.row($(this).parents("tr")).data()[0],
                            texto: table.row($(this).parents("tr")).data()[1],
                            link: table.row($(this).parents("tr")).data()[2],
                            id: getDataId(params, table.row($(this).parents("tr")).data()[2], "link"),
                        }
                        break;
                    case "categoria":
                        data = {
                            titulo: table.row($(this).parents("tr")).data()[0],
                            texto: table.row($(this).parents("tr")).data()[1],
                            cor: table.row($(this).parents("tr")).data()[2],
                            id: getDataId(params, table.row($(this).parents("tr")).data()[0], "titulo"),
                        }
                        break;
                    case "noticia":
                        data = {
                            manchete: table.row($(this).parents("tr")).data()[0],
                            subManchete: table.row($(this).parents("tr")).data()[1],
                            texto: table.row($(this).parents("tr")).data()[2],
                            autor: table.row($(this).parents("tr")).data()[3],
                            dtCadastro: table.row($(this).parents("tr")).data()[4],
                            id: getDataId(params, table.row($(this).parents("tr")).data()[0], "manchete"),
                        }
                        break
                    case "publicidade":
                        data = {
                            titulo: table.row($(this).parents("tr")).data()[0],
                            tipo: table.row($(this).parents("tr")).data()[1],
                            texto: table.row($(this).parents("tr")).data()[2],
                            link: table.row($(this).parents("tr")).data()[3],
                            id: getDataId(params, table.row($(this).parents("tr")).data()[0], "titulo"),
                        }
                        break;
                }
                localStorage.setItem(params + "Edit", JSON.stringify(data));
                location.href = "editar.html";
                break;
            case "delete":
                switch (params) {
                    case "tag":
                        $('#modalId').html(getDataId(params, table.row($(this).parents("tr")).data()[0], "titulo"));
                        break;
                    case "imagem":
                        $('#modalId').html(getDataId(params, $(this).parents("tr").find('img').parent('td').text(), "link"));
                        break;
                    case "video":
                        $('#modalId').html(getDataId(params, table.row($(this).parents("tr")).data()[2], "link"));
                        break;
                    case "categoria":
                        $('#modalId').html(getDataId(params, table.row($(this).parents("tr")).data()[0], "titulo"));
                        break;
                    case "noticia":
                        $('#modalId').html(getDataId(params, table.row($(this).parents("tr")).data()[0], "manchete"));
                        break
                    case "publicidade":
                        $('#modalId').html(getDataId(params, table.row($(this).parents("tr")).data()[0], "titulo"));
                        break
                }
                $('#defaultModal').modal('show');
                break;
        }
    });
    if (params != "aprovacao" && $('.js-basic-example.' + params).attr('value') != "listar") {
        $('.background-table').fadeIn();
        $('.js-basic-example.' + params).parents('.table-responsive').fadeIn();
    }

    if (params == "imagem")
        $('.img-preview').on('load', function () {
            $('.page-loader-wrapper').fadeOut();
        });
    else
    if (close)
        $('.page-loader-wrapper').fadeOut();

}

//FadeOut para minimizar tabela
$('.background-table').click(function () {
    dataTableArr = [];
    $(this).fadeOut();
    $(".table-responsive").fadeOut();
    $('tr.even').css('background-color', '#ffffff');
    $('tr.even').css('color', '#000000');
    $('tr.odd').css('color', '#000000');
    $('.table-striped > tbody > tr:nth-of-type(odd)').css('background-color', '#f9f9f9');
});

$('.table-cancel-button').click(function () {
    $('.background-table').click();
});

//Confirm button tables
$('.table-confirm-button').click(function () {
    dataTableArr = dataTableArr.filter(function (value, index, self) {
        return (self.indexOf(value) == index)
    });
    if (dataTableParam == "tag") {
        for (var element in dataTableArr)
            $('input[data-role="tagsinput"]').tagsinput('add', dataTableArr[element]);

        $('.bootstrap-tagsinput input').focus();
    } else {
        var text = "";
        for (var element in dataTableArr)
            text += (text != "" ? ", " : "") + dataTableArr[element];

        $("input[name='" + dataTableParam + "']").val($("input[name='" + dataTableParam + "']").val() + ($("input[name='" + dataTableParam + "']").val() ? ", " : "") + text);
        $('input[name="' + dataTableParam + '"]').focus();
    }


    $('.background-table').click();
});

//Init Firebase
var initFirebase = function () {
    firebase.initializeApp({
        apiKey: "AIzaSyAN8z_RHWKICWDl-QQ5cAQ8b1LvIWfrvOw",
        authDomain: "tvgaspar-backend.firebaseapp.com",
        databaseURL: "https://tvgaspar-backend.firebaseio.com",
        projectId: "tvgaspar-backend",
        storageBucket: "tvgaspar-backend.appspot.com",
        messagingSenderId: "702505431041"
    });
}

//Get info usuário (menu)
var getUsuario = function () {
    $('.name').html(localStorage.getItem("username"));
    $('.email').html(localStorage.getItem("username") + "@email.com");
}

//Get todas as notícias
var getAllNoticias = function (aprovacao, close) {
    $.ajax({
        type: "POST",
        url: "https://tvgaspar-server.herokuapp.com/getAllNoticias",
        data: {
            token: localStorage.getItem('token')
        },
        success: function (response) {
            console.log(response);
            var arrNoticia = [];
            var arrAprov = [];
            for (var element in response)
                if (response[element].aprovacao == 0)
                    arrAprov.push(response[element]);
                else
                    arrNoticia.push(response[element])
            localStorage.setItem('aprovacao', JSON.stringify(arrAprov));
            localStorage.setItem('noticia', JSON.stringify(arrNoticia));
            setAprovacoes(aprovacao);
            if (aprovacao) {
                if (location.href.indexOf("aprovacao") >= 0)
                    search("aprovacao", close);
            } else
                search("noticia", close);
            if (close)
                $('.page-loader-wrapper').fadeOut();

        },
        error: function (error) {
            console.log(error.message);
            logout('Sessão inválida. Faça o login novamente.');
        }
    });
}

//Set badge aprovações
var setAprovacoes = function (flgNoticia) {
    var aprovacao = JSON.parse(localStorage.getItem('aprovacao'));
    if (aprovacao.length > 0) {
        $('span.badge').html(aprovacao.length);
        $('span.badge').css('display', 'block');
    } else
    if (flgNoticia && location.href.indexOf("aprovacao") >= 0) {
        $('.div-table').html("Não há notícias para aprovação.");
        $('.div-table').css('margin-top', '30px');
        $('.page-loader-wrapper').fadeOut();
    }

}

//Get todas publicidades
var getAllPublicidades = function () {
    $.ajax({
        type: "POST",
        url: "https://tvgaspar-server.herokuapp.com/getAllPublicidades",
        data: {
            token: localStorage.getItem('token')
        },
        success: function (response) {
            console.log(response);
            localStorage.setItem("publicidade", JSON.stringify(response));
            search("publicidade", true);
        },
        error: function (error) {
            console.log(error.message);
            logout('Sessão inválida. Faça o login novamente.');
        }
    });

}

//Cancel button edit page
$('.btn-cancel').click(function () {
    location.href = "listar.html";
});

$('.goBack').click(function () {
    $('#defaultModal').modal('show');
});

$('.confirmConfirm').click(function () {
    $('input[name="lembrar"]').val(getLembrarDe());
    var resultado = getResultado();
    console.log(resultado);
    $('input[name="resultado"]').val(resultado.mensagem);
    if (resultado.motivo == null || resultado.motivo == undefined)
        $('div.motivos').parents('.row').css('display', 'none');
    else
        for (var element of resultado.motivo) {
            $('div.motivos').append("<a href='../" + element.link + "/" + element.link + ".html'>" + element.descricao + "</a><br>");
        }
    if (resultado.motivo != null && resultado.motivo != undefined)
        $('textarea[name="motivos"]').attr('rows', resultado.motivo.length);
    if ($('input[name="lembrar"]').val() == null || $('input[name="lembrar"]').val() == "") {
        $('input[name="lembrar"]').parents('.row').css('display', 'none');
    }
    $('.table-responsive').css('top', 'calc(50% - ' + $('.table-responsive').height() / 2 + 'px)');
    if ($(window).width() > 1024)
        $('.table-responsive').css('left', 'calc(50% - ' + ($('.table-responsive').width() / 2 - $('#leftsidebar').width() / 2) + 'px)');
    else
        $('.table-responsive').css('left', $(window).width() <= 768 ? 0 : $(window).width() / 2 - $('.table-responsive').width() / 2);
    $('.table-responsive').css('display', 'block');
    $('.background-table').css('display', 'block');
});


$('.confirmBack').click(function () {
    location.href = "../aluno/aluno.html";
});

//Permissão de adm para todos os elementos de classe isAdm
var adm = function () {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario.isAdm == 1)
        $('.isAdm').css('display', 'block');
};

var getCargaMinima = function () {
    var curso = JSON.parse(localStorage.getItem('curso'));
    if (curso.modalidade == "Integrado")
        return 300;
    else if (curso.sigla == "EDI" && curso.modalidade == "Concomitante") {
        return 280;
    } else if (curso.sigla == "DMV")
        return 200;
    else if (curso.sigla == "MEC")
        return 270;
    else if (curso.sigla == "CVI")
        return 200;
    else if (curso.sigla == "TEC")
        return 270;
    else if (curso.sigla == "TEL")
        return 270;
    else if (curso.sigla == "RES-EJA")
        return 240;
    else if (curso.sigla == "TSA")
        return 220;
    else if (curso.sigla == "TGA")
        return 220;
    else if (curso.sigla == "EE")
        return 160;
    else if (curso.sigla == "TAI")
        return 240;
    else if (curso.sigla == "EQ")
        return 160;
    else
        return 300;
}

var getTermos = function () {
    var estagio = JSON.parse(localStorage.getItem('estagio'));
    if (estagio != null) {
        if (estagio.agente == "ABRH")
            return 5;
        else if (estagio.agente == "CIEE" || estagio.agente == "Eccos" || estagio.agente == "Fundatec" || estagio.agente == "InCompany" || estagio.agente == "Estagiar" || estagio.agente == "Agiel" || estagio.agente == "Banestágio" || estagio.agente == "UNIERGS" || estagio.agente == "Companhia de estágios" || estagio.agente == "Outro")
            return 4;
        else
            return 3;
    }
}

var getPAS = function (tipo) {
    var estagio = JSON.parse(localStorage.getItem('estagio'));
    if (estagio != null) {
        if (estagio.concedente == "CEEE-D" || estagio.concedente == "CEEE-GT" || estagio.concedente == "EMBRAPA" || estagio.concedente == "CRM")
            return 2;
        else if (estagio.agente == "não" && tipo == "TCE")
            return 4;
        else
            return 2;
    }
}

var getLembrarDe = function () {
    var estagio = JSON.parse(localStorage.getItem('estagio'));
    var seguro = JSON.parse(localStorage.getItem('seguro'));
    if (estagio != null && seguro != null) {
        if (estagio.agente == "ABRH" || estagio.agente == "CIEE" || estagio.agente == "Eccos" || estagio.agente == "Fundatec" || estagio.agente == "InCompany" || estagio.agente == "Estagiar" || estagio.agente == "Agiel" || estagio.agente == "Banestágio" || estagio.agente == "UNIERGS" || estagio.agente == "Companhia deAX1 estágios" || estagio.agente == "Outro")
            return "Verificar se nome do Orientador no termo está correto";
        else if (seguro.cargo == "Inst. Ensino")
            return "Receber se data de início e exame médico ok. PEDIR SEGURO!";
    }
}

var getResultado = function () {
    var estagio = JSON.parse(localStorage.getItem('estagio'));
    var seguro = JSON.parse(localStorage.getItem('seguro'));
    var periodo = JSON.parse(localStorage.getItem('periodo'));
    var documentos = JSON.parse(localStorage.getItem('documentos'));
    var aluno = JSON.parse(localStorage.getItem('aluno'));
    var matricula = JSON.parse(localStorage.getItem('matricula'));
    var curso = JSON.parse(localStorage.getItem('curso'));
    var obrigatorio = JSON.parse(localStorage.getItem('obrigatorio'));
    var naoObrigatorio = JSON.parse(localStorage.getItem('naoObrigatorio'));
    var motivo = [];

    if (estagio.outro == "sim")
        motivo.push({
            descricao: "Possui outro estágio em andamento",
            link: "estagio"
        });

    moment.locale('pt-br');
    if (moment(periodo.dataFinal, 'DD/MM/YYYY') <= moment(periodo.dataInicial, 'DD/MM/YYYY'))
        motivo.push({
            descricao: "Data final anterior ou igual à data inicial de estágio",
            link: "periodo"
        });
    if (documentos.assinados == "não")
        motivo.push({
            descricao: "Documentos não estão devidamentes assinados",
            link: "documentos"
        });
    if (documentos.dadosCertos == "não")
        motivo.push({
            descricao: "Os dados dos documentos não estão certos",
            link: "documentos"
        });
    if (documentos.constaNumero == "não")
        motivo.push({
            descricao: "CNPJ/CREA incorreto ou inexistente",
            link: "documentos"
        });
    if (periodo.doisAnos == "sim")
        motivo.push({
            descricao: "Ultrapassa 2 anos de estágio na mesma concedente",
            link: "periodo"
        });
    if (estagio.modalidade == "Não-Obrigatório" && seguro.cargo == "Inst. Ensino")
        motivo.push({
            descricao: "O seguro não pode estar a cargo da Instituição de Ensino quando o estágio é não-obrigatório",
            link: "seguro"
        });
    if (matricula.formado == "não" && (periodo.cargaDiaria > 6 || periodo.cargaSemanal > 30))
        motivo.push({
            descricao: "Enquanto não concluída a parte teórica do curso, a carga horária máxima diária é de 6h e semanal de 30h",
            link: "periodo"
        });
    if ((matricula.formado == "sim" && (periodo.cargaDiaria > 8 || periodo.cargaSemanal > 40)))
        motivo.push({
            descricao: "Concluída a parte teória do curso, a carga horária máxima diária é de 8h e semanal de 40h",
            link: "periodo"
        });
    if (estagio.modalidade == "Não-Obrigatório") {
        if (naoObrigatorio.auxTransp == "não")
            motivo.push({
                descricao: "Estágio não-obrigatório sem auxílio-transporte",
                link: "naoObrigatorio"
            });
        if (naoObrigatorio.horarioDist == "não")
            motivo.push({
                descricao: "O horário do estágio não-obrigatório conflita com o das aulas ou dependências",
                link: "naoObrigatorio"
            });
        if (moment(naoObrigatorio.formatura, 'DD/MM/YYYY') < moment(periodo.dataFinal, 'DD/MM/YYYY'))
            motivo.push({
                descricao: "A data final do estágio não-obrigatório ultrapassa a previsão de formatura",
                link: "naoObrigatorio"
            });
        if (naoObrigatorio.repFalta == "sim")
            motivo.push({
                descricao: "Frequência insuficiente para renovar estágio não-obrigatório",
                link: "naoObrigatorio"
            });
        if (naoObrigatorio.rep50 == "sim")
            motivo.push({
                descricao: "Rendimento insuficiente para renovar estágio não-obrigatório",
                link: "naoObrigatorio"
            });
    }
    if (estagio.modalidade == "Obrigatório" && (curso.sigla == "DES" || curso.sigla == "TSI" || curso.sigla == "TSIAD" || curso.sigla == "DINT" || (curso.sigla == "CVI" && curso.modalidade == "Integrado")))
        if (curso.sigla == "CVI")
            motivo.push({
                descricao: "O projeto do curso " + curso.sigla + ", modalidade " + curso.modalidade + ", não prevê estágio obrigatório",
                link: "estagio"
            });
        else
            motivo.push({
                descricao: "O projeto do curso " + curso.sigla + " não prevê estágio obrigatório",
                link: "estagio"
            });
    // if (estagio.modalidade == "Obrigatório" && obrigatorio.renovando.renovadoOrientador == "não")
    //     motivo.push("Estágio obrigatório, renovando, com orientador diferente");
    if (estagio.modalidade == "Obrigatório") {
        if (obrigatorio.relatorioFinal == "sim")
            motivo.push({
                descricao: "Não é possível realizar outro estágio obrigatório após a entrega do relatório final",
                link: "obrigatorio"
            });
        if (obrigatorio.obrigatorio12 == "sim")
            motivo.push({
                descricao: "A duração máxima de estágio obrigatório é de 1 ano",
                link: "obrigatorio"
            });
        if (documentos.tipo == "TCE" && obrigatorio.cargaCalculada < obrigatorio.cargaMinima)
            motivo.push({
                descricao: "A carga horária calculada é menor do que a carga horária mínima do curso",
                link: "obrigatorio"
            });
    }
    if (seguro.cargo == "Concedente") {
        if (moment(seguro.vigenciaDataInicial, 'DD/MM/YYYY') > moment(periodo.dataInicial, 'DD/MM/YYYY'))
            motivo.push({
                descricao: "O seguro não cobre todo o período de estágio",
                link: "periodo"
            });
        if (moment(seguro.vigenciaDataFinal, 'DD/MM/YYYY') < moment(periodo.dataFinal, 'DD/MM/YYYY'))
            motivo.push({
                descricao: "O seguro não cobre todo o período de estágio",
                link: "periodo"
            });
        if (seguro.capitalSegurado < 15000)
            motivo.push({
                descricao: "O capital segurado é menor do que R$ 15.000,00",
                link: "seguro"
            });
        if (seguro.mac == "não")
            motivo.push({
                descricao: "O seguro não possui cobertura para Morte Acidental",
                link: "seguro"
            });
        if (seguro.ipa == "não")
            motivo.push({
                descricao: "O seguro não possui cobertura para Invalidez Permanente parcial ou total por Acidente",
                link: "seguro"
            });
        if (seguro.entregouApoliceProposta == "não" && documentos.tipo == "TCE")
            motivo.push({
                descricao: "Falta cópia da apólice ou proposta e comprovante de pagamento",
                link: "seguro"
            });
    }

    if (estagio.modalidade == "Obrigatório" && curso.modalidade == "Integrado" && matricula.formado == "não") {
        if ((matricula.semestre < 7))
            motivo.push({
                descricao: "O aluno não está matriculado em semestre apto para realizar o estágio obrigatório (7º ou 8º semestre de curso Integrado)",
                link: "matricula"
            });
        else
        if (matricula.semestre == 7 && matricula.dependencia == "sim")
            motivo.push({
                descricao: "O aluno não está apto a realizar estágio obrigatório (possui dependência no 7º semestre de curso Integrado)",
                link: "matricula"
            });
    }
    if (curso.sigla == "MEC" && estagio.modalidade == "Obrigatório" && (curso.modalidade == "Concomitante" || curso.modalidade == "Subsequente") && matricula.formado == "não") {
        if (matricula.semestre < 2)
            motivo.push({
                descricao: "O aluno não está matriculado em semestre apto para realizar o estágio obrigatório (2º ao 4º semestre do curso de MEC " + curso.modalidade + " )",
                link: "matricula"
            });
        else
        if (matricula.semestre == 2 && matricula.dependencia == "sim")
            motivo.push({
                descricao: "O aluno não está apto a realizar estágio obrigatório (possui dependência no 2º semestre do curso de MEC " + curso.modalidade + ")",
                link: "matricula"
            });
    }
    if (curso.sigla == "EDI" && estagio.modalidade == "Obrigatório" && curso.modalidade == "Subsequente" && matricula.formado == "não") {
        if (matricula.semestre < 4)
            motivo.push({
                descricao: "O aluno não está matriculado em semestre apto para realizar o estágio obrigatório (4º ou 5º semestre do curso de EDI " + curso.modalidade + ")",
                link: "matricula"
            });
        else if (matricula.semestre == 4 && matricula.dependencia == "sim")
            motivo.push({
                descricao: "O aluno não está apto a realizar estágio obrigatório (possui dependência no 4º semestre do curso de EDI " + curso.modalidade + ")",
                link: "matricula"
            });
    }
    if ((curso.sigla == "TRO" || curso.sigla == "EME" || curso.sigla == "QUI" || curso.sigla == "TEL" || curso.sigla == "CVI") && estagio.modalidade == "Obrigatório" &&
        (curso.modalidade == "Subsequente" || curso.modalidade == "Concomitante") && matricula.formado == "não") {
        if (matricula.semestre < 3)
            motivo.push({
                descricao: "O aluno não está matriculado em semestre apto para realizar o estágio obrigatório (3º ou 4º semestre do curso de " + curso.sigla + " " + curso.modalidade + ")",
                link: "matricula"
            });
        if (matricula.semestre == 3 && matricula.dependencia == "sim")
            motivo.push({
                descricao: "O aluno não está apto a realizar estágio obrigatório (possui dependência no (3º semestre do curso de " + curso.sigla + " " + curso.modalidade + ")",
                link: "matricula"
            });
    }
    if (estagio.area == "não" && (curso.modalidade != "Integrado" && estagio.modalidade != "Não-Obrigatório"))
        motivo.push({
            descricao: "As atividades do estágio não são na área do curso",
            link: "estagio"
        });

    // moment.locale('pt-br');
    // var data1 = moment(Date.parse(periodo.dataInicial), 'DD/MM/YYYY');
    // var data2 = moment(new Date(), 'DD/MM/YYYY');
    // var diff = data2.diff(data1, 'days');
    // if (Math.abs(diff) > 15)
    //     motivo.push("Data de conferência do contrato maior que 15 dias do inicio do estágio");

    if (motivo.length > 0)
        return {
            mensagem: "NÃO RECEBER",
            motivo: motivo
        };
    else if (aluno.idade == "Menor")
        return {
            mensagem: "Receber apenas c/ assinatura do responsável e se horário não ultrapassar as 22h, em princípio"
        };
    else
        return {
            mensagem: "RECEBER"
        };
}

var receber = function (value) {
    var username = localStorage.getItem('username');
    var registro = {
        conferencia: {
            data: new Date().toLocaleDateString(),
            conferente: localStorage.getItem('username')
        },
        aluno: {
            nome: JSON.parse(localStorage.getItem('aluno')).nome
        },
        matricula: {
            numero: JSON.parse(localStorage.getItem('matricula')).numero
        },
        resultado: $('input[name="resultado"]').val(),
        recebimento: {
            data: value == 0 ? new Date().toLocaleDateString() : "",
            recebedor: value == 0 ? localStorage.getItem('username') : "Não recebido"
        },
        comentario: $('textarea[name="comentario"]').val()
    };

    localStorage.clear();
    localStorage.setItem('recebido', JSON.stringify(registro));
    localStorage.setItem('username', username);
}

$('.receber').click(function () {
    receber(0);
    localStorage.setItem('not', "Contrato recebido com sucesso!");
    location.href = "../../../home/home.html"

});

$('.naoReceber').click(function () {
    receber(1);
    localStorage.setItem('not', "Contrato não recebido com sucesso!");
    location.href = "../../../home/home.html"
});

var getTable = function () {
    var recebido = JSON.parse(localStorage.getItem('recebido'));
    if (recebido != null)
        var data = [
            [recebido.conferencia.data, recebido.conferencia.conferente, recebido.aluno.nome,
                recebido.resultado, recebido.recebimento.data, recebido.recebimento.recebedor, recebido.comentario
            ]
        ];
    else
        var data = [];
    data.push([
        "20/03/2015", "teste", "teste", "NÃO RECEBER", "", "Não Recebido", ""
    ]);

    data.push([
        "25/03/2018", "teste", "teste", "RECEBER", "25/03/2018", "teste", ""
    ]);



    var colunas = [{
            title: "Data conferência"
        },
        {
            title: "Conferente"
        },
        {
            title: "Nome"
        },
        {
            title: "Resultado"
        },
        {
            title: "Data Recebimento"
        },
        {
            title: "Recebedor"
        },
        {
            title: "Comentário"
        }
    ]
    var table = $('.js-basic-example').DataTable({
        data: data,
        columns: colunas,
        responsive: true,
        bLengthChange: false,
        bDestroy: true,
        pageLength: 10,
        language: {
            zeroRecords: "Nenhum registro encontrado",
            info: "Exibindo _START_ a _END_ de _TOTAL_ registros",
            infoEmpty: "Exibindo 0 a 0 de 0 registros",
            infoFiltered: "",
            search: "",
            searchPlaceholder: "Pesquisar",
            paginate: {
                "next": "Próximo",
                "previous": "Anterior"
            },
        },
    });

    $('tr').each(function () {
        var td = $(this).find('td');
        if ($(td[3]).html() == "NÃO RECEBER" && $(td[4]).html() != "") {
            $(this).css("background-color", '#d4000e');
            $(this).css("color", 'white')
        }

        if ($(td[3]).html() == "RECEBER" && $(td[4]).html() == "") {
            $(this).css("background-color", '#d4000e');
            $(this).css("color", 'white')
        }
    });
}