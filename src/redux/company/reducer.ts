import {
  actions,
  GetCompanyByUserFailedAction,
  GetCompanyByUserSuccessAction,
  GetEmployeesSuccessAction,
  GetEmployeesFailedAction,
  ChangeUserStatusFailedAction,
  ChangeUserStatusSuccessAction,
  ChangeUserStatusAction,
  GetAdminsSuccessAction,
  GetAdminsFailedAction,
  GetTeamsOfCompanySuccessAction,
  GetTeamsOfCompanyFailedAction,
  ChangeTeamStatusAction,
  ChangeTeamStatusFailedAction,
  GetFeedbackDataSuccessAction,
  GetFeedbackDataFailedAction,
  GetCompanyPendingInvitesSuccessAction,
  GetCompanyPendingInvitesFailedAction,
  DeleteComapnyInviteAction,
  AddCompanyAdminSuccess,
  AddCompanyAdmin,
} from './constants'
import {
  CompanyActions,
  CompanyState,
  CreateCompanyFailedAction,
} from './constants'

import { actions as authActions } from '../auth/constants'

const initialState: CompanyState = {
  company: null,
  loadingCompany: false,
  companyCreated: false,
  createCompanyError: null,
  getCompanyByUserError: null,
  employees: null,
  getEmployeesError: null,
  changeUserStatusError: null,
  admins: null,
  getAdminsError: null,
  teamsOfCompany: null,
  getTeamsOfCompanyError: null,
  changeTeamStatusError: null,
  getFeedbackDataError: null,
  feedbackData: null,
  companyPendingInvites: null,
  gettingCompanyPendingInvites: false,
  getCompanyPendingInvitesError: null,
  adminAdded: false,
  addAdminError: null,
}

const companyReducer = (
  state = initialState,
  action: CompanyActions
): CompanyState => {
  switch (action.type) {
    case actions.CREATE_COMPANY:
      return Object.assign({}, state, {
        loadingCompany: true,
        createCompanyError: null,
      })
    case actions.CREATE_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        loadingCompany: false,
        companyCreated: true,
      })
    case actions.CREATE_COMPANY_FAILED:
      return Object.assign({}, state, {
        loadingCompany: false,
        createCompanyError: (action as CreateCompanyFailedAction).error,
      })
    case actions.GET_COMPANY_BY_USER:
      return Object.assign({}, state, {
        loadingCompany: true,
        getCompanyByUserError: null,
      })
    case actions.GET_COMPANY_BY_USER_SUCCESS:
      return Object.assign({}, state, {
        loadingCompany: false,
        getCompanyByUserError: null,
        company: (action as GetCompanyByUserSuccessAction).company,
      })
    case actions.GET_COMPANY_BY_USER_FAILED:
      return Object.assign({}, state, {
        loadingCompany: false,
        getCompanyByUserError: (action as GetCompanyByUserFailedAction).error,
      })

    case actions.GET_EMPLOYEES:
      return Object.assign({}, state, {
        loadingCompany: false,
        getEmployeesError: null,
        employees: null,
      })
    case actions.GET_EMPLOYEES_SUCCESS:
      return Object.assign({}, state, {
        loadingCompany: false,
        employees: (action as GetEmployeesSuccessAction).employees,
      })
    case actions.GET_EMPLOYEES_FAILED:
      return Object.assign({}, state, {
        loadingCompany: false,
        getEmployeesError: (action as GetEmployeesFailedAction).error,
      })

    case actions.GET_ADMINS:
      return Object.assign({}, state, {
        loadingCompany: false,
        getAdminsError: null,
      })
    case actions.GET_ADMINS_SUCCESS:
      return Object.assign({}, state, {
        loadingCompany: false,
        admins: (action as GetAdminsSuccessAction).admins,
      })
    case actions.GET_ADMINS_FAILED:
      return Object.assign({}, state, {
        loadingCompany: false,
        getAdminsError: (action as GetAdminsFailedAction).error,
      })

    case actions.CLEAR_CREATED_COMPANY:
      return Object.assign({}, state, {
        loadingCompany: false,
        createCompanyError: null,
        companyCreated: false,
      })

    case actions.DELETE_COMPANY_INVITE:
      let companyPendingInvites = state.companyPendingInvites
        ? [...state.companyPendingInvites]
        : []

      companyPendingInvites = companyPendingInvites.filter(
        (invite) =>
          String(invite._id) !== (action as DeleteComapnyInviteAction).inviteId
      )
      console.log(companyPendingInvites)

      return Object.assign({}, state, {
        companyPendingInvites,
      })

    case actions.CHANGE_USER_STATUS:
      let employees = state.employees ? [...state.employees] : []
      let admins = state.admins ? [...state.admins] : []
      if (!(action as ChangeUserStatusAction).admin) {
        employees = employees.filter(
          (employee) =>
            String(employee._id) !==
            String((action as ChangeUserStatusAction).userId)
        )
      }
      if ((action as ChangeUserStatusAction).admin) {
        admins = admins.filter(
          (admin) =>
            String(admin._id) !==
            String((action as ChangeUserStatusAction).userId)
        )
      }
      return Object.assign({}, state, {
        loadingCompany: false,
        employees,
        admins,
      })
    case actions.CHANGE_USER_STATUS_FAILED:
      return Object.assign({}, state, {
        loadingCompany: false,
        changeUserStatusError: (action as ChangeUserStatusFailedAction).error,
      })

    case actions.GET_TEAMS_OF_COMPANY:
      return Object.assign({}, state, {
        loadingCompany: false,
        getTeamsOfCompanyError: null,
      })
    case actions.GET_TEAMS_OF_COMPANY_SUCCESS:
      return Object.assign({}, state, {
        loadingCompany: false,
        teamsOfCompany: (action as GetTeamsOfCompanySuccessAction).teams,
      })
    case actions.GET_TEAMS_OF_COMPANY_FAILED:
      return Object.assign({}, state, {
        loadingCompany: false,
        getTeamsOfCompanyError: (action as GetTeamsOfCompanyFailedAction).error,
      })
    case actions.CHANGE_TEAM_STATUS:
      const teamsOfCompany = Object.assign({}, state.teamsOfCompany)
      console.log(action)

      if (teamsOfCompany) {
        let teams = [...teamsOfCompany.teams]
        console.log(teams)

        teams = teams.filter(
          (team) =>
            String(team._id) !==
            String((action as ChangeTeamStatusAction).teamId)
        )

        teamsOfCompany.teams = teams
      }

      return Object.assign({}, state, {
        loadingCompany: true,
        changeTeamStatusError: null,
        teamsOfCompany,
      })
    case actions.CHANGE_TEAM_STATUS_SUCCESS:
      return Object.assign({}, state, {
        loadingCompany: false,
      })
    case actions.CHANGE_TEAM_STATUS_FAILED:
      return Object.assign({}, state, {
        loadingCompany: false,
        changeTeamStatusError: (action as ChangeTeamStatusFailedAction).error,
      })

    case actions.GET_FEEDBACK_DATA:
      return Object.assign({}, state, {
        loadingCompany: false,
      })
    case actions.GET_FEEDBACK_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingCompany: false,
        feedbackData: (action as GetFeedbackDataSuccessAction).data,
      })
    case actions.GET_FEEDBACK_DATA_FAILED:
      return Object.assign({}, state, {
        loadingCompany: false,
        getFeedbackDataError: (action as GetFeedbackDataFailedAction).error,
      })

    case actions.GET_COMPANY_PENDING_INVITES:
      return Object.assign({}, state, {
        gettingCompanyPendingInvites: true,
        getCompanyPendingInvitesError: null,
      })
    case actions.GET_COMPANY_PENDING_INVITES_SUCCESS:
      return Object.assign({}, state, {
        gettingCompanyPendingInvites: false,
        companyPendingInvites: (action as GetCompanyPendingInvitesSuccessAction)
          .data,
      })
    case actions.GET_COMPANY_PENDING_INVITES_FAILED:
      return Object.assign({}, state, {
        gettingCompanyPendingInvites: false,
        getCompanyPendingInvitesError: (action as GetCompanyPendingInvitesFailedAction)
          .error,
      })

      case authActions.CLEAR_DATABASE: {
        return Object.assign({}, state, {
          myTeams: null
        })
      }

    case actions.ADD_COMPANY_ADMIN:
      const adminis = state.admins ? [...state.admins] : null
      if (adminis) {
        adminis.push((action as AddCompanyAdmin).user)
      }
      return Object.assign({}, state, {
        loadingCompany: true,
        admins: adminis,
        addAdminError: null,
      })

    default:
      return state
  }
}

export default companyReducer
