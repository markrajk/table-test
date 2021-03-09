import react from 'react'
import { ToDo, User, UserTeam } from 'src/apiTypes'
import { useTranslation } from 'react-i18next'

interface ItemProps {
  data: {
    name: string
    type: string
    _id: string
    teamId: string
  }
  onClick?(): void
}
const Item = (props: ItemProps) => {
  const { t } = useTranslation(['common'])
  const { data, onClick } = props
  if (data.type === 'team') {
    return (
      <li className="todo-list-item" onClick={onClick}>
        <div className="todo-list-item-icon">
          <i className="icon-users"></i>
        </div>
        <div className="todo-list-item-info">
          <p className="todo-list-item-info-subtitle">
            {t('common:teamFeedback')}
          </p>
          <p className="todo-list-item-info-title">{data.name}</p>
        </div>
        <i className="icon-chevron-right"></i>
      </li>
    )
  }

  return (
    <li className="todo-list-item" onClick={onClick}>
      <img
        src="/img/p-01.png"
        alt="User's profile picture"
        className="todo-list-item-img"
      />
      <div className="todo-list-item-info">
        <p className="todo-list-item-info-subtitle">
          {data.type} {t('common:feedback')}
        </p>
        <p className="todo-list-item-info-title">{data.name}</p>
      </div>
      <i className="icon-chevron-right"></i>
    </li>
  )
}

interface Props {
  data?: ToDo[]
  selectUser(u: User): void
  selectTeam(u: UserTeam): void
}
const ToDoContainer = (props: Props) => {
  const { data, selectUser, selectTeam } = props
  return (
    <div className="todo">
      <ul className="todo-list">
        {data?.map((item) => (
          <Item
            key={item._id}
            onClick={() => {
              selectTeam(
                Object.assign({}, item.team, {
                  category: item.type,
                })
              )
              selectUser(item.target)
            }}
            data={{
              name:
                item.type === 'team'
                  ? item.team.name
                  : item.target.firstname + ' ' + item.target.lastname,
              type: item.type,
              teamId: item.team._id,
              _id: item._id,
            }}
          />
        ))}
      </ul>
    </div>
  )
}
export default ToDoContainer
