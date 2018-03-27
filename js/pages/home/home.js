$(function () {

    getUsuario();

    //Notification em caso de page reload
    var not = localStorage.getItem('not');
    if (not != null && not != "") {
        showNotification(not, 'success');
        localStorage.setItem('not', "");
    }


    $('.page-loader-wrapper').fadeOut();
    //new Chart(document.getElementById("line_chart").getContext("2d"), getChartJs('line'));
    new Chart(document.getElementById("bar_chart").getContext("2d"), getChartJs('bar'));
    new Chart(document.getElementById("pie_chart_other").getContext("2d"), getChartJs('pie_other'));
    new Chart(document.getElementById("pie_chart").getContext("2d"), getChartJs('pie'));



    //Get info usuario
    // if (localStorage.getItem('usuario') != null && localStorage.getItem("usuario") != "") {
    //     console.log("Logado");
    //     var usuario = getUsuario();
    //     adm();
    //     //Set aprovacoes (noticias)
    //     getAllNoticias(true, true);

    // } else
    //     //Autentication by token
    //     $.ajax({
    //         type: "POST",
    //         url: "https://tvgaspar-server.herokuapp.com/findByToken",
    //         data: {
    //             token: localStorage.getItem('token')
    //         },
    //         success: function (response) {
    //             console.log(response);
    //             $('.name').html(response[0].nome);
    //             $('.email').html(response[0].email);
    //             localStorage.setItem("usuario", JSON.stringify(response[0]));
    //             adm();
    //             getAllNoticias(true, true);
    //         },
    //         error: function (error) {
    //             console.log(error.message);
    //             logout('Sessão inválida. Faça o login novamente.');
    //         }
    //     });

    // //Notification em caso de page reload
    // var not = localStorage.getItem('not');
    // if (not != null && not != "") {
    //     showNotification(not, 'success');
    //     localStorage.setItem('not', "");
    // }

    // //Widgets count
    // $('.count-to').countTo();

    // //Sales count to
    // $('.sales-count-to').countTo({
    //     formatter: function (value, options) {
    //         return '$' + value.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, ' ').replace('.', ',');
    //     }
    // });

    // initRealTimeChart();
    // initDonutChart();
    // initSparkline();
});


function getChartJs(type) {
    var config = null;

    if (type === 'line') {
        config = {
            type: 'line',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "Contratos sem erro",
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderColor: 'rgba(0, 188, 212, 0.75)',
                    backgroundColor: 'rgba(0, 188, 212, 0.3)',
                    pointBorderColor: 'rgba(0, 188, 212, 0)',
                    pointBackgroundColor: 'rgba(0, 188, 212, 0.9)',
                    pointBorderWidth: 1
                }, {
                    label: "Contratos com erro",
                    data: [0,
                        1,
                        1,
                        1,
                        0,
                        1,
                        1,
                        3
                        ],
                    borderColor: 'rgba(233, 30, 99, 0.75)',
                    backgroundColor: 'rgba(233, 30, 99, 0.3)',
                    pointBorderColor: 'rgba(233, 30, 99, 0)',
                    pointBackgroundColor: 'rgba(233, 30, 99, 0.9)',
                    pointBorderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    } else if (type === 'bar') {
        config = {
            type: 'bar',
            data: {
                labels: ["Natalia", "Laura", "Lucas", "Thamiris", "Mariana", "Gabriel", "Tamires", "Outros"],
                datasets: [{
                    label: "Eficiência",
                    data: [100,
                        94,
                        94,
                        97,
                        100,
                        83,
                        67,
                        94
                        ],
                    backgroundColor: 'rgba(0, 188, 212, 0.8)'
                }]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    } else if (type === 'radar') {
        config = {
            type: 'radar',
            data: {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [{
                    label: "My First dataset",
                    data: [65, 25, 90, 81, 56, 55, 40],
                    borderColor: 'rgba(0, 188, 212, 0.8)',
                    backgroundColor: ['rgba(0, 188, 212, 0.5)', 'rgba(233, 30, 99, 0.5)'],
                    pointBorderColor: 'rgba(0, 188, 212, 0)',
                    pointBackgroundColor: 'rgba(0, 188, 212, 0.8)',
                    pointBorderWidth: 1
                }, {
                    label: "My Second dataset",
                    data: [72, 48, 40, 19, 96, 27, 100],
                    borderColor: 'rgba(233, 30, 99, 0.8)',
                    backgroundColor: 'rgba(233, 30, 99, 0.5)',
                    pointBorderColor: 'rgba(233, 30, 99, 0)',
                    pointBackgroundColor: 'rgba(233, 30, 99, 0.8)',
                    pointBorderWidth: 1
                }]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    } else if (type === 'pie') {
        config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [15,
                        18,
                        16,
                        36,
                        18,
                        6,
                        3,
                        54
                    ],
                    backgroundColor: [
                        "rgb(233, 30, 99)",
                        "rgb(255, 193, 7)",
                        "rgb(0, 188, 212)",
                        "rgb(139, 195, 74)",
                        'rgba(247, 83, 76, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                }],
                labels: [
                    "Natalia",
                    "Laura",
                    "Lucas",
                    "Thamiris",
                    "Mariana",
                    "Gabriel",
                    "Tamires",
                    "Outros"

                ]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    } else if (type === 'pie_other') {
        config = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [130,
                        2,
                        2,
                        5,
                        4,
                        1,
                        2,
                        3,
                        2,
                        5,
                        1,
                        1,
                        3,
                        2,
                        2
                        
                    ],
                    backgroundColor: [
                        "rgb(233, 30, 99)",
                        "rgb(255, 193, 7)",
                        "rgb(0, 188, 212)",
                        "rgb(139, 195, 74)",
                        'rgba(247, 83, 76, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(181, 159, 91, 1)',
                        'rgba(199, 15, 230, 1)',
                        'rgba(56, 134, 59, 1)',
                        'rgba(121, 85, 72, 1)',
                        'rgba(160, 160, 160, 1)',
                        'rgba(177, 91, 64, 1)',
                        'rgba(234, 234, 234, 1)'
                    ],
                }],
                labels: [
                    "Pelotas",
                    "São Lourenço do Sul",
                    "Capão do Leão",
                    "Rio Grande",
                    "Turuçu",
                    "Pinheiro Machado",
                    "Arroio Grande",
                    "Santana da Boa Vista",
                    "Porto Alegre", 
                    "Canguçu", 
                    "Ijuí", 
                    "Piratini", 
                    "Horizontina", 
                    "Morro Redondo", 
                    "Cerrito"
                ]
            },
            options: {
                responsive: true,
                legend: false
            }
        }
    }


    return config;
}