import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const UserSettingSubHeader = () => {
  const { t } = useTranslation(['navigation', 'common'])
  const { push } = useHistory()
  const { pathname } = useLocation()

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
    let headerNavListItems = document.querySelectorAll('.header-nav-list-item')

    let headerNavListItemsWidth = 0
    let headerNavListItemsWidthTemp = 0
    headerNavListItems.forEach((e) => {
      e.addEventListener("click", function () {
        // @ts-ignore
        navDropdown.classList.remove('open');
      })
      headerNavListItemsWidth += e.clientWidth + 45
    })

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
    })
  })

  return (
    <>
      <div className="header-nav">
        <ul className="header-nav-list">
          <li
            className={
              'header-nav-list-item ' +
              (pathname === '/user/generalSettings' ? 'active' : '')
            }
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Generalsettings')}`}
              onClick={() => push('/user/generalSettings')}
            >
              {t('common:Generalsettings')}
            </button>
          </li>
          <li
            className={
              'header-nav-list-item ' +
              (pathname === '/user/teamSettings' ? 'active' : '')
            }
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Myteams')}`}
              onClick={() => push('/user/teamSettings')}
            >
              {t('common:Myteams')}
            </button>
          </li>
        </ul>

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 13"><g transform="translate(-548 -124)"><g transform="translate(320)"><path d="M9.722.963a1,1,0,0,1,1.556,0l8.407,10.408A1,1,0,0,1,18.907,13H2.093a1,1,0,0,1-.778-1.628Z" transform="translate(228 124)" fill="#e4e6e9" /></g><g transform="translate(321.35 1.6)"><path d="M9.15,0,18.3,11.4H0Z" transform="translate(228 124)" fill="#fff" /></g></g></svg>

      </div>

      <div className="nav-dropdown">
        <div
          className="nav-dropdown-trigger"
          onClick={(e) =>
            e.currentTarget.parentElement?.classList.toggle('open')
          }
        >
          <p className="nav-dropdown-trigger-value">
            {pathname === '/user/generalSettings' && 'General Settings'}
            {pathname === '/user/teamSettings' && 'Team members'}
          </p>
          <i className="icon-chevron-down"></i>
        </div>
        <div className="nav-dropdown-menu">
          <div
            className={`nav-dropdown-menu-item ${pathname === '/user/generalSettings' ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() => push('/user/generalSettings')}
            >
              {t('common:Generalsettings')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${pathname === '/user/teamSettings' ? 'selected' : ''
              }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() => push('/user/teamSettings')}
            >
              {t('common:Myteams')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserSettingSubHeader
