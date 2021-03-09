import React from 'react'
import { UserTeam } from 'src/apiTypes'
import { capitalize } from 'src/utitlity'
import { useTranslation } from 'react-i18next'

interface Props {
  teams?: UserTeam[]
  onSelect(team: UserTeam): void
}
const SelectTeam = (props: Props) => {
  const { t } = useTranslation('common')
  const { teams, onSelect } = props
  return (
    <div className="custom-modal-wrapper" id="feedbackTypeModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="feedbackTypeModal"
            onClick={() =>
              document
                .getElementById('feedbackTypeModal')
                ?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-body-title">
            {t('common:Selectfeedbacktype')}
          </p>

          <div className="custom-modal-body-main">
            {teams?.map((team) => (
              <div
                className="type-item modal-trigger"
                onClick={() => {
                  onSelect(team)
                  document
                    .getElementById('feedbackTypeModal')
                    ?.classList.remove('open')
                }}
              >
                <div className="type-item-icon">
                  <i className="icon-users-circle"></i>
                </div>
                <div className="type-item-set">
                  <p className="type-item-set-subtitle">
                    {capitalize(team.category)}
                  </p>
                  <p className="type-item-set-title">{capitalize(team.name)}</p>
                </div>
                <button className="button type-item-button">
                  {t('common:Select')}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}

export default SelectTeam
