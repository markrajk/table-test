import React, { useState } from 'react'
import Header from 'src/components/header'
import HeaderTeamSubNav from 'src/components/header/topSubNav'
import HeaderTeamFeedCharts from 'src/components/header/headerTeamFeedCharts'
import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import LineGraphFancy from 'src/components/graph/LineGraphFancy'
import LineGraph from 'src/components/graph/LineGraphNew'
import BarGraph from 'src/components/graph/BarGraph'
import { WidthProvider, Responsive } from 'react-grid-layout'
import AddWidget from 'src/components/modals/addWidget'

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const GeneralSettings = (props: Props) => {
  const [layouts, setLayouts] = useState<any>({})

  return (
    <main
      className="main"
      id="widgets-new"
      onClick={() =>
        document.getElementById('mainDrawer')?.classList.remove('open')
      }
    >
      <Header>
        <HeaderTeamSubNav level1={'feedchart'}>
          <HeaderTeamFeedCharts level2="overall" />
        </HeaderTeamSubNav>
      </Header>

      <div className="content-wrapper">
        <div className="content">
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{
              xl: 1800,
              lg: 1440,
              md: 996,
              sm: 768,
              xs: 480,
              xxs: 0,
            }}
            cols={{ xl: 12, lg: 9, md: 6, sm: 3, xs: 3, xxs: 3 }}
            rowHeight={30}
            layouts={layouts}
            isBounded={true}
            resizeHandles={['e']}
            margin={[30, 30]}
            onLayoutChange={(layout, layouts) => setLayouts(layouts)}
          >
            <div
              key="1"
              data-grid={{ w: 3, h: 8, x: 0, y: 0, minW: 2, minH: 8, maxH: 8 }}
            >
              <BarGraph />
            </div>
            <div
              key="2"
              data-grid={{ w: 3, h: 8, x: 3, y: 0, minW: 2, minH: 8, maxH: 8 }}
            >
              <LineGraph data={[400, 300, 500, 800, 900, 1000, 400]} />
            </div>
            <div
              key="3"
              data-grid={{ w: 3, h: 8, x: 6, y: 0, minW: 2, minH: 8, maxH: 8 }}
            ></div>
            <div
              key="4"
              data-grid={{ w: 3, h: 8, x: 9, y: 8, minW: 2, minH: 8, maxH: 8 }}
            >
              <BarGraph />
            </div>
            <div
              key="5"
              data-grid={{ w: 3, h: 8, x: 0, y: 8, minW: 2, minH: 8, maxH: 8 }}
            >
              <BarGraph />
            </div>
            <div
              key="6"
              data-grid={{ w: 3, h: 8, x: 3, y: 8, minW: 2, minH: 8, maxH: 8 }}
            >
              <BarGraph />
            </div>
          </ResponsiveReactGridLayout>
        </div>
      </div>
      <AddWidget />
    </main>
  )
}

export default connector(GeneralSettings)
