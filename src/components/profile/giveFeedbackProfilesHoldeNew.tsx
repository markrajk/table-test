import React, { useState } from 'react'
import { useEffect } from 'react'
import { User } from 'src/apiTypes'
import Profile from './profile'
import { useTranslation } from 'react-i18next'

interface Props {
  data?: User[] | null
  selectedUser: User | null
  selectUser(u: User): void
}

const GiveFeedbackProfileHolderNew = (props: Props) => {
  const { t } = useTranslation(['common'])
  const { data, selectedUser, selectUser } = props

  useEffect(() => {
    //  modalTrigger()
  }, [])

  const [filter, setFilter] = useState<
    'p2p' | 'subordinate' | 'supervisor' | 'self' | 'all'
  >('all')
  const [filteredUser, setFilteredUser] = useState<User[]>([])
  const filterUsers = (
    key: 'p2p' | 'subordinate' | 'supervisor' | 'self' | 'all'
  ) => {
    const newData = data ? [...data] : []
    if (key === 'all') {
      setFilteredUser(data || [])
      return
    }

    const fil = newData.filter((item) => {
      let status = false
      if (item.team) {
        item.team.forEach((t) => {
          if (t.category === key) {
            status = true
          }
        })
        return status
      }
    })
    setFilteredUser(fil)
  }

  useEffect(() => {
    if (data) {
      filterUsers(filter)
    }
  }, [filter, data])

  return (
    <>
      <div className="caption sticky">
        <p className="caption-title">{t('common:Givefeedback')}</p>
        <div className="caption-bottom">
          <div className="options">
            <p
              className={'options-link ' + (filter === 'p2p' ? 'active' : '')}
              onClick={() => setFilter('p2p')}
            >
              {t('common:Toyourcolleagues')}
            </p>
            <span className="options-divider">I</span>
            <p
              className={
                'options-link ' + (filter === 'subordinate' ? 'active' : '')
              }
              onClick={() => setFilter('subordinate')}
            >
              {t('common:Toyoursubordinates')}
            </p>
            <span className="options-divider">I</span>
            <p
              className={
                'options-link ' + (filter === 'supervisor' ? 'active' : '')
              }
              onClick={() => setFilter('supervisor')}
            >
              {t('common:Toyoursupervisor')}
            </p>
            <span className="options-divider">I</span>
            <p
              className={'options-link ' + (filter === 'self' ? 'active' : '')}
              onClick={() => setFilter('self')}
            >
              {t('common:Toyourself')}
            </p>
          </div>
        </div>
      </div>

      <div className="people">
        {filteredUser?.map((item) => (
          <Profile
            key={item._id}
            data={item}
            onClick={() => selectUser(item)}
          />
        ))}
      </div>
    </>
  )
}

export default GiveFeedbackProfileHolderNew
