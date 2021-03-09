import React from 'react'
import { CompanyInvite } from 'src/apiTypes'
import { capitalize, dateFromObjectId } from 'src/utitlity'
interface Props {
  invite: CompanyInvite
  onAccept(): void
}
import { useTranslation } from 'react-i18next'
import { IMAGE_API_ROOT } from 'src/request'
import moment from 'moment'

const Invite = (props: Props) => {
  const { t } = useTranslation(['navigation', 'common'])
  const { invite, onAccept } = props
  console.log(invite);
  
  return (
    <div className="notification">
      {invite.sender?.profilePic ? 
      <img
        src={IMAGE_API_ROOT+invite.sender.profilePic}
        alt="User's profile image"
        className="notification-img"
      />
      : <div className='notification-initials'>
        {invite.sender?.firstname[0] + invite.sender?.lastname[0]}
      </div>
      
      }
      <div className="notification-main">
        <p className="notification-main-text">
          {invite.sender?.firstname + ' ' + invite.sender?.lastname}{' '}
          {/* t('navigation:wantstoinveteyouas') */}
          has invited you to join the company{' '}
          <span>
            {capitalize(invite.company.name)}
            {/* invite.type === 'employees' ? `${t('common:employee')}` : '' */}
          </span>
        </p>
        <div className="notification-main-buttons">
          <button className="notification-button confirm" onClick={onAccept}>
            {t('common:Confirm')}
          </button>
          <button className="notification-button deny">
            {t('common:Deny')}
          </button>
        </div>
        <p className="notification-main-time">{moment(dateFromObjectId(invite._id)).fromNow()}</p>
      </div>
    </div>
  )
}

export default Invite
