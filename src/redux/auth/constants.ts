import {
  SignUpVariables,
  SignInVariables,
  User,
  CheckVerificationCodeVariables,
  UpdateProfileVariables,
  CompanyInvite,
} from 'src/apiTypes'

import { Session } from 'src/redux/auth/UserSession'

export const actions = {
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESTORE_SESSION_SUCCESS: 'RESTORE_SESSION_SUCCESS',
  SIGNUP: 'SIGNUP',
  SIGNIN: 'SIGNIN',
  SIGNIN_SUCCESS: 'SIGNIN_SUCCESS',
  SIGNIN_FAILED: 'SIGNIN_FAILED',
  CLEAR_SIGNUP: 'CLEAR_SIGNUP',
  LOGOUT: 'LOGOUT',
  LOGOUT_DONE: 'LOGOUT_DONE',
  CHECK_VERIFICATION_CODE: 'CHECK_VERIFICATION_CODE',
  CHECK_VERIFICATION_CODE_SUCCESS: 'CHECK_VERIFICATION_CODE_SUCCESS',
  CHECK_VERIFICATION_CODE_FAILED: 'CHECK_VERIFICATION_CODE_FAILED',
  REQUEST_PASSWORD_RESET_CODE: 'REQUEST_PASSWORD_RESET_CODE',
  REQUEST_PASSWORD_RESET_CODE_SUCCESS: 'REQUEST_PASSWORD_RESET_CODE_SUCCESS',
  REQUEST_PASSWORD_RESET_CODE_FAILED: 'REQUEST_PASSWORD_RESET_CODE_FAILED',
  VERIFY_PASSWORD_RESET_CODE: 'VERIFY_PASSWORD_RESET_CODE',
  VERIFY_PASSWORD_RESET_CODE_SUCCESS: 'VERIFY_PASSWORD_RESET_CODE_SUCCESS',
  VERIFY_PASSWORD_RESET_CODE_FAILED: 'VERIFY_PASSWORD_RESET_CODE_FAILED',
  RESET_PASSWORD: 'RESET_PASSWORD',
  RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS',
  RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  CHANGE_PASSWORD_SUCCESS: 'CHANGE_PASSWORD_SUCCESS',
  CHANGE_PASSWORD_FAILED: 'CHANGE_PASSWORD_FAILED',
  UPLOAD_IMAGE: 'UPLOAD_IMAGE',
  UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
  UPLOAD_IMAGE_FAILED: 'UPLOAD_IMAGE_FAILED',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  UPDATE_PROFILE_SUCCESS: 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_FAILED: 'UPDATE_PROFIßLE_FAILED',
  SEND_EMAIL_VERIFICATION: 'SEND_EMAIL_VERIFICATION',
  SEND_EMAIL_VERIFICATION_SUCCESS: 'SEND_EMAIL_VERIFICATION_SUCCESS_SUCCESS',
  SEND_EMAIL_VERIFICATION_FAILED: 'SEND_EMAIL_VERIFICATION_FAILED',
  VERIFY_EMAIL: 'VERIFY_EMAIL',
  VERIFY_EMAIL_SUCCESS: 'VERIFY_EMAIL_SUCCESS',
  VERIFY_EMAIL_FAILED: 'VERIFY_EMAIL_FAILED',
  SELECT_USER: 'SELECT_USER',
  CLEAR_DATABASE: 'CLEAR_DATABASE',
  UPDATE_USER_SETTINGS: 'UPDATE_USER_SETTINGS',
  SET_WINDOW_WIDTH: 'SET_WINDOW_WIDTH',
  SEND_SUPPORT_EMAIL: 'SEND_SUPPORT_EMAIL'
}

export interface AuthState {
  sigininin: boolean
  user: User | null
  signinError: string | null
  sessionRestored: boolean
  checkVerificationCodeError: string | null
  requestPasswordError: string | null
  resetCodeSent: boolean
  verifyCodeError: string | null
  emailVerified: boolean
  passwordResetError: string | null
  passwordReseted: false
  passwordChanged: boolean
  passwordChangeError: string | null
  toaster: string
  uploading: false
  uploadResult: string[] | null
  uploadError: string | null
  updateProfileError: string | null
  updatingProfile: boolean
  emailVerificationSent: boolean
  selectedUser: User | null
  windowWidth: number
  showWelcome: boolean
}

export interface SignUpAction {
  type: typeof actions.SIGNUP
  data: SignUpVariables
}

export interface SignInAction {
  type: typeof actions.SIGNIN
  data: SignInVariables
}

export interface SignInSuccessAction {
  type: typeof actions.SIGNIN_SUCCESS
  user: User
  showWelcome?: boolean
}

export interface SignInFailedAction {
  type: typeof actions.SIGNIN_FAILED
  error: string
}

export interface RestoreSessionAction {
  type: typeof actions.RESTORE_SESSION
}

export interface RestoreSessionSuccessAction {
  type: typeof actions.RESTORE_SESSION_SUCCESS
  session?: Session
}

export interface ClearSignUpAction {
  type: typeof actions.CLEAR_SIGNUP
}

export interface LogoutAction {
  type: typeof actions.LOGOUT
}

export interface LogoutDoneAction {
  type: typeof actions.LOGOUT_DONE
}

export interface CheckVerificationCodeAction {
  type: typeof actions.CHECK_VERIFICATION_CODE
  data: CheckVerificationCodeVariables
}

export interface CheckVerificationCodeSuccessAction {
  type: typeof actions.CHECK_VERIFICATION_CODE_SUCCESS
  status: boolean
}

export interface CheckVerificationCodeFailedAction {
  type: typeof actions.CHECK_VERIFICATION_CODE_FAILED
  error: string
}

export interface RequestPasswordResetCodeAction {
  type: typeof actions.REQUEST_PASSWORD_RESET_CODE
  email: string
}

export interface RequestPasswordResetCodeSuccessAction {
  type: typeof actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS
  status: boolean
}

export interface RequestPasswordResetCodeFailedAction {
  type: typeof actions.REQUEST_PASSWORD_RESET_CODE_FAILED
  error: string
}

export interface VerifyPasswordResetCodeAction {
  type: typeof actions.VERIFY_PASSWORD_RESET_CODE
  data: CheckVerificationCodeVariables
}

export interface VerifyPasswordResetCodeSuccessAction {
  type: typeof actions.VERIFY_PASSWORD_RESET_CODE_SUCCESS
  status: boolean
}

export interface VerifyPasswordResetCodeFailedAction {
  type: typeof actions.VERIFY_PASSWORD_RESET_CODE_FAILED
  error: string
}

export interface ResetPasswordAction {
  type: typeof actions.RESET_PASSWORD
  data: CheckVerificationCodeVariables & {
    password: string
  }
}

export interface ResetPasswordSuccessAction {
  type: typeof actions.RESET_PASSWORD_SUCCESS
  status: boolean
}

export interface ResetPasswordFailedAction {
  type: typeof actions.RESET_PASSWORD_FAILED
  error: string
}

export interface ChangePasswordAction {
  type: typeof actions.CHANGE_PASSWORD
  data: {
    oldPassword: string
    newPassword: string
  }
}

export interface ChangePasswordSuccessAction {
  type: typeof actions.CHANGE_PASSWORD_SUCCESS
  status: boolean
}

export interface ChangePasswordFailedAction {
  type: typeof actions.CHANGE_PASSWORD_FAILED
  error: string
}

export interface UploadImagesAction {
  type: typeof actions.UPLOAD_IMAGE
  image: any
  name: string
}

export interface UploadImagesSuccessAction {
  type: typeof actions.UPLOAD_IMAGE_SUCCESS
  result: string[]
}

export interface UploadImagesFailedAction {
  type: typeof actions.UPLOAD_IMAGE_FAILED
  error: string
}

export interface UpdateProfileAction {
  type: typeof actions.UPDATE_PROFILE
  data: UpdateProfileVariables
}

export interface UpdateProfileSuccessAction {
  type: typeof actions.UPDATE_PROFILE_SUCCESS
  data: UpdateProfileVariables
}

export interface UpdateProfileFailedAction {
  type: typeof actions.UPDATE_PROFILE_FAILED
  error: string
}

export interface SendEmailVerificationAction {
  type: typeof actions.SEND_EMAIL_VERIFICATION
  email: string
}

export interface SendEmailVerificationSuccessAction {
  type: typeof actions.SEND_EMAIL_VERIFICATION_SUCCESS
  status: true
}

export interface SendEmailVerificationFailedAction {
  type: typeof actions.SEND_EMAIL_VERIFICATION_FAILED
  error: string
}

export interface VerifyEmailAction {
  type: typeof actions.VERIFY_EMAIL
  email: string
  code: string
}

export interface VerifyEmailSuccessAction {
  type: typeof actions.VERIFY_EMAIL_SUCCESS
  status: true
}

export interface VerifyEmailFailedAction {
  type: typeof actions.VERIFY_EMAIL_FAILED
  error: string
}

export interface SelectUserAction {
  type: typeof actions.SELECT_USER
  user: User | null
}

export interface ClearDatabaseAction {
  type: typeof actions.CLEAR_DATABASE
}

export interface UpdateUserSettingsAction {
  type: typeof actions.UPDATE_USER_SETTINGS
  settings?: any
  size?: 'tablet' | 'desktop' | 'wide'
  pageIdentifier?: string
  single?: any
}

export interface SetWindowWidthdAction {
  type: typeof actions.SET_WINDOW_WIDTH
  width: number
}

export interface SendSupportEmailActions {
  type: typeof actions.SET_WINDOW_WIDTH
  message: string
  subject: string
}

export type AuthActionTypes =
  | SignUpAction
  | SignInAction
  | SignInSuccessAction
  | SignInFailedAction
  | RestoreSessionAction
  | RestoreSessionSuccessAction
  | ClearSignUpAction
  | LogoutAction
  | LogoutDoneAction
  | CheckVerificationCodeAction
  | CheckVerificationCodeSuccessAction
  | CheckVerificationCodeFailedAction
  | RequestPasswordResetCodeAction
  | RequestPasswordResetCodeSuccessAction
  | RequestPasswordResetCodeFailedAction
  | VerifyPasswordResetCodeAction
  | VerifyPasswordResetCodeSuccessAction
  | VerifyPasswordResetCodeFailedAction
  | ResetPasswordAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailedAction
  | UploadImagesAction
  | UploadImagesSuccessAction
  | UploadImagesFailedAction
  | SendEmailVerificationAction
  | SendEmailVerificationSuccessAction
  | SendEmailVerificationFailedAction
  | VerifyEmailAction
  | VerifyEmailSuccessAction
  | VerifyEmailFailedAction
  | SelectUserAction
  | UpdateUserSettingsAction
  | SetWindowWidthdAction
  | SendSupportEmailActions
