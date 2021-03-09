import { ResizeObserver } from '@juggle/resize-observer'
import React, { useEffect } from 'react'

const ColoumnGraphV2 = () => {
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

  const element = document.getElementById('coloumn-graph-v2-widget')

  useEffect(() => {
    if (element) {
      ro.observe(element)
    }
  }, [element])

  return (
    <div className="widget widget-column-chart">
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
        <div className="column-chart cc-v02" id="coloumn-graph-v2-widget">
          <div className="column-chart-area">
            <div className="column-chart-area-graph">
              <div
                className="column-chart-area-graph-item"
                style={{ height: '80%', backgroundColor: '#ffb12d' }}
              >
                <div className="p column-chart-area-graph-item-text">18</div>
              </div>
              <div
                className="column-chart-area-graph-item"
                style={{ height: '72%', backgroundColor: '#64c930' }}
              >
                <div className="p column-chart-area-graph-item-text">18</div>
              </div>
              <div
                className="column-chart-area-graph-item"
                style={{ height: '65%', backgroundColor: '#64c930' }}
              >
                <div className="p column-chart-area-graph-item-text">18</div>
              </div>
              <div
                className="column-chart-area-graph-item"
                style={{ height: '50%', backgroundColor: '#ffb12d' }}
              >
                <div className="p column-chart-area-graph-item-text">18</div>
              </div>
              <div
                className="column-chart-area-graph-item"
                style={{ height: '60%', backgroundColor: '#64c930' }}
              >
                <div className="p column-chart-area-graph-item-text">18</div>
              </div>
              <div
                className="column-chart-area-graph-item"
                style={{ height: '45%', backgroundColor: '#64c930' }}
              >
                <div className="p column-chart-area-graph-item-text">18</div>
              </div>
              <div
                className="column-chart-area-graph-item"
                style={{ height: '60%', backgroundColor: '#ffb12d' }}
              >
                <div className="p column-chart-area-graph-item-text">18</div>
              </div>
              <div
                className="column-chart-area-graph-item"
                style={{ height: '45%', backgroundColor: '#64c930' }}
              >
                <div className="p column-chart-area-graph-item-text">18</div>
              </div>
            </div>
            <div className="column-chart-area-back">
              <div className="column-chart-area-back-h">
                <div className="column-chart-area-back-h-line"></div>
                <div className="column-chart-area-back-h-line"></div>
                <div className="column-chart-area-back-h-line"></div>
                <div className="column-chart-area-back-h-line"></div>
                <div className="column-chart-area-back-h-line"></div>
              </div>
              <div className="column-chart-area-back-v">
                <div className="column-chart-area-back-v-line"></div>
                <div className="column-chart-area-back-v-line"></div>
                <div className="column-chart-area-back-v-line"></div>
                <div className="column-chart-area-back-v-line"></div>
                <div className="column-chart-area-back-v-line"></div>
              </div>
            </div>
          </div>
          <div className="column-chart-v-axis">
            <div className="column-chart-v-axis-item item-01">
              <p className="column-chart-v-axis-item-label">
                Great <span>(5.0)</span>
              </p>
              <span className="column-chart-v-axis-item-tick"></span>
            </div>
            <div className="column-chart-v-axis-item item-02">
              <p className="column-chart-v-axis-item-label">
                Good <span>(4.0)</span>
              </p>
              <span className="column-chart-v-axis-item-tick"></span>
            </div>
            <div className="column-chart-v-axis-item item-03">
              <p className="column-chart-v-axis-item-label">
                Ok <span>(3.0)</span>
              </p>
              <span className="column-chart-v-axis-item-tick"></span>
            </div>
            <div className="column-chart-v-axis-item item-04">
              <p className="column-chart-v-axis-item-label">
                Weak <span>(2.0)</span>
              </p>
              <span className="column-chart-v-axis-item-tick"></span>
            </div>
            <div className="column-chart-v-axis-item item-05">
              <p className="column-chart-v-axis-item-label">
                Bad <span>(1.0)</span>
              </p>
              <span className="column-chart-v-axis-item-tick"></span>
            </div>
          </div>

          <div className="column-chart-h-axis">
            <div className="column-chart-h-axis-item item-01">
              <p className="column-chart-h-axis-item-label">Attitude</p>
              <span className="column-chart-h-axis-item-tick"></span>
            </div>
            <div className="column-chart-h-axis-item item-02">
              <p className="column-chart-h-axis-item-label">Productivity</p>
              <span className="column-chart-h-axis-item-tick"></span>
            </div>
            <div className="column-chart-h-axis-item item-03">
              <p className="column-chart-h-axis-item-label">Teamworking</p>
              <span className="column-chart-h-axis-item-tick"></span>
            </div>
            <div className="column-chart-h-axis-item item-04">
              <p className="column-chart-h-axis-item-label">
                How do people feel working in this team
              </p>
              <span className="column-chart-h-axis-item-tick"></span>
            </div>
            <div className="column-chart-h-axis-item item-05">
              <p className="column-chart-h-axis-item-label">
                How well work is organized
              </p>
              <span className="column-chart-h-axis-item-tick"></span>
            </div>
            <div className="column-chart-h-axis-item item-06">
              <p className="column-chart-h-axis-item-label">Team lead</p>
              <span className="column-chart-h-axis-item-tick"></span>
            </div>

            <div className="column-chart-h-axis-item item-07">
              <p className="column-chart-h-axis-item-label">
                Amount of given feedback
              </p>
              <span className="column-chart-h-axis-item-tick"></span>
            </div>

            <div className="column-chart-h-axis-item item-08">
              <p className="column-chart-h-axis-item-label">
                Team average score
              </p>
              <span className="column-chart-h-axis-item-tick"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ColoumnGraphV2
