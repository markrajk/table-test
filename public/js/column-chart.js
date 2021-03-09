// SELECT ALL CHARTS
let columnCharts = document.querySelectorAll('.widget-column-chart');

let allcolumnCharts = [...columnCharts];

// REUSABLE RESIZE OBSERVER
var ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const crWidth = entry.borderBoxSize[0].inlineSize;
    const crHeight = entry.borderBoxSize[0].blockSize;

    const widgetHeader = entry.target.children[0];
    const widgetBody = entry.target.children[1];
    const columnChart = widgetBody.children[0];
    const columnChartTitle = columnChart.children[0];
    const columnChartArea = columnChart.children[1];
    const columnChartAreaItems = columnChartArea.children;
    const columnChartYAxis = columnChart.children[2];
    const columnChartXAxis = columnChart.children[3];
    const columnChartYAxisItems = columnChartYAxis.children;


    const widgetHeaderBP = crHeight * .071;
    const columnChartYAxisPadding = crWidth * .013;



    //Update sizes
    widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`;
    columnChartYAxis.style.padding = `0 ${columnChartYAxisPadding}px`;
    [...columnChartYAxisItems].forEach(e => {
      e.children[1].style.width = `${columnChartArea.clientWidth}px`;
      e.children[1].style.right = `-${columnChartYAxisPadding}px`;
    });

    [...columnChartAreaItems].forEach(e => {
      if (e.classList.contains('split')) {
        let firstSplit = e.children[0];
        let secondSplit = e.children[1];

        console.log(firstSplit.children[0])

        firstSplit.children[0].style.fontSize = `${1.7 * (firstSplit.clientWidth / 30)}em`;
        secondSplit.children[0].style.fontSize = `${2.2 * (secondSplit.clientWidth / 30)}em`;
      }
    });


    //Rotate text
    if (columnChartXAxis.children[0].clientWidth <= 60) {
      entry.target.classList.add('rotate-text');
    } else {
      entry.target.classList.remove('rotate-text');
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
  }
});

allcolumnCharts.forEach(e => {
  ro.observe(e);
});


function regularColumnGraphSize() {
  let columnChartArea = document.querySelector('.column-chart-area');
  let columnChartBars = document.querySelectorAll('.column-chart-area-item');
  let columnChartXAxisItems = document.querySelectorAll('.column-chart-x-axis-item');

  let itemWidth = 100 / columnChartBars.length / 2;

  columnChartBars.forEach(e => {
    e.style.width = `${itemWidth}%`;
    e.style.margin = `0 ${itemWidth / 2}%`;
  })

  columnChartXAxisItems.forEach(e => {
    e.style.width = `${itemWidth}%`;
    e.style.margin = `0 ${itemWidth / 2}%`;
  })

}

regularColumnGraphSize()



// //ADD COLUMN TEST
// function addColumn() {
//   let columnChartRegular = document.querySelector('.column-chart.regular');
//   let columnChartAreaGraph = columnChartRegular.querySelector('.column-chart-area-graph');
//   let hAxis = columnChartRegular.querySelector('.column-chart-h-axis');

//   let columnItem = `
//   <div class="column-chart-area-graph-item" style="height: 65%; background-color: #559a19;">
//   <div class="p column-chart-area-graph-item-text">18</div>
// </div>
//   `
//   let labelItem = `
//   <div class="column-chart-h-axis-item item-03">
//   <p class="column-chart-h-axis-item-label">Teamworking</p>
//   <span class="column-chart-h-axis-item-tick"></span>
// </div>
//   `

//   columnChartAreaGraph.innerHTML += columnItem;
//   hAxis.innerHTML += labelItem;

//   regularColumnGraphSize()
// }

// document.querySelector('.add-column').addEventListener('click', addColumn)



// //CHECK HEIGHT OF COLUMN CHART COLUMN
// let columnChartRegularItems = document.querySelectorAll('.column-chart.regular .column-chart-area-graph-item');
// columnChartRegularItems.forEach(e => {
//   if (parseInt(e.style.height) > 90) {
//     e.classList.add('high');
//   } else {
//     e.classList.remove('high');
//   }
// })

