import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppDispatch, RootState } from 'src/configureStore'
import { useTranslation } from 'react-i18next'
import { IMAGE_API_ROOT } from 'src/request'
import UserFeedbacks from './userFeedbacks'
import { selectUser } from 'src/redux/auth/actions'
import { User } from 'src/apiTypes'

const mapStateToProps = (state: RootState) => ({
  selectedUser: state.authReducer.selectedUser,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  selectUser: (user: User | null) => dispatch(selectUser(user))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}
const OpenUserProfile = (props: Props) => {
  const { t } = useTranslation('common')
  const { selectedUser, selectUser } = props
  console.log(selectedUser), 'selectedUser'
  const [ userFeedbackOpen, setUserFeedbackOpen ] = useState(false)
  return (
    <>
    <div className="custom-modal-wrapper" id="usersModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="usersModal"
            onClick={() => {
              document.getElementById('usersModal')?.classList.remove('open')
              selectUser(null)
            }
            }
          >
            <i className="icon-close"></i>
          </div>
          {selectedUser?.profilePic ? (
            <img
              src={IMAGE_API_ROOT + selectedUser?.profilePic}
              alt="User's profile image"
              className="custom-modal-body-img"
            />
          ) : (
            <div
              className="custom-modal-body-initials"
              onClick={() => {
                console.log(selectedUser)
              }}
            >
              {selectedUser?.firstname[0]}
              {selectedUser?.lastname[0]}
            </div>
          )}
          <div className="custom-modal-body-set">
            <p className="custom-modal-body-set-subtitle">
              {selectedUser?.jobtitle || 'Job title missing'}
            </p>
            <p className="custom-modal-body-set-title">
              {selectedUser?.firstname + ' ' + selectedUser?.lastname}
            </p>
          </div>

          <div className="custom-modal-body-buttons">
            <button
              className="button button-primary"
              onClick={() => {
                document.getElementById('usersModal')?.classList.remove('open')
                setTimeout(() => {
                  document
                    .getElementById('modalCard')
                    ?.classList.add('open')
                }, 300)
                setTimeout(() => {
                  setUserFeedbackOpen(true)
                }, 500)
              }}
            >
              {t('common:Openprofile')}
            </button>
          </div>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>

    </div>
        
          
          </>
  )
}

export default connector(OpenUserProfile)
