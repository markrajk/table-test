import React from 'react';
import LineGraphFancy from 'src/components/graph/LineGraphFancy';
import { withRouter, RouteComponentProps, useHistory } from "react-router";
import BarGraph from 'src/components/graph/BarGraph';
import RGL, {
  WidthProvider
} from 'react-grid-layout';


import ColoumnGraph from 'src/components/graph/ColoumnGraph';

import ValueBox from 'src/components/graph/ValueBox';

import WidgetPlacementModal from 'src/components/modals/widgetPlacement'

import AddWidget from 'src/components/modals/addWidget';

import { AppDispatch, RootState } from 'src/configureStore';
import { connect, ConnectedProps } from 'react-redux';
import { getAllMyWidgets, getMyWidgets, removeLayout, switchChartType, updateWidgetSettings } from 'src/redux/feedback/actions';
// import { widgetSettings } from 'src/utitlity'
// import { widgetSettings2 } from 'src/utitlity'
import { widgetCoords } from 'src/utitlity'

import _ from 'lodash'
import { setWindowWidth, updateUserSettings } from 'src/redux/auth/actions';

import ReactTooltip from 'react-tooltip'

import Loading from 'src/components/loader/PageLoader'
import { resetNewQuestionAdded } from 'src/redux/teams/actions';
import { Category } from 'src/apiTypes';
import { withTranslation } from 'react-i18next'


const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMyWidgets: (teamId: string, category: Category) => dispatch(getMyWidgets(teamId, category)),
  updateWidgetSettings: (settings: any, widgetId: string) => dispatch(updateWidgetSettings(settings, widgetId)),
  updateUserSettings: (settings: any, size: 'tablet' | 'desktop' | 'wide') => dispatch(updateUserSettings(settings, size, 'teamFeedbackLayout')),
  removeLayout: (size: 'tablet' | 'desktop' | 'wide') => dispatch(removeLayout(size, 'team')),
  resetNewQuestion: () => dispatch(resetNewQuestionAdded()),
  updateUserLayout: (single: any) => dispatch(updateUserSettings(undefined, undefined, undefined, single)),
  switchChartType: () => dispatch(switchChartType('graph')),
  getAllMyWidgets: () => dispatch(getAllMyWidgets())
})

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myWidgets: state.feedbackReducer.myWidgets,
  selectedTeam: state.teamReducer.selectedTeam,
  layout: state.feedbackReducer.layout,
  windowWidth: state.authReducer.windowWidth,
  loading: state.feedbackReducer.loadingFeedbackData,
  newQuestionAdded: state.teamReducer.newQuestionAdded
});
const connector = connect(mapStateToProps, mapDispatchToProps);

const ResponsiveReactGridLayout = WidthProvider(RGL);

/**
 * This layout demonstrates how to sync multiple responsive layouts to localstorage.
 */

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = PropsFromRedux & {
  getTeamId(teamId: string): void
  history: RouteComponentProps
  match: {
    params: {
      teamId?: string
    }
  }
  t?: any
};

class ResponsiveLocalStorageLayout extends React.PureComponent<Props> {
  constructor(props: any) {
    super(props);

    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.changeLayout = this.changeLayout.bind(this)
    this.widgetSettingsDesktop = this.widgetSettingsDesktop.bind(this)
    this.widgetSettingsTablet = this.widgetSettingsTablet.bind(this)
  }
  state: any = {
    small: true,
  };

  static get defaultProps() {
    return {
      className: 'layout',
      //cols: { xl: 12, lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
      rowHeight: 50,
    };
  }




  onBreakpointChange(breakpoint: any, cols: any) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols,
      show: true
    });
  }

  componentDidUpdate(prevProps: Props) {

    const { params } = this.props.match
    const { windowWidth, resetNewQuestion } = this.props
    if (prevProps.match.params.teamId !== params.teamId) {
      const { getTeamId } = this.props


      if (params && params.teamId) {
        getTeamId(params.teamId)
      }

    }

    if (prevProps.windowWidth !== this.props.windowWidth) {
      if ((windowWidth > 1140 && prevProps.windowWidth < 1141) || (windowWidth < 1141 && prevProps.windowWidth > 1140))
        this.setState({
          show: false
        })
      if ((windowWidth > 1640 && prevProps.windowWidth < 1641) || (windowWidth < 1641 && prevProps.windowWidth > 1640))
        this.setState({
          show: false
        })
    }

    if (!this.state.show) {
      setTimeout(() => {
        this.setState({
          show: true
        })
      }, 100)
    }

    if (this.props.newQuestionAdded) {
      setTimeout(() => {
        document.getElementById('widgetPlacementModal')?.classList.add('open')
        // resetNewQuestion()
      }, 500)

    }

  }




  componentDidMount() {

    const { params } = this.props.match

    const { getTeamId } = this.props
    if (params && params.teamId) {
      getTeamId(params.teamId)
    }


    //@ts-ignore
    if (window.innerWidth >= 1440) {
      this.setState({ small: false })
    } else {
      this.setState({ small: true })
    }
    this.props.switchChartType()
  }

  changeLayout(bool: boolean) {


    if (bool) {
      //@ts-ignore
      this.setState({ small: true })
    } else {
      //@ts-ignore
      this.setState({ small: false })
    }
  }


  delayedQuery = _.debounce(e => {
    e()
  }, 1000);


  widgetSettingsTablet(widget: any, index: any, array: any, cols: any) {
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
        ...widgetCoords(index, array, cols, 12, true),
        w: 12,
        h: 9,
        minW: 4,
        minH: 6,
      }
    }
  }

  widgetSettingsDesktop(widget: any, index: any, array: any, cols: any) {
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
        ...widgetCoords(index, array, cols, 6, true),
        w: 6,
        h: 9,
        minW: 4,
        minH: 6,
      }
    }
  }

  widgetSettingsWide(widget: any, index: any, array: any, cols: any) {
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
        ...widgetCoords(index, array, cols, 4, true),
        w: 4,
        h: 9,
        minW: 2,
        minH: 6,
      }
    }
  }






  render() {

    const { params } = this.props.match
    const { myWidgets, updateWidgetSettings, updateUserSettings, user, selectedTeam, layout, windowWidth, loading, updateUserLayout, newQuestionAdded, resetNewQuestion } = this.props;

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
        style={{
          position: 'relative'
        }}
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        <div className="content">
          {/* <PageLoader /> */}
          <div className="widgets-top">
            <div className="option-buttons">
              <button className="button active" >{this.props
                .t('common:Charts')}</button>
              <button className="button" onClick={() => {
                if (selectedTeam) {
                  //@ts-ignore
                  this.props.history.push('/team/' + selectedTeam._id + '/data/teamFeedbackText')
                }
              }} >{this.props.t('common:Text')} </button>
            </div>

            <div className="reset-layout" data-tip={`${this.props.t('common:Resetlayout')}`}
              data-for="resetLayout" onClick={resetLayout}>
              <i className="icon-backup-restore"></i>
            </div>
          </div>

          {myWidgets.team.data && myWidgets.team.data[0] && !myWidgets.team.data[0].average ?
            (
              <div className="placeholder">
                <img src="/img/feedback-placeholder-img.png" alt="Clip art" className="placeholder-img"></img>
                <p className="placeholder-title">{this.props.t('common:teamFeedbacks')}</p>
                <p className="placeholder-text">{this.props.t('common:Nofeedbackgiveninthiscategoryyet')}.</p>
                <button className="button-green-primary button">{this.props.t('common:Checkagainsoon')}</button>
              </div>
            ) :
            this.state.show ?
              windowWidth < 1141 ?
  
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
  
                  {myWidgets.team.data?.map((widget, i, arr) => {
  
  
                    return <div
                      key={`${widget._id}${widget._id}${i}${this.state.small && 'small'}`}
                      //@ts-ignore
  
                      data-grid={myWidgets.team.layout?.tablet && myWidgets.team.layout?.tablet[i]
                        ? myWidgets.team.layout?.tablet[i]
  
                        //@ts-ignore
                        : this.widgetSettingsTablet(widget, i, arr)}
                    >
                      {<p>{this.state.small}</p>}
                      {widget.widgetIdentifier === 'valueBox' && <ValueBox addNew={false} data={widget} />}
                      {/* @ts-ignore */}
                      {widget.widgetIdentifier === 'lineChartMonthTeam' && <LineGraphFancy data={widget} updateWidgetSettings={(settings, widgetId) => updateWidgetSettings(settings, widgetId)} />}
                      {widget.widgetIdentifier === 'teamMood' && <BarGraph data={widget} />}
                      {widget.widgetIdentifier === 'userTeamScore' && <ColoumnGraph data={widget} />}
                    </div>
                  })}
  
                </ResponsiveReactGridLayout>
                : windowWidth < 1641 ? <ResponsiveReactGridLayout
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
  
                  {myWidgets.team.data?.map((widget, i, arr) => {
                    let prevWidgetSize = 2;
                    if (arr[i - 1]) {
                      prevWidgetSize = 2;
                      if (arr[i - 1].widgetIdentifier === "valueBox") {
                        prevWidgetSize = 2;
                      } else {
                        prevWidgetSize = 6;
                      }
                    }
  
  
                    return <div
                      key={`${widget._id}${widget._id}${i}${this.state.small && 'small'}`}
                      //@ts-ignore
                      data-grid={myWidgets.team.layout?.desktop && myWidgets.team.layout?.desktop[i]
                        ? myWidgets.team.layout?.desktop[i]
                        //@ts-ignore
                        : this.widgetSettingsDesktop(widget, i, arr)}
                    >
                      {<p>{this.state.small}</p>}
                      {widget.widgetIdentifier === 'valueBox' && <ValueBox addNew={false} data={widget} />}
                      {/* @ts-ignore */}
                      {widget.widgetIdentifier === 'lineChartMonthTeam' && <LineGraphFancy data={widget} updateWidgetSettings={(settings, widgetId) => updateWidgetSettings(settings, widgetId)} />}
                      {widget.widgetIdentifier === 'teamMood' && <BarGraph data={widget} />}
                      {widget.widgetIdentifier === 'userTeamScore' && <ColoumnGraph data={widget} />}
                    </div>
                  })}
  
                </ResponsiveReactGridLayout>
                  : <ResponsiveReactGridLayout
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
  
                    {myWidgets.team.data?.map((widget, i, arr) => {
                      let prevWidgetSize = 2;
                      if (arr[i - 1]) {
                        prevWidgetSize = 2;
                        if (arr[i - 1].widgetIdentifier === "valueBox") {
                          prevWidgetSize = 2;
                        } else {
                          prevWidgetSize = 6;
                        }
                      }
  
  
                      return <div
                        key={`${widget._id}${widget._id}${i}${this.state.small && 'small'}`}
                        //@ts-ignore
                        data-grid={myWidgets.team.layout?.wide && myWidgets.team.layout?.wide[i]
                          ? myWidgets.team.layout?.wide[i]
                          //@ts-ignore
                          : this.widgetSettingsDesktop(widget, i, arr)}
                      >
                        {<p>{this.state.small}</p>}
                        {widget.widgetIdentifier === 'valueBox' && <ValueBox addNew={false} data={widget} />}
                        {/* @ts-ignore */}
                        {widget.widgetIdentifier === 'lineChartMonthTeam' && <LineGraphFancy data={widget} updateWidgetSettings={(settings, widgetId) => updateWidgetSettings(settings, widgetId)} />}
                        {widget.widgetIdentifier === 'teamMood' && <BarGraph data={widget} />}
                        {widget.widgetIdentifier === 'userTeamScore' && <ColoumnGraph data={widget} />}
                      </div>
                    })}
  
                  </ResponsiveReactGridLayout>
              : null
            }
          

          {(loading || newQuestionAdded) && (!myWidgets.team.data) && <Loading />}

          

        </div>
        <AddWidget />
        <ReactTooltip
          id="resetLayout"
          effect="solid"
          place={'left'}
          delayShow={250}
          className="custom-tooltip"
        />
        {/* <div style={{
          position: 'absolute',
          backgroundColor: 'white',
          zIndex: 999999999,
          opacity: '.75',
          left: 100,
          top: 100,
          right: 100,
          bottom: 100
        }}>
                    <p style={{
            fontSize: 20,
            textAlign: 'center',
            marginTop: '30'
          }}>This is the width of screen</p>
          <p style={{
            fontSize: 40,
            textAlign: 'center',
           // marginTop: '30%'
          }}>
            {windowWidth}
            {String(windowWidth < 1001)}
          </p>
          <img src={windowWidth > 1000 ? '/img/lion.jpg' : '/img/zebra.jpg'} style={{
            width: 500,
            height: 500,
            objectFit: 'contain',
            marginLeft: 'auto',
            marginRight: 'auto'
          }} />
        </div> */}
        <WidgetPlacementModal onConfirm={resetLayout} onCancel={resetNewQuestion} updateUserLayout={(data) => updateUserLayout(data)} />
      </div >
    );
  }
}

//@ts-ignore
export default withTranslation(['common'])(withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
  //@ts-ignore
)(ResponsiveLocalStorageLayout)))