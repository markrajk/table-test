import { profile } from 'console'
import React from 'react'
import { TeamUserRank, User } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'
import { useTranslation } from 'react-i18next'

interface Props {
  data?: TeamUserRank
  onClick(): void
}

const TeamMemberProfile = (props: Props) => {
  const { t } = useTranslation('common')
  const { data, onClick } = props
  return (
    <div className="person" onClick={onClick}>
      <div className="person-main">
        {data?.user.profilePic ? (
          <img
            src="/img/p-01.png"
            alt="User's profile image"
            className="person-main-img"
          />
        ) : (
          <div className="person-main-initials">
            {!!data?.user.firstname && data.user.firstname[0]}
            {!!data?.user.lastname && data.user.lastname[0]}
          </div>
        )}
        <div className="person-main-icon">
          <i className="icon-thumbs-up"></i>
        </div>
      </div>
      <div className="person-info">
        <p className="person-info-name">
          {data?.user.firstname + ' ' + data?.user.lastname}
        </p>
        <p className="person-info-position">
          {data?.user.jobtitle || t('common:Jobtitlemissing')}
        </p>
      </div>
    </div>
  )
}

export default TeamMemberProfile
