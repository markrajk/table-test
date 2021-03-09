import React from 'react'
import { User } from 'src/apiTypes'
import { colorByName } from 'src/utitlity'
import { useTranslation } from 'react-i18next'
import { IMAGE_API_ROOT } from 'src/request'

interface Props {
  data: User & {
    request?: number
  }
  onClick(): void
  active: boolean
}

const MemberCard = (props: Props) => {
  const { t } = useTranslation(['common'])
  const { data, onClick, active } = props
  console.log(data, 'data')

  return (
    <div className={`user ${active ? 'active' : ''}`} onClick={onClick}>
      {data.profilePic ? (
        <img
          src={IMAGE_API_ROOT + data.profilePic}
          alt="User's profile image"
          className="user-initials"
        ></img>
      ) : (
        <div
          className="user-initials"
          style={{
            backgroundColor: colorByName(data.firstname + ' ' + data.lastname),
          }}
        >
          {!!data.firstname && data.firstname[0]}
          {!!data.lastname && data.lastname[0]}
        </div>
      )}
      <div className="user-set">
        <p className="user-set-name">{data.firstname + ' ' + data.lastname}</p>
        <p className="user-set-requests">
          {data?.request} {t('common:Requests')}
        </p>
      </div>
    </div>
  )
}

export default MemberCard
