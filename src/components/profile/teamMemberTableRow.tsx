import React from 'react'
import { useEffect } from 'react'
import { TeamUserRank, User } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'
import { backgroundCardHeight } from 'src/tables'
import { colorByName, ratingColor, ratingString } from 'src/utitlity'
import { useTranslation } from 'react-i18next'

interface Props {
  data?: TeamUserRank
  onClick(): void
  updateJobTitle?(jobtitle: string): void
  removeMember?(): void
}

const TeamMemberProfile = (props: Props) => {
  const { t } = useTranslation(['teamMembersPage', 'common'])
  const { data, onClick, updateJobTitle, removeMember } = props
  console.log(data)
  useEffect(() => {
    backgroundCardHeight()
  }, [])
  return (
    <tr className="custom-table-row">
      <td className="column-01" onClick={onClick}>
        <div className="table-set modal-trigger" target-modal="modalCard">
          <div
            className="table-set-initials"
            style={{ backgroundColor: '#fea42a' }}
          >
            {!!data?.user.firstname && data.user.firstname[0]}
            {!!data?.user.lastname && data.user.lastname[0]}
          </div>
          <div className="table-set-info">
            <p className="table-set-info-name lead">
              {data?.user.firstname + ' ' + data?.user.lastname}{' '}
              <span className="table-set-info-name-icon">
                {data?.isLeader && <i className="icon-crown"></i>}
              </span>
            </p>
            <p className="table-set-info-email">{data?.user.email}</p>
          </div>
        </div>
      </td>
      <td className="column-02">
        <input
          className="td-input"
          type="text"
          placeholder={`${t('common:Addjobtitle')}`}
          defaultValue={data?.user.jobtitle}
          onChange={(e) => {
            if (updateJobTitle) {
              updateJobTitle(e.target.value)
            }
          }}
        />
      </td>
      <td className="column-03">
        <button
          className="button button-green"
          style={{
            backgroundColor: ratingColor(data?.average || 0),
            borderColor: ratingColor(data?.average || 0),
          }}
          // style={{
          //   backgroundColor: ratingColor(data?.average || 0),
          //   borderColor: ratingColor(data?.average || 0),
          // }}
        >
          {ratingString(data?.average || 0)}
        </button>
      </td>
      <td className="column-04">
        <p>
          {data?.change || (
            <span className="no-data">{t('common:Nodata')}</span>
          )}
        </p>
      </td>
      <td className="column-05">
        <div className="custom-dropdown half-line">
          <button
            className="custom-dropdown-trigger"
            tabIndex={-1}
            onClick={(e) => e.currentTarget.focus()}
          >
            <i className="icon-ellipsis"></i>
          </button>

          <div className="custom-dropdown-menu">
            <div className="custom-dropdown-menu-item">
              <button
                className="custom-dropdown-menu-item-link"
                onClick={onClick}
              >
                {t('common:Openprofile')}
              </button>
            </div>
            <div className="custom-dropdown-menu-item selected">
              <button className="custom-dropdown-menu-item-link">
                {t('common:Givefeedback')}
              </button>
            </div>
            <div
              className="custom-dropdown-menu-item delete"
              onClick={removeMember}
            >
              <button className="custom-dropdown-menu-item-link">
                {t('common:Deletemember')}
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default TeamMemberProfile
