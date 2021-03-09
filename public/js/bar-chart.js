// SELECT ALL CHARTS
let barCharts = document.querySelectorAll('.widget-bar-chart');

let allbarCharts = [...barCharts];

// REUSABLE RESIZE OBSERVER
var ro = new ResizeObserver(entries => {
    for (let entry of entries) {
        const crWidth = entry.borderBoxSize[0].inlineSize;
        const crHeight = entry.borderBoxSize[0].blockSize;

        const widgetHeader = entry.target.children[0];
        const widgetBody = entry.target.children[1];
        const barChart = widgetBody.children[0];
        const barChartArea = barChart.children[0];
        const barChartAreaBack = barChartArea.children[0];
        const barChartAreaItems = barChartArea.children;
        const barChartXAxis = barChart.children[2];
        const barChartXAxisItems = barChartXAxis.children;

        const widgetHeaderBP = crHeight * .071;
        const barChartAreaTP = crHeight * .045;



        //Update sizes
        widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`;
        widgetBody.style.maxHeight = `calc(100% - ${widgetHeader}px)`;
        entry.target.style.paddingBottom = `${crHeight * .054}px`;
        barChartArea.style.paddingTop = `${barChartAreaTP}px`;
        document.documentElement.style.setProperty('--bar-graph-top-padding', barChartAreaTP + "px");


        [...barChartXAxisItems].forEach(e => {
            e.children[1].style.height = `${barChartArea.clientHeight - barChartAreaTP}px`;
        })

        //Height of bars
        let height = parseInt(barChartArea.clientHeight - barChartAreaTP - 5);
        let barHeight = height / (barChartAreaItems.length * 1.5);

        [...barChartAreaItems].forEach(e => {
            if (e.classList.contains('bar-chart-area-item')) {
                e.style.height = `${barHeight}px`;
                e.style.marginBottom = `${(barHeight / 2) <= 10 ? 10 : (barHeight / 2)}px`;
            }
        })
    }
});

allbarCharts.forEach(e => {
    ro.observe(e);
});

