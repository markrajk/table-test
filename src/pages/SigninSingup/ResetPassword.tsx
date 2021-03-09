import React, { useEffect, useState } from "react"
import { connect, ConnectedProps } from "react-redux"
import { AppDispatch, RootState } from "src/configureStore"
import { requestPasswordResetCode, clearSingnUp, verifyPasswordResetCode, passwordReset } from 'src/redux/auth/actions'
import Loader from 'src/components/loaders'
import { CheckVerificationCodeVariables } from '../../apiTypes'
import { useHistory } from "react-router-dom"

const mapStateToProps = (state: RootState) => ({
    user: state.authReducer.user,
    resetCodeSent: state.authReducer.resetCodeSent,
    error: state.authReducer.requestPasswordError,
    loading: state.authReducer.sigininin,
    verifyCodeError: state.authReducer.verifyCodeError,
     emailVerified: state.authReducer.emailVerified,
     passwordReseted: state.authReducer.passwordReseted,
  })
  
  const mapDispatchToProps = (dispatch: AppDispatch) => ({
    requestCode: (email: string) => dispatch(requestPasswordResetCode(email)),
    clearSignup: () => dispatch(clearSingnUp()),
    verifyCode: (data: CheckVerificationCodeVariables) =>
    dispatch(verifyPasswordResetCode(data)),
    resetPassword: (
        data: CheckVerificationCodeVariables & { password: string }
      ) => dispatch(passwordReset(data)),
  })

  const connector = connect(mapStateToProps, mapDispatchToProps)
  type PropsFromRedux = ConnectedProps<typeof connector>

const ResetPassword = (props: PropsFromRedux) => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')
  const { requestCode, clearSignup, resetCodeSent, error, loading, verifyCode, verifyCodeError, emailVerified, resetPassword, passwordReseted } = props
  const [ showPassword, setShowPassword ] = useState(false)
  const { push } = useHistory()

  useEffect(() => {
    if (passwordReseted) {
        push('/')
    }
  }, [passwordReseted])
  useEffect(() => {
    if (error) {
        if (window.confirm(error)) {
            clearSignup()
          }
    }
  }, [error])
  useEffect(() => {
    if (verifyCodeError) {
        if (window.confirm(verifyCodeError)) {
            clearSignup()
          }
    }
  }, [verifyCodeError])
  useEffect(() => {
    if (resetCodeSent) {
        setStep(2)
    }
  }, [resetCodeSent])

  useEffect(() => {
    if (code.length === 4) {
        verifyCode({
            email,
            code
        })
    }
  }, [code])

  useEffect(() => {
    if (emailVerified) {
        setStep(3)
    }
  }, [emailVerified])
  

  if (step === 1) {
    return (
      <main className="auth" id="reset-password-01">
        <img
          src="/img/logo-only.png"
          alt="Team Feedback logo"
          className="auth-logo"
        />

        <div className="auth-card">
          <h2 className="auth-card-title">Forgot password</h2>
          <h3 className="auth-card-subtitle">
            Please enter your email address
          </h3>
          <div className="input-container">
            <input type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <i className="icon-check-circle"></i>
            <i className="icon-exclamation-circle"></i>
            <div className="show-password">
              <i className="icon-eye-open"></i>
              <i className="icon-eye-closed"></i>
            </div>
          </div>
          {loading ? (
          <Loader />
        ) : 
          <button className="button button-primary" onClick={() => {
            if (email) {
                requestCode(email)
            }
        }} >Confirm</button>}
          <div className="auth-card-footer">

            <button className="auth-card-link" onClick={() => push('/')} >Back to sign in</button>
            <p className="auth-card-text" onClick={() => push('/createAccount')} >
              Don’t have an account yet?
              <button>Create yours now.</button>
            </p>
          </div>
        </div>
      </main>
    )
  }
  if (step === 2) {
    return (
      <main className="auth" id="reset-password-02">
        <img
          src="/img/logo-only.png"
          alt="Team Feedback logo"
          className="auth-logo"
        />

        <div className="auth-card">
          <h2 className="auth-card-title">Forgot password</h2>
          <h3 className="auth-card-subtitle">
            We’ve sent you confirmation code to your email.
          </h3>
          <div className="input-container">
            <input type="number" value={code} onChange={(e) => {
                if ((/^[0-9]*$/).test(e.target.value) && e.target.value.length < 5) {
                    setCode(e.target.value)} 
                }
                
            } placeholder="Confirmation code" />
            <i className="icon-check-circle"></i>
            <i className="icon-exclamation-circle"></i>
            <div className="show-password">
              <i className="icon-eye-open"></i>
              <i className="icon-eye-closed"></i>
            </div>
          </div>

          <button className="button button-primary" onClick={() => setStep(3)}>Confirm</button>
          <div className="auth-card-footer">
            <button className="auth-card-link">Back to sign in</button>
            <p className="auth-card-text">
              Don’t have an account yet?
              <a href="../auth-sign-in/index.html">Create yours now.</a>
            </p>
          </div>
        </div>
      </main>
    )
  }
  return (
    <main className="auth" id="reset-password-03">
      <img
        src="/img/logo-only.png"
        alt="Team Feedback logo"
        className="auth-logo"
      />

      <div className="auth-card">
        <h2 className="auth-card-title">Forgot password</h2>
        <h3 className="auth-card-subtitle">Please select a new password.</h3>
        <div className="input-container password">
          <input type={showPassword ? 'text' : 'password'}  value={password} placeholder="New password" onChange={(e) => setPassword(e.target.value) } />
          <i className="icon-check-circle"></i>
          <i className="icon-exclamation-circle"></i>
          <div className="show-password" onClick={() => setShowPassword(!showPassword)}>
          <i className={!showPassword ? "icon-eye-closed" : "icon-eye-open"}></i>
          </div>
        </div>

        <div className="input-container password">
          <input type={showPassword ? 'text' : 'password'}  value={confirmPassword} placeholder="Confirm new password" onChange={(e) => setConfirmPassword(e.target.value) } />
          <i className="icon-check-circle"></i>
          <i className="icon-exclamation-circle"></i>
          <div className="show-password" onClick={() => setShowPassword(!showPassword)}>
            <i className={!showPassword ? "icon-eye-closed" : "icon-eye-open"}></i>
            
          </div>
        </div>

        <button className="button button-primary" onClick={() => {
            if (password && confirmPassword) {
                if (password.length < 8) {
                  return  window.alert('password should be atleast 8 characters')
                }
                resetPassword({
                    email,
                    code, 
                    password
                })
            } else {
                window.alert('password & confirm password does not match')
            }
        } }>Confirm</button>
        <div className="auth-card-footer">
          <button className="auth-card-link">Back to sign in</button>
          <p className="auth-card-text">
            Don’t have an account yet?
            <button>Create yours now.</button>
          </p>
        </div>
      </div>
    </main>
  )
}

export default connector(ResetPassword)
