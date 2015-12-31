/* Trends */
	/*
	 * Function to draw the column chart
	 */
	function buildColumn() {

			$('#container-column').highcharts({

					chart: {
							type: 'column'
					},

					title: {
							text: 'Monthly Crime Incidents'
					},

					subtitle: {
							text: '2015'
					},

					credits: {
							enabled: false
					},

					xAxis: {
							categories: [
									'Jan',
									'Feb',
									'Mar',
									'Apr',
									'May',
									'Jun',
									'Jul',
									'Aug',
									'Sep',
									'Oct',
									'Nov',
									'Dec'
							]
					},

					yAxis: {
							min: 0,
							title: {
									text: 'Incidents'
							}
					},

					tooltip: {
							headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
							pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
									'<td style="padding:0"><b>{point.y:.1f} incidents</b></td></tr>',
							footerFormat: '</table>',
							shared: true,
							useHTML: true
					},

					plotOptions: {
							column: {
									pointPadding: 0.2,
									borderWidth: 0
							}
					},

					series: [{
							name: 'Domestic Abuse',
							data: [49, 71, 106, 129, 144, 176, 135, 148, 216, 194, 95, 54]

					}, {
							name: 'Simple Hurt',
							data: [83, 78, 98, 93, 106, 84, 105, 104, 91, 83, 106, 92]

					}, {
							name: 'Burglary',
							data: [48, 38, 39, 41, 47, 48, 59, 59, 52, 65, 59, 51],
							color: '#843026'

					}, {
							name: 'Abduction',
							data: [22, 33, 14, 29, 22, 25, 17, 30, 17, 19, 26, 21],
							color: '#dd4b39'

					}]
			});
	}

/*
 * Function to draw the pie chart
 */
function build2015Pie() {
    
    // 'external' data
    var data = new Array();

    data.push({
        name: 'Violent Crime',
        y: 697,
        color: '#dd4b39'
    });

    data.push({
        name: 'White Collar Crime',
        y: 358,
        color: '#3c8dbc'
    });

    data.push({
        name: 'Other Crime',
        y: 710,
        color: '#00a65a'
    });

    $('#container-pie').highcharts({
        
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        
        title: {
            text: '2015 Overall Crime Breakdown'
        },
        
        credits: {
            enabled: false
        },
        
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        
        series: [{
            type: 'pie',
            name: 'Percentage',
            data: data
        }]
    });
}

function build2015VCPie() {
    
    // 'external' data
    var data = new Array();

    data.push({
        name: 'Murders',
        y: 15,
        color: '#dd4b39'
    });

    data.push({
        name: 'Riotings',
        y: 4,
        color: '#3c8dbc'
    });

    data.push({
        name: 'Abductions',
        y: 90,
        color: '#00a65a'
    });
		
		data.push({
        name: 'Rape',
        y: 85,
        color: '#cae500'
    });
	
		data.push({
        name: 'Attempted Murder',
        y: 42,
        color: '#a60099'
    });
	
		data.push({
        name: 'Grevious Hurt',
        y: 65,
        color: '#ff7600'
    });
	
		data.push({
        name: 'Simple Hurt',
        y: 423,
        color: '#00e2f5'
    });
	
    $('#container-pie2').highcharts({
        
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        
        title: {
            text: '2015 Violent Crime Breakdown'
        },
        
        credits: {
            enabled: false
        },
        
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        
        series: [{
            type: 'pie',
            name: 'Percentage',
            data: data
        }]
    });
}


/*
 * Function to draw the area chart
 */
function buildArea() {

    $('#container-area').highcharts({
        
        chart: {
            type: 'line'
        },
        
        title: {
            text: 'Visakhapatnam Crime Categorical Trends'
        },
        
        credits: {
            enabled: false
        },
        
        subtitle: {
            text: '1/1/2013 to 31/10/2015'
        },
        
        xAxis: {
            allowDecimals: false,
            labels: {
                formatter: function () {
                    return this.value; // clean, unformatted number for year
                }
            }
        },
        
        yAxis: {
            title: {
                text: 'Number of Incidents'
            },
            labels: {
                formatter: function () {
                    return this.value;
                }
            }
        },
        
        tooltip: {
            pointFormat: 'There were <b>{point.y}</b> incidents of {series.name} in {point.x}'
        },
        
        plotOptions: {
            line: {
                pointStart: 2013,
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        
        series: [{
            name: 'Abductions',
            data: [45, 63, 90]
        }, {
            name: 'Murders',
            data: [24, 27, 15]
        }, {
						name: 'Rape',
						data: [66, 84, 85]
				}, {
						name: 'Simple Hurt',
						data: [449, 418, 423]
				}, {
						name: 'Domestic Abuse',
						data: [495, 355, 322]
				}
								]
    });
}

	/*
	 * Call the function to build the chart when the template is rendered
	 */
	Template.trends.rendered = function() {    
			buildColumn();
			build2015Pie();
			buildArea();
			build2015VCPie();
	}
	
	Template.trends.helpers({
		totalCrimes: function() {
			return Crimes.find({}).count() + 15;
		},
		percentUserSubmitted: function() {
			return Math.round(Crimes.find({}).count()/(Crimes.find({}).count() + 15)*100);
		},
		totalUsers: function() {
			return Meteor.users.find({}).count();
		}
  });