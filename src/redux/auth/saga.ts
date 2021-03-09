import {
  actions,
  ChangePasswordAction,
  CheckVerificationCodeAction,
  LogoutAction,
  RequestPasswordResetCodeAction,
  ResetPasswordAction,
  RestoreSessionAction,
  SendEmailVerificationAction,
  SendSupportEmailActions,
  SignInAction,
  SignUpAction,
  UpdateProfileAction,
  UpdateUserSettingsAction,
  UploadImagesAction,
  VerifyEmailAction,
  VerifyEmailFailedAction,
  VerifyPasswordResetCodeAction,
} from './constants'

import {
  signInSuccess,
  signInFailed,
  restoreSessionSuccess,
  logoutDone,
  checkVerificationCodeSuccess,
  checkVerificationCodeFailed,
  requestPasswordResetCodeSuccess,
  requestPasswordResetCodeFailed,
  verifyPasswordResetCodeSuccess,
  verifyPasswordResetCodeFailed,
  passwordResetSuccess,
  passwordResetFailed,
  changePasswordSuccess,
  changePasswordFailed,
  uploadImagesSuccess,
  uploadImagesFailed,
  updateProfileSuccess,
  updateProfileFailed,
  sendEmailVerificationSuccess,
  sendEmailVerificationFailed,
  verifyEmailSuccess,
  verifyEmailFailed,
} from './actions'

import {
  SignInVariables,
  SignInResult,
  SignUpResult,
  CompanyInvite,
} from 'src/apiTypes'

import { call, put, all, takeLatest, select } from 'redux-saga/effects'

import request, {
  RequestReturnParam,
  RequestSuccess,
  RequestFail,
  requestUploadImage,
} from 'src/request'
import { login, logout, currentSession, removeCode } from './UserSession'
import { RootState } from 'src/configureStore'
import { createTeam, getMyTeams } from '../teams/actions'
import { getAllMyInvites } from '../invites/actions'

const {
  SIGNIN,
  SIGNUP,
  RESTORE_SESSION,
  LOGOUT,
  CHECK_VERIFICATION_CODE,
  REQUEST_PASSWORD_RESET_CODE,
  VERIFY_PASSWORD_RESET_CODE,
  RESET_PASSWORD,
  CHANGE_PASSWORD,
  UPLOAD_IMAGE,
  UPDATE_PROFILE,
  SEND_EMAIL_VERIFICATION,
  VERIFY_EMAIL,
  CLEAR_DATABASE,
  UPDATE_USER_SETTINGS,
  SEND_SUPPORT_EMAIL
} = actions
const getUser = (state: RootState) => state.authReducer.user

function* requestSignin(action: SignInAction, createDemo?: boolean, welcome?: boolean) {
  const credentials: SignInVariables = {
    email: action.data.email.toLowerCase(),
    password: action.data.password,
  }
  console.log(credentials)
  const requestURL = '/api/auth/signin'
  const signin: RequestReturnParam<SignInResult> = yield call<typeof request>(
    request,
    requestURL,
    'POST',
    credentials
  )



  if (signin.success) {
    const data = (signin as RequestSuccess<SignInResult>).data
    yield call<typeof login>(login, {
      user: data.user,
      jwt: data.token,
    })
    //  yield call(registerForPushNotificationsAsync)
    yield put(signInSuccess(data.user, welcome))
    yield call(getMyTeams)
    
    if (createDemo) {
      yield put(createTeam({
        name: data.user.firstname + "'s Test team",
        demo: true
  
      }))
    }
  } else {
    yield put(signInFailed((signin as RequestFail).message))
  }
}

function* requestSignup(action: SignUpAction) {
  console.log(action)

  if (action.data.profilePic) {
    //@ts-ignore
    const images = yield call(uploadImage, {
      image: action.data.profilePic,
      name: new Date().getTime(),
    })
    console.log(images)
    action.data.profilePic = images[0].photolink
  }

  const requestURL = `/api/auth/signup`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'POST', action.data)



  if (signupRes.success) {
    // yield put(signUpSuccess())
    yield call(requestSignin, action, true, true)
  } else {
    yield put(signInFailed((signupRes as RequestFail).message))
  }
}

function* verifyCode(action: CheckVerificationCodeAction) {
  const requestURL = `/api/auth/checkEmailVerificationCode?email=${action.data.email}&code=${action.data.code}`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'GET', null, false)

  if (signupRes.success) {
    yield call<typeof removeCode>(removeCode)
    yield put(checkVerificationCodeSuccess(true))
  } else {
    yield put(checkVerificationCodeFailed((signupRes as RequestFail).message))
  }
}

function* sendEmailVerification(action: SendEmailVerificationAction) {
  const requestURL = `/api/auth/sendEmailVerification`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(
    request,
    requestURL,
    'POST',
    {
      email: action.email,
    },
    false
  )

  if (signupRes.success) {
    yield put(sendEmailVerificationSuccess(true))
  } else {
    yield put(signInFailed((signupRes as RequestFail).message))
    //  yield put(sendEmailVerificationFailed((signupRes as RequestFail).message))
  }
}

function* verifyEmail(action: VerifyEmailAction) {
  const requestURL = `/api/auth/checkEmailVerificationCode?email=${action.email}&code=${action.code}`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'GET', null, false)

  if (signupRes.success) {
    yield put(verifyEmailSuccess(true))
  } else {
    yield put(signInFailed((signupRes as RequestFail).message))
    //yield put(verifyEmailFailed((signupRes as RequestFail).message))
  }
}

function* changePassword(action: ChangePasswordAction) {
  const requestURL = `/api/auth/changePassword`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'PUT', action.data, true)

  console.log(signupRes)

  if (signupRes.success) {
    yield put(changePasswordSuccess(true))
  } else {
    yield put(changePasswordFailed((signupRes as RequestFail).message))
  }
}

function* requestPasswordReset(action: RequestPasswordResetCodeAction) {
  console.log('action')
  console.log(action)

  const requestURL = `/api/auth/forgotPassword?email=${action.email}`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'GET', null, false)

  console.log('signupRes')
  console.log(signupRes)

  if (signupRes.success) {
    yield put(requestPasswordResetCodeSuccess(true))
  } else {
    yield put(
      requestPasswordResetCodeFailed((signupRes as RequestFail).message)
    )
  }
}

function* verifyPasswordReset(action: VerifyPasswordResetCodeAction) {
  console.log(action)

  const requestURL = `/api/auth/verifyPasswordResetCode?email=${action.data.email}&code=${action.data.code}`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'GET', null, false)

  if (signupRes.success) {
    yield put(verifyPasswordResetCodeSuccess(true))
  } else {
    yield put(verifyPasswordResetCodeFailed((signupRes as RequestFail).message))
  }
}

function* resetPassword(action: ResetPasswordAction) {
  const requestURL = `/api/auth/resetPassword`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'POST', action.data, false)

  console.log('signupRes')

  if (signupRes.success) {
    console.log('success')

    yield put(passwordResetSuccess(true))
  } else {
    console.log('faliked')
    yield put(passwordResetFailed((signupRes as RequestFail).message))
  }
}

function* clearDatabase() {
  const requestURL = `/api/auth/clearDataBase`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'DELETE', null, true)

  console.log('signupRes')

  if (signupRes.success) {
    console.log('success')
    yield call(logout)
    yield put(logoutDone())
  } else {
    console.log('faliked')
  }
}

export function* uploadImage(action: UploadImagesAction) {
  console.log('action')
  console.log(action)

  const formData = new FormData()

  const fileNamePos = action.image.name.lastIndexOf('.')
  const fileName = fileNamePos !== -1 ? action.image.slice(fileNamePos) : null
  formData.append(`fileToUpload[0]`, action.image)
  const signupRes: RequestReturnParam<any> = yield call<
    typeof requestUploadImage
  >(requestUploadImage, formData)

  console.log('signupRes')
  console.log(signupRes)

  if (signupRes.success) {
    console.log('success')

    yield put(uploadImagesSuccess(signupRes.data.images))
    return signupRes.data.images
  } else {
    console.log('faliked')
    yield put(uploadImagesFailed((signupRes as RequestFail).message))
  }
}

function* updateProfile(action: UpdateProfileAction) {
  console.log(action)

  const user = yield select(getUser)
  if (action.data.image) {
    //@ts-ignore
    const images = yield call(uploadImage, {
      image: action.data.image,
      name: user._id,
    })
    console.log(images)
    action.data.profilePic = images[0].photolink + '?' + new Date().getTime()
  }

  const requestURL = '/api/auth/updateUserProfile'

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    action.data,
    true
  )

  console.log(team)

  if (team.success) {
    const newUser = Object.assign({}, user, action.data)

    yield call<typeof login>(
      login,
      Object.assign({}, currentSession(), {
        user: newUser,
      })
    )
    //  yield call(registerForPushNotificationsAsync)
    yield put(updateProfileSuccess(action.data))
  } else {
    yield put(updateProfileFailed((team as RequestFail).message))
  }
}

function* updateUserSettings(action: UpdateUserSettingsAction) {
  const user = yield select(getUser)

  const requestURL = '/api/auth/updateUserSettings'
  let payload = {

  }
  if (action.single) {
    payload = {
      single: action.single
    }
  } else {
    payload = {
      settings: action.settings,
      size: action.size,
      pageIdentifier: action.pageIdentifier,
    }
  }
  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    payload,
    true
  )

  console.log(team)
  /* 
  if (team.success) {
    const newUser = Object.assign({}, user, {
      settings: Object.assign({}, user.settings, action.settings)
    })
    console.log(newUser, 'newUser')
    const currentS = currentSession()
    if (currentS.jwt) {
      yield call<typeof login>(
        login,
        {
          jwt: currentS.jwt,
          user: newUser
        }
      )
      yield put(signInSuccess(newUser))
    }
    
    //  yield call(registerForPushNotificationsAsync)
    
  } */
}



function* sendSupportEmail(action: SendSupportEmailActions) {


  const requestURL = '/api/auth/sendSupportEmail'

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'POST',
    {
      message: action.message,
      subject: action.subject
    },
    true
  )
  console.log(team);
  
}


export function* requestLogout(action: LogoutAction) {
  yield call(logout)
  yield put(logoutDone())
}

function* requestRestoreSession(action: RestoreSessionAction) {
  const session = yield call(currentSession)
  console.log(session)

  yield put(restoreSessionSuccess(session))
}

function* restoreSessionSaga() {
  yield takeLatest(RESTORE_SESSION, requestRestoreSession)
}

function* verifyCodeSaga() {
  yield takeLatest(CHECK_VERIFICATION_CODE, verifyCode)
}

function* verifyResetCodeSaga() {
  yield takeLatest(VERIFY_PASSWORD_RESET_CODE, verifyPasswordReset)
}

function* signinSaga() {
  yield takeLatest(SIGNIN, requestSignin)
}

function* signupSaga() {
  yield takeLatest(SIGNUP, requestSignup)
}

function* logoutSaga() {
  yield takeLatest(LOGOUT, requestLogout)
}

function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD, resetPassword)
}

function* requestPasswordResetSaga() {
  yield takeLatest(REQUEST_PASSWORD_RESET_CODE, requestPasswordReset)
}

function* changePasswordSaga() {
  yield takeLatest(CHANGE_PASSWORD, changePassword)
}
function* updateProfileSaga() {
  yield takeLatest(UPDATE_PROFILE, updateProfile)
}

function* uploadImageSaga() {
  yield takeLatest(UPLOAD_IMAGE, uploadImage)
}

function* sendEmailVerificationSaga() {
  yield takeLatest(SEND_EMAIL_VERIFICATION, sendEmailVerification)
}

function* verifyEmailSaga() {
  yield takeLatest(VERIFY_EMAIL, verifyEmail)
}

function* clearDatabaseSaga() {
  yield takeLatest(CLEAR_DATABASE, clearDatabase)
}

function* updateUserSettingsSaga() {
  yield takeLatest(UPDATE_USER_SETTINGS, updateUserSettings)
}

function* sendSupportEmailSaga() {
  yield takeLatest(SEND_SUPPORT_EMAIL, sendSupportEmail)
}

function* mainSaga() {
  yield all([
    call(signinSaga),
    call(signupSaga),
    call(restoreSessionSaga),
    call(logoutSaga),
    call(verifyCodeSaga),
    call(requestPasswordResetSaga),
    call(verifyResetCodeSaga),
    call(resetPasswordSaga),
    call(changePasswordSaga),
    call(uploadImageSaga),
    call(updateProfileSaga),
    call(sendEmailVerificationSaga),
    call(verifyEmailSaga),
    call(clearDatabaseSaga),
    call(updateUserSettingsSaga),
    call(sendSupportEmailSaga)
  ])
}

export default mainSaga
