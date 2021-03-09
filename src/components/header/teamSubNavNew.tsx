import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
})

const connector = connect(mapStateToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const HeaderTeamSubNav = (props: Props) => {
  const { t } = useTranslation(['navigation', 'common'])
  const { push } = useHistory()
  const { pathname } = useLocation()
  const { selectedTeam } = props
  // let navItemActive = (document.querySelector('.header-nav-list-item.active') as any);
  // let svgArrow = (document.querySelector('.header-nav svg') as HTMLElement);

  // function positionArrow(element: any) {
  //   let bodyRect = document.body.getBoundingClientRect();
  //   let elemRect = element.getBoundingClientRect();
  //   let offset = elemRect.left - bodyRect.left + (element.clientWidth / 2);

  //   svgArrow.style.left = `${offset}px`;
  // }

  // useEffect(() => {
  //   navItemActive = false;
  //   navItemActive = (document.querySelector('.header-nav-list-item.active') as HTMLElement);
  //   svgArrow = (document.querySelector('.header-nav svg') as HTMLElement);

  //   if (navItemActive) {
  //     positionArrow(navItemActive)
  //     console.log('ACTIVE', navItemActive)
  //     console.log('SVG', svgArrow)
  //   }

  // }, [navItemActive, svgArrow])

  // let navItemActive = (document.querySelector('.header-nav-list-item.active') as any);
  // let svgArrow = (document.querySelector('.header-nav svg') as HTMLElement);

  // function positionArrow(element: any) {
  //   let bodyRect = document.body.getBoundingClientRect();
  //   let elemRect = element.getBoundingClientRect();
  //   let offset = elemRect.left - bodyRect.left + (element.clientWidth / 2);

  //   svgArrow.style.left = `${offset}px`;
  // }

  useEffect(() => {
    let navItemActive = document.querySelector(
      '.header-nav-list-item.active'
    ) as HTMLElement
    let svgArrow = document.querySelector('.header-nav svg') as HTMLElement

    if (navItemActive) {
      let bodyRect = document.body.getBoundingClientRect()
      let elemRect = navItemActive.getBoundingClientRect()
      let offset = elemRect.left - bodyRect.left + navItemActive.clientWidth / 2

      svgArrow.style.left = `${offset}px`
    }
  })

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
            className={`header-nav-list-item ${pathname.includes('/settings/general') ? 'active' : ''
              }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Generalsettings')}`}
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/settings/general`
                  )
                }
              }}
            >
              {t('common:Generalsettings')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${pathname.includes('/settings/feedbackInput') ? 'active' : ''
              }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Feedbackinput')}`}
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/settings/feedbackInput`
                  )
                }
              }}
            >
              {t('common:Feedbackinput')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${pathname.includes('/settings/requests') ? 'active' : ''
              }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Feedbackrequests')}`}
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/settings/requests`
                  )
                }
              }}
            >
              {t('common:Feedbackrequests')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${pathname.includes('/settings/members') ? 'active' : ''
              }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Teammembers')}`}
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/settings/members`
                  )
                }
              }}
            >
              {t('common:Teammembers')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${pathname.includes('/settings/teamLeaders') ? 'active' : ''
              }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Teamlead')}`}
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/settings/teamLeaders`
                  )
                }
              }}
            >
              {t('common:Teamlead')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${pathname.includes('/settings/viewingRights') ? 'active' : ''
              }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Viewingrights')}`}
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/settings/viewingRights`
                  )
                }
              }}
            >
              {t('common:Viewingrights')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${pathname.includes('/settings/admins') ? 'active' : ''
              }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Adminrights')}`}
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/settings/admins`
                  )
                }
              }}
            >
              {t('common:Adminrights')}
            </button>
          </li>

          <li className="add-new-widgets">
            <button
              className="button"
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/data/teamFeedback`
                  )
                }
              }}
            >
              {t('common:Backtofeedbackdata')}
              <span>
                <i className="icon-arrow-right"></i>
              </span>
              {/*t("feedbackChartsPage:navigation:allWidgets")*/}
            </button>
          </li>
        </ul>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 13"><g transform="translate(-548 -124)"><g transform="translate(320)"><path d="M9.722.963a1,1,0,0,1,1.556,0l8.407,10.408A1,1,0,0,1,18.907,13H2.093a1,1,0,0,1-.778-1.628Z" transform="translate(228 124)" fill="#e4e6e9" /></g><g transform="translate(321.35 1.6)"><path d="M9.15,0,18.3,11.4H0Z" transform="translate(228 124)" fill="#fff" /></g></g></svg>
      </div>

      <div className="nav-dropdown medium">
        <div
          className="nav-dropdown-trigger"
          onClick={(e) =>
            e.currentTarget.parentElement?.classList.toggle('open')
          }
        >
          <p className="nav-dropdown-trigger-value">
            {pathname.includes('settings/feedbackInput') &&
              t('common:Feedbackinput')}
            {pathname.includes('settings/general') &&
              t('common:Feedbacksettings')}
            {pathname.includes('settings/teamMembers') &&
              t('common:Teammembers')}
            {pathname.includes('settings/teamLeaders') && t('common:Teamlead')}
            {pathname.includes('settings/viewingRights') &&
              t('common:Viewingrights')}
            {pathname.includes('settings/admins') && t('common:Adminrights')}
            {pathname.includes('settings/requests') &&
              t('common:Feedbackrequests')}
          </p>
          <i className="icon-chevron-down"></i>

          <div className="add-new-widgets">
            <button
              className="button"
              onClick={() => {
                if (selectedTeam) {
                  push(
                    `/team/${selectedTeam ? selectedTeam._id : 'null'
                    }/data/teamFeedback`
                  )
                }
              }}
            >
              {t('common:Backtofeedbackdata')}
              <span>
                <i className="icon-arrow-right"></i>
              </span>
              {/*t("feedbackChartsPage:navigation:allWidgets")*/}
            </button>
          </div>
        </div>
        <div className="nav-dropdown-menu">
          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/settings/general') ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/settings/general`
                )
              }
            >
              {t('common:Generalsettings')}
            </button>
          </div>

          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/settings/feedbackInput') ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/settings/feedbackInput`
                )
              }
            >
              {t('common:Feedbackinput')}
            </button>
          </div>

          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/settings/settings/requests') ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/settings/requests`
                )
              }
            >
              {t('common:Feedbackrequests')}
            </button>
          </div>

          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/settings/members') ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/settings/teamMembers`
                )
              }
            >
              {t('common:Teammembers')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/settings/leaders') ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/settings/teamLeaders`
                )
              }
            >
              {t('common:Teamlead')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/settings/viewingRights') ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/settings/viewingRights`
                )
              }
            >
              {t('common:Viewingrights')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${pathname.includes('/settings/admins') ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() =>
                push(
                  `/team/${selectedTeam ? selectedTeam._id : 'null'
                  }/settings/admins`
                )
              }
            >
              {t('common:Adminrights')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default connector(HeaderTeamSubNav)
