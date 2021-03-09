import { CompanyInvite, Invite, User } from 'src/apiTypes'
import {
  AcceptInviteAction,
  AcceptInviteFailedAction,
  AcceptInviteSuccessAction,
  actions,
  DeleteInviteAction,
  GetMyInviteAction,
  GetMyInviteFailedAction,
  GetMyInviteSuccessAction,
  DeleteInviteSuccessAction,
  DeleteInviteFailedAction,
  AcceptCompanyInviteAction,
  AcceptCompanyInviteSuccessAction,
  AcceptCompanyInviteFailedAction,
  GetCompanyInviteAction,
  GetCompanyInviteSuccessAction,
  GetCompanyInviteFailedAction,
} from './constants'

export const getAllMyInvites = (email: string): GetMyInviteAction => ({
  type: actions.GET_MY_INVITES,
  email,
})

export const getAllMyInvitesSuccess = (
  invites: Invite[]
): GetMyInviteSuccessAction => ({
  type: actions.GET_MY_INVITES_SUCCESS,
  invites,
})

export const getAllMyInvitesFailed = (
  error: string
): GetMyInviteFailedAction => ({
  type: actions.GET_MY_INVITES_SUCCESS,
  error,
})

export const acceptInvite = (inviteId: string): AcceptInviteAction => ({
  type: actions.ACCEPT_INVITE,
  inviteId,
})

export const acceptInviteSuccess = (
  inviteId: string
): AcceptInviteSuccessAction => ({
  type: actions.ACCEPT_INVITE_SUCCESS,
  inviteId,
})

export const acceptInviteFailed = (
  error: string
): AcceptInviteFailedAction => ({
  type: actions.ACCEPT_INVITE_FAILED,
  error,
})

export const acceptCompanyInvite = (
  inviteId: string, companyId: string
): AcceptCompanyInviteAction => ({
  type: actions.ACCEPT_COMPANY_INVITE,
  inviteId, companyId
})

export const acceptCompanyInviteSuccess = (
  inviteId: string, companyId: string
): AcceptCompanyInviteSuccessAction => ({
  type: actions.ACCEPT_COMPANY_INVITE_SUCCESS,
  inviteId, companyId
})


export const acceptCompanyInviteFailed = (
  error: string
): AcceptCompanyInviteFailedAction => ({
  type: actions.ACCEPT_INVITE_FAILED,
  error,
})

export const deleteInvite = (data: {
  inviteId: string
  inviteType: string
}): DeleteInviteAction => ({
  type: actions.DELETE_INVITE,
  data,
})

export const deleteInviteSuccess = (data: {
  inviteId: string
  inviteType: string
}): DeleteInviteSuccessAction => ({
  type: actions.DELETE_INVITE_SUCCESS,
  data,
})

export const deleteInviteFailed = (
  error: string
): DeleteInviteFailedAction => ({
  type: actions.DELETE_INVITE_FAILED,
  error,
})

export const clearToaster = () => ({
  type: actions.CLEAR_TOASTER,
})

export const getCompanyInvites = (): GetCompanyInviteAction => ({
  type: actions.GET_COMPANY_INVITES,
})

export const getCompanyInvitesSuccess = (
  invites: CompanyInvite[]
): GetCompanyInviteSuccessAction => ({
  type: actions.GET_COMPANY_INVITES_SUCCESS,
  invites,
})

export const getCompanyInvitesFailed = (
  error: string
): GetCompanyInviteFailedAction => ({
  type: actions.GET_COMPANY_INVITES_FAILED,
  error,
})
