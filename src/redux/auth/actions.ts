import {
  SignInVariables,
  SignUpVariables,
  User,
  CheckVerificationCodeVariables,
  UpdateProfileVariables,
  CompanyInvite,
} from 'src/apiTypes'
import {
  actions,
  SignInAction,
  SignUpAction,
  SignInSuccessAction,
  SignInFailedAction,
  RestoreSessionAction,
  RestoreSessionSuccessAction,
  ClearSignUpAction,
  LogoutAction,
  LogoutDoneAction,
  CheckVerificationCodeAction,
  CheckVerificationCodeFailedAction,
  CheckVerificationCodeSuccessAction,
  RequestPasswordResetCodeAction,
  RequestPasswordResetCodeSuccessAction,
  RequestPasswordResetCodeFailedAction,
  VerifyPasswordResetCodeAction,
  VerifyPasswordResetCodeSuccessAction,
  VerifyPasswordResetCodeFailedAction,
  ResetPasswordAction,
  ResetPasswordSuccessAction,
  ResetPasswordFailedAction,
  ChangePasswordAction,
  ChangePasswordSuccessAction,
  ChangePasswordFailedAction,
  UploadImagesAction,
  UploadImagesSuccessAction,
  UploadImagesFailedAction,
  UpdateProfileAction,
  UpdateProfileSuccessAction,
  UpdateProfileFailedAction,
  SendEmailVerificationAction,
  SendEmailVerificationSuccessAction,
  SendEmailVerificationFailedAction,
  VerifyEmailAction,
  VerifyEmailSuccessAction,
  VerifyEmailFailedAction,
  SelectUserAction,
  ClearDatabaseAction,
  UpdateUserSettingsAction,
  SetWindowWidthdAction,
  SendSupportEmailActions,
} from './constants'

import { Session } from 'src/redux/auth/UserSession'

export const restoreSession = (): RestoreSessionAction => ({
  type: actions.RESTORE_SESSION,
})

export const restoreSessionSuccess = (
  session: Session
): RestoreSessionSuccessAction => ({
  type: actions.RESTORE_SESSION_SUCCESS,
  session,
})

export const signIn = (data: SignInVariables): SignInAction => ({
  type: actions.SIGNIN,
  data,
})

export const signUp = (data: SignUpVariables): SignUpAction => ({
  type: actions.SIGNUP,
  data,
})

export const signInSuccess = (user: User, showWelcome?: boolean): SignInSuccessAction => ({
  type: actions.SIGNIN_SUCCESS,
  user, showWelcome
})

export const signInFailed = (error: string): SignInFailedAction => ({
  type: actions.SIGNIN_FAILED,
  error,
})

export const checkVerificationCode = (
  data: CheckVerificationCodeVariables
): CheckVerificationCodeAction => ({
  type: actions.CHECK_VERIFICATION_CODE,
  data,
})

export const checkVerificationCodeSuccess = (
  status: boolean
): CheckVerificationCodeSuccessAction => ({
  type: actions.CHECK_VERIFICATION_CODE_SUCCESS,
  status,
})

export const checkVerificationCodeFailed = (
  error: string
): CheckVerificationCodeFailedAction => ({
  type: actions.CHECK_VERIFICATION_CODE_FAILED,
  error,
})

export const requestPasswordResetCode = (
  email: string
): RequestPasswordResetCodeAction => ({
  type: actions.REQUEST_PASSWORD_RESET_CODE,
  email,
})

export const requestPasswordResetCodeSuccess = (
  status: boolean
): RequestPasswordResetCodeSuccessAction => ({
  type: actions.REQUEST_PASSWORD_RESET_CODE_SUCCESS,
  status,
})

export const requestPasswordResetCodeFailed = (
  error: string
): RequestPasswordResetCodeFailedAction => ({
  type: actions.REQUEST_PASSWORD_RESET_CODE_FAILED,
  error,
})

export const verifyPasswordResetCode = (
  data: CheckVerificationCodeVariables
): VerifyPasswordResetCodeAction => ({
  type: actions.VERIFY_PASSWORD_RESET_CODE,
  data,
})

export const verifyPasswordResetCodeSuccess = (
  status: boolean
): VerifyPasswordResetCodeSuccessAction => ({
  type: actions.VERIFY_PASSWORD_RESET_CODE_SUCCESS,
  status,
})

export const verifyPasswordResetCodeFailed = (
  error: string
): VerifyPasswordResetCodeFailedAction => ({
  type: actions.VERIFY_PASSWORD_RESET_CODE_FAILED,
  error,
})

export const passwordReset = (
  data: CheckVerificationCodeVariables & { password: string }
): ResetPasswordAction => ({
  type: actions.RESET_PASSWORD,
  data,
})

export const passwordResetSuccess = (
  status: boolean
): ResetPasswordSuccessAction => ({
  type: actions.RESET_PASSWORD_SUCCESS,
  status,
})

export const passwordResetFailed = (
  error: string
): ResetPasswordFailedAction => ({
  type: actions.RESET_PASSWORD_FAILED,
  error,
})

export const changePassword = (data: {
  oldPassword: string
  newPassword: string
}): ChangePasswordAction => ({
  type: actions.CHANGE_PASSWORD,
  data,
})

export const changePasswordSuccess = (
  status: boolean
): ChangePasswordSuccessAction => ({
  type: actions.CHANGE_PASSWORD_SUCCESS,
  status,
})

export const changePasswordFailed = (
  error: string
): ChangePasswordFailedAction => ({
  type: actions.CHANGE_PASSWORD_FAILED,
  error,
})

export const uploadImages = (image: any, name: string): UploadImagesAction => ({
  type: actions.UPLOAD_IMAGE,
  image,
  name,
})

export const uploadImagesSuccess = (
  result: any
): UploadImagesSuccessAction => ({
  type: actions.UPLOAD_IMAGE_SUCCESS,
  result,
})

export const uploadImagesFailed = (
  error: string
): UploadImagesFailedAction => ({
  type: actions.UPLOAD_IMAGE_FAILED,
  error,
})

export const updateProfile = (
  data: UpdateProfileVariables
): UpdateProfileAction => ({
  type: actions.UPDATE_PROFILE,
  data,
})

export const updateProfileSuccess = (
  data: UpdateProfileVariables
): UpdateProfileSuccessAction => ({
  type: actions.UPDATE_PROFILE_SUCCESS,
  data,
})

export const updateProfileFailed = (
  error: string
): UpdateProfileFailedAction => ({
  type: actions.UPDATE_PROFILE_FAILED,
  error,
})

export const sendEmailVerification = (
  email: string
): SendEmailVerificationAction => ({
  type: actions.SEND_EMAIL_VERIFICATION,
  email,
})

export const sendEmailVerificationSuccess = (
  status: true
): SendEmailVerificationSuccessAction => ({
  type: actions.SEND_EMAIL_VERIFICATION_SUCCESS,
  status,
})

export const sendEmailVerificationFailed = (
  error: string
): SendEmailVerificationFailedAction => ({
  type: actions.SEND_EMAIL_VERIFICATION_FAILED,
  error,
})

export const verifyEmail = (
  email: string,
  code: string
): VerifyEmailAction => ({
  type: actions.VERIFY_EMAIL,
  email,
  code,
})

export const verifyEmailSuccess = (status: true): VerifyEmailSuccessAction => ({
  type: actions.VERIFY_EMAIL_SUCCESS,
  status,
})

export const verifyEmailFailed = (error: string): VerifyEmailFailedAction => ({
  type: actions.VERIFY_EMAIL_FAILED,
  error,
})

export const clearSingnUp = (): ClearSignUpAction => ({
  type: actions.CLEAR_SIGNUP,
})

export const logout = (): LogoutAction => ({
  type: actions.LOGOUT,
})

export const logoutDone = (): LogoutDoneAction => ({
  type: actions.LOGOUT_DONE,
})

export const selectUser = (user: User | null): SelectUserAction => ({
  type: actions.SELECT_USER,
  user,
})

export const clearDatabase = (): ClearDatabaseAction => ({
  type: actions.CLEAR_DATABASE,
})

export const updateUserSettings = (
  settings?: any,
  size?: 'tablet' | 'desktop' | 'wide',
  pageIdentifier?: string,
  single?: any
): UpdateUserSettingsAction => ({
  type: actions.UPDATE_USER_SETTINGS,
  settings,
  size,
  pageIdentifier,
  single
})

export const setWindowWidth = (width: number): SetWindowWidthdAction => ({
  type: actions.SET_WINDOW_WIDTH,
  width,
})

export const sendSupportEmail = (message: string, subject: string): SendSupportEmailActions => ({
  type: actions.SEND_SUPPORT_EMAIL,
  message, subject
})
