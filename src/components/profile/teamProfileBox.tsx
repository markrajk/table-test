import { profile } from 'console'
import React from 'react'
import { Team, User, UserTeam } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'
import { colorByName } from 'src/utitlity'

interface Props {
  data: UserTeam
  onClick(): void
  type?: string
}

const Profile = (props: Props) => {
  const { data, onClick } = props
  return (
    <div
      className="person modal-trigger"
      target-modal="peerToPeerFeedbackModal"
      onClick={() => {
        if (onClick) {
          onClick()

          //    document
          //     .getElementById('peerToPeerFeedbackModal')
          //    ?.classList.add('open')
          //     modal.
        }
      }}
    >
      <div className="person-main">
        {
          <div
            className="person-main-icon-placeholder"
            style={{ backgroundColor: '#2BBEFF' }}
          >
            <i className="icon-users"></i>
          </div>
        }
      </div>
      <div className="person-info">
        <p className="person-info-name">{data.name}</p>
        <p className="person-info-position">
          {data.description || 'No description'}
        </p>
      </div>
    </div>
  )
}

export default Profile
