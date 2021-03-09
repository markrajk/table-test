import {
  actions,
  AuthState,
  AuthActionTypes,
  SignInSuccessAction,
  SignInFailedAction,
  RestoreSessionSuccessAction,
  CheckVerificationCodeFailedAction,
  RequestPasswordResetCodeFailedAction,
  VerifyPasswordResetCodeFailedAction,
  ResetPasswordFailedAction,
  ChangePasswordFailedAction,
  UploadImagesSuccessAction,
  UploadImagesFailedAction,
  UpdateProfileFailedAction,
  UpdateProfileSuccessAction,
  SelectUserAction,
  SetWindowWidthdAction,
} from './constants'

const initialState: AuthState = {
  user: null,
  sigininin: false,
  signinError: null,
  sessionRestored: false,
  checkVerificationCodeError: null,
  requestPasswordError: null,
  resetCodeSent: false,
  verifyCodeError: null,
  emailVerified: false,
  passwordResetError: null,
  passwordReseted: false,
  passwordChangeError: null,
  passwordChanged: false,
  toaster: '',
  uploading: false,
  uploadResult: null,
  uploadError: null,
  updateProfileError: null,
  updatingProfile: false,
  emailVerificationSent: false,
  selectedUser: null,
  windowWidth: window.innerWidth,
  showWelcome: false
}

const navReducer = (
  state = initialState,
  action: AuthActionTypes
): AuthState => {
  switch (action.type) {
    case actions.SIGNUP:
      return Object.assign({}, state, {
        sigininin: true,
        signinError: null,
      })
    case actions.SIGNIN:
      return Object.assign({}, state, {
        sigininin: true,
        signinError: null,
      })
    case actions.SIGNIN_SUCCESS:
      return Object.assign({}, state, {
        sigininin: false,
        user: (action as SignInSuccessAction).user,
        showWelcome: (action as SignInSuccessAction).showWelcome || false
      })
    case actions.SIGNIN_FAILED:
      return Object.assign({}, state, {
        sigininin: false,
        signinError: (action as SignInFailedAction).error,
      })
    case actions.CHECK_VERIFICATION_CODE:
      return Object.assign({}, state, {
        sigininin: true,
        checkVerificationCodeError: null,
      })
    case actions.CHECK_VERIFICATION_CODE_SUCCESS:
      console.log('wtf')

      return Object.assign({}, state, {
        sigininin: false,
        user: Object.assign({}, state.user, { code: false }),
      })
    case actions.CHECK_VERIFICATION_CODE_FAILED:
      return Object.assign({}, state, {
        sigininin: false,
        checkVerificationCodeError: (action as CheckVerificationCodeFailedAction)
          .error,
      })
    case actions.REQUEST_PASSWORD_RESET_CODE:
      return Object.assign({}, state, {
        sigininin: true,
        requestPasswordError: null,
        resetCodeSent: false,
      })
    case actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS:
      return Object.assign({}, state, {
        sigininin: false,
        resetCodeSent: true,
      })
    case actions.REQUEST_PASSWORD_RESET_CODE_FAILED:
      return Object.assign({}, state, {
        sigininin: false,
        requestPasswordError: (action as RequestPasswordResetCodeFailedAction)
          .error,
      })
    case actions.VERIFY_PASSWORD_RESET_CODE:
      return Object.assign({}, state, {
        sigininin: true,
        verifyCodeError: null,
      })
    case actions.VERIFY_PASSWORD_RESET_CODE_SUCCESS:
      return Object.assign({}, state, {
        sigininin: false,
        emailVerified: true,
      })
    case actions.VERIFY_PASSWORD_RESET_CODE_FAILED:
      return Object.assign({}, state, {
        sigininin: false,
        verifyCodeError: (action as VerifyPasswordResetCodeFailedAction).error,
      })
    case actions.RESET_PASSWORD:
      return Object.assign({}, state, {
        sigininin: true,
        passwordResetError: null,
      })
    case actions.RESET_PASSWORD_SUCCESS:
      console.log('passwordreset')
      return Object.assign({}, state, {
        sigininin: false,
        passwordReseted: true,
      })
    case actions.RESET_PASSWORD_FAILED:
      return Object.assign({}, state, {
        sigininin: false,
        passwordResetError: (action as ResetPasswordFailedAction).error,
      })
    case actions.UPLOAD_IMAGE:
      return Object.assign({}, state, {
        uploading: true,
        uploadError: null,
      })
    case actions.UPLOAD_IMAGE_SUCCESS:
      console.log('passwordreset')
      return Object.assign({}, state, {
        uploading: false,
        uploadResult: (action as UploadImagesSuccessAction).result,
      })
    case actions.UPLOAD_IMAGE_FAILED:
      return Object.assign({}, state, {
        uploading: false,
        uploadError: (action as UploadImagesFailedAction).error,
      })
    case actions.CHANGE_PASSWORD:
      return Object.assign({}, state, {
        sigininin: true,
        changePasswordError: null,
      })
    case actions.CHANGE_PASSWORD_SUCCESS:
      console.log('passwordreset')
      return Object.assign({}, state, {
        sigininin: false,
        toaster: 'Password updated successfully',
        passwordChanged: true,
      })
    case actions.CHANGE_PASSWORD_FAILED:
      return Object.assign({}, state, {
        sigininin: false,
        passwordChangeError: (action as ChangePasswordFailedAction).error,
      })
    case actions.UPDATE_PROFILE:
      return Object.assign({}, state, {
        updatingProfile: true,
        updateProfileError: null,
      })
    case actions.UPDATE_PROFILE_SUCCESS:
      return Object.assign({}, state, {
        updatingProfile: false,
        user: Object.assign(
          {},
          state.user,
          (action as UpdateProfileSuccessAction).data
        ),
      })
    case actions.UPDATE_PROFILE_FAILED:
      return Object.assign({}, state, {
        updatingProfile: false,
        updateProfileError: (action as UpdateProfileFailedAction).error,
      })
    case actions.RESTORE_SESSION_SUCCESS:
      return Object.assign({}, state, {
        user: (action as RestoreSessionSuccessAction).session?.user,
        sessionRestored: true,
      })

    case actions.CLEAR_SIGNUP:
      return Object.assign({}, state, {
        signinError: null,
        emailVerified: false,
        passwordReseted: false,
        resetCodeSent: false,
        toaster: '',
        passwordChanged: false,
        passwordChangeError: '',
        showWelcome: false
      })
    case actions.SEND_EMAIL_VERIFICATION:
      return Object.assign({}, state, {
        sigininin: true,
        emailVerificationSent: false,
      })
    case actions.SEND_EMAIL_VERIFICATION_SUCCESS:
      return Object.assign({}, state, {
        sigininin: false,
        emailVerificationSent: true,
      })
    case actions.SEND_EMAIL_VERIFICATION_FAILED:
      return Object.assign({}, state, {
        sigininin: false,
        emailVerificationSent: false,
      })

    case actions.VERIFY_EMAIL:
      return Object.assign({}, state, {
        sigininin: true,
        emailVerified: false,
      })
    case actions.VERIFY_EMAIL_SUCCESS:
      return Object.assign({}, state, {
        sigininin: false,
        emailVerified: true,
      })
    case actions.VERIFY_EMAIL_FAILED:
      return Object.assign({}, state, {
        sigininin: false,
        emailVerified: false,
        verifyCodeError: (action as VerifyPasswordResetCodeFailedAction).error,
      })

    case actions.LOGOUT_DONE:
      return Object.assign({}, state, {
        user: null,
      })
    case actions.SELECT_USER:
      return Object.assign({}, state, {
        selectedUser: (action as SelectUserAction).user,
      })
    case actions.SET_WINDOW_WIDTH:
      return Object.assign({}, state, {
        windowWidth: (action as SetWindowWidthdAction).width,
      })
    default:
      return state
  }
}

export default navReducer
