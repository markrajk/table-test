import { ResizeObserver } from '@juggle/resize-observer'
import React, { useEffect } from 'react'

const ComboChartWidget = () => {
  // REUSABLE RESIZE OBSERVER
  var ro = new ResizeObserver((entries) => {
    for (let entry of entries) {
      const crWidth = entry.borderBoxSize[0].inlineSize

      if (crWidth > 1200.00001) {
        entry.target.classList.add('s-12')
      } else if (entry.target.classList.contains('s-12')) {
        entry.target.classList.remove('s-12')
      }

      if (crWidth <= 1200 && crWidth > 1100.00001) {
        entry.target.classList.add('s-11')
      } else if (entry.target.classList.contains('s-11')) {
        entry.target.classList.remove('s-11')
      }

      if (crWidth <= 1100 && crWidth > 1000.00001) {
        entry.target.classList.add('s-10')
      } else if (entry.target.classList.contains('s-10')) {
        entry.target.classList.remove('s-10')
      }

      if (crWidth <= 1000 && crWidth > 900.00001) {
        entry.target.classList.add('s-9')
      } else if (entry.target.classList.contains('s-9')) {
        entry.target.classList.remove('s-9')
      }

      if (crWidth <= 900 && crWidth > 800.00001) {
        entry.target.classList.add('s-8')
      } else if (entry.target.classList.contains('s-8')) {
        entry.target.classList.remove('s-8')
      }

      if (crWidth <= 800 && crWidth > 700.00001) {
        entry.target.classList.add('s-7')
      } else if (entry.target.classList.contains('s-7')) {
        entry.target.classList.remove('s-7')
      }

      if (crWidth <= 700 && crWidth > 600.00001) {
        entry.target.classList.add('s-6')
      } else if (entry.target.classList.contains('s-6')) {
        entry.target.classList.remove('s-6')
      }

      if (crWidth <= 600 && crWidth > 500.00001) {
        entry.target.classList.add('s-5')
      } else if (entry.target.classList.contains('s-5')) {
        entry.target.classList.remove('s-5')
      }

      if (crWidth <= 500) {
        entry.target.classList.add('s-4')
      } else if (entry.target.classList.contains('s-4')) {
        entry.target.classList.remove('s-4')
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

  const element = document.getElementById('combo-chart-widget')
  const legend = document.getElementById('combo-chart-legend-widget')
  useEffect(() => {
    if (element && legend) {
      ro.observe(element)
      roLegend.observe(legend)
    }
  }, [element, legend])

  return (
    <div className="widget widget-combo-chart">
      <div className="widget-header">
        <p className="widget-header-title">
          Atmosphere in team and how work is organised
        </p>
        <p className="widget-header-text">
          Longterm development chart based on 64 reviews
        </p>
        <div className="widget-header-icons">
          <i className="icon-expand-outlined"></i>
          <i className="icon-cog-outlined"></i>
        </div>
      </div>

      <div className="widget-body">
        <div className="combo-chart" id="combo-chart-widget">
          <div className="combo-chart-area">
            <div className="combo-chart-area-graph">
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
              <div className="combo-chart-area-graph-set">
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '70%', backgroundColor: '#07487f' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '90%', backgroundColor: '#559a19' }}
                ></div>
                <div
                  className="combo-chart-area-graph-set-item"
                  style={{ height: '80%', backgroundColor: '#f7d131' }}
                ></div>
              </div>
            </div>
            <div className="combo-chart-area-back">
              <div className="combo-chart-area-back-h">
                <div className="combo-chart-area-back-h-line"></div>
                <div className="combo-chart-area-back-h-line"></div>
                <div className="combo-chart-area-back-h-line"></div>
                <div className="combo-chart-area-back-h-line"></div>
                <div className="combo-chart-area-back-h-line"></div>
              </div>
              <div className="combo-chart-area-back-v">
                <div className="combo-chart-area-back-v-line"></div>
                <div className="combo-chart-area-back-v-line"></div>
                <div className="combo-chart-area-back-v-line"></div>
                <div className="combo-chart-area-back-v-line"></div>
                <div className="combo-chart-area-back-v-line"></div>
              </div>
            </div>
          </div>
          <div className="combo-chart-v-axis">
            <div className="combo-chart-v-axis-item item-01">
              <p className="combo-chart-v-axis-item-label">
                Great <span>(5.0)</span>
              </p>
              <span className="combo-chart-v-axis-item-tick"></span>
            </div>
            <div className="combo-chart-v-axis-item item-02">
              <p className="combo-chart-v-axis-item-label">
                Good <span>(4.0)</span>
              </p>
              <span className="combo-chart-v-axis-item-tick"></span>
            </div>
            <div className="combo-chart-v-axis-item item-03">
              <p className="combo-chart-v-axis-item-label">
                Ok <span>(3.0)</span>
              </p>
              <span className="combo-chart-v-axis-item-tick"></span>
            </div>
            <div className="combo-chart-v-axis-item item-04">
              <p className="combo-chart-v-axis-item-label">
                Weak <span>(2.0)</span>
              </p>
              <span className="combo-chart-v-axis-item-tick"></span>
            </div>
            <div className="combo-chart-v-axis-item item-05">
              <p className="combo-chart-v-axis-item-label">
                Bad <span>(1.0)</span>
              </p>
              <span className="combo-chart-v-axis-item-tick"></span>
            </div>
          </div>

          <div className="combo-chart-h-axis">
            <div className="combo-chart-h-axis-item item-01">
              <p className="combo-chart-h-axis-item-label">January</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-02">
              <p className="combo-chart-h-axis-item-label">February</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-03">
              <p className="combo-chart-h-axis-item-label">March</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-04">
              <p className="combo-chart-h-axis-item-label">April</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-05">
              <p className="combo-chart-h-axis-item-label">May</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-06">
              <p className="combo-chart-h-axis-item-label">June</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-07">
              <p className="combo-chart-h-axis-item-label">July</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-08">
              <p className="combo-chart-h-axis-item-label">August</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-09">
              <p className="combo-chart-h-axis-item-label">September</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-10">
              <p className="combo-chart-h-axis-item-label">October</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-11">
              <p className="combo-chart-h-axis-item-label">November</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
            <div className="combo-chart-h-axis-item item-12">
              <p className="combo-chart-h-axis-item-label">December</p>
              <span className="combo-chart-h-axis-item-tick"></span>
            </div>
          </div>
        </div>

        <div className="chart-legend" id="combo-chart-legend-widget">
          <div className="chart-legend-content-big">
            <div className="chart-legend-item">
              <span
                className="chart-legend-item-color"
                style={{ backgroundColor: '#07487f' }}
              ></span>
              <span className="chart-legend-item-name">Attitude</span>
            </div>

            <div className="chart-legend-item">
              <span
                className="chart-legend-item-color"
                style={{ backgroundColor: '#559a19' }}
              ></span>
              <span className="chart-legend-item-name">Productivity</span>
            </div>

            <div className="chart-legend-item">
              <span
                className="chart-legend-item-color"
                style={{ backgroundColor: '#f7dd31' }}
              ></span>
              <span className="chart-legend-item-name">Teamworking</span>
            </div>
          </div>
          <p className="chart-legend-text">
            Click <button>here</button> or hower lines to see legend
          </p>
          <div className="chart-legend-content-small">
            <div className="chart-legend-item">
              <span
                className="chart-legend-item-color"
                style={{ backgroundColor: '#07487f' }}
              ></span>
              <span className="chart-legend-item-name">Attitude</span>
            </div>

            <div className="chart-legend-item">
              <span
                className="chart-legend-item-color"
                style={{ backgroundColor: '#559a19' }}
              ></span>
              <span className="chart-legend-item-name">Productivity</span>
            </div>

            <div className="chart-legend-item">
              <span
                className="chart-legend-item-color"
                style={{ backgroundColor: '#f7dd31' }}
              ></span>
              <span className="chart-legend-item-name">Teamworking</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ComboChartWidget
