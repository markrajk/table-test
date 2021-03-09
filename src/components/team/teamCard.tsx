import React from 'react'
import { Link } from 'react-router-dom'
import { Team } from 'src/apiTypes'

interface Props {
  data: Team
  onClick(): void
}

const TeamCard = (props: Props) => {
  const { data, onClick } = props
  return (
    <>
      <div className="color-card-content" onClick={onClick}>
        <p className="color-card-title">{data.name}</p>
        <p className="color-card-desc">
          {data.description || 'Team description missing'}
        </p>
      </div>
      <div className="more">
        <i className="icon-ellipsis"></i>
      </div>
    </>
  )
}

export default TeamCard
