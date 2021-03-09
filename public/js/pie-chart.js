// SELECT ALL CHARTS
let pieCharts = document.querySelectorAll('.widget-pie-chart');

let allPieCharts = [...pieCharts];

// REUSABLE RESIZE OBSERVER
var ro = new ResizeObserver(entries => {
    for (let entry of entries) {
        const crWidth = entry.borderBoxSize[0].inlineSize;
        const crHeight = entry.borderBoxSize[0].blockSize;
        const widgetHeader = entry.target.children[0];
        const widgetBody = entry.target.children[1];
        const widgetLegend = entry.target.children[2];
        const widgetLegendItems = widgetLegend.children[1].children;

        const widgetHeaderBP = crHeight * .071;
        let widgetLegendItemsWidth = 0;

        //Update sizes
        widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`;
        widgetBody.style.height = `calc(100% - ${widgetHeader.clientHeight + widgetLegend.clientHeight}px)`;
        google.charts.setOnLoadCallback(drawChart);

        //Legend size check
        [...widgetLegendItems].forEach(e => {
            widgetLegendItemsWidth += e.clientWidth + 38;
        })

        if (widgetLegend.clientWidth * 2 - 28 <= widgetLegendItemsWidth) {
            widgetLegend.classList.add('small');
        } else {
            widgetLegend.classList.remove('small');
        }

    }
});

allPieCharts.forEach(e => {
    ro.observe(e);
});

//PIE CHART
google.charts.load('current', {
    'packages': ['corechart']
});
google.charts.setOnLoadCallback(drawChart);

function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Task', 'Hours per Day'],
        ['Work', 11],
        ['Eat', 2],
        ['Commute', 2],
        ['Watch TV', 2],
        ['Sleep', 7]
    ]);

    var options = {
        backgroundColor: 'transparent',
        legend: 'none',
        title: '',
        width: 'auto',
        height: 'auto',
        chartArea: {
            height: '94%',
            left: '0',
            right: '0',
        },
        fontSize: '12.75',
        pieSliceTextStyle: { fontName: '"Inter", sans-serif' }
    };

    var chart02 = new google.visualization.PieChart(document.getElementById('chart-02'));

    chart02.draw(data, options);
}
