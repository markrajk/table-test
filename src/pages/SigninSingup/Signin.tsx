import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AppDispatch, RootState } from 'src/configureStore'
import { clearSingnUp, signIn } from 'src/redux/auth/actions'
import { connect, ConnectedProps } from 'react-redux'
import { SignInVariables } from 'src/apiTypes'
import { useHistory } from 'react-router-dom'
import { useEffect } from 'react'
import { validateEmail } from 'src/utitlity'
import Toaster from 'src/components/common/toaster'
import { useTranslation } from 'react-i18next'
import { getMyTeams, getTeamById } from 'src/redux/teams/actions'
import Loader from 'src/components/loaders'
const mapDispatchToProps = (dispatch: AppDispatch) => ({
  signin: (data: SignInVariables) => dispatch(signIn(data)),
  getMyTeams: () => dispatch(getMyTeams()),
  getTeamById: (teamId: string) => dispatch(getTeamById(teamId)),
  clearSignup: () => dispatch(clearSingnUp()),
})

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  sessionRestored: state.authReducer.sessionRestored,
  error: state.authReducer.signinError,
  myTeams: state.teamReducer.myTeams,
  sigininin: state.authReducer.sigininin,
  passwordReseted: state.authReducer.passwordReseted
})
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const Signin = (props: Props) => {
  const { t } = useTranslation(['authPages', 'common'])
  const {
    signin,
    user,
    sessionRestored,
    error,
    getMyTeams,
    myTeams,
    getTeamById,
    sigininin,
    passwordReseted,
    clearSignup
  } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { push } = useHistory()


  useEffect(() => {
    if (sessionRestored) {
      if (user && user._id) {
        //getMyTeams()
      } else {
        //push('/')
      }
    }
  }, [user, sessionRestored])

  useEffect(() => {
    if (myTeams && user) {
      if (myTeams[0]) {
        push(`/team/ + ${myTeams[0]._id} + '/data/teamFeedback'`)
        getTeamById(myTeams[0]._id)
      } else {
        push('/team/')
      }
    }
  }, [myTeams])
  const inputRef = useRef(null)
  return (
    <>
      <img
        src="img/logo-only.png"
        alt="Team Feedback logo"
        className="auth-logo"
      />

      <div className="auth-card">
        <h2 className="auth-card-title">
          {t('authPages:Signinto')} Team Feedback
        </h2>
        ;
        <div
          className={`input-container ${validateEmail(email) ? 'pass' : ''}`}
        >
          <input
            type="email"
            placeholder={`${t('common:Email')}`}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                //@ts-ignore
                inputRef?.current?.focus()
              }
            }}

          />
          <i className="icon-check-circle"></i>
          <i className="icon-exclamation-circle"></i>
          <div className="show-password">
            <i className="icon-eye-open"></i>
            <i className="icon-eye-closed"></i>
          </div>
        </div>
        <div className={`input-container ${password.length > 6 ? 'pass' : ''}`}>
          <input
            type="password"
            ref={inputRef}
            placeholder={`${t('common:Password')}`}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (email && password) {
                  signin({
                    email,
                    password,
                  })
                } else {
                  window.alert(t('common:Enteremailandpassword'))
                }
              }
            }}
          />
          <i className="icon-check-circle"></i>
          <i className="icon-exclamation-circle"></i>
          <div className="show-password">
            <i className="icon-eye-open"></i>
            <i className="icon-eye-closed"></i>
          </div>
        </div>
        {sigininin ? (
          <Loader />
        ) : (
          <button
            className="button button-primary"
            onClick={() => {
              if (email && password) {
                signin({
                  email,
                  password,
                })
              } else {
                window.alert(t('common:Enteremailandpassword'))
              }
            }}
          >
            Sign in
          </button>
        )}
        <div className="auth-card-footer">
          <button className="auth-card-link" onClick={() => push('/resetPassword')}>
            {t('authPages:Forgottenpassword')}
          </button>
          <p className="auth-card-text">
            {t('authPages:Donthaveaccount')}
            <Link to="/createAccount"> {t('authPages:Createyoursnow')}.</Link>
          </p>
        </div>
      </div>
      <Toaster
        type="error"
        instance={!!error}
        clear={() => 5000}
        text={error || ''}
      />
      <Toaster
        type="success"
        instance={!!passwordReseted}
        clear={() => clearSignup() }
        text={'Password reset successfull. Login with your new password'}
      />
    </>
  )
}

export default connector(Signin)
