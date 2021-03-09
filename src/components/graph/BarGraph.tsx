import { ResizeObserver } from '@juggle/resize-observer'
import React, { useEffect, useRef, useState } from 'react'
import { MyWidget, BarData, User } from 'src/apiTypes'
import { ratingColor } from 'src/utitlity'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { useTranslation } from 'react-i18next'
import { AppDispatch } from 'src/configureStore'
import { selectUser } from 'src/redux/auth/actions'
import { connect, ConnectedProps } from 'react-redux'

interface Props {
  data?: MyWidget
}


const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectUser: (user: User | null) => dispatch(selectUser(user))
})


const connector = connect(null, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>



const BarGraph = (props: Props & PropsFromRedux) => {
  const { data , selectUser} = props
  const noData = !data?.data?.length && true

  const { t } = useTranslation('common')

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
      if (!noData) {
        const barChart = Array.from(
          widgetBody.children as HTMLCollectionOf<HTMLElement>
        )[0]
        const barChartArea = Array.from(
          barChart.children as HTMLCollectionOf<HTMLElement>
        )[0]
        const barChartAreaItems = Array.from(
          barChartArea.children as HTMLCollectionOf<HTMLElement>
        )
        const barChartXAxis = Array.from(
          barChart.children as HTMLCollectionOf<HTMLElement>
        )[2]
        const barChartXAxisItems = barChartXAxis
          ? Array.from(barChartXAxis.children as HTMLCollectionOf<HTMLElement>)
          : []

        const widgetHeaderBP = crHeight * 0.071
        const barChartAreaTP = crHeight * 0.045

        //Update sizes
        widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`
        widgetBody.style.maxHeight = `calc(100% - ${widgetHeader}px)`
          ; (entry.target as HTMLElement).style.paddingBottom = `${crHeight * 0.054
            }px`
        barChartArea.style.paddingTop = `${barChartAreaTP}px`
        document.documentElement.style.setProperty(
          '--bar-graph-top-padding',
          barChartAreaTP + 'px'
        )
          ;[...barChartXAxisItems].forEach((e) => {
            Array.from(
              e.children as HTMLCollectionOf<HTMLElement>
            )[1].style.height = `${barChartArea.clientHeight - barChartAreaTP}px`
          })

        //Height of bars
        let height = barChartArea.clientHeight - barChartAreaTP - 5
        let barHeight = height / (barChartAreaItems.length * 1.5)

          ;[...barChartAreaItems].forEach((e) => {
            if (e.classList.contains('bar-chart-area-item')) {
              e.style.height = `${barHeight}px`
              e.style.marginBottom = `${Math.min(
                barHeight / 2 <= 10 ? 10 : barHeight / 2,
                40
              )}px`
            }
          })
      }
    }
  })

  const refElement = useRef<HTMLDivElement>(null)

  const [open, setOpen] = useState(false)
  const drowdownEl = useRef(null)
  useOnClickOutside(drowdownEl, () => setOpen(false))

  function handleToggle() {
    setOpen(!open)
  }

  useEffect(() => {
    const element = refElement.current
    if (element && !noData) {
      ro.observe(element)
    }
  }, [refElement])

  return (
    // @ts-ignore
    <div
      className="widget widget-bar-chart"
      ref={refElement}
      style={{ paddingBottom: noData ? 0 : 0 }}
    >
      <div className="widget-header">
        {data?.chartTitle ? (
          <input
            type="text"
            value={data.chartTitle}
            className="widget-header-title"
            placeholder="Write Chart Title"
          />
        ) : (
            <input
              type="text"
              value={data?.question}
              className="widget-header-title"
              placeholder="Write Chart Title"
            ></input>
          )}

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
                    e.currentTarget?.parentElement?.classList.add('open')
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget?.parentElement?.classList.remove('open')
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


                <div
                  className="secondary-dropdown-menu"
                  onMouseEnter={(e) =>
                    e.currentTarget?.parentElement?.classList.add('open')
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
          <div className="widget-body">
            <div className="bar-chart">
              <div className="bar-chart-area">
                {(data?.data as BarData[])
                  ?.sort((a, b) => {
                    if (a.average > b.average) {
                      return -1
                    }
                    if (a.average < b.average) {
                      return 1
                    }

                    return 0
                  })
                  .map((item) => {
                    if (item.average) {
                      return (
                        <div
                          className="bar-chart-area-item"
                          onClick={() => {
                            selectUser(item.sender)
                        document.getElementById('modalCard')?.classList.add('open')
                          }}
                          style={{
                            backgroundColor: ratingColor(item.average),
                            width:
                              (((item.average < 1.5 ? 1.5 : item.average) - 1) /
                                4) *
                              100 +
                              '%',
                          }}
                        >
                          {!!item.average && (
                            <p className="bar-chart-area-item-label"                           onClick={() => {
                              selectUser(item.sender)
                          document.getElementById('modalCard')?.classList.add('open')
                            }}>
                              {item.sender?.firstname +
                                ' ' +
                                item.sender?.lastname}
                            </p>
                          )}
                          <span className="bar-chart-area-item-amount">
                            {(item.change > 0 ? '+' : '') + Math.round(item.change * 10) / 10 + '%'}
                          </span>
                        </div>
                      )
                    }
                  })}
              </div>

              <div className="bar-chart-area-back">
                <div className="bar-chart-area-back-line"></div>
                <div className="bar-chart-area-back-line"></div>
                <div className="bar-chart-area-back-line"></div>
                <div className="bar-chart-area-back-line"></div>
                <div className="bar-chart-area-back-line"></div>
              </div>

              <div className="bar-chart-x-axis">
                <div className="bar-chart-x-axis-item">
                  <p className="bar-chart-x-axis-item-label">1.0</p>
                  <div className="bar-chart-x-axis-item-line"></div>
                </div>
                <div className="bar-chart-x-axis-item">
                  <p className="bar-chart-x-axis-item-label">2.0</p>
                  <div className="bar-chart-x-axis-item-line"></div>
                </div>
                <div className="bar-chart-x-axis-item">
                  <p className="bar-chart-x-axis-item-label">3.0</p>
                  <div className="bar-chart-x-axis-item-line"></div>
                </div>
                <div className="bar-chart-x-axis-item">
                  <p className="bar-chart-x-axis-item-label">4.0</p>
                  <div className="bar-chart-x-axis-item-line"></div>
                </div>
                <div className="bar-chart-x-axis-item">
                  <p className="bar-chart-x-axis-item-label">5.0</p>
                  <div className="bar-chart-x-axis-item-line"></div>
                </div>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default connector(BarGraph)
