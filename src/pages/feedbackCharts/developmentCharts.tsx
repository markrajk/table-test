import React from 'react'
import LineGraphFancy from 'src/components/graph/LineGraphFancy'
import { withRouter, RouteComponentProps } from 'react-router'
import BarGraph from 'src/components/graph/BarGraph'
import RGL, {
  WidthProvider
} from 'react-grid-layout'
import _ from 'lodash'
import ColoumnGraphMixData from 'src/components/graph/ColoumnGraphMixData'
import AddWidget from 'src/components/modals/addWidget'

import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { getMyWidgets, removeLayout, updateWidgetSettings } from 'src/redux/feedback/actions'
import { widgetCoords } from 'src/utitlity'
import { updateUserSettings } from 'src/redux/auth/actions'
import PageLoader from 'src/components/loader/PageLoader'
import { Category } from 'src/apiTypes'
import { withTranslation } from 'react-i18next';

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMyWidgets: (teamId: string, category: Category) =>
    dispatch(getMyWidgets(teamId, category)),
  updateWidgetSettings: (settings: any, widgetId: string) =>
    dispatch(updateWidgetSettings(settings, widgetId)),
  updateUserSettings: (settings: any, size: 'tablet' | 'desktop' | 'wide') =>
    dispatch(updateUserSettings(settings, size, 'userFeedbackLayout')),
  removeLayout: (size: 'tablet' | 'desktop' | 'wide') =>
    dispatch(removeLayout(size, 'userSentFeedback'))
})

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myWidgets: state.feedbackReducer.myWidgets,
  selectedTeam: state.teamReducer.selectedTeam,
  layout: state.feedbackReducer.layout,
  windowWidth: state.authReducer.windowWidth,
  loading: state.feedbackReducer.loadingFeedbackData,

})
const connector = connect(mapStateToProps, mapDispatchToProps)

const ResponsiveReactGridLayout = WidthProvider(RGL)

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  history: RouteComponentProps
  location: any
  t?: any
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

  widgetSettingsTablet(widget: any, index: any, array: any, cols?: any) {
    if (widget.widgetIdentifier === 'userOverview') {
      return {
        ...widgetCoords(index, array, cols, 12),
        w: 12,
        h: 9,
        minW: 4,
        minH: 6,
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
    if (widget.widgetIdentifier === 'userOverview') {
      return {
        ...widgetCoords(index, array, cols, 12),
        w: 12,
        h: 9,
        minW: 4,
        minH: 6,
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
    if (widget.widgetIdentifier === 'userOverview') {
      return {
        ...widgetCoords(index, array, cols, 12),
        w: 12,
        h: 9,
        minW: 4,
        minH: 6,
      }
    } else {
      return {
        ...widgetCoords(index, array, cols, 4),
        w: 4,
        h: 9,
        minW: 4,
        minH: 6,
      }
    }
  }

  delayedQuery = _.debounce((e) => {
    e()
  }, 1000)

  componentDidUpdate(prevProps: Props) {
    const { windowWidth } = this.props

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

  render() {
    const { myWidgets, updateWidgetSettings, user, layout, removeLayout, updateUserSettings, windowWidth, loading } = this.props

    const resetLayout = () => {
      const { removeLayout, windowWidth } = this.props
      const size = windowWidth < 1141 ? 'tablet' : windowWidth < 1641 ? 'desktop' : 'wide'
      removeLayout(size)
      this.setState({
        show: false
      })
    }


    return (
      <div
        className="content-wrapper"
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        {(loading) && (!myWidgets.userSentFeedback.data) && <PageLoader />}
        <div className="content">
          <div className="widgets-top">
            <div className="reset-layout" data-tip={`${this.props.t('common:Resetlayout')}`}
              data-for="resetLayout" onClick={resetLayout}>
              <i className="icon-backup-restore"></i>
            </div>
          </div>
          {this.state.show ? (
            windowWidth < 1141 ? (
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
                  this.delayedQuery(() => updateUserSettings(layout, 'tablet'))

                  /* this.delayedQuery(() => updateUserSettings({
                    teamFeedbackLayout: layout
                  })) */
                }}
              //onBreakpointChange={this.onBreakpointChange}
              >
                {myWidgets.userSentFeedback.data?.sort(wid => {
                  if (wid.widgetIdentifier === 'userOverview') {
                    return -1
                  }
                  return 1

                }).map((widget, i, arr) => {
                  return (
                    <div
                      key={`${widget._id}${widget._id}${i}`}
                      //@ts-ignore

                      data-grid={
                        myWidgets.userSentFeedback.layout?.tablet && myWidgets.userSentFeedback.layout.tablet[i]
                          ? myWidgets.userSentFeedback.layout.tablet[i]
                          : //@ts-ignore
                          this.widgetSettingsTablet(widget, i, arr)
                      }
                    >
                      {widget.widgetIdentifier === 'userSentFeedback' && (
                        <LineGraphFancy
                          data={widget}
                          updateWidgetSettings={(settings, widgetId) =>
                            updateWidgetSettings(settings, widgetId)
                          }
                        />
                      )}
                      {widget.widgetIdentifier === 'userFeedbackData' && (
                        <LineGraphFancy
                          data={widget}
                          updateWidgetSettings={(settings, widgetId) =>
                            updateWidgetSettings(settings, widgetId)
                          }
                        />
                      )}
                      {widget.widgetIdentifier === 'userOverview' && (
                        <ColoumnGraphMixData data={widget} />
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
                {myWidgets.userSentFeedback.data?.sort(wid => {
                  if (wid.widgetIdentifier === 'userOverview') {
                    return -1
                  }
                  return 1

                }).map((widget, i, arr) => {
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
                        myWidgets.userSentFeedback.layout?.desktop && myWidgets.userSentFeedback.layout.desktop[i]
                          ? myWidgets.userSentFeedback.layout.desktop[i]
                          : //@ts-ignore
                          this.widgetSettingsDesktop(widget, i, arr)
                      }
                    >
                      {widget.widgetIdentifier === 'userSentFeedback' && (
                        <LineGraphFancy
                          data={widget}
                          updateWidgetSettings={(settings, widgetId) =>
                            updateWidgetSettings(settings, widgetId)
                          }
                        />
                      )}
                      {widget.widgetIdentifier === 'userFeedbackData' && (
                        <LineGraphFancy
                          data={widget}
                          updateWidgetSettings={(settings, widgetId) =>
                            updateWidgetSettings(settings, widgetId)
                          }
                        />
                      )}
                      {widget.widgetIdentifier === 'userOverview' && (
                        <ColoumnGraphMixData data={widget} />
                      )}
                    </div>
                  )
                })}
              </ResponsiveReactGridLayout>
            ) : (
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
                      this.delayedQuery(() => updateUserSettings(layout, 'wide'))

                      /* this.delayedQuery(() => updateUserSettings({
                          teamFeedbackLayout: layout
                        })) */
                    }}
                  //onBreakpointChange={this.onBreakpointChange}
                  >
                    {myWidgets.userSentFeedback.data?.sort(wid => {
                      if (wid.widgetIdentifier === 'userOverview') {
                        return -1
                      }
                      return 1

                    }).map((widget, i, arr) => {
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
                            myWidgets.userSentFeedback.layout?.wide && myWidgets.userSentFeedback.layout.wide[i]
                              ? myWidgets.userSentFeedback.layout.wide[i]
                              : //@ts-ignore
                              this.widgetSettingsDesktop(widget, i, arr)
                          }
                        >
                          {widget.widgetIdentifier === 'userSentFeedback' && (
                            <LineGraphFancy
                              data={widget}
                              updateWidgetSettings={(settings, widgetId) =>
                                updateWidgetSettings(settings, widgetId)
                              }
                            />
                          )}
                          {widget.widgetIdentifier === 'userFeedbackData' && (
                            <LineGraphFancy
                              data={widget}
                              updateWidgetSettings={(settings, widgetId) =>
                                updateWidgetSettings(settings, widgetId)
                              }
                            />
                          )}
                          {widget.widgetIdentifier === 'userOverview' && (
                            <ColoumnGraphMixData data={widget} />
                          )}
                        </div>
                      )
                    })}
                  </ResponsiveReactGridLayout>
                )
          ) : null}
        </div>
        <AddWidget />
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

