// SELECT ALL CHARTS
let comboCharts = document.querySelectorAll('.widget-combo-chart');

let allComboCharts = [...comboCharts];

// REUSABLE RESIZE OBSERVER
var ro = new ResizeObserver(entries => {
  for (let entry of entries) {
    const crWidth = entry.borderBoxSize[0].inlineSize;
    const crHeight = entry.borderBoxSize[0].blockSize;

    const widgetHeader = entry.target.children[0];
    const widgetBody = entry.target.children[1];
    const comboChart = widgetBody.children[0];
    const comboChartTitle = comboChart.children[0];
    const comboChartArea = comboChart.children[1];
    const comboChartYAxis = comboChart.children[2];
    const comboChartXAxis = comboChart.children[3];
    const comboChartYAxisItems = comboChartYAxis.children;
    const widgetLegend = entry.target.children[2];
    const widgetLegendItems = widgetLegend.children[1].children;


    const widgetHeaderBP = crHeight * .071;
    const comboChartYAxisPadding = crWidth * .013;
    let widgetLegendItemsWidth = 0;



    //Update sizes
    widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`;
    widgetBody.style.height = `calc(100% - ${widgetHeader.clientHeight + widgetLegend.clientHeight}px)`;

    comboChartYAxis.style.padding = `0 ${comboChartYAxisPadding}px`;
    [...comboChartYAxisItems].forEach(e => {
      e.children[1].style.width = `${comboChartArea.clientWidth}px`;
      e.children[1].style.right = `-${comboChartYAxisPadding}px`;
    })


    //Rotate text
    if (comboChartXAxis.children[0].clientWidth <= 30) {
      entry.target.classList.add('rotate-text');
    } else {
      entry.target.classList.remove('rotate-text');
    }

    //Legend size check
    [...widgetLegendItems].forEach(e => {
      widgetLegendItemsWidth += e.clientWidth + 38;
    })

    if (widgetLegend.clientWidth * 2 - 100 <= widgetLegendItemsWidth) {
      console.log(widgetLegend.clientWidth, widgetLegendItemsWidth)
      widgetLegend.classList.add('small');
    } else {
      widgetLegend.classList.remove('small');
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

allComboCharts.forEach(e => {
  ro.observe(e);
});


function regularComboGraphSize() {
  let comboCharts = document.querySelectorAll('.combo-chart');
  // let comboChartArea = document.querySelector('.combo-chart-area');
  // let comboChartBars = document.querySelectorAll('.combo-chart-area-set');
  // let comboChartXAxisItems = document.querySelectorAll('.combo-chart-x-axis-item');

  comboCharts.forEach(combo => {
    let comboChartArea = combo.querySelector('.combo-chart-area');
    let comboChartBars = combo.querySelectorAll('.combo-chart-area-set');
    let comboChartXAxisItems = combo.querySelectorAll('.combo-chart-x-axis-item');
    let numOfItems = comboChartBars.length;

    if (numOfItems > 8) {
      numOfItems = 8
    }

    let itemWidth = 100 / (numOfItems + ((numOfItems - 2) * .73 + 2 * 1.1));
    console.log('itemWidth', itemWidth);

    comboChartBars.forEach((e, i, arr) => {
      e.style.width = `${itemWidth}%`;
      e.style.margin = `0 ${itemWidth * .367}%`;

      if (i === 0) {
        e.style.marginLeft = `${itemWidth * .55}%`;
      }

      if (i === arr.length - 1) {
        e.style.marginRight = `${itemWidth * .55}%`;
      }

    })

    comboChartXAxisItems.forEach((e, i, arr) => {
      e.style.width = `${itemWidth}%`;
      e.style.margin = `0 ${itemWidth * .367}%`;

      if (i === 0) {
        e.style.marginLeft = `${itemWidth * .55}%`;
      }

      if (i === arr.length - 1) {
        e.style.marginRight = `${itemWidth * .55}%`;
      }
    })

  })



}

regularComboGraphSize()



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

