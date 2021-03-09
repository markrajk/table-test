import React, { useEffect, useRef, useState } from 'react'

import { AppDispatch, RootState } from 'src/configureStore'
import { signUp } from 'src/redux/auth/actions'
import { connect, ConnectedProps } from 'react-redux'
import { SignUpVariables } from 'src/apiTypes'
import Toaster from 'src/components/common/toaster'
import { useTranslation } from 'react-i18next'
import { useHistory } from 'react-router-dom'
import { getTeamById } from 'src/redux/teams/actions'
import { capitalize, validateEmail } from 'src/utitlity'

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  signup: (data: SignUpVariables) => dispatch(signUp(data)),
  getTeamById: (teamId: string) => dispatch(getTeamById(teamId)),
})

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  sessionRestored: state.authReducer.sessionRestored,
  error: state.authReducer.signinError,
  myTeams: state.teamReducer.myTeams,
})
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const Signup = (props: Props) => {
  const { t } = useTranslation(['authPages', 'common'])
  const { signup, user, error, sessionRestored, myTeams, getTeamById } = props
  const [email, setEmail] = useState('')
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  console.log(user)
  const { push } = useHistory()
  console.log(user, 'user')

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
    if (myTeams) {
      if (myTeams[0]) {
        push(`/team/ + ${myTeams[0]._id} + '/data/teamFeedback'`)
        getTeamById(myTeams[0]._id)
      } else {
        push('/team/')
      }
    }
  }, [myTeams])

  const [emailValidated, validate] = useState<boolean | undefined>(undefined)
  const [firstnameValid, setFirstnameValid] = useState<boolean | undefined>(undefined)
  const [lastnameValid, setLastnameValid] = useState<boolean | undefined>(undefined)
  const firstnameRef = useRef(null)
  const lastnameRef = useRef(null)
  const passwordRef = useRef(null)

  return (
    <main className="auth" id="create-account">
      <img
        src="/img/logo-only.png"
        alt="Team Feedback logo"
        className="auth-logo"
      />

      <div className="auth-card">
        <h2 className="auth-card-title">{t('authPages:Createyouraccount')}</h2>
        <div className={`input-container ${emailValidated === undefined ? '' : emailValidated ? 'pass' : 'fail'}`}>
          <input
          autoComplete='off'
            type="email"
            placeholder={`${t('common:Email')}`}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                //@ts-ignore
                firstnameRef.current.focus()
              }
            }}
            onBlur={() => {
              validate(validateEmail(email))
            }}
          />
          <i className="icon-check-circle"></i>
          <i className="icon-exclamation-circle"></i>
          <div className="show-password">
            <i className="icon-eye-open"></i>
            <i className="icon-eye-closed"></i>
          </div>
        </div>

        <div className="input-container-wrapper double">
          <div className={`input-container ${firstnameValid === undefined ? '' : firstnameValid ? 'pass' : 'fail'}`}>
          <input autoComplete="off" name="hidden" type="text" style={{display:'none'}} />
            <input
            autoComplete="off"
              type="text"
              ref={firstnameRef}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  //@ts-ignore
                  lastnameRef.current.focus()
                }
              }}
              placeholder={`${t('common:Firstname')}`}
              onChange={(e) => setFirstname( capitalize(e.target.value))}
              onBlur={() => {
                if (firstname) {
                  setFirstnameValid(true)
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
          <div className={`input-container ${lastnameValid === undefined ? '' : lastnameValid ? 'pass' : 'fail'}`}>
            <input
            autoComplete="off"
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  //@ts-ignore
                  passwordRef.current.focus()
                }
              }}
              ref={lastnameRef}
              placeholder={`${t('common:Lastname')}`}
              onChange={(e) => setLastname(capitalize(e.target.value))}
              onBlur={() => {
                if (firstname) {
                  setLastnameValid(true)
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
        </div>

        <div className="input-container password">
          <input
          autoComplete="off"
            ref={passwordRef}
            type={`${showPassword ? 'text' : 'password'}`}
            placeholder={`${t('authPages:Chooseapassowrd')}`}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                if (email && password && firstname && lastname) {
                  signup({
                    email,
                    password,
                    firstname,
                    lastname,
                  })
                } else {
                  window.alert('Missing fields')
                }
              }
            }}
          />
          <i className="icon-check-circle"></i>
          <i className="icon-exclamation-circle"></i>
          <div className={`show-password ${showPassword ? 'show' : ''}`} onClick={handleShowPassword}>
            <i className="icon-eye-open"></i>
            <i className="icon-eye-closed"></i>
          </div>
        </div>

        <p className="auth-card-text small">
          {t('authPages:disclaimer')}
          <button>{t('common:TermsofService')}</button>{' '}
          {t('authPages:andAcknowledge')}
          <button>{t('common:PrivacyPolicy')}.</button>
        </p>

        <button
          className="button button-primary"
          onClick={() => {
            if (email && password && firstname && lastname) {
              signup({
                email,
                password,
                firstname,
                lastname,
              })
            } else {
              window.alert('Missing fields')
            }
          }}
        >
          {t('common:Createaccount')}
        </button>
        <div className="auth-card-footer" onClick={() => push('/')}>
          <p className="auth-card-text">
            {t('authPages:Alreadyhaveanaccount')}
            <a>{t('common:Signin')}</a>
          </p>
        </div>
      </div>

      <Toaster
        type="error"
        instance={!!error}
        clear={() => null}
        text={error || ''}
      />
    </main>
  )
}

export default connector(Signup)
