import React, { useEffect } from 'react'
import { CompanyTeam } from 'src/apiTypes'
import { backgroundCardHeight } from 'src/tables'
import { useTranslation } from 'react-i18next'

interface Props {
  data: CompanyTeam
  onArchive(status: 'archived' | 'active'): void
  mode?: 'archived' | 'active'
}
const TeamRow = (props: Props) => {
  const { t } = useTranslation('common')
  const { data, onArchive, mode } = props
  useEffect(() => {
    backgroundCardHeight()
  }, [])
  return (
    <tr className="custom-table-row">
      <td className="column-01">
        <p>{data.name}</p>
      </td>
      <td className="column-02">
        <p>{data.description || 'Team desicription missing'}</p>
      </td>
      <td className="column-03">
        <p>
          {data.teamLeaders[0]
            ? data.teamLeaders[0].firstname + ' ' + data.teamLeaders[0].lastname
            : ' '}
        </p>
      </td>
      <td className="column-04">
        <p>{data.teamMembers.length}</p>
      </td>
      <td className="column-05">
        <div className="custom-dropdown half-line">
          <button
            className="custom-dropdown-trigger"
            tab-index="-1"
            onClick={(e) => e.currentTarget.focus()}
          >
            <i className="icon-ellipsis"></i>
          </button>

          <div className="custom-dropdown-menu">
            <div className="custom-dropdown-menu-item">
              <button className="custom-dropdown-menu-item-link">
                {t('common:Viewteam')}
              </button>
            </div>
            <div className="custom-dropdown-menu-item delete">
              <button
                className="custom-dropdown-menu-item-link"
                onClick={() => {
                  if (onArchive) {
                    onArchive(mode === 'active' ? 'archived' : 'active')
                  }
                }}
              >
                {mode === 'active' ? 'Archive team' : 'Restore team'}
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default TeamRow
