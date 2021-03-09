import { profile } from 'console'
import React from 'react'
import { User } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'
import { colorByName } from 'src/utitlity'
import { useTranslation } from 'react-i18next'

interface Props {
  data: User
  onClick(): void
  type?: string
}

const Profile = (props: Props) => {
  const { t } = useTranslation('common')
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
        {data.profilePic ? (
          <img
            src={IMAGE_API_ROOT + data.profilePic.replace('resized', 'thumb')}
            alt="User's profile image"
            className="person-main-img"
          />
        ) : (
          <div
            className="person-main-initials"
            style={{
              backgroundColor: colorByName(
                data.firstname + ' ' + data.lastname
              ),
            }}
          >
            {/*
          need styling here
          */}
            {data.firstname ? data.firstname[0] : ''}
            {data.lastname ? data.lastname[0] : data.firstname ? data.firstname[1] : ''}
          </div>
        )}
      </div>
      <div className="person-info">
        <p className="person-info-name">
          {data.firstname + ' ' + data.lastname}
        </p>
        <p className="person-info-position">
          {data.jobtitle || t('common:Jobtitlemissing')}
        </p>
      </div>
    </div>
  )
}

export default Profile
