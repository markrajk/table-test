import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppDispatch, RootState } from 'src/configureStore'
import { getAllMyWidgets, getMyWidgets } from 'src/redux/feedback/actions'
import { connect, ConnectedProps } from 'react-redux'
import { Category } from 'src/apiTypes'

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMyWidgets: (teamId: string, category: Category) =>
    dispatch(getMyWidgets(teamId, category)),
    getAllMyWidgets: () => dispatch(getAllMyWidgets())
})

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myWidgets: state.feedbackReducer.myWidgets,
  selectedTeam: state.teamReducer.selectedTeam,
  chartType: state.feedbackReducer.chartType
})
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  level1: string
  children?: React.ReactChild | React.ReactChild[]
}

const HeaderTeamSubNav = (props: Props) => {
  const { t } = useTranslation(['feedbackChartsPage', 'common'])
  const { level1, children, getMyWidgets, selectedTeam, chartType, getAllMyWidgets, myWidgets } = props
  const { push } = useHistory()
  const { pathname } = useLocation()
  const [ preloadWidgets, setPreloadWidget ] = useState(true)
  useEffect(() => {
    console.log(pathname)
    if (selectedTeam) {
      if (pathname.includes('teamFeedback')) {
          getMyWidgets(selectedTeam._id, 'team')
        
      }
      if (pathname.includes('p2pFeedback')) {
        getMyWidgets(selectedTeam._id, 'p2p')
      }
      if (pathname.includes('subordinateFeedback')) {
        getMyWidgets(selectedTeam._id, 'supervisor')
      }
      if (pathname.includes('self')) {
        getMyWidgets(selectedTeam._id, 'self')
      }
      if (pathname.includes('supervisoryFeedback')) {
        getMyWidgets(selectedTeam._id, 'supervisoryFeedback')
      }
    }
  }, [pathname, selectedTeam])

  useEffect(() => {
    if (myWidgets.team.data && preloadWidgets) {
      getAllMyWidgets()
      setPreloadWidget(false)
    }
  }, [myWidgets.team.data, preloadWidgets])

  useEffect(() => {
    let header = document.querySelector('.header') as HTMLElement
    let headerMain = document.querySelector('.header-main') as HTMLElement
    let navDropdown = document.querySelector('.nav-dropdown') as HTMLElement
    const navDropdownMenuItems = document.querySelectorAll(
      '.nav-dropdown-menu-item-button'
    )
    let headerNavListItems = document.querySelectorAll('.header-nav-list-item')

    let headerNavListItemsWidth = 180
    let headerNavListItemsWidthTemp = 0
    headerNavListItems.forEach((e) => {
      headerNavListItemsWidth +=
        // @ts-ignore
        e.clientWidth + (window.clientWidth > 1100 ? 45 : 32)
    })

    let dropdownMenuListItemsWidth = 0

    navDropdownMenuItems.forEach((e) => {
      e.addEventListener("click", function () {
        // @ts-ignore
        navDropdown.classList.remove('open');
      })
      dropdownMenuListItemsWidth += e.clientWidth + 35
    })

    if (dropdownMenuListItemsWidth > headerMain.clientWidth) {
      navDropdown.classList.remove('medium')
    } else {
      navDropdown.classList.add('medium')
    }

    if (headerNavListItemsWidth > headerMain.clientWidth) {
      header.classList.add('show-dropdown')
    } else {
      header.classList.remove('show-dropdown')
    }

    window.addEventListener('resize', function () {
      if (headerNavListItemsWidth > headerMain.clientWidth) {
        header.classList.add('show-dropdown')
      } else {
        header.classList.remove('show-dropdown')
        navDropdown.classList.remove('open')
      }

      if (dropdownMenuListItemsWidth > headerMain.clientWidth) {
        navDropdown.classList.remove('medium')
      } else {
        navDropdown.classList.add('medium')
      }
    })
  })

  return (
    <>
      <div
        className="header-nav"
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        <ul className="header-nav-list">
          <li
            className={`header-nav-list-item ${pathname.includes('teamFeedback') ? 'active' : ''
              } `}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:teamFeedback')}`}
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/${chartType === 'graph' ? 'teamFeedback' : 'teamFeedbackText'}`
                )
              }
            >
              {t('common:teamFeedback')}
            </button>
          </li>

          <li
            className={`header-nav-list-item ${pathname.includes('p2pFeedback') ? 'active' : ''
              }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:p2pFeedback')}`}
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/${chartType === 'graph' ? 'p2pFeedback' : 'p2pFeedbackText'}`
                )
              }
            >
              {t('common:p2pFeedback')}
            </button>
          </li>

          <li
            className={`header-nav-list-item ${(pathname.includes('/data/subordinateFeedback') ||
              pathname.includes('/data/subordinateFeedbackText')) &&
              !pathname.includes('supervisoryFeedback')
              ? 'active'
              : ''
              } `}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Feedbackaboutteamlead')}`}
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/${chartType === 'graph' ? 'subordinateFeedback' : 'subordinateFeedbackText'}`
                )
              }
            >
              {t('common:Feedbackaboutteamlead')}
            </button>
          </li>

          <li
            className={`header-nav-list-item ${pathname.includes('self') ? 'active' : ''
              } `}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:selfEvaluations')}`}
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/${chartType === 'graph' ? 'self' : 'selfFeedbackText'}`
                )
              }
            >
              {t('common:selfEvaluations')}
            </button>
          </li>

          <li
            className={`header-nav-list-item ${pathname.includes('/data/supervisoryFeedback') ||
              pathname.includes('/data/supervisorTextFeedback')
              ? 'active'
              : ''
              } `}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:supervisoryFeedback')}`}
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/${chartType === 'graph' ? 'supervisoryFeedback' : 'supervisorTextFeedback'}`
                )
              }
            >
              {t('common:supervisoryFeedback')}
            </button>
          </li>

          <li className="add-new-widgets">
            <button
              className="button"
              onClick={() => {
                if (selectedTeam) {
                  push('/team/' + selectedTeam._id + '/settings/general')
                }
              }}
            >
              {t('common:Teamsettings')}
              {/*t("feedbackChartsPage:navigation:allWidgets")*/}
            </button>
          </li>

          {/* <li className={`header-nav-list-item ${checkLevel1('textfeed')}`}>
            <button className="header-nav-list-item-text" text="Text feedback">
              Team member charts
            </button>
          </li>
          <li
            className={`header-nav-list-item ${checkLevel1(
              'level1TeamMembers'
            )}`}
          >
            <button
              className="header-nav-list-item-text"
              text="Team members"
              onClick={() => push('/teamMembers')}
            >
              Team leader charts
            </button>
          </li>
          <li className="add-new-widgets">
            <button
              className="button"
              onClick={() =>
                document.getElementById('addWidgetModal')?.classList.add('open')
              }
            >
              Add new widgets
            </button>
          </li> */}
        </ul>
      </div>

      <div className="nav-dropdown medium">
        <div
          className="nav-dropdown-trigger"
          onClick={(e) =>
            e.currentTarget.parentElement?.classList.toggle('open')
          }
        >
          <p className="nav-dropdown-trigger-value">
            {pathname.includes('/giveFeedback') && t('common:Givefeedback')}
            {pathname.includes('data/teamFeedback') && t('common:teamFeedback')}
            {pathname.includes('data/p2pFeedback') && t('common:p2pFeedback')}
            {pathname.includes('data/subordinateFeedback') &&
              t('common:Feedbackaboutteamlead')}
            {pathname.includes('data/self') && t('common:selfEvaluations')}
            {pathname.includes('data/supervisoryFeedback') &&
              t('common:supervisoryFeedback')}
          </p>
          <i className="icon-chevron-down"></i>

          <div className="add-new-widgets">
            <button
              className="button"
              onClick={() => {
                if (selectedTeam) {
                  push('/team/' + selectedTeam._id + '/settings/general')
                }
              }}
            >
              {t('common:Teamsettings')}
              {/*t("feedbackChartsPage:navigation:allWidgets")*/}
            </button>
          </div>
        </div>
        <div className="nav-dropdown-menu">
          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/data/teamFeedback') ||
              pathname.includes('/data/teamFeedbackText')
              ? 'selected'
              : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/teamFeedback`
                )
              }
            >
              {t('common:teamFeedback')}
            </button>
          </div>

          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/data/p2pFeedback') ||
              pathname.includes('/data/p2pFeedbackText')
              ? 'selected'
              : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/p2pFeedback`
                )
              }
            >
              {t('common:p2pFeedback')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/data/subordinateFeedback') ||
              pathname.includes('/data/subordinateFeedbackText')
              ? 'selected'
              : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/subordinateFeedback`
                )
              }
            >
              {t('common:Feedbackaboutteamlead')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/data/self') ||
              pathname.includes('/data/selfFeedbackText')
              ? 'selected'
              : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'}/data/self`
                )
              }
            >
              {t('common:selfEvaluations')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${/supervisorTextFeedback|supervisoryFeedback/.test(pathname)
              ? 'selected'
              : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/data/supervisoryFeedback`
                )
              }
            >
              {t('common:supervisoryFeedback')}
            </button>
          </div>
        </div>
      </div>

      {children}
    </>
  )
}

export default connector(HeaderTeamSubNav)
