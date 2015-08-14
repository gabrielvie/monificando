(function(){
	'use strict';

	angular
		.module('monificando.charts', ['chart.js'])
		.config(configBasicCharts)
		.config(configChartsColours)
		.config(configChartsTooltip);

	configBasicCharts.$injector = ['ChartJsProvider'];
	configChartsColours.$injector = ['ChartJsProvider'];
	configChartsTooltip.$injector = ['ChartJsProvider'];

	function configBasicCharts(ChartJsProvider) {
		ChartJsProvider.setOptions({
			animation: false,
			segmentStrokeColor: '#ecf0f1',
			legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
			scaleLabel: "R$ <%= value %>"
		});
	}

	function configChartsColours(ChartJsProvider) {

		ChartJsProvider.setOptions({
			colours: [
				'#1abc9c', //turquoise
				'#2ecc71', //emerald
				'#3498db', //peter-river
				'#9b59b6', //amethyst
				'#f1c40f', //sun-flower
				'#e67e22', //carrot
				'#e74c3c', //alizarin
				'#16a085', //green-sea
				'#27ae60', //nephritis
				'#2980b9', //belize-hole
				'#8e44ad', //wisteria
				'#f39c12', //orange
				'#d35400', //pumpkin
				'#c0392b', //pomegranate
			]
		});
	}

	function configChartsTooltip(ChartJsProvider) {

		ChartJsProvider.setOptions({
			showTooltips: true,
			customTooltips: false,
			tooltipFillColor: "#34495e",
			tooltipFontFamily: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
			tooltipFontColor: "#ecf0f1",
			tooltipTitleFontFamily: "'Open Sans', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
			tooltipTitleFontColor: "#ecf0f1",
			tooltipYPadding: 6,
			tooltipXPadding: 6,
			tooltipCaretSize: 8,
			tooltipCornerRadius: 0,
			tooltipXOffset: 0,
			tooltipTemplate: "<%if (label){%><%=label%>: <%}%>R$<%= value %>",
			multiTooltipTemplate: "<%= value %>",
		});
	}
})();
