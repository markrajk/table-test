import { capitalize } from 'src/utitlity'
import React, { useEffect } from 'react'
import { Invite, User } from 'src/apiTypes'
import { backgroundCardHeight } from 'src/tables'
import { useTranslation } from 'react-i18next'

interface Props {
  data: Invite
  onDelete(): void
}

const InviteRow = (props: Props) => {
  const { t } = useTranslation(['teamSettingsMembersPage', 'common'])
  const { data, onDelete } = props
  useEffect(() => {
   // backgroundCardHeight()
  }, [])
  return (
    <>
      <td className="column-01">
        <p>{capitalize(data.invitedUser.split('@')[0])}</p>
      </td>
      <td className="column-02">
        <p>{data.invitedUser}</p>
      </td>
      <td className="column-03">
        <input className="td-input" type="text" value='Job title missing' />
      </td>
      <td className="column-04 pending">
        <p>{t('common:Pending')}</p>
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
                onClick={onDelete}
              >
                {t('common:Delete')}
              </button>
            </div>
          </div>
        </div>
      </td>
    </>
  )
}

export default InviteRow
