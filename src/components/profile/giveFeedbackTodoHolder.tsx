import React, { useState } from 'react'
import { useEffect } from 'react'
import { Team, ToDo, User, UserTeam } from 'src/apiTypes'
import Profile from './profile'
import TeamProfile from './teamProfileBox'

interface Props {
  data?: ToDo[] | null
  selectedUser: User | null
  selectUser(u: User, t: UserTeam): void
}

const GiveFeedbackProfileHolderNew = (props: Props) => {
  const { data, selectedUser, selectUser } = props

  return (
    <div className="people">
      {data?.map((item) =>
        item.type === 'team' ? (
          <TeamProfile
            key={item._id}
            data={item.team}
            onClick={() =>
              selectUser(item.target, { ...item.team, category: 'team' })
            }
          />
        ) : (
          <Profile
            key={item._id}
            data={item.target}
            onClick={() =>
              selectUser(
                item.target,
                Object.assign({}, item.team, {
                  category: item.type,
                })
              )
            }
          />
        )
      )}
    </div>
  )
}

export default GiveFeedbackProfileHolderNew
