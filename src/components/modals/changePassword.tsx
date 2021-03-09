import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { AppDispatch, RootState } from 'src/configureStore'
import { changePassword, clearSingnUp } from 'src/redux/auth/actions'
import Toaster from '../common/toaster'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  passwordChanged: state.authReducer.passwordChanged,
  error: state.authReducer.passwordChangeError,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  changePassword: (data: { oldPassword: string; newPassword: string }) =>
    dispatch(changePassword(data)),
  clear: () => dispatch(clearSingnUp()),
})
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const ChangePassword = (props: Props) => {
  const { t } = useTranslation(['changePasswordModal', 'common'])
  const { changePassword, passwordChanged, error, clear } = props
  const [oldPassword, setOldPassoword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [errorNew, setError] = useState('')

  useEffect(() => {
    if (error) {
      setError(error)
      clear()
    }
  }, [error])

  useEffect(() => {
    if (passwordChanged) {
      document.getElementById('changePasswordModal')?.classList.remove('open')
    }
  }, [passwordChanged])

  return (
    <div className="custom-modal-wrapper" id="changePasswordModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="changePasswordModal"
            onClick={() =>
              document
                .getElementById('changePasswordModal')
                ?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-body-title">
            {t('changePasswordModal:Changepasswword')}
          </p>
          <p className="custom-modal-body-label">
            {t('changePasswordModal:Currentpasswword')}
          </p>
          <div className="custom-modal-body-input-container">
            <input
              type="password"
              placeholder={`${t('changePasswordModal:Enterpassword')}`}
              value={oldPassword}
              onChange={(e) => setOldPassoword(e.target.value)}
            />
          </div>

          <p className="custom-modal-body-label">
            {t('changePasswordModal:Chooseanewpasswword')}
          </p>
          <div className="custom-modal-body-input-container">
            <input
              type="password"
              placeholder={`${t('changePasswordModal:Enternewpassword')}`}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <p className="custom-modal-body-label">
            {t('changePasswordModal:Confirmnewpasswword')}
          </p>
          <div className="custom-modal-body-input-container">
            <input
              type="password"
              placeholder={`${t('changePasswordModal:Confirmnewpassword')}`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>

        <div className="custom-modal-footer">
          <button
            className="button button-light-gray"
            close-modal="changePasswordModal"
          >
            {t('common:Cancel')}
          </button>
          <button
            className="button button-primary send-feedback-modal"
            onClick={() => {
              if (confirmPassword && oldPassword && newPassword) {
                if (confirmPassword !== newPassword) {
                  setError('confirm password does not match')
                } else {
                  changePassword({
                    newPassword,
                    oldPassword,
                  })
                }
              } else {
                setError('Input all fields')
              }
            }}
          >
            {t('common:Confirm')}
          </button>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
      <Toaster
        type="error"
        instance={!!errorNew}
        text={errorNew}
        clear={() => setError('')}
      />
      <Toaster
        type="success"
        instance={passwordChanged}
        text={'Password changed successfully'}
        clear={clear}
      />
    </div>
  )
}

export default connector(ChangePassword)
