import { ResizeObserver } from '@juggle/resize-observer'
import { useEffect, useState, useRef } from 'react'
import Chart from 'react-google-charts'
import useOnClickOutside from 'src/hooks/useOnClickOutside'

const PieChart = () => {
  // REUSABLE RESIZE OBSERVER
  let chartHeight = 0
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
      const widgetLegend = Array.from(
        entry.target.children as HTMLCollectionOf<HTMLElement>
      )[2]
      const widgetLegendItems = widgetLegend.children[1].children

      const widgetHeaderBP = crHeight * 0.071
      let widgetLegendItemsWidth = 0

      //Update sizes
      widgetHeader.style.paddingBottom = `${widgetHeaderBP}px`
      widgetBody.style.height = `calc(100% - ${widgetHeader.clientHeight + widgetLegend.clientHeight
        }px)`

        //Legend size check
        ;[...widgetLegendItems].forEach((e) => {
          widgetLegendItemsWidth += e.clientWidth + 38
        })

      if (widgetLegend.clientWidth * 2 - 28 <= widgetLegendItemsWidth) {
        widgetLegend.classList.add('small')
      } else {
        widgetLegend.classList.remove('small')
      }
    }
  })
  //const [key, setkey] = useState(false);
  const element = document.getElementById('widget-pie-chart')
  //const legend = document.getElementById('pie-chart-legend-widget')
  useEffect(() => {
    if (element) {
      //setkey(prevKey => !prevKey);
      ro.observe(element)
    }
  }, [element])

  const [open, setOpen] = useState(false)
  const drowdownEl = useRef(null)
  useOnClickOutside(drowdownEl, () => setOpen(false))

  function handleToggle() {
    setOpen(!open)
  }

  return (
    // <div className="widget widget-pie-chart">
    //   <div className="widget-header">
    //     <p className="widget-header-title">
    //       Atmosphere in team and how work is organised
    //     </p>
    //     <p className="widget-header-text">
    //       Longterm development chart based on 64 reviews
    //     </p>
    //     <div className="widget-header-icons">
    //       <i className="icon-expand-outlined"></i>
    //       <i className="icon-cog-outlined"></i>
    //     </div>
    //   </div>

    //   <div className="widget-body">
    //     <div className="pie-chart-wrapper">
    //       <div className="pie-chart" style={{ width: 'auto', height: '100%' }}>
    //         <div id="piechart02" style={{ width: 'auto', height: '100%' }}>
    //           <Chart
    //             width={400}
    //             height={300}
    //             chartType="PieChart"
    //             loader={<div>Loading Chart</div>}
    //             data={[
    //               [
    //                 { type: 'string', label: 'x' },
    //                 { type: 'string', label: 'values' },
    //                 { id: 'i0', type: 'number', role: 'interval' },
    //                 { id: 'i1', type: 'number', role: 'interval' },
    //                 { id: 'i2', type: 'number', role: 'interval' },
    //                 { id: 'i2', type: 'number', role: 'interval' },
    //                 { id: 'i2', type: 'number', role: 'interval' },
    //                 { id: 'i2', type: 'number', role: 'interval' },
    //               ],
    //               [1, 100, 90, 110, 85, 96, 104, 120],
    //               [2, 120, 95, 130, 90, 113, 124, 140],
    //               [3, 130, 105, 140, 100, 117, 133, 139],
    //               [4, 90, 85, 95, 85, 88, 92, 95],
    //               [5, 70, 74, 63, 67, 69, 70, 72],
    //               [6, 30, 39, 22, 21, 28, 34, 40],
    //               [7, 80, 77, 83, 70, 77, 85, 90],
    //               [8, 100, 90, 110, 85, 95, 102, 110],
    //             ]}
    //             options={{
    //               backgroundColor: 'transparent',
    //               legend: 'none',
    //               title: '',
    //               chartArea: {
    //                 height: '94%',
    //                 left: '0',
    //                 right: '0',
    //               },
    //               fontSize: '12.75',
    //             }}
    //           />
    //         </div>
    //       </div>
    //       <div className="chart-legend" id="pie-chart-legend-widget">
    //         <div className="chart-legend-content-big">
    //           <div className="chart-legend-item">
    //             <span
    //               className="chart-legend-item-color"
    //               style={{ backgroundColor: '#07487F' }}
    //             ></span>
    //             <span className="chart-legend-item-name">Attitude</span>
    //           </div>

    //           <div className="chart-legend-item">
    //             <span
    //               className="chart-legend-item-color"
    //               style={{ backgroundColor: '#559A19' }}
    //             ></span>
    //             <span className="chart-legend-item-name">Productivity</span>
    //           </div>

    //           <div className="chart-legend-item">
    //             <span
    //               className="chart-legend-item-color"
    //               style={{ backgroundColor: '#F7DD31' }}
    //             ></span>
    //             <span className="chart-legend-item-name">Teamworking</span>
    //           </div>

    //           <div className="chart-legend-item">
    //             <span
    //               className="chart-legend-item-color"
    //               style={{ backgroundColor: '#EA2725' }}
    //             ></span>
    //             <span className="chart-legend-item-name">Average</span>
    //           </div>
    //         </div>
    //         <p className="chart-legend-text">
    //           Click <button>here</button> or hower lines to see legend
    //         </p>
    //         <div className="chart-legend-content-small">
    //           <div className="chart-legend-item">
    //             <span
    //               className="chart-legend-item-color"
    //               style={{ backgroundColor: '#07487F' }}
    //             ></span>
    //             <span className="chart-legend-item-name">Attitude</span>
    //           </div>

    //           <div className="chart-legend-item">
    //             <span
    //               className="chart-legend-item-color"
    //               style={{ backgroundColor: '#559A19' }}
    //             ></span>
    //             <span className="chart-legend-item-name">Productivity</span>
    //           </div>

    //           <div className="chart-legend-item">
    //             <span
    //               className="chart-legend-item-color"
    //               style={{ backgroundColor: '#F7DD31' }}
    //             ></span>
    //             <span className="chart-legend-item-name">Teamworking</span>
    //           </div>

    //           <div className="chart-legend-item">
    //             <span
    //               className="chart-legend-item-color"
    //               style={{ backgroundColor: '#EA2725' }}
    //             ></span>
    //             <span className="chart-legend-item-name">Average</span>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="widget widget-pie-chart" id="widget-pie-chart">
      <div className="widget-header">
        <input
          type="text"
          value="Chart title"
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
        <div className="pie-chart">
          <div className="pie-chart-main" id="chart-02">
            <Chart
              width="100%"
              height="100%"
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={[
                [
                  { type: 'string', label: 'x' },
                  { type: 'string', label: 'values' },
                  { id: 'i0', type: 'number', role: 'interval' },
                  { id: 'i1', type: 'number', role: 'interval' },
                  { id: 'i2', type: 'number', role: 'interval' },
                  { id: 'i2', type: 'number', role: 'interval' },
                  { id: 'i2', type: 'number', role: 'interval' },
                  { id: 'i2', type: 'number', role: 'interval' },
                ],
                [1, 100, 90, 110, 85, 96, 104, 120],
                [2, 120, 95, 130, 90, 113, 124, 140],
                [3, 130, 105, 140, 100, 117, 133, 139],
                [4, 90, 85, 95, 85, 88, 92, 95],
                [5, 70, 74, 63, 67, 69, 70, 72],
                [6, 30, 39, 22, 21, 28, 34, 40],
                [7, 80, 77, 83, 70, 77, 85, 90],
                [8, 100, 90, 110, 85, 95, 102, 110],
              ]}
              options={{
                backgroundColor: 'transparent',
                legend: 'none',
                title: '',
                chartArea: {
                  height: '94%',
                  left: '0',
                  right: '0',
                },
                fontSize: '12.75',
                colors: [
                  '#12b2ed',
                  '#ffce00',
                  '#6bd833',
                  '#535ff0',
                  '#fc731d',
                  '#ff9300',
                  '#0080ff',
                  '#af52de',
                  '#c4d1cf',
                  '#27e066',
                ],
              }}
            />
          </div>
        </div>
      </div>

      <div className="chart-legend">
        <div className="chart-legend-cover">
          <p className="chart-legend-cover-text">
            Click <button>here</button> or hover lines to see legend
          </p>
        </div>
        <div className="chart-legend-main">
          <div className="chart-legend-main-item">
            <div
              className="chart-legend-main-item-color"
              style={{ borderColor: '#0089ff' }}
            ></div>
            <p className="chart-legend-main-item-text">Attitude</p>
          </div>
          <div className="chart-legend-main-item">
            <div
              className="chart-legend-main-item-color"
              style={{ borderColor: '#0089ff' }}
            ></div>
            <p className="chart-legend-main-item-text">
              Lorem ipsum dolor sit amet consectetur.
            </p>
          </div>
          <div className="chart-legend-main-item">
            <div
              className="chart-legend-main-item-color"
              style={{ borderColor: '#0089ff' }}
            ></div>
            <p className="chart-legend-main-item-text">Teamworking</p>
          </div>
          <div className="chart-legend-main-item">
            <div
              className="chart-legend-main-item-color"
              style={{ borderColor: '#0089ff' }}
            ></div>
            <p className="chart-legend-main-item-text">
              Lorem ipsum dolor sit.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PieChart
