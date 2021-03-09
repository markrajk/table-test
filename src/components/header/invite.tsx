import React from 'react'
import { Invite } from 'src/apiTypes'
import { capitalize, dateFromObjectId } from 'src/utitlity'
import { useTranslation } from 'react-i18next'
import { IMAGE_API_ROOT } from 'src/request'
import moment from 'moment'
interface Props {
  invite: Invite
  onAccept(): void
}




const Invititation = (props: Props) => {
  const { t } = useTranslation(['navigation', 'common'])
  const { invite, onAccept } = props
  
    return (
      <div className="notification">
        {invite.senderId.profilePic ? (
          <img
            src={IMAGE_API_ROOT + invite.senderId.profilePic}
            alt="User's profile image"
            className="notification-img"
          />
        ) : (
          <div className='notification-initials'>
            {invite.senderId?.firstname ? invite.senderId?.firstname[0] : ''}
            {invite.senderId?.lastname ? invite.senderId?.lastname[0] : ''}
          </div>
        )}
        <div className="notification-main">
          <p className="notification-main-text">
            {capitalize(invite.senderName)} {invite.type === 'Team member' ? ' wants to invite you to become a member of the ' : ` has granted you ${invite.type} of the `  } 
            {invite.teamName}
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

export default Invititation
