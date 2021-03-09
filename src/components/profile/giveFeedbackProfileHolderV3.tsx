import React, { useState } from 'react'
import { useEffect } from 'react'
import { Invite, User } from 'src/apiTypes'
import { capitalize } from 'src/utitlity'
import Profile from './profile'

interface Props {
  data?: User[] | null
  selectedUser: User | null
  selectUser(u: User): void
  invites: Invite[]
}

const GiveFeedbackProfileHolderNew = (props: Props) => {
  const { data, selectedUser, selectUser, invites } = props

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
    <div className="people">
      {filteredUser?.map((item) => (
        <Profile key={item._id} data={item} onClick={() => selectUser(item)} />
      ))}
      {invites.map((item, i) => 
        <Profile key={item._id} data={{
          _id: item.invitedUser + '' + i,
          firstname: capitalize(item.invitedUser.split('@')[0]),
          lastname: '',
          jobtitle: 'Invited'
        } as User} onClick={() => null} />
        )}
    </div>
  )
}

export default GiveFeedbackProfileHolderNew
