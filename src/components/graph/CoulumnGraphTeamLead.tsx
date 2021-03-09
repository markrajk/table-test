import { ResizeObserver } from '@juggle/resize-observer'
import { Console } from 'console'
import React, { useEffect, useRef, useState } from 'react'
import { BarData, MyWidget } from 'src/apiTypes'
import { ratingColor } from 'src/utitlity'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'

interface Props {
  data?: MyWidget
}

const ColoumnGraph = (props: Props) => {
  const { data } = props
  const noData = !data?.data?.length

  const { t } = useTranslation('common')


  // REUSABLE RESIZE OBSERVER
  var ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const crWidth = entry.borderBoxSize[0].inlineSize
      const crHeight = entry.borderBoxSize[0].blockSize

      const widgetHeader = Array.from(
        entry.target.children as HTMLCollectionOf<HTMLElement>
      )[0]
      const widgetBody = entry.target.children[1]
      const columnChart = widgetBody.children[0]
      const columnChartTitle = columnChart.children[0]
      const columnChartArea = columnChart.children[1]
      const columnChartYAxis = Array.from(
        columnChart.children as HTMLCollectionOf<HTMLElement>
      )[2]
      const columnChartXAxis = columnChart.children[3]
      const columnChartYAxisItems = columnChartYAxis.children

      const widgetHeaderBP = crHeight * 0.071
      const columnChartYAxisPadding = crWidth * 0.013

      //Update sizes
      widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`
      columnChartYAxis.style.padding = `0 ${columnChartYAxisPadding}px`
        ;[...columnChartYAxisItems].forEach((e) => {
          Array.from(
            e.children as HTMLCollectionOf<HTMLElement>
          )[1].style.width = `${columnChartArea.clientWidth}px`
          Array.from(
            e.children as HTMLCollectionOf<HTMLElement>
          )[1].style.right = `-${columnChartYAxisPadding}px`
        })

      //Rotate text
      if (
        columnChartXAxis?.children[0] &&
        columnChartXAxis?.children[0].clientWidth <= 60
      ) {
        entry.target.classList.add('rotate-text')
      } else {
        entry.target.classList.remove('rotate-text')
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

  const columnChartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = columnChartRef.current

    if (element && !noData) {
      ro.observe(element)

      if (element.children && element.children[1]) {
        let columnChartBars = Array.from(
          element.children[1].children[0].children[1]
            .children as HTMLCollectionOf<HTMLElement>
        )
        if (
          element.children[1].children &&
          element.children[1].children[0] &&
          element.children[1].children[0].children &&
          element.children[1].children[0].children[3]
        ) {
          let columnChartXAxisItems = Array.from(
            element.children[1].children[0].children[3]
              .children as HTMLCollectionOf<HTMLElement>
          )
          let itemWidth = 100 / columnChartBars.length / 2

          columnChartBars.forEach((e) => {
            e.style.width = `${itemWidth}%`
            e.style.margin = `0 ${itemWidth / 2}%`
          })

          columnChartXAxisItems.forEach((e) => {
            e.style.width = `${itemWidth * 2}%`
            e.style.maxWidth = `calc(${itemWidth}% + 12em)`
            //e.style.margin = `0 ${itemWidth / 2}%`
          })
        }
      }
    }
  }, [columnChartRef])

  const [open, setOpen] = useState(false)
  const drowdownEl = useRef(null)
  useOnClickOutside(drowdownEl, () => setOpen(false))

  function handleToggle() {
    setOpen(!open)
  }

  return (
    <div
      className="widget widget-column-chart"
      ref={columnChartRef}
      // @ts-ignore
      style={{ paddingBottom: noData && '0' }}
    >
      <div
        className="widget-header"
        style={{ borderBottom: noData ? 'solid 1.5px#f5f6f8' : '' }}
      >
        <input
          type="text"
          value={
            data?.chartTitle +
            ' ' +
            data?.user.firstname +
            ' ' +
            data?.user.lastname
          }
          className="widget-header-title"
          placeholder="Write Chart Title"
        ></input>
        <div className="widget-header-buttons">
          <div className={`exp-dropdown ${open && 'open'}`} ref={drowdownEl} style={{ display: "none" }}>
            <button className="exp-dropdown-trigger" onClick={handleToggle}>
              <i className="icon-cog-outlined"></i>
            </button>

            <div className="exp-dropdown-menu">
              <div className="secondary-dropdown">
                <div className="exp-dropdown-menu-item secondary-dropdown-trigger">
                  <i className="icon-chevron-left"></i>
                  <p className="exp-dropdown-menu-item-text">Time period</p>
                  <i className="icon-check"></i>
                </div>

                {/* @ts-ignore */}
                <div
                  className="secondary-dropdown-menu"
                  onMouseEnter={(e) =>
                    e.currentTarget.parentElement?.classList.add('open')
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.parentElement?.classList.remove('open')
                  }
                >
                  <div className="secondary-dropdown-menu-item">
                    <p className="secondary-dropdown-menu-item-text">
                      In weeks
                    </p>
                    <i className="icon-check"></i>
                  </div>
                  <div className="secondary-dropdown-menu-item active">
                    <p className="secondary-dropdown-menu-item-text">
                      In months
                    </p>
                    <i className="icon-check"></i>
                  </div>
                </div>
              </div>

              <div className="secondary-dropdown">
                <div className="exp-dropdown-menu-item secondary-dropdown-trigger">
                  <i className="icon-chevron-left"></i>
                  <p className="exp-dropdown-menu-item-text">Questions</p>
                  <i className="icon-check"></i>
                </div>

                {/* @ts-ignore */}
                <div
                  className="secondary-dropdown-menu"
                  onMouseEnter={(e) =>
                    e.currentTarget.parentElement?.classList.add('open')
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.parentElement?.classList.remove('open')
                  }
                >
                  <div className="secondary-dropdown-menu-item active">
                    <p className="secondary-dropdown-menu-item-text">
                      Option I
                    </p>
                    <i className="icon-check"></i>
                  </div>
                  <div className="secondary-dropdown-menu-item">
                    <p className="secondary-dropdown-menu-item-text">
                      Option II
                    </p>
                    <i className="icon-check"></i>
                  </div>
                </div>
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
            <div className="column-chart">
              <div className="column-chart-title">
                <p className="column-chart-title-text">Average review</p>
              </div>

              <div className="column-chart-area">
                {(data?.data as BarData[])?.map((item) => {
                  const average =
                    ((item.average < 1.5 ? 1.5 : item.average) - 1) / 4
                  if (item.question) {
                    return (
                      <div
                        className="column-chart-area-item"
                        style={{
                          height: average * 100 + '%',
                          backgroundColor: ratingColor(item.average),
                        }}
                      >
                        <p className="column-chart-area-item-label"></p>
                      </div>
                    )
                  }
                })}
              </div>

              <div className="column-chart-y-axis">
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">5</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">4.5</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">4</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">3.5</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">3</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">2.5</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">2</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">1.5</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
                <div className="column-chart-y-axis-item">
                  <p className="column-chart-y-axis-item-label">1</p>
                  <span className="column-chart-y-axis-item-line"></span>
                </div>
              </div>

              <div className="column-chart-x-axis">
                {(data?.data as BarData[])?.map((item) => {
                  if (item.question) {
                    return (
                      <div className="column-chart-x-axis-item">
                        <p className="column-chart-x-axis-item-label">
                          {item.question}
                        </p>
                      </div>
                    )
                  }
                })}
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default ColoumnGraph
