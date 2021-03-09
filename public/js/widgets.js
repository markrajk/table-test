// SELECT ALL CHARTS
let columnCharts = document.querySelectorAll('.column-chart');
let comboChart = document.querySelector('.combo-chart');
let barGraph = document.querySelector('.bar-graph');
let valueBox = document.querySelector('.value-box');
let lineGraph = document.querySelector('.line-chart');

let allGraphs = [...columnCharts, comboChart, barGraph, valueBox, lineGraph];

// REUSABLE RESIZE OBSERVER
var ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const crWidth = entry.borderBoxSize[0].inlineSize;
    const crHeight = entry.borderBoxSize[0].blockSize;

    if (crWidth > 1200.00001) {
      entry.target.classList.add('s-12')
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {

      }
    } else if (entry.target.classList.contains('s-12')) {
      entry.target.classList.remove('s-12')
    }

    if (crWidth <= 1200 && crWidth > 1100.00001) {
      entry.target.classList.add('s-11')
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {

      }
    } else if (entry.target.classList.contains('s-11')) {
      entry.target.classList.remove('s-11')
    }

    if (crWidth <= 1100 && crWidth > 1000.00001) {
      entry.target.classList.add('s-10')
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {

      }
    } else if (entry.target.classList.contains('s-10')) {
      entry.target.classList.remove('s-10')
    }

    if (crWidth <= 1000 && crWidth > 900.00001) {
      entry.target.classList.add('s-9')
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {

      }
    } else if (entry.target.classList.contains('s-9')) {
      entry.target.classList.remove('s-9')
    }

    if (crWidth <= 900 && crWidth > 800.00001) {
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {

      }
    } else if (entry.target.classList.contains('s-8')) {
      entry.target.classList.remove('s-8')
    }

    if (crWidth <= 800 && crWidth > 700.00001) {
      entry.target.classList.add('s-7')
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {
      }
    } else if (entry.target.classList.contains('s-7')) {
      entry.target.classList.remove('s-7')
    }

    if (crWidth <= 700 && crWidth > 600.00001) {
      entry.target.classList.add('s-6')
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {
      }
    } else if (entry.target.classList.contains('s-6')) {
      entry.target.classList.remove('s-6')
    }

    if (crWidth <= 600 && crWidth > 500.00001) {
      entry.target.classList.add('s-5')
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {
      }
    } else if (entry.target.classList.contains('s-5')) {
      entry.target.classList.remove('s-5')
    }

    if (crWidth <= 500) {
      entry.target.classList.add('s-4')
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {
      }
    } else if (entry.target.classList.contains('s-4')) {
      entry.target.classList.remove('s-4')
    } else {

      // chart01.options.scales.yAxes[0].ticks.callback = function (
      //   label,
      //   index,
      //   labels
      // ) {
      //   switch (label) {
      //     case 1:
      //       return "Bad (1.0)";
      //     case 2:
      //       return "Weak (2.0)";
      //     case 3:
      //       return "Ok (3.0)";
      //     case 4:
      //       return "Good (4.0)";
      //     case 5:
      //       return "Great (5.0)";
      //   }
      // };
    }

    if (crWidth <= 700.00001) {
      //Code for line chart
      if (entry.target.classList.contains('line-chart')) {
        chart01.data.labels = chart01.data.labels.map(e => { return e.substring(0, 3) });
        chart01.update();
        // chart01.data.labels = [
        //   "Jan",
        //   "Feb",
        //   "Mar",
        //   "Apr",
        //   "May",
        //   "Jun",
        //   "Jul",
        //   "Aug",
        //   "Sep",
        //   "Oct",
        //   "Nov",
        //   "Decr"
        // ]
      }
    }


    //HEIGHT CHECK
    if (crHeight > 700.00001) {
      entry.target.classList.add('h-70')
    } else if (entry.target.classList.contains('h-70')) {
      entry.target.classList.remove('h-70')
    }

    if (crHeight <= 700 && crHeight > 650.00001) {
      entry.target.classList.add('h-65')
    } else if (entry.target.classList.contains('h-65')) {
      entry.target.classList.remove('h-65')
    }

    if (crHeight <= 650 && crHeight > 600.00001) {
      entry.target.classList.add('h-60')
    } else if (entry.target.classList.contains('h-60')) {
      entry.target.classList.remove('h-60')
    }

    if (crHeight <= 600 && crHeight > 550.00001) {
      entry.target.classList.add('h-55')
    } else if (entry.target.classList.contains('h-55')) {
      entry.target.classList.remove('h-55')
    }


    if (crHeight <= 550 && crHeight > 500.00001) {
      entry.target.classList.add('h-50')
    } else if (entry.target.classList.contains('h-50')) {
      entry.target.classList.remove('h-50')
    }

    if (crHeight <= 500 && crHeight > 450.00001) {
      entry.target.classList.add('h-45')
    } else if (entry.target.classList.contains('h-45')) {
      entry.target.classList.remove('h-45')
    }

    if (crHeight <= 450 && crHeight > 400.00001) {
      entry.target.classList.add('h-40')
    } else if (entry.target.classList.contains('h-40')) {
      entry.target.classList.remove('h-40')
    }

    if (crHeight <= 400 && crHeight > 350.00001) {
      entry.target.classList.add('h-35')
    } else if (entry.target.classList.contains('h-35')) {
      entry.target.classList.remove('h-35')
    }

    if (crHeight <= 350 && crHeight > 300.00001) {
      entry.target.classList.add('h-30')
    } else if (entry.target.classList.contains('h-30')) {
      entry.target.classList.remove('h-30')
    }

    if (crHeight <= 300 && crHeight > 250.00001) {
      entry.target.classList.add('h-25')
    } else if (entry.target.classList.contains('h-25')) {
      entry.target.classList.remove('h-25')
    }

    if (crHeight <= 250) {
      entry.target.classList.add('h-20')
    } else if (entry.target.classList.contains('h-20')) {
      entry.target.classList.remove('h-20')
    }


    //COLUMN CHART LABELS WIDTH
    if (entry.target.classList.contains('regular')) {
      let countWidth = 0;
      let parent = undefined;
      entry.target.querySelectorAll('.column-chart-h-axis-item-label').forEach(e => {
        parent === undefined && (parent = e.parentElement.parentElement)
        countWidth += e.scrollWidth + 30;
      })

      if (countWidth > parent.clientWidth) {
        entry.target.classList.add('rotate-text');
      } else {
        entry.target.classList.remove('rotate-text');
      }
    }

    if (entry.target.classList.contains('bar-graph')) {
      let height = parseInt(crHeight - 60);
      //let bars = entry.target.querySelectorAll('.bar-graph-main-data-item');
      let bars = [...entry.target.children[0].children[0].children];
      let barHeight = height / (bars.length * 1.5);

      bars.forEach(e => {
        e.style.height = `${barHeight}px`;
        e.style.marginBottom = `${(barHeight / 2) <= 10 ? 10 : (barHeight / 2)}px`;
      })
    }
  }
});

allGraphs.forEach(e => {
  ro.observe(e);
});

let allLegends = document.querySelectorAll('.chart-legend');

var ro02 = new ResizeObserver(entries => {
  for (let entry of entries) {
    if (entry.target.clientWidth < entry.target.firstElementChild.clientWidth + 20) {
      entry.target.classList.add('small');
    } else {
      entry.target.classList.remove('small');
    }
  }
})

allLegends.forEach(e => {
  ro02.observe(e);
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
    title: false,
    width: 'auto',
    height: 'auto',
    chartArea: {
      height: '94%',
      left: '0',
      right: '0',
    },
    fontSize: '12.75'
  };

  var chart02 = new google.visualization.PieChart(document.getElementById('piechart02'));

  chart02.draw(data, options);
}



//LINE CHART
var ctx01 = document.getElementById("chart-01").getContext("2d");

let chart01 = new Chart(ctx01, {
  type: "line",
  data: {
    datasets: [
      {
        // showLine: false,
        label: "Attitude",
        data: [null, 3, 3.4, 3.5, 3.4, 3.5, 4, 3, 3.4, 3.5, 3.4, 3.5, 4, null],
        fill: false,
        borderWidth: 1.5,
        borderColor: "#137ff6",
        pointRadius: 4.5,
        pointBackgroundColor: "#ffffff",
        pointBorderColor: '#137ff6',
        pointBorderWidth: 1.5,
      },
    ],
    labels: [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
      ""
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
      position: "right",
      align: "center",

      labels: {
        padding: 30,
      },
    },
    legendCallback: function (chart) {
      return chart.data.datasets
        .map((e, i, arr) => {
          return `
            <div class="chart-label chart-label-${i}">

                <div class="pretty p-svg p-curve">
                    <input type="checkbox" name="${e.label}-${i}" id="${e.label}-${i}"/>
                    <div class="state p-primary">
                        <!-- svg path -->
                        <svg class="svg svg-icon" viewBox="0 0 20 20">
                            <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style="stroke: white;fill:white;"></path>
                        </svg>
                        <label>&nbsp;</label>
                    </div>
                </div>

                <label class="chart-label-label" for="${e.label}-${i}">${e.label}</label>
                <span style="background-color: ${e.borderColor}"></span>
            </div>`;
        })
        .join("");
    },
    maintainAspectRatio: false,
    plugins: {
      datalabels: {
        display: false,
      },
    },
    scales: {
      yAxes: [
        {
          ticks: {
            fontColor: "#505050",
            fontFamily: '"Inter", sans-serif',
            fontSize: 10,
            fontStyle: "400",
            beginAtZero: true,
            padding: 8.6,
            max: 5,
            min: 1,
            stepSize: 1,
          },
          gridLines: {
            color: "#f5f6f8",
            lineWidth: 1.5,
            display: true,
            drawTicks: false,
            drawOnChartArea: true,
            drawBorder: false
          },
        },
      ],
      xAxes: [
        {
          ticks: {
            maxRotation: 0,
            fontColor: "#505050",
            fontFamily: '"Inter", sans-serif',
            fontSize: 10.5,
            fontStyle: "400",
            beginAtZero: false,
            padding: 10,
          },
          gridLines: {
            display: false,
            drawTicks: false,
            drawOnChartArea: false,
            drawBorder: false
          },
        },
      ],
    },
  },
});

// RESIZE WIDGETS HEIGHT
// let minusHeight = document.querySelector(".plus-minus .icon-minus-outlined");
// let plusHeight = document.querySelector(".plus-minus .icon-plus-outlined");
// let widgetsParent = document.querySelector(".content");

// minusHeight.addEventListener("click", function () {
//   widgetsParent.classList.add("small");
//   widgetsParent.classList.remove("big");
//   drawLineChart();
// });

// plusHeight.addEventListener("click", function () {
//   widgetsParent.classList.remove("small");
//   widgetsParent.classList.add("big");
//   drawLineChart();
// });



// document.querySelectorAll('.react-grid-item').forEach(e => {
//   e.style.zIndex = `${Math.abs(100 - Math.ceil(e.getBoundingClientRect().top / 100))}`;
// })

//COLUMN GRAPH SIZES


function regularColumnGraphSize() {
  let columnChartRegular = document.querySelector('.column-chart.regular');
  let columnChartAreaGraph = columnChartRegular.querySelector('.column-chart-area-graph');
  let columns = columnChartAreaGraph.querySelectorAll('.column-chart-area-graph-item')
  let columnCount = columns.length;
  let divider = columnCount <= 1 ? 4 : 2.5;
  let hAxis = columnChartRegular.querySelector('.column-chart-h-axis');
  let hAxisItems = hAxis.querySelectorAll('.column-chart-h-axis-item');

  columnChartAreaGraph.style.padding = `0 ${(100 / ((columnCount * 2) - 1)) / divider}%`
  hAxis.style.padding = `0 ${(100 / ((columnCount * 2) - 1)) / divider}%`

  for (let i = 0; i < columnCount; i++) {
    columns[i].style.width = `${100 / ((columnCount * 2) - 1)}%`;
    hAxisItems[i].style.width = `${100 / ((columnCount * 2) - 1)}%`;
  }
}

regularColumnGraphSize()



//ADD COLUMN TEST
function addColumn() {
  let columnChartRegular = document.querySelector('.column-chart.regular');
  let columnChartAreaGraph = columnChartRegular.querySelector('.column-chart-area-graph');
  let hAxis = columnChartRegular.querySelector('.column-chart-h-axis');

  let columnItem = `
  <div class="column-chart-area-graph-item" style="height: 65%; background-color: #559a19;">
  <div class="p column-chart-area-graph-item-text">18</div>
</div>
  `
  let labelItem = `
  <div class="column-chart-h-axis-item item-03">
  <p class="column-chart-h-axis-item-label">Teamworking</p>
  <span class="column-chart-h-axis-item-tick"></span>
</div>
  `

  columnChartAreaGraph.innerHTML += columnItem;
  hAxis.innerHTML += labelItem;

  regularColumnGraphSize()
}

document.querySelector('.add-column').addEventListener('click', addColumn)



//CHECK HEIGHT OF COLUMN CHART COLUMN
let columnChartRegularItems = document.querySelectorAll('.column-chart.regular .column-chart-area-graph-item');
columnChartRegularItems.forEach(e => {
  if (parseInt(e.style.height) > 90) {
    e.classList.add('high');
  } else {
    e.classList.remove('high');
  }
})

