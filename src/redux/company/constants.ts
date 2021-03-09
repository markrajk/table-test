import {
  Company,
  CompanyFeedbackData,
  CompanyPendingInvite,
  CreateCompanyVariables,
  InviteEmployeesVariables,
  Team,
  User,
} from 'src/apiTypes'

export const actions = {
  CREATE_COMPANY: 'CREATE_COMPANY',
  CREATE_COMPANY_SUCCESS: 'CREATE_COMPANY_SUCCESS',
  CREATE_COMPANY_FAILED: 'CREATE_COMPANY_FAILED',
  CLEAR_CREATED_COMPANY: 'CLEAR_CREATED_COMPANY',

  GET_COMPANY_BY_USER: 'GET_COMPANY_BY_USER',
  GET_COMPANY_BY_USER_SUCCESS: 'GET_COMPANY_BY_USER_SUCCESS',
  GET_COMPANY_BY_USER_FAILED: 'GET_COMPANY_BY_USER_FAILED',

  INVITE_EMPLOYEES: 'INVITE_EMPLOYEES',
  INVITE_EMPLOYEES_SUCCESS: 'INVITE_EMPLOYEES',
  INVITE_EMPLOYEES_FAILED: 'INVITE_EMPLOYEES_FAILED',

  GET_EMPLOYEES: 'GET_EMPLOYEES',
  GET_EMPLOYEES_SUCCESS: 'GET_EMPLOYEES_SUCCESS',
  GET_EMPLOYEES_FAILED: 'GET_EMPLOYEES_FAILED',

  CHANGE_USER_STATUS: 'CHANGE_USER_STATUS',
  CHANGE_USER_STATUS_SUCCESS: 'CHANGE_USER_STATUS_SUCCESS',
  CHANGE_USER_STATUS_FAILED: 'CHANGE_USER_STATUS_FAILED',

  GET_ADMINS: 'GET_ADMINS',
  GET_ADMINS_SUCCESS: 'GET_ADMINS_SUCCESS',
  GET_ADMINS_FAILED: 'GET_ADMINS_FAILED',

  GET_TEAMS_OF_COMPANY: 'GET_TEAMS_OF_COMPANY',
  GET_TEAMS_OF_COMPANY_SUCCESS: 'GET_TEAMS_OF_COMPANY_SUCCESS',
  GET_TEAMS_OF_COMPANY_FAILED: 'GET_TEAMS_OF_COMPANY_FAILED',

  CHANGE_TEAM_STATUS: 'CHANGE_TEAM_STATUS',
  CHANGE_TEAM_STATUS_SUCCESS: 'CHANGE_TEAM_STATUS_SUCCESS',
  CHANGE_TEAM_STATUS_FAILED: 'CHANGE_TEAM_STATUS_FAILED',

  GET_FEEDBACK_DATA: 'GET_FEEDBACK_DATA',
  GET_FEEDBACK_DATA_SUCCESS: 'GET_FEEDBACK_DATA_SUCCESS',
  GET_FEEDBACK_DATA_FAILED: 'GET_FEEDBACK_DATA_FAILED',

  GET_COMPANY_PENDING_INVITES: 'GET_COMPANY_PENDING_INVITES',
  GET_COMPANY_PENDING_INVITES_SUCCESS: 'GET_COMPANY_PENDING_INVITES_SUCCESS',
  GET_COMPANY_PENDING_INVITES_FAILED: 'GET_COMPANY_PENDING_INVITES_FAILED',

  ADD_COMPANY_ADMIN: 'ADD_COMPANY_ADMIN',
  ADD_COMPANY_ADMIN_SUCCESS: 'ADD_COMPANY_ADMIN_SUCCESS',
  ADD_COMPANY_ADMIN_FAILED: 'ADD_COMPANY_ADMIN_FAILED',

  DELETE_COMPANY_INVITE: 'DELETE_COMPANY_INVITE',
}

export interface CompanyState {
  loadingCompany: boolean
  companyCreated: boolean
  createCompanyError: string | null
  company: Company | null
  getCompanyByUserError: string | null
  employees: User[] | null
  getEmployeesError: string | null
  changeUserStatusError: string | null
  admins: User[] | null
  getAdminsError: string | null
  teamsOfCompany: Company | null
  getTeamsOfCompanyError: string | null
  changeTeamStatusError: null | string
  feedbackData: CompanyFeedbackData | null
  getFeedbackDataError: string | null
  gettingCompanyPendingInvites: boolean
  companyPendingInvites: CompanyPendingInvite[] | null
  getCompanyPendingInvitesError: string | null
  adminAdded: boolean
  addAdminError: string | null
}

export interface CreateCompanyAction {
  type: typeof actions.CREATE_COMPANY
  data: CreateCompanyVariables
}

export interface CreateCompanySuccessAction {
  type: typeof actions.CREATE_COMPANY_SUCCESS
  company: Company
}

export interface CreateCompanyFailedAction {
  type: typeof actions.CREATE_COMPANY_FAILED
  error: string
}
export interface GetCompanyByUserAction {
  type: typeof actions.GET_COMPANY_BY_USER
}

export interface GetCompanyByUserSuccessAction {
  type: typeof actions.GET_COMPANY_BY_USER_SUCCESS
  company: Company
}

export interface GetCompanyByUserFailedAction {
  type: typeof actions.GET_COMPANY_BY_USER_FAILED
  error: string
}

export interface InviteEmployeesAction {
  type: typeof actions.INVITE_EMPLOYEES
  data: InviteEmployeesVariables
}

export interface GetEmployeesAction {
  type: typeof actions.GET_EMPLOYEES
  employeeStatus?: 'active' | 'archived'
}

export interface GetEmployeesSuccessAction {
  type: typeof actions.GET_EMPLOYEES_SUCCESS
  employees: User[]
}

export interface GetEmployeesFailedAction {
  type: typeof actions.GET_EMPLOYEES_FAILED
  error: string
}

export interface GetAdminsAction {
  type: typeof actions.GET_ADMINS
}

export interface GetAdminsSuccessAction {
  type: typeof actions.GET_ADMINS_SUCCESS
  admins: User[]
}

export interface GetAdminsFailedAction {
  type: typeof actions.GET_ADMINS_FAILED
  error: string
}

export interface ChangeUserStatusAction {
  type: typeof actions.CHANGE_USER_STATUS
  userId: string
  status: string
  admin?: boolean
}

export interface ChangeUserStatusSuccessAction {
  type: typeof actions.CHANGE_USER_STATUS_SUCCESS
}

export interface ChangeUserStatusFailedAction {
  type: typeof actions.CHANGE_USER_STATUS_FAILED
  error: string
}

export interface GetTeamsOfCompanyAction {
  type: typeof actions.GET_TEAMS_OF_COMPANY
  status?: 'active' | 'archived'
}

export interface GetTeamsOfCompanySuccessAction {
  type: typeof actions.GET_TEAMS_OF_COMPANY_SUCCESS
  teams: Company[]
}

export interface GetTeamsOfCompanyFailedAction {
  type: typeof actions.GET_TEAMS_OF_COMPANY_FAILED
  error: string
}

export interface ChangeTeamStatusAction {
  type: typeof actions.CHANGE_TEAM_STATUS
  teamId: string
  status: string
}

export interface ChangeTeamStatusSuccessAction {
  type: typeof actions.CHANGE_TEAM_STATUS_SUCCESS
}

export interface ChangeTeamStatusFailedAction {
  type: typeof actions.CHANGE_TEAM_STATUS_FAILED
  error: string
}

export interface GetFeedbackDataAction {
  type: typeof actions.GET_FEEDBACK_DATA
}

export interface GetFeedbackDataSuccessAction {
  type: typeof actions.GET_FEEDBACK_DATA_SUCCESS
  data: CompanyFeedbackData
}

export interface GetFeedbackDataFailedAction {
  type: typeof actions.GET_FEEDBACK_DATA_FAILED
  error: string
}

export interface GetCompanyPendingInvitesAction {
  type: typeof actions.GET_COMPANY_PENDING_INVITES
}

export interface GetCompanyPendingInvitesSuccessAction {
  type: typeof actions.GET_COMPANY_PENDING_INVITES_SUCCESS
  data: CompanyPendingInvite[]
}

export interface GetCompanyPendingInvitesFailedAction {
  type: typeof actions.GET_COMPANY_PENDING_INVITES_FAILED
  error: string
}

export interface AddCompanyAdmin {
  type: typeof actions.ADD_COMPANY_ADMIN
  user: User
}

export interface AddCompanyAdminSuccess {
  type: typeof actions.ADD_COMPANY_ADMIN_SUCCESS
}

export interface AddCompanyAdminFailed {
  type: typeof actions.ADD_COMPANY_ADMIN_FAILED
  error: string
}

export interface DeleteComapnyInviteAction {
  type: typeof actions.DELETE_COMPANY_INVITE
  inviteId: string
}

export type CompanyActions =
  | CreateCompanyAction
  | CreateCompanySuccessAction
  | CreateCompanyFailedAction
  | GetCompanyByUserAction
  | GetCompanyByUserFailedAction
  | GetCompanyByUserFailedAction
  | InviteEmployeesAction
  | GetEmployeesAction
  | GetEmployeesSuccessAction
  | GetEmployeesFailedAction
  | GetTeamsOfCompanyAction
  | GetTeamsOfCompanySuccessAction
  | GetTeamsOfCompanyFailedAction
  | ChangeTeamStatusAction
  | ChangeTeamStatusSuccessAction
  | ChangeTeamStatusFailedAction
  | GetFeedbackDataAction
  | GetFeedbackDataSuccessAction
  | GetFeedbackDataFailedAction
  | GetCompanyPendingInvitesAction
  | GetCompanyPendingInvitesSuccessAction
  | GetCompanyPendingInvitesFailedAction
  | DeleteComapnyInviteAction
  | AddCompanyAdmin
  | AddCompanyAdminSuccess
  | AddCompanyAdminFailed
