import React, { useEffect, useRef, useState } from 'react'
import { ResizeObserver } from '@juggle/resize-observer'
import { ComboChartData, MyWidget } from 'src/apiTypes'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'

interface Props {
  data?: MyWidget
}

const colors = ['#07487f', '#559a19', '#f7d131']
const ComboChartV2 = (props: Props) => {
  const { t } = useTranslation(['common'])

  var ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const crWidth = entry.borderBoxSize[0].inlineSize
      const crHeight = entry.borderBoxSize[0].blockSize

      const widgetHeader = entry.target.children[0]
      const widgetBody = entry.target.children[1]
      const comboChart = widgetBody.children[0]
      const comboChartTitle = comboChart.children[0]
      const comboChartArea = comboChart.children[1]
      const comboChartYAxis = comboChart.children[2]
      const comboChartXAxis = comboChart.children[3]
      const comboChartYAxisItems = comboChartYAxis.children
      const widgetLegend = entry.target.children[2]
      const widgetLegendItems = widgetLegend.children[1].children

      const widgetHeaderBP = crHeight * 0.071
      const comboChartYAxisPadding = crWidth * 0.013
      let widgetLegendItemsWidth = 0

      //Update sizes
      // @ts-ignore
      widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`
      // @ts-ignore
      widgetBody.style.height = `calc(100% - ${
        widgetHeader.clientHeight + widgetLegend.clientHeight
      }px)`

      // @ts-ignore
      comboChartYAxis.style.padding = `0 ${comboChartYAxisPadding}px`
      ;[...comboChartYAxisItems].forEach((e) => {
        // @ts-ignore
        e.children[1].style.width = `${comboChartArea.clientWidth}px`
        // @ts-ignore
        e.children[1].style.right = `-${comboChartYAxisPadding}px`
      })

      //Rotate text
      if (
        comboChartXAxis?.children &&
        comboChartXAxis?.children[0] &&
        comboChartXAxis.children[0].clientWidth <= 30
      ) {
        entry.target.classList.add('rotate-text')
      } else {
        entry.target.classList.remove('rotate-text')
      }

      //Legend size check
      ;[...widgetLegendItems].forEach((e) => {
        widgetLegendItemsWidth += e.clientWidth + 38
      })

      if (widgetLegend.clientWidth * 2 - 100 <= widgetLegendItemsWidth) {
        
        widgetLegend.classList.add('small')
      } else {
        widgetLegend.classList.remove('small')
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
  })

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

  const comboChartRef = useRef<HTMLDivElement>(null)
  const legendRef = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const drowdownEl = useRef(null)
  useOnClickOutside(drowdownEl, () => setOpen(false))

  function handleToggle() {
    setOpen(!open)
  }

  useEffect(() => {
    const element = comboChartRef.current
    const legend = legendRef.current
    if (element && legend) {
      ro.observe(element)
      roLegend.observe(legend)

      let comboChartArea = element.querySelector('.combo-chart-area')
      let comboChartBars = element.querySelectorAll('.combo-chart-area-set')
      let comboChartXAxisItems = element.querySelectorAll(
        '.combo-chart-x-axis-item'
      )
      let numOfItems = comboChartBars.length

      if (numOfItems > 8) {
        numOfItems = 8
      }

      let itemWidth = 100 / (numOfItems + ((numOfItems - 2) * 0.73 + 2 * 1.1))
      

      comboChartBars.forEach((e, i, arr) => {
        // @ts-ignore
        e.style.width = `${itemWidth}%`
        // @ts-ignore
        e.style.margin = `0 ${itemWidth * 0.367}%`

        if (i === 0) {
          // @ts-ignore
          e.style.marginLeft = `${itemWidth * 0.55}%`
        }

        if (i === arr.length - 1) {
          // @ts-ignore
          e.style.marginRight = `${itemWidth * 0.55}%`
        }
      })

      comboChartXAxisItems.forEach((e, i, arr) => {
        // @ts-ignore
        e.style.width = `${itemWidth}%`
        // @ts-ignore
        e.style.margin = `0 ${itemWidth * 0.367}%`

        if (i === 0) {
          // @ts-ignore
          e.style.marginLeft = `${itemWidth * 0.55}%`
        }

        if (i === arr.length - 1) {
          // @ts-ignore
          e.style.marginRight = `${itemWidth * 0.55}%`
        }
      })
    }
  }, [comboChartRef])

  const { data } = props
  const noData = !data?.data?.length

  return (
    <div className="widget widget-combo-chart" ref={comboChartRef}>
      <div className="widget-header">
        <input
          type="text"
          defaultValue={data?.chartTitle}
          className="widget-header-title"
          placeholder="Write Chart Title"
        />
        <div className="widget-header-buttons">
          <div className="exp-dropdown right">
            <button className="exp-dropdown-trigger">
              <i className="icon-cog-outlined"></i>
            </button>

            <div className="exp-dropdown-menu">
              <div className="secondary-dropdown">
                <div className="exp-dropdown-menu-item secondary-dropdown-trigger">
                  <i className="icon-chevron-left"></i>
                  <p className="exp-dropdown-menu-item-text">Lorem, ipsum.</p>
                  <i className="icon-check"></i>
                </div>

                <div className="secondary-dropdown-menu">
                  <div className="secondary-dropdown-menu-item active">
                    <p className="secondary-dropdown-menu-item-text">
                      Lorem, ipsum.
                    </p>
                    <i className="icon-check"></i>
                  </div>
                  <div className="secondary-dropdown-menu-item">
                    <p className="secondary-dropdown-menu-item-text">Lorem.</p>
                    <i className="icon-check"></i>
                  </div>
                </div>
              </div>
              <div className="exp-dropdown-menu-item active">
                <p className="exp-dropdown-menu-item-text">Lorem.</p>
                <i className="icon-check"></i>
              </div>
              <div className="exp-dropdown-menu-item">
                <p className="exp-dropdown-menu-item-text">
                  Lorem, ipsum dolor.
                </p>
                <i className="icon-check"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="widget-body">
        {!data?.data || (data?.data && !data.data.length) ? (
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
          <div className="combo-chart">
            <div className="combo-chart-title">
              <p className="combo-chart-title-text">Average review</p>
            </div>

            <div className="combo-chart-area">
              {(data?.data as ComboChartData[])?.map((item) => (
                <div className="combo-chart-area-set">
                  {item.data.map((chart, i) => (
                    <div
                      className="combo-chart-area-set-item"
                      style={{
                        height: ((chart.average - 1) / 4) * 100 + '%',
                        backgroundColor: colors[i],
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>

            <div className="combo-chart-y-axis">
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">5</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">4.5</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">4</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">3.5</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">3</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">2.5</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">2</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">1.5</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
              <div className="combo-chart-y-axis-item">
                <p className="combo-chart-y-axis-item-label">1</p>
                <span className="combo-chart-y-axis-item-line"></span>
              </div>
            </div>

            <div className="combo-chart-x-axis">
              {(data?.data as ComboChartData[])?.map((chart) => (
                <div className="combo-chart-x-axis-item">
                  <p className="combo-chart-x-axis-item-label">
                    {chart.user.firstname + ' ' + chart.user.lastname}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="chart-legend" ref={legendRef}>
        <div className="chart-legend-cover">
          <p className="chart-legend-cover-text">
            Click <button>here</button> or hover lines to see legend
          </p>
        </div>
        <div className="chart-legend-main">
          {(data?.data as ComboChartData[]) &&
            (data?.data as ComboChartData[])[0] &&
            (data?.data as ComboChartData[])[0].data?.map((chart, i) => (
              <div className="chart-legend-main-item">
                <div
                  className="chart-legend-main-item-color"
                  style={{ borderColor: colors[i] }}
                ></div>
                <p className="chart-legend-main-item-text">{chart.question}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default ComboChartV2
