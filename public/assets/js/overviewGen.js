$(document).ready(function() {

    $('.col-xs-3').on('click', '.overview-display', function () {
        var newLocation = {
            address: $(this).data('address')
            lat: $(this).data('lat'),
            lng: $(this).data('lng')
        };
        var currentURL = window.location.origin;
        $.post('/risk?losc=[{}]?overview=1', newLocation)
            .done(function (data) {
                $('.overview-collection').empty();
                var modalHtml = '<div class="modal fade overview-modal" tabindex="-1" role="dialog" aria-labelledby="overview-modal">'+
                    '<div class="modal-dialog modal-lg" role="document">'+
                        '<!-- Modal content-->'+
                        '<div class="modal-content">'+
                            '<div class="box-header with-border">'+
                                '<button type="button" class="close" data-dismiss="modal">&times;</button>'+
                                '<h4 class="box-title">Risk Overview</h4>'+
                            '</div>'+
                            '<div class="box-body">'+
                                '<div class="row">'+
                                    '<div class="col-lg-12">'+
                                        '<div class="col-lg-4">'+
                                            '<div class="well text-center">'+
                                                '<h4 >Risk Factors</h4>'+
                                                '<p>Crime: ' + riskFactors.crime + '%</p>'+
                                                '<p>Weather: ' + riskFactors.weather + '%</p>'+
                                                '<p>Safehouses: ' + riskFactors.safehouses + '%</p>'+
                                                '<p>Terror: ' + riskFactors.terror + '%</p>'+
                                            '</div>'+
                                        '</div>'+
                                        '<div class="col-lg-8">'+
                                            '<div id="risk-data">'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div class="box-footer no-padding text-center">'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                '</div>';
                $('.overview-collection').append(modalHtml);

                $('.overview-modal').modal('show');
                $('.overview-modal').on('shown.bs.modal', function () {
                    Morris.Bar({
                        element: 'risk-data',
                        data: [
                            {factor: 'Crime', risk: 50},
                            {factor: 'Weather', risk: 20},
                            {factor: 'Safehouses', risk: 10},
                            {factor: 'Terror', risk: 40}
                        ],
                        xkey: 'factor',
                        ykeys: ['risk'],
                        labels: ['Risk'],
                        barRatio: 0.4,
                        xLabelAngle: 35,
                        hideHover: 'auto',
                        stacked: true,
                        barColors: function (row, series, type) {
                          if(row.label == "Crime") return "#dd4b39";
                          else if(row.label == "Weather") return "#357ca5";
                          else if(row.label == "Safehouses") return "#00a65a";
                          else if(row.label == "Terror") return "#f39c12";
                        }
                    });
                })

                //     Morris.Donut({
                //         element: 'risk-data',
                //         data: [
                //           {label: 'Crime', value: 25 },
                //           {label: 'Weather', value: 40 },
                //           {label: 'Safehouses', value: 25 },
                //           {label: 'Terrror', value: 10 }
                //         ],
                //         formatter: function (y) { return y + "%" },
                //         colors: ["#dd4b39", "#357ca5", "#00a65a", "#f39c12"]
                //     });
                // })
            });
        return false;
    });
});
