import React from 'react'
import { User } from 'src/apiTypes'
import { colorByName } from 'src/utitlity'
import { useTranslation } from 'react-i18next'
import { IMAGE_API_ROOT } from 'src/request'

interface Props {
  data?: User[]
  onSelect?(target: string): void
}

const Card = (props: { user: User; onClick(): void }) => {
  const { user, onClick } = props
  return (
    <div className="person" onClick={onClick}>
      {user?.profilePic ? <img className="person-initials" src={IMAGE_API_ROOT + user.profilePic} />
    : <div
    className="person-initials"
    style={{
      backgroundColor: colorByName(user.firstname + ' ' + user.lastname),
    }}
  >
    {!!user.firstname && user.firstname[0]}
    {!!user.lastname && user.lastname[0]}
  </div> 
    }
      
      <div className="person-set">
        <p className="person-set-name">
          {user.firstname + ' ' + user.lastname}
        </p>
        <p className="person-set-requests">{user.jobtitle}</p>
      </div>
    </div>
  )
}

const SelectUserModal = (props: Props) => {
  const { t } = useTranslation(['feedbackRequestPage', 'common'])
  const { data, onSelect } = props
  console.log(data)

  return (
    <div className="custom-modal-wrapper" id="addUsersModal">
      <div className="custom-modal">
        <div className="custom-modal-header">
          <p className="custom-modal-header-title">
            {t('common:Selectateammember')}
          </p>
          <div
            className="custom-modal-close"
            close-modal="addUsersModal"
            onClick={() =>
              document.getElementById('addUsersModal')?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>
        </div>
        <div className="custom-modal-body">
          {!data && (
            <div className="modal-placeholder">
              <img
                src="/img/table-placeholder-img-02.png"
                alt="Clip art"
                className="modal-placeholder-img"
              ></img>
              <p className="modal-placeholder-title">No user to select</p>
              <p className="modal-placeholder-text">
                There are currently no more persons that can be added to this
                user. <button>Why is that?</button>
              </p>
            </div>
          )}
          {data?.map((mem) => (
            <Card
              key={mem._id}
              user={mem}
              onClick={() => {
                if (onSelect) {
                  onSelect(mem._id)
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}
export default SelectUserModal
