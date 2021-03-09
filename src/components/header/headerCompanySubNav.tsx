import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Props {}

const HeaderCompanySubNav = (props: Props) => {
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
            className={`header-nav-list-item ${
              pathname === '/company/overview' ? 'active' : ''
            }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:CompanyOverview')}`}
              onClick={() => push('/company/overview')}
            >
              {t('common:CompanyOverview')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${
              pathname === '/company/employees' ? 'active' : ''
            }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Employees')}`}
              onClick={() => push('/company/employees')}
            >
              {t('common:Employees')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${
              pathname === '/company/teams' ? 'active' : ''
            }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Teams')}`}
              onClick={() => push('/company/teams')}
            >
              {t('common:Teams')}
            </button>
          </li>
          <li
            className={`header-nav-list-item ${
              pathname === '/company/admins' ? 'active' : ''
            }`}
          >
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Adminrights')}`}
              onClick={() => push('/company/admins')}
            >
              {t('common:Adminrights')}
            </button>
          </li>
          <li className="header-nav-list-item">
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Generalsettings')}`}
            >
              {t('common:Generalsettings')}
            </button>
          </li>
          <li className="header-nav-list-item">
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Feedbacksettings')}`}
            >
              {t('common:Feedbacksettings')}
            </button>
          </li>
          <li className="header-nav-list-item">
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Billing')}`}
            >
              {t('common:Billing')}
            </button>
          </li>
          <li className="header-nav-list-item">
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Support')}`}
            >
              {t('common:Support')}
            </button>
          </li>
          <li className="header-nav-list-item">
            <button
              className="header-nav-list-item-text"
              text={`${t('common:Documentation')}`}
            >
              {t('common:Documentation')}
            </button>
          </li>
        </ul>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 15">
          <g transform="translate(-614 -113)">
            <g transform="translate(615 113)" fill="#fff">
              <path
                d="M 19 13.49999809265137 L 2 13.49999809265137 C 1.80649995803833 13.49999809265137 1.639320015907288 13.39666748046875 1.55279004573822 13.22360801696777 C 1.466249942779541 13.05053806304932 1.48389995098114 12.85479831695557 1.600000023841858 12.6999979019165 L 10.10000038146973 1.366667866706848 C 10.1953296661377 1.239567875862122 10.34111976623535 1.166667819023132 10.5 1.166667819023132 C 10.65888023376465 1.166667819023132 10.8046703338623 1.239567875862122 10.89999961853027 1.366667866706848 L 19.39999961853027 12.6999979019165 C 19.51609992980957 12.85479831695557 19.53375053405762 13.05053806304932 19.44721984863281 13.22360801696777 C 19.36067962646484 13.39667797088623 19.19350051879883 13.49999809265137 19 13.49999809265137 Z"
                stroke="none"
              />
              <path
                d="M 10.5 1.666667938232422 L 2 12.99999713897705 C 2 12.99999809265137 2 12.99999809265137 2 12.99999809265137 L 18.99999237060547 12.99999809265137 C 18.9999942779541 12.99999618530273 18.9999942779541 12.9999942779541 19 12.99999809265137 L 10.50222969055176 1.666897773742676 C 10.50201034545898 1.666828155517578 10.50117015838623 1.666667938232422 10.5 1.666667938232422 M 10.5 0.6666707992553711 C 10.80000019073486 0.6666707992553711 11.10000038146973 0.8000030517578125 11.30000019073486 1.066667556762695 L 19.79999923706055 12.39999771118164 C 20.29442977905273 13.05923748016357 19.82403945922852 13.99999809265137 19 13.99999809265137 L 2 13.99999809265137 C 1.175949096679688 13.99999809265137 0.7055702209472656 13.05923748016357 1.200000762939453 12.39999771118164 L 9.699999809265137 1.066667556762695 C 9.899999618530273 0.8000030517578125 10.19999980926514 0.6666707992553711 10.5 0.6666707992553711 Z"
                stroke="none"
                fill="#e4e8ec"
              />
            </g>
            <rect
              width="23"
              height="3"
              transform="translate(614 125)"
              fill="#fff"
            />
          </g>
        </svg>
      </div>

      <div className="nav-dropdown medium">
        <div
          className="nav-dropdown-trigger"
          onClick={(e) =>
            e.currentTarget.parentElement?.classList.toggle('open')
          }
        >
          <p className="nav-dropdown-trigger-value">
            {pathname === '/company/overview' && 'Company overview'}
            {pathname === '/company/employees' && 'Employees'}
            {pathname === '/company/teams' && 'Teams'}
            {pathname === '/company/admins' && 'Admin rights'}
          </p>
          <i className="icon-chevron-down"></i>
        </div>
        <div className="nav-dropdown-menu">
          <div
            className={`nav-dropdown-menu-item ${
              pathname === '/company/overview' ? 'selected' : ''
            }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() => push('/company/overview')}
            >
              {t('common:CompanyOverview')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${
              pathname === '/company/employees' ? 'selected' : ''
            }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() => push('/company/employees')}
            >
              {t('common:Employees')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${
              pathname === '/company/teams' ? 'selected' : ''
            }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() => push('/company/teams')}
            >
              {t('common:Teams')}
            </button>
          </div>
          <div
            className={`nav-dropdown-menu-item ${
              pathname === '/company/admins' ? 'selected' : ''
            }`}
          >
            <button
              className="nav-dropdown-menu-item-button"
              onClick={() => push('/company/admins')}
            >
              {t('common:Adminrights')}
            </button>
          </div>
          <div className={`nav-dropdown-menu-item`}>
            <button className="nav-dropdown-menu-item-button">
              {t('common:Generalsettings')}
            </button>
          </div>
          <div className={`nav-dropdown-menu-item`}>
            <button className="nav-dropdown-menu-item-button">
              {t('common:Feedbacksettings')}
            </button>
          </div>
          <div className={`nav-dropdown-menu-item`}>
            <button className="nav-dropdown-menu-item-button">
              {t('common:Billing')}
            </button>
          </div>
          <div className={`nav-dropdown-menu-item`}>
            <button className="nav-dropdown-menu-item-button">
              {t('common:Support')}
            </button>
          </div>
          <div className={`nav-dropdown-menu-item`}>
            <button className="nav-dropdown-menu-item-button">
              {t('common:Documentation')}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeaderCompanySubNav
