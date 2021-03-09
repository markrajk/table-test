import React, { useState } from 'react'
import Header from 'src/components/header'
import HeaderTeamSubNav from 'src/components/header/subheaderfeedbackchart'

import LineGraphFancy from 'src/components/graph/LineGraphFancy'
import LineGraph from 'src/components/graph/LineGraphNew'
import BarGraph from 'src/components/graph/BarGraph'
import {
  WidthProvider,
  Responsive,
  ReactGridLayoutProps,
} from 'react-grid-layout'
import ColoumnGraph from 'src/components/graph/ColoumnGraph'
import ColoumnGraphV2 from 'src/components/graph/ColoumnGraphV2'
import ColoumnGraphV2Var1 from 'src/components/graph/ColoumnGraphV2Var1'
import ValueBox from 'src/components/graph/ValueBox'
import ComboChartWidget from 'src/components/graph/ComboChart'
import PieChart from 'src/components/graph/PieChart'
import AddWidget from 'src/components/modals/addWidget'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */
export default class ResponsiveLocalStorageLayout extends React.PureComponent {
  constructor(props: any) {
    super(props)
  }
  state = {
    layouts: {},
    zindex: [0, 1, 3, 4, 5, 6, 7],
  }
  static get defaultProps() {
    return {
      className: 'layout',
      cols: { xl: 12, lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 50,
    }
  }

  render() {
    return (
      <main
        className="main"
        id="widgets-new"
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        <Header>
          <HeaderTeamSubNav level1={'feedchart'} />
        </Header>

        <div className="content-wrapper">
          <div className="content">
            <ResponsiveReactGridLayout
              className="layout"
              breakpoints={{
                xl: 1880,
                lg: 1370,
                md: 900,
                sm: 768,
                xs: 480,
                xxs: 0,
              }}
              useCSSTransforms={false}
              cols={{ xl: 12, lg: 9, md: 6, sm: 3, xs: 3, xxs: 3 }}
              rowHeight={30}
              isBounded={true}
              layouts={this.state.layouts}
              resizeHandles={['e', 'se']}
              margin={[30, 30]}
              onLayoutChange={(layout, layouts) => {
                console.log(layout)

                layout.forEach((item) => {
                  const element = document.getElementById(item.i)
                  if (element) {
                    element.style.zIndex = String(100 - item.y)
                  }
                })

                this.setState({ layouts })
              }}
            >
              <div
                key="chart1"
                data-grid={{
                  w: 3,
                  h: 8,
                  x: 0,
                  y: 0,
                  minW: 2,
                  minH: 6,
                  maxH: 12,
                }}
                id="chart1"
              >
                <BarGraph />
              </div>
              <div
                key="chart2"
                id="chart2"
                data-grid={{
                  w: 3,
                  h: 8,
                  x: 3,
                  y: 0,
                  minW: 2,
                  minH: 6,
                  maxH: 12,
                }}
              >
                <ColoumnGraphV2Var1 />
              </div>
              <div
                key="chart3"
                id="chart3"
                data-grid={{
                  w: 3,
                  h: 8,
                  x: 6,
                  y: 0,
                  minW: 2,
                  minH: 6,
                  maxH: 12,
                }}
              ></div>
              <div
                key="chart4"
                id="chart4"
                data-grid={{
                  w: 3,
                  h: 8,
                  x: 9,
                  y: 8,
                  minW: 2,
                  minH: 6,
                  maxH: 12,
                }}
              >
                <ColoumnGraph />
              </div>
              <div
                key="chart5"
                id="chart5"
                data-grid={{
                  w: 3,
                  h: 8,
                  x: 0,
                  y: 8,
                  minW: 2,
                  minH: 6,
                  maxH: 12,
                }}
              >
                <ColoumnGraphV2 />
              </div>
              {/* <div
                key="chart6"
                id="chart6"
                data-grid={{
                  w: 3,
                  h: 8,
                  x: 3,
                  y: 8,
                  minW: 2,
                  minH: 6,
                  maxH: 12,
                }}
              >
                <ValueBox value="arrow-up" />
              </div> */}
              <div
                key="chart7"
                id="chart7"
                data-grid={{
                  w: 3,
                  h: 8,
                  x: 3,
                  y: 8,
                  minW: 2,
                  minH: 6,
                  maxH: 12,
                }}
              >
                <ComboChartWidget />
              </div>
              <div
                key="chart8"
                id="chart8"
                data-grid={{
                  w: 3,
                  h: 8,
                  x: 3,
                  y: 8,
                  minW: 2,
                  minH: 6,
                  maxH: 12,
                }}
              >
                <PieChart />
              </div>
            </ResponsiveReactGridLayout>
          </div>
        </div>
        <AddWidget />
      </main>
    )
  }
}
