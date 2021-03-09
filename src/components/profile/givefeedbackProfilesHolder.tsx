import React, { useState } from 'react'
import { useEffect } from 'react'
import { User } from 'src/apiTypes'
import { modalTrigger } from 'src/main'
import GiveFeedbackmodal from '../modals/givefeedback'
import Profile from './profile'
import { useTranslation } from 'react-i18next'

interface Props {
  data?: User[] | null
}

const GiveFeedbackProfileHolder = (props: Props) => {
  const { t } = useTranslation(['common'])
  const { data } = props
  const [selectedUser, selectUser] = useState<User | null>(null)
  useEffect(() => {
    //  modalTrigger()
  }, [])

  return (
    <div className="content-card my-people">
      <div className="content-card-header">
        <p className="content-card-header-title">{t('common:Givefeedback')}</p>
        <div className="content-card-header-bottom">
          <div className="options">
            <p className="options-link active">
              {t('common:Toyourcolleagues')}
            </p>
            <span className="options-divider">I</span>
            <p className="options-link">{t('common:Toyoursubordinates')}</p>
            <span className="options-divider">I</span>
            <p className="options-link">{t('common:Toyoursupervisor')}</p>
            <span className="options-divider">I</span>
            <p className="options-link">{t('common:Toyourself')}</p>
          </div>

          <div className="animated-input">
            <input type="text" placeholder="Search..." />
            <i className="icon-search"></i>
          </div>
          <div className="more">
            <i className="icon-ellipsis"></i>
          </div>
        </div>
      </div>

      <div className="content-card-main">
        <div className="people-arrow right">
          <i className="icon-chevron-right"></i>
        </div>
        <div className="people-arrow left" style={{ display: 'none' }}>
          <i className="icon-chevron-left"></i>
        </div>
        <div className="people active" slide="people-01">
          {data?.map((item) => (
            <Profile
              key={item._id}
              data={item}
              onClick={() => selectUser(item)}
            />
          ))}
        </div>
      </div>
      <GiveFeedbackmodal
        data={selectedUser}
        team={(selectedUser?.team && selectedUser?.team[0]) || null}
      />
    </div>
  )
}

export default GiveFeedbackProfileHolder
