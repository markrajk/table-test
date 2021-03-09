import { CompanyInvite, Invite, User } from 'src/apiTypes'

export const actions = {
  GET_MY_INVITES: 'GET_MY_INVITES',
  GET_MY_INVITES_SUCCESS: 'GET_MY_INVITES_SUCCESS',
  GET_MY_INVITES_FAILED: 'GET_MY_INVITES_FAILED',
  ACCEPT_INVITE: 'ACCEPT_INVITE',
  ACCEPT_INVITE_SUCCESS: 'ACCEPT_INVITE_SUCCESS',
  ACCEPT_INVITE_FAILED: 'ACCEPT_INVITE_FAILED',
  DELETE_INVITE: 'DELETE_INVITE',
  DELETE_INVITE_SUCCESS: 'DELETE_INVITE_SUCCESS',
  DELETE_INVITE_FAILED: 'DELETE_INVITE_FAILED',
  CLEAR_TOASTER: 'CLEAR_TOASTER',
  ACCEPT_COMPANY_INVITE: 'ACCEPT_COMPANY_INVITE',
  ACCEPT_COMPANY_INVITE_SUCCESS: 'ACCEPT_COMPANY_INVITE_SUCCESS',
  ACCEPT_COMPANY_INVITE_FAILED: 'ACCEPT_COMPANY_INVITE_FAILED',
  GET_COMPANY_INVITES: 'GET_MY_INVITES',
  GET_COMPANY_INVITES_FAILED: 'GET_MY_INVITES_FAILED',
  GET_COMPANY_INVITES_SUCCESS: 'GET_COMPANY_INVITES_SUCCESS',
}

export interface InviteState {
  loadingInvite: boolean
  invites: Invite[]
  getMyInviteError: string | null
  acceptInviteError: string | null
  toaster: string | null
  deleteInviteError: string | null
  acceptCompanyInviteError: string | null
  companyInvites: CompanyInvite[] | null
  getCompanyInvitesError: string | null
}

export interface GetMyInviteAction {
  type: typeof actions.GET_MY_INVITES
  email: string
}

export interface GetMyInviteSuccessAction {
  type: typeof actions.GET_MY_INVITES_SUCCESS
  invites: Invite[]
}

export interface GetMyInviteFailedAction {
  type: typeof actions.GET_MY_INVITES_FAILED
  error: string
}

export interface AcceptInviteAction {
  type: typeof actions.ACCEPT_INVITE
  inviteId: string
}

export interface AcceptInviteSuccessAction {
  type: typeof actions.ACCEPT_INVITE_SUCCESS
  inviteId: string
}

export interface AcceptInviteFailedAction {
  type: typeof actions.ACCEPT_INVITE_FAILED
  error: string
}

export interface AcceptCompanyInviteAction {
  type: typeof actions.ACCEPT_COMPANY_INVITE
  inviteId: string
  companyId: string
}


export interface AcceptCompanyInviteSuccessAction {
  type: typeof actions.ACCEPT_COMPANY_INVITE_SUCCESS
  inviteId: string
  companyId: string
}

export interface AcceptCompanyInviteFailedAction {
  type: typeof actions.ACCEPT_COMPANY_INVITE_FAILED
  error: string
}

export interface DeleteInviteAction {
  type: typeof actions.DELETE_INVITE
  data: {
    inviteType: string
    inviteId: string
  }
}

export interface DeleteInviteSuccessAction {
  type: typeof actions.DELETE_INVITE_SUCCESS
  data: {
    inviteType: string
    inviteId: string
  }
}

export interface DeleteInviteFailedAction {
  type: typeof actions.DELETE_INVITE_FAILED
  error: string
}

export interface GetCompanyInviteAction {
  type: typeof actions.GET_COMPANY_INVITES
}

export interface GetCompanyInviteSuccessAction {
  type: typeof actions.GET_COMPANY_INVITES_SUCCESS
  invites: CompanyInvite[]
}

export interface GetCompanyInviteFailedAction {
  type: typeof actions.GET_COMPANY_INVITES_FAILED
  error: string
}

export type InviteActionsTypes =
  | GetMyInviteAction
  | GetMyInviteSuccessAction
  | GetMyInviteFailedAction
  | AcceptInviteAction
  | AcceptInviteSuccessAction
  | AcceptInviteFailedAction
  | AcceptCompanyInviteAction
  | AcceptCompanyInviteSuccessAction
  | AcceptCompanyInviteFailedAction
  | GetCompanyInviteAction
  | GetCompanyInviteSuccessAction
  | GetCompanyInviteFailedAction
