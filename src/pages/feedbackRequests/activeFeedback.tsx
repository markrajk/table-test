import React from 'react'
import { User } from 'src/apiTypes'
import { useTranslation } from 'react-i18next'

interface Props {
  data: {
    frequency: number
    target: User
  }
  left: User
}

const ActiveFeedback = (props: Props) => {
  const { t } = useTranslation(['feedbackRequestPage', 'common'])
  const { data, left } = props
  return (
    <>
      <div className="struct-divider">
        <div className="custom-dropdown divider-dropdown">
          <button
            className="custom-dropdown-trigger"
            tabIndex={-1}
            onClick={(e) => e.currentTarget.focus()}
          >
            <div className="struct-divider-symbol">
              <i className="struct-divider-symbol-icon icon-calendar"></i>
              <div className="struct-divider-symbol-line"></div>
              <p className="struct-divider-symbol-text">2W</p>
            </div>
          </button>
          <div className="custom-dropdown-menu">
            <div className="custom-dropdown-menu-item title">
              <i className="icon-clock"></i>
              <span className="custom-dropdown-menu-item-link">
                {t('common:Selecttimeperiod')}
              </span>
            </div>

            <div className="custom-dropdown-menu-item">
              <div className="pretty p-default p-curve">
                <input type="radio" name="color" checked />
                <div className="state p-primary-o">
                  <label>&nbsp;</label>
                </div>
              </div>
              <label htmlFor="" className="custom-dropdown-menu-item-link">
                {t('common:Weekly')}
              </label>
            </div>

            <div className="custom-dropdown-menu-item">
              <div className="pretty p-default p-curve">
                <input type="radio" name="color" />
                <div className="state p-primary-o">
                  <label>&nbsp;</label>
                </div>
              </div>
              <label htmlFor="" className="custom-dropdown-menu-item-link">
                {t('common:Everysecondweek')}
              </label>
            </div>

            <div className="custom-dropdown-menu-item">
              <div className="pretty p-default p-curve">
                <input type="radio" name="color" />
                <div className="state p-primary-o">
                  <label>&nbsp;</label>
                </div>
              </div>
              <label htmlFor="" className="custom-dropdown-menu-item-link">
                {t('common:Monthly')}
              </label>
            </div>

            <div className="custom-dropdown-menu-item">
              <div className="pretty p-default p-curve">
                <input type="radio" name="color" />
                <div className="state p-primary-o">
                  <label>&nbsp;</label>
                </div>
              </div>
              <label htmlFor="" className="custom-dropdown-menu-item-link">
                {t('common:Everysecondmonth')}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="line right">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="13.531"
          height="20.522"
          viewBox="0 0 13.531 20.522"
        >
          <g transform="translate(1.765 1.757)">
            <line
              x2="10"
              y2="8"
              fill="none"
              stroke="#d9dbde"
              stroke-linecap="round"
              stroke-width="2.5"
            />
            <line
              x1="10"
              y2="9"
              transform="translate(0 8)"
              fill="none"
              stroke="#d9dbde"
              stroke-linecap="round"
              stroke-width="2.5"
            />
          </g>
        </svg>
      </div>
      <div className="user right">
        <div className="user-initials">BD</div>
        <div className="user-set">
          <p className="user-set-name">Bob Dylan</p>
          <p className="user-set-requests">4 Requests</p>
        </div>
        <div className="user-icon">
          <i className="icon-bin"></i>
        </div>
      </div>
    </>
  )
}

export default ActiveFeedback
