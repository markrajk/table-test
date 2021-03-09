import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

interface Props {
  level2: string
}

const HeadeaderTeamFeedCharts = (props: Props) => {
  const { t } = useTranslation(['navigation', 'common'])
  const { level2 } = props
  const { push } = useHistory()

  const checkLevel2 = (keyword: string) => {
    if (keyword === level2) {
      return 'active'
    }
    return ''
  }

  return (
    <>
      <div
        className="header-sub-nav"
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        <ul className="header-sub-nav-list">
          <li className="header-sub-nav-list-item active">
            <p
              className="header-sub-nav-list-item-text"
              text={`${t('navigation:Overallcharts')}`}
            >
              {t('navigation:Overallcharts')}
            </p>
          </li>
          <li className="header-sub-nav-list-item">
            <p
              className="header-sub-nav-list-item-text"
              text={`${t('navigation:Teammemberchart')}`}
            >
              {t('navigation:Teammemberchart')}
            </p>
          </li>
          <li className="header-sub-nav-list-item">
            <p
              className="header-sub-nav-list-item-text"
              text={`${t('navigation:Teamleadcharts')}`}
            >
              {t('navigation:Teamleadcharts')}
            </p>
          </li>
          <li className="add-new-widgets ">
            <button
              onClick={() =>
                document.getElementById('addWidgetModal')?.classList.add('open')
              }
            >
              {t('navigation:Addnewwidgets')}
            </button>
          </li>
        </ul>
      </div>
    </>
  )
}

export default HeadeaderTeamFeedCharts
