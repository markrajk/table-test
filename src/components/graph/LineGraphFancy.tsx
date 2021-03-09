import React from 'react'
import { useEffect, useRef } from 'react'
import { useState } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'

import { Line } from 'react-chartjs-2'
import { MyWidget, LineData } from 'src/apiTypes'
import { capitalize, colorByName } from 'src/utitlity'

import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'

let options = {
  responsive: true,
  maintainAspectRatio: false,
  legend: {
    display: false,
    position: 'right',
    align: 'center',

    labels: {
      padding: 30,
    },
  },
  legendCallback: function (chart: any) {
    return chart.data.datasets
      .map((e: any, i: number, arr: any) => {
        return `
              <div className="chart-label chart-label-${i}">

                  <div className="pretty p-svg p-curve">
                      <input type="checkbox" name="${e.label}-${i}" id="${e.label}-${i}"/>
                      <div className="state p-primary">
                          
                          <svg className="svg svg-icon" viewBox="0 0 20 20">
                              <path d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z" style={{stroke: whCe;fill':white;'}}</path>
                          </svg>
                          <label>&nbsp;</label>
                      </div>
                  </div>

                  <label className="chart-label-label" for="${e.label}-${i}">${e.label}</label>
                  <span style={{background-color: $C.borde'rColor}'}}</span>
              </div>`
      })
      .join('')
  },
  plugins: {
    datalabels: {
      display: false,
    },
  },
  scales: {
    yAxes: [
      {
        ticks: {
          fontColor: '#505050',
          fontFamily: '"Inter", sans-serif',
          fontSize: 10,
          fontStyle: '400',
          beginAtZero: true,
          padding: 8.6,
          max: 5,
          min: 1,
          stepSize: 1,
        },
        gridLines: {
          color: '#f5f6f8',
          lineWidth: 1.5,
          display: true,
          drawTicks: false,
          drawOnChartArea: true,
          drawBorder: false,
        },
      },
    ],
    xAxes: [
      {
        ticks: {
          maxRotation: 0,
          fontColor: '#505050',
          fontFamily: '"Inter", sans-serif',
          fontSize: 10.5,
          fontStyle: '400',
          beginAtZero: false,
          padding: 10,
        },
        gridLines: {
          display: false,
          drawTicks: false,
          drawOnChartArea: false,
          drawBorder: false,
        },
      },
    ],
  },
}

let dat = {
  datasets: [
    {
      // showLine: false,
      label: 'Attitude',
      data: [null, 3, 3.4, 3.5, 3.4, 3.5, 4, 3, 3.4, 3.5, 3.4, 3.5, 4, null],
      fill: false,
      borderWidth: 1.5,
      borderColor: '#137ff6',
      pointRadius: 4.5,
      pointBackgroundColor: '#ffffff',
      pointBorderColor: '#137ff6',
      pointBorderWidth: 1.5,
    },
  ],
  labels: [
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
    'Dec',
    '',
  ],
}

interface Props {
  data: MyWidget
  updateWidgetSettings?(settings: any, widgetId: string): void
}

const months = [
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
  'Dec',
]

const colorPallete = ['#24c142', '#137ff6', '#f6c213', '#f66a1d', '#d99551']

const LineGraph = (props: Props) => {
  const { data, updateWidgetSettings } = props
  const [newData, setNewData] = useState<any>(null)
  const [selection, setSelection] = useState<'week' | 'month'>('month')
  const { t } = useTranslation('common')
  
  useEffect(() => {
    if (data?.settings?.time) {
      setSelection(data?.settings?.time)
    }
  }, [data])
  const noData =
    !data?.data?.length ||
    // @ts-ignore
    data?.data?.every(
      // @ts-ignore
      (f) =>
        (f.data[0] === (0 || null) && f.data.length === 1) || !f.data.length
    )

  useEffect(() => {
    if (data) {
      // infusedData()
      insertDataset()
    }
    if (updateWidgetSettings && data.widgetId) {
      updateWidgetSettings(
        {
          time: selection,
        },
        data.widgetId
      )
    }
  }, [data, selection])

  const insertDataset = () => {
    const fresh: {
      // showLine: false,
      label: string
      data: (number | null)[]
      fill: boolean
      borderWidth: number
      borderColor: string
      pointRadius: number
      pointBackgroundColor: string
      pointBorderColor: string
      pointBorderWidth: number
    }[] = []
    if (data.data && data.dataWeek) {
      ; (selection === 'month'
        ? (data.data as LineData[])
        : (data.dataWeek as LineData[])
      )?.forEach((item, i) =>
        fresh.push({
          // showLine: false,
          label: capitalize(item.questionId),
          data: [null, ...item.data, null],
          fill: false,
          borderWidth: 1.5,
          borderColor: data?.settings?.palette
            ? data?.settings?.palette[i]
            : colorPallete[i],
          pointRadius: 4.5,
          pointBackgroundColor: '#ffffff',
          pointBorderColor: data?.settings?.palette
            ? data?.settings?.palette[i]
            : colorPallete[i],
          pointBorderWidth: 1.5,
        })
      )
    }

    setNewData({
      labels:
        data.data && data.data[0]
          ? [
            '',
            ...(data.data[0] as LineData).labels?.map((item) => {
              if (selection === 'week') {
                return 'Wk ' + item.caption
              } else {
                return months[item.caption]
              }
            }),
            '',
          ]
          : [],
      datasets: fresh,
    })
  }

  // REUSABLE RESIZE OBSERVER

  var ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const crWidth = entry.borderBoxSize[0].inlineSize
      const crHeight = entry.borderBoxSize[0].blockSize

      const widgetHeader = Array.from(
        entry.target.children as HTMLCollectionOf<HTMLElement>
      )[0]
      const widgetBody = Array.from(
        entry.target.children as HTMLCollectionOf<HTMLElement>
      )[1]
      const lineChart = widgetBody.children[0]
      const lineChartTitle = document.querySelector(
        '.line-chart-title'
      ) as HTMLElement
      const lineChartCanvas = document.querySelector(
        '.line-chart-main'
      ) as HTMLElement
      const widgetLegend = Array.from(
        entry.target.children as HTMLCollectionOf<HTMLElement>
      )[2]

      const widgetLegendItems =
        widgetLegend?.children && widgetLegend?.children[1]
          ? widgetLegend.children[1].children
          : []

      const widgetHeaderBP = crHeight * 0.071
      let widgetLegendItemsWidth = 0

      //Update sizes
      widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`
      if (widgetHeader && widgetLegend) {
        widgetBody.style.maxHeight = `calc(100% - ${widgetHeader.clientHeight + widgetLegend.clientHeight
          }px)`
      }

      if (lineChartCanvas)
        lineChartCanvas.style.maxWidth = `calc(100% - ${lineChartTitle.clientWidth}px)`

          //Legend size check
          ;[...widgetLegendItems].forEach((e) => {
            widgetLegendItemsWidth += e.clientWidth + 38
          })
      if (widgetLegend) {
        if (widgetLegend.clientWidth * 2 - 100 <= widgetLegendItemsWidth) {
          widgetLegend.classList.add('small')
        } else {
          widgetLegend.classList.remove('small')
        }
      }

      if (crWidth <= 700.00001) {
        
        dat.datasets[0].data[dat.datasets[0].data.length - 2]
        dat.labels = [
          '',
          'Jan',
          '',
          'Mar',
          '',
          'May',
          '',
          'Jul',
          '',
          'Sep',
          '',
          'Nov',
          '',
          '',
        ]
      } else {
        
        dat.labels = [
          '',
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
          'Dec',
          '',
        ]
      }
      /*
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
          } else {
            if (entry.target.classList.contains('line-chart')) {
              chart01.data.labels = [
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
                "December"
              ]
            }
      
          }
          */
    }
  })

  // var roLegend = new ResizeObserver((entries) => {
  //   for (let entry of entries) {
  //     if (
  //       entry.target?.firstElementChild &&
  //       entry.target.clientWidth <
  //       entry.target.firstElementChild.clientWidth + 20
  //     ) {
  //       entry.target.classList.add('small')
  //     } else {
  //       entry.target.classList.remove('small')
  //     }
  //   }
  // })

  // const element = document.getElementById('line-chart-widget')
  // const legend = document.getElementById('chart-legend-widget')
  // useEffect(() => {
  //   if (element && legend) {
  //     ro.observe(element)
  //     roLegend.observe(legend)
  //   }
  // }, [element, legend])

  var roLegend = new ResizeObserver((entries) => {
    for (let entry of entries) {
      if (
        entry.target?.firstElementChild &&
        entry.target.clientWidth <
        entry.target.firstElementChild.clientWidth + 20
      ) {
        entry.target.classList.add('small')
      } else {
        entry.target.classList.remove('small')
      }
    }
  })

  const element = document.getElementById('widget-line-chart')
  //const legend = document.getElementById('chart-legend-widget')

  useEffect(() => {
    if (element && !noData) {
      ro.observe(element)
      //roLegend.observe(legend)
    }
  }, [element])
  /*
    const infusedData = () => {
      if (data) {
        const oldData = { ...newData }
        oldData.datasets[0].data = data.
        setNewData(oldData)
      }
    }
    */

  const [open, setOpen] = useState(false)
  const drowdownEl = useRef(null)
  useOnClickOutside(drowdownEl, () => setOpen(false))

  function handleToggle() {
    setOpen(!open)
  }
  return (
    <div className="widget widget-line-chart" id="widget-line-chart">
      <div
        className="widget-header"
        style={{ borderBottom: noData ? 'solid 1.5px#f5f6f8' : '' }}
      >
        <input
          type="text"
          value={data.chartTitle}
          className="widget-header-title"
          placeholder="Write Chart Title"
        ></input>
        <div className="widget-header-buttons">
          <div className={`exp-dropdown ${open && 'open'}`} ref={drowdownEl}>
            <button className="exp-dropdown-trigger" onClick={handleToggle}>
              <i className="icon-cog-outlined"></i>
            </button>

            <div className="exp-dropdown-menu">
              <div className={`exp-dropdown-menu-item ${selection === 'week' ? 'active' : ''
                }`}
                onClick={() => {
                  setSelection('week')
                }}
              >
                <p className="exp-dropdown-menu-item-text">In weeks</p>
                <i className="icon-check"></i>
              </div>
              <div className={`exp-dropdown-menu-item ${selection === 'month' ? 'active' : ''
                }`}
                onClick={() => {
                  setSelection('week')
                }}
              >
                <p className="exp-dropdown-menu-item-text">In months</p>
                <i className="icon-check"></i>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="widget-body">
        {noData ? (
          <div className="widget-placeholder">
            <div className="widget-placeholder-img">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="37.846"
                height="48"
                viewBox="0 0 37.846 48"
              >
                <g transform="translate(-700 -407)">
                  <rect
                    width="7.385"
                    height="48"
                    rx="3"
                    transform="translate(730.462 407)"
                    fill="#44bcec"
                  />
                  <rect
                    width="7.385"
                    height="29.538"
                    rx="3"
                    transform="translate(720.308 425.462)"
                    fill="#44bcec"
                  />
                  <rect
                    width="7.385"
                    height="21.231"
                    rx="3"
                    transform="translate(710.154 433.769)"
                    fill="#44bcec"
                  />
                  <rect
                    width="7.385"
                    height="25.846"
                    rx="3"
                    transform="translate(700 429.154)"
                    fill="#44bcec"
                  />
                </g>
              </svg>
            </div>
            <p className="widget-placeholder-title">
              {t('common:Thisquestionhasnodatayet')}
            </p>
            <p className="widget-placeholder-text">
              {t('common:Checkagainsoon')}
            </p>
          </div>
        ) : (
            <div className="line-chart">
              <p className="line-chart-title">Average review</p>
              <div className="line-chart-main">
                <Line data={newData} options={options} />
              </div>
            </div>
          )}
      </div>

      {!noData && (
        <div className="chart-legend">
          <div className="chart-legend-cover">
            <p className="chart-legend-cover-text">
              Click <button>here</button> or hover lines to see legend
            </p>
          </div>
          <div className="chart-legend-main">
            {(data.data as LineData[])?.map((item, i) => (
              <div className="chart-legend-main-item" key={item.questionId}>
                <div
                  className="chart-legend-main-item-color"
                  style={{
                    borderColor: data?.settings?.palette
                      ? data?.settings?.palette[i]
                      : colorPallete[i],
                  }}
                ></div>
                <p className="chart-legend-main-item-text">
                  {capitalize(item.questionId)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LineGraph
