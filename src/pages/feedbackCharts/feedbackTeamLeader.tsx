import React from 'react'
import LineGraphFancy from 'src/components/graph/LineGraphFancy'
import LineGraphFancyAutoScale from 'src/components/graph/LineGraphFancyAutoScale'
import { withRouter, RouteComponentProps } from 'react-router'
import BarGraph from 'src/components/graph/BarGraph'
import RGL, {
  WidthProvider
} from 'react-grid-layout'
import ColoumnGraphTeamLead from 'src/components/graph/CoulumnGraphTeamLead'
import AddWidget from 'src/components/modals/addWidget'
import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { getMyWidgets, removeLayout, switchChartType, updateWidgetSettings } from 'src/redux/feedback/actions'
import { widgetCoords } from 'src/utitlity'
import { updateUserSettings } from 'src/redux/auth/actions'
import PageLoader from 'src/components/loader/PageLoader'
import ReactTooltip from 'react-tooltip'
import { withTranslation } from 'react-i18next';

import _ from 'lodash'
import { Category } from 'src/apiTypes'

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMyWidgets: (teamId: string, category: Category) =>
    dispatch(getMyWidgets(teamId, category)),
  updateWidgetSettings: (settings: any, widgetId: string) =>
    dispatch(updateWidgetSettings(settings, widgetId)),
  removeLayout: (size: 'tablet' | 'desktop' | 'wide') =>
    dispatch(removeLayout(size, 'supervisor')),
  updateUserSettings: (settings: any, size: 'tablet' | 'desktop' | 'wide') =>
    dispatch(updateUserSettings(settings, size, 'teamLeaderLayout')),
  switchChartType: () => dispatch(switchChartType('graph'))
  //updateUserSettings: (settings: any) => dispatch(updateUserSettings(settings))
})

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myWidgets: state.feedbackReducer.myWidgets,
  selectedTeam: state.teamReducer.selectedTeam,
  windowWidth: state.authReducer.windowWidth,
  loading: state.feedbackReducer.loadingFeedbackData,
  layout: state.feedbackReducer.layout,
})
const connector = connect(mapStateToProps, mapDispatchToProps)

const ResponsiveReactGridLayout = WidthProvider(RGL)

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  history: RouteComponentProps
  getTeamId(teamId: string): void
  match: {
    params: {
      teamId?: string
    }
  }, t?: any
}

class ResponsiveLocalStorageLayout extends React.PureComponent<Props> {
  constructor(props: any) {
    super(props)

    this.onBreakpointChange = this.onBreakpointChange.bind(this)
    this.widgetSettingsTablet = this.widgetSettingsTablet.bind(this)
    this.widgetSettingsDesktop = this.widgetSettingsDesktop.bind(this)
    this.widgetSettingsWide = this.widgetSettingsWide.bind(this)
  }
  state = {
    layouts: {},
    zindex: [0, 1, 3, 4, 5, 6, 7],
    show: true
  }

  static get defaultProps() {
    return {
      className: 'layout',
      cols: { xl: 12, lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 50,
    }
  }

  onBreakpointChange(breakpoint: any, cols: any) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
    })
  }
  componentDidUpdate(prevProps: Props) {
    const { params } = this.props.match
    const { windowWidth } = this.props
    if (prevProps.match.params.teamId !== params.teamId) {
      const { getTeamId } = this.props
      if (params && params.teamId) {
        getTeamId(params.teamId)
      }
    }
    if (prevProps.windowWidth !== this.props.windowWidth) {
      if (
        (windowWidth > 1140 && prevProps.windowWidth < 1141) ||
        (windowWidth < 1141 && prevProps.windowWidth > 1140)
      )
        this.setState({
          show: false,
        })
      if (
        (windowWidth > 1640 && prevProps.windowWidth < 1641) ||
        (windowWidth < 1641 && prevProps.windowWidth > 1640)
      )
        this.setState({
          show: false,
        })
    }
    if (!this.state.show) {
      setTimeout(() => {
        this.setState({
          show: true,
        })
      }, 100)
    }
  }

  componentDidMount() {
    const { params } = this.props.match
    const { getTeamId } = this.props
    if (params && params.teamId) {
      getTeamId(params.teamId)
    }
    this.props.switchChartType()
  }

  widgetSettingsTablet(widget: any, index: any, array: any, cols?: any) {
    if (widget.widgetIdentifier === 'valueBox') {
      return {
        ...widgetCoords(index, array, cols, 6),
        w: 6,
        h: 5,
        minW: 1,
        minH: 3,
      }
    } else {
      return {
        ...widgetCoords(index, array, cols, 12),
        w: 12,
        h: 9,
        minW: 4,
        minH: 6,
      }
    }
  }

  widgetSettingsDesktop(widget: any, index: any, array: any, cols?: any) {
    if (widget.widgetIdentifier === 'valueBox') {
      return {
        ...widgetCoords(index, array, cols, 2),
        w: 2,
        h: 5,
        minW: 1,
        minH: 3,
      }
    } else {
      return {
        ...widgetCoords(index, array, cols, 6),
        w: 6,
        h: 9,
        minW: 4,
        minH: 6,
      }
    }
  }

  widgetSettingsWide(widget: any, index: any, array: any, cols?: any) {
    if (widget.widgetIdentifier === 'valueBox') {
      return {
        ...widgetCoords(index, array, cols, 2),
        w: 2,
        h: 5,
        minW: 1,
        minH: 3,
      }
    } else {
      return {
        ...widgetCoords(index, array, cols, 4),
        w: 4,
        h: 9,
        minW: 2,
        minH: 6,
      }
    }
  }
  delayedQuery = _.debounce((e) => {
    e()
  }, 1000)
  render() {
    const { myWidgets, windowWidth, layout, user, selectedTeam, updateUserSettings, loading } = this.props
  
    const resetLayout = () => {
      const { removeLayout, windowWidth } = this.props
      const size =
        windowWidth < 1141 ? 'tablet' : windowWidth < 1641 ? 'desktop' : 'wide'
      removeLayout(size)
      this.setState({
        show: false,
      })
    }


    return (
      <div
        className="content-wrapper"
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        <div className="content">
          <div className="widgets-top">
            <div className="option-buttons">
              <button className="button active">Charts</button>
              <button
                className="button"
                onClick={() => {
                  if (selectedTeam) {
                    //@ts-ignore
                    this.props.history.push(
                      '/team/' +
                      selectedTeam._id +
                      '/data/subordinateFeedbackText'
                    )
                  }
                }}
              >
                Text
              </button>
            </div>
            <div
              className="reset-layout"
              data-tip={`${this.props.t('common:Resetlayout')}`}
              data-for="resetLayout"
              onClick={resetLayout}
            >
              <i className="icon-backup-restore"></i>
            </div>
          </div>

          { myWidgets.supervisor.data && myWidgets.supervisor.data[0]  && myWidgets.supervisor.data[0].data && !myWidgets.supervisor.data[0].data.length ?
            (
              <div className="placeholder">
                <img src="/img/feedback-placeholder-img.png" alt="Clip art" className="placeholder-img"></img>
                <p className="placeholder-title">{this.props.t('common:subordinateFeedback')}</p>
                <p className="placeholder-text">{this.props.t('common:Nofeedbackgiveninthiscategoryyet')}.</p>
                <button className="button-green-primary button">{this.props.t('common:Checkagainsoon')}</button>
              </div>
            ) : this.state.show ? (
              windowWidth < 1141 ? (
                <ResponsiveReactGridLayout
                  className="layout"
                  useCSSTransforms={false}
                  rowHeight={30}
                  isBounded={true}
                  verticalCompact={false}
                  resizeHandles={['e', 'se']}
                  margin={[20, 20]}
                  onLayoutChange={(layout) => {
                    this.delayedQuery(() => updateUserSettings(layout, 'tablet'))
                  }}
                >
                  {myWidgets.supervisor.data?.map((widget, i, arr) => {
                    return (
                      <div
                        key={`${widget._id}${widget._id}${i}`}
                        data-grid={
                          myWidgets.supervisor.layout?.desktop && myWidgets.supervisor.layout.desktop[i]
                            ? myWidgets.supervisor.layout.desktop[i]
                            : this.widgetSettingsTablet(widget, i, arr)
  
                        }
                      >
                        {widget.widgetIdentifier === 'teamLeaderAverage' && (
                          <ColoumnGraphTeamLead data={widget} />
                        )}
  
                        {widget.widgetIdentifier === 'teamLeadSub' && (
                          <LineGraphFancy data={widget} />
                        )}
                      </div>
                    )
                  })}
                </ResponsiveReactGridLayout>
              ) : windowWidth < 1641 ? (
                <ResponsiveReactGridLayout
                  className="layout"
                  // breakpoints={{
                  //   xl: 1880,
                  //   lg: 1370,
                  //   md: 1100,
                  //   sm: 768,
                  //   xs: 480,
                  //   xxs: 0,
                  // }}
                  useCSSTransforms={false}
                  //cols={{ xl: 12, lg: 12, md: 12, sm: 4, xs: 4, xxs: 2 }}
                  rowHeight={30}
                  isBounded={true}
                  //compactType="horizontal"
                  verticalCompact={false}
                  //layout={windowWidth < 1001 ? layout?.small : layout?.large}
                  resizeHandles={['e', 'se']}
                  margin={[20, 20]}
                  onLayoutChange={(layout) => {
                    this.delayedQuery(() => updateUserSettings(layout, 'desktop'))
  
                    /* this.delayedQuery(() => updateUserSettings({
                      teamFeedbackLayout: layout
                    })) */
                  }}
                //onBreakpointChange={this.onBreakpointChange}
                >
                  {myWidgets.supervisor.data?.map((widget, i, arr) => {
                    let prevWidgetSize = 2
                    if (arr[i - 1]) {
                      prevWidgetSize = 2
                      if (arr[i - 1].widgetIdentifier === 'valueBox') {
                        prevWidgetSize = 2
                      } else {
                        prevWidgetSize = 6
                      }
                    }
  
                    return (
                      <div
                        key={`${widget._id}${widget._id}${i}`}
                        //@ts-ignore
                        data-grid={
                          myWidgets.supervisor.layout?.desktop && myWidgets.supervisor.layout?.desktop[i]
                            ? myWidgets.supervisor.layout?.desktop[i]
                            : //@ts-ignore
                            this.widgetSettingsDesktop(widget, i, arr)
                        }
                      >
                        {widget.widgetIdentifier === 'teamLeaderAverage' && (
                          <ColoumnGraphTeamLead data={widget} />
                        )}
  
                        {widget.widgetIdentifier === 'teamLeadSub' && (
                          <LineGraphFancy data={widget} />
                        )}
                      </div>
                    )
                  })}
                </ResponsiveReactGridLayout>
              ) : (
                    <ResponsiveReactGridLayout
                      className="layout"
                      useCSSTransforms={false}
                      rowHeight={30}
                      isBounded={true}
                      verticalCompact={false}
                      resizeHandles={['e', 'se']}
                      margin={[20, 20]}
                      onLayoutChange={(layout) => {
                        this.delayedQuery(() => updateUserSettings(layout, 'wide'))
                      }}
                    >
                      {myWidgets.supervisor.data?.map((widget, i, arr) => {
                        let prevWidgetSize = 2
                        if (arr[i - 1]) {
                          prevWidgetSize = 2
                          if (arr[i - 1].widgetIdentifier === 'valueBox') {
                            prevWidgetSize = 2
                          } else {
                            prevWidgetSize = 6
                          }
                        }
  
                        return (
                          <div
                            key={`${widget._id}${widget._id}${i}`}
                            data-grid={
                              myWidgets.supervisor.layout?.wide && myWidgets.supervisor.layout?.wide[i]
                                ? myWidgets.supervisor.layout?.wide[i]
                                : this.widgetSettingsWide(widget, i, arr)
                            }
                          >
                            {widget.widgetIdentifier === 'teamLeaderAverage' && (
                              <ColoumnGraphTeamLead data={widget} />
                            )}
  
                            {widget.widgetIdentifier === 'teamLeadSub' && (
                              <LineGraphFancy data={widget} />
                            )}
                          </div>
                        )
                      })}
                    </ResponsiveReactGridLayout>
                  )
            ) : null

          }

          {(loading) && (!myWidgets.supervisor.data) && <PageLoader />}
          {}
        </div>
        <AddWidget />
        <ReactTooltip
          id="resetLayout"
          effect="solid"
          place={'left'}
          delayShow={250}
          className="custom-tooltip"
        />
      </div>
    )
  }
}


export default withTranslation(["common"])(withRouter(
  //@ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps
    //@ts-ignore
  )(ResponsiveLocalStorageLayout)
))




/* {widget.widgetIdentifier === 'teamLeaderAverage' && (
  <ColoumnGraphTeamLead data={widget} />
)}

{widget.widgetIdentifier === 'teamLeadSub' && (
  <LineGraphFancy data={widget} />
)}
 */