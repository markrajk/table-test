import {
  Company,
  CompanyFeedbackData,
  CompanyPendingInvite,
  CreateCompanyVariables,
  InviteEmployeesVariables,
  Team,
  User,
} from 'src/apiTypes'
import { DeleteInviteAction } from '../invites/constants'
import {
  actions,
  CreateCompanySuccessAction,
  CreateCompanyFailedAction,
  GetCompanyByUserSuccessAction,
  GetCompanyByUserFailedAction,
  GetEmployeesAction,
  GetEmployeesSuccessAction,
  GetEmployeesFailedAction,
  ChangeUserStatusAction,
  ChangeUserStatusSuccessAction,
  ChangeUserStatusFailedAction,
  GetAdminsAction,
  GetAdminsSuccessAction,
  GetAdminsFailedAction,
  GetTeamsOfCompanyAction,
  GetTeamsOfCompanySuccessAction,
  GetTeamsOfCompanyFailedAction,
  ChangeTeamStatusAction,
  ChangeTeamStatusSuccessAction,
  ChangeTeamStatusFailedAction,
  GetFeedbackDataAction,
  GetFeedbackDataSuccessAction,
  GetCompanyPendingInvitesAction,
  GetCompanyPendingInvitesSuccessAction,
  GetCompanyPendingInvitesFailedAction,
  DeleteComapnyInviteAction,
  AddCompanyAdmin,
  AddCompanyAdminSuccess,
  AddCompanyAdminFailed,
} from './constants'

export const createCompany = (data: CreateCompanyVariables) => ({
  type: actions.CREATE_COMPANY,
  data,
})

export const createCompanySuccess = (
  company: Company
): CreateCompanySuccessAction => ({
  type: actions.CREATE_COMPANY_SUCCESS,
  company,
})

export const createCompanyFailed = (
  error: string
): CreateCompanyFailedAction => ({
  type: actions.CREATE_COMPANY_FAILED,
  error,
})

export const getCompanyByUser = () => ({
  type: actions.GET_COMPANY_BY_USER,
})

export const getCompanyByUserSuccess = (
  company: Company
): GetCompanyByUserSuccessAction => ({
  type: actions.GET_COMPANY_BY_USER_SUCCESS,
  company,
})

export const getCompanyByUserFailed = (
  error: string
): GetCompanyByUserFailedAction => ({
  type: actions.GET_COMPANY_BY_USER_FAILED,
  error,
})

export const inviteEmployees = (data: InviteEmployeesVariables) => ({
  type: actions.INVITE_EMPLOYEES,
  data,
})

export const clearCreatedCompany = () => ({
  type: actions.CLEAR_CREATED_COMPANY,
})

export const getEmployees = (
  employeeStatus?: 'archived' | 'active'
): GetEmployeesAction => ({
  type: actions.GET_EMPLOYEES,
  employeeStatus,
})

export const getEmployeesSuccess = (
  employees: User[]
): GetEmployeesSuccessAction => ({
  type: actions.GET_EMPLOYEES_SUCCESS,
  employees,
})

export const getEmployeesFailed = (
  error: string
): GetEmployeesFailedAction => ({
  type: actions.GET_EMPLOYEES_FAILED,
  error,
})

export const getAdmins = (): GetAdminsAction => ({
  type: actions.GET_ADMINS,
})

export const getAdminsSuccess = (admins: User[]): GetAdminsSuccessAction => ({
  type: actions.GET_ADMINS_SUCCESS,
  admins,
})

export const getAdminsFailed = (error: string): GetAdminsFailedAction => ({
  type: actions.GET_ADMINS_FAILED,
  error,
})

export const changeUserStatus = (
  userId: string,
  status: string,
  admin?: boolean
): ChangeUserStatusAction => ({
  type: actions.CHANGE_USER_STATUS,
  userId,
  status,
  admin,
})

export const changeUserStatusSuccess = (): ChangeUserStatusSuccessAction => ({
  type: actions.CHANGE_USER_STATUS_SUCCESS,
})

export const changeUserStatusFailed = (
  error: string
): ChangeUserStatusFailedAction => ({
  type: actions.CHANGE_USER_STATUS_FAILED,
  error,
})

export const getTeamsOfCompany = (
  status: 'active' | 'archived'
): GetTeamsOfCompanyAction => ({
  type: actions.GET_TEAMS_OF_COMPANY,
  status,
})

export const getTeamsOfCompanySuccess = (
  teams: Company[]
): GetTeamsOfCompanySuccessAction => ({
  type: actions.GET_TEAMS_OF_COMPANY_SUCCESS,
  teams,
})

export const getTeamsOfCompanyFailed = (
  error: string
): GetTeamsOfCompanyFailedAction => ({
  type: actions.GET_TEAMS_OF_COMPANY_FAILED,
  error,
})

export const addCompanyAdmin = (user: User): AddCompanyAdmin => ({
  type: actions.ADD_COMPANY_ADMIN,
  user,
})

export const addCompanyAdminSuccess = (): AddCompanyAdminSuccess => ({
  type: actions.ADD_COMPANY_ADMIN_SUCCESS,
})

export const addCompanyAdminFailed = (
  error: string
): AddCompanyAdminFailed => ({
  type: actions.ADD_COMPANY_ADMIN_FAILED,
  error,
})

export const changeTeamStatus = (
  teamId: string,
  status: string
): ChangeTeamStatusAction => ({
  type: actions.CHANGE_TEAM_STATUS,
  teamId,
  status,
})

export const changeTeamStatusSuccess = (): ChangeTeamStatusSuccessAction => ({
  type: actions.CHANGE_TEAM_STATUS_SUCCESS,
})

export const changeTeamStatusFailed = (
  error: string
): ChangeTeamStatusFailedAction => ({
  type: actions.CHANGE_TEAM_STATUS_FAILED,
  error,
})

export const getFeedbackData = (): GetFeedbackDataAction => ({
  type: actions.GET_FEEDBACK_DATA,
})

export const getFeedbackDataSuccess = (
  data: CompanyFeedbackData
): GetFeedbackDataSuccessAction => ({
  type: actions.GET_FEEDBACK_DATA_SUCCESS,
  data,
})

export const getFeedbackDataFailed = (
  error: string
): GetTeamsOfCompanyFailedAction => ({
  type: actions.GET_FEEDBACK_DATA_FAILED,
  error,
})

export const getCompanyPendingInvites = (): GetCompanyPendingInvitesAction => ({
  type: actions.GET_COMPANY_PENDING_INVITES,
})

export const getCompanyPendingInvitesSuccess = (
  data: CompanyPendingInvite[]
): GetCompanyPendingInvitesSuccessAction => ({
  type: actions.GET_COMPANY_PENDING_INVITES_SUCCESS,
  data,
})

export const getCompanyPendingInvitesFailed = (
  error: string
): GetCompanyPendingInvitesFailedAction => ({
  type: actions.GET_COMPANY_PENDING_INVITES_FAILED,
  error,
})

export const deleteInvite = (inviteId: string): DeleteComapnyInviteAction => ({
  type: actions.DELETE_COMPANY_INVITE,
  inviteId,
})
