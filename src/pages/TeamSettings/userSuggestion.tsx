import React from 'react'
import { User } from 'src/apiTypes'

interface Props {
  onClick(): void
  user: User
  added?: boolean
}
const UserSuggestions = (props: Props) => {
  const { onClick, user, added } = props
  return (
    <div className="search-menu-item" onClick={added ? undefined : onClick}>
      <div className="search-menu-item-initials">
        {user.firstname[0] + user.lastname[0]}
      </div>
      <div className="search-menu-item-set">
        <p className="search-menu-item-set-name">
          {user.firstname + ' ' + user.lastname}
        </p>
        <p className="search-menu-item-set-position">
          {user.jobtitle || 'Job title missing'}
        </p>
      </div>
      {added ? (
        <button className="search-menu-item-button added">Added</button>
      ) : (
        <button className="search-menu-item-button select">Select</button>
      )}
    </div>
  )
}

export default UserSuggestions
