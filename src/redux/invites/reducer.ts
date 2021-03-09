import {
  actions,
  GetMyInviteSuccessAction,
  GetMyInviteFailedAction,
  AcceptInviteSuccessAction,
  DeleteInviteFailedAction,
  AcceptCompanyInviteFailedAction,
  GetCompanyInviteSuccessAction,
  GetCompanyInviteFailedAction,
  AcceptCompanyInviteSuccessAction,
  DeleteInviteAction,
} from './constants'
import { InviteActionsTypes, InviteState } from './constants'

const initialState: InviteState = {
  loadingInvite: false,
  invites: [],
  getMyInviteError: null,
  acceptInviteError: null,
  toaster: null,
  deleteInviteError: null,
  acceptCompanyInviteError: null,
  companyInvites: null,
  getCompanyInvitesError: null,
}

const inviteReducer = (
  state = initialState,
  action: InviteActionsTypes
): InviteState => {
  switch (action.type) {
    case actions.GET_MY_INVITES:
      return Object.assign({}, state, {
        loadingInvite: true,
        getMyInviteError: null,
      })
    case actions.GET_MY_INVITES_SUCCESS:
      return Object.assign({}, state, {
        loadingInvite: false,
        invites: (action as GetMyInviteSuccessAction).invites,
      })
    case actions.GET_MY_INVITES_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getMyInviteError: (action as GetMyInviteFailedAction).error,
      })

    case actions.ACCEPT_INVITE:
      return Object.assign({}, state, {
        loadingInvite: true,
        acceptInviteError: null,
      })
    case actions.ACCEPT_INVITE_SUCCESS:
      const oldInvites = [...state.invites]

      const newInvites = oldInvites.filter(
        (invite) =>
          String(invite._id) !== (action as AcceptInviteSuccessAction).inviteId
      )

      return Object.assign({}, state, {
        loadingInvite: false,
        invites: newInvites,
        toaster: 'teamMemberAccepted',
      })
    case actions.ACCEPT_INVITE_FAILED:
      return Object.assign({}, state, {
        loadingInvite: false,
        acceptInviteError: (action as GetMyInviteFailedAction).error,
      })

    case actions.DELETE_INVITE:
      return Object.assign({}, state, {
        loadingInvite: true,
        acceptInviteError: null,
      })
    case actions.DELETE_INVITE_SUCCESS:
      return Object.assign({}, state, {
        loadingInvite: false,
      })

    case actions.DELETE_INVITE_FAILED:
      return Object.assign({}, state, {
        loadingInvite: false,
        deleteInviteError: (action as DeleteInviteFailedAction).error,
      })

      case actions.ACCEPT_COMPANY_INVITE:
        return Object.assign({}, state, {
          loadingInvite: true,
          acceptInviteError: null,
        })
      case actions.ACCEPT_COMPANY_INVITE_SUCCESS:
        const companyInvites = state.companyInvites
          ? [...state.companyInvites]
          : []
        companyInvites.find((invite, i) => {
          if (
            String(invite._id) ===
            (action as AcceptCompanyInviteSuccessAction).inviteId
          ) {
            delete companyInvites[i]
          }
        })
        return Object.assign({}, state, {
          loadingInvite: false,
          companyInvites: companyInvites,
        })
  
      case actions.ACCEPT_COMPANY_INVITE_FAILED:
        return Object.assign({}, state, {
          loadingInvite: false,
          acceptCompanyInvite: (action as AcceptCompanyInviteFailedAction).error,
        })
    case actions.GET_COMPANY_INVITES:
      return Object.assign({}, state, {
        loadingInvite: false,
        getCompanyInvitesError: null,
      })
    case actions.GET_COMPANY_INVITES_SUCCESS:
      return Object.assign({}, state, {
        loadingInvite: false,
        companyInvites: (action as GetCompanyInviteSuccessAction).invites,
      })
    case actions.GET_COMPANY_INVITES_FAILED:
      return Object.assign({}, state, {
        loadingInvite: false,
        getCompanyInvitesError: (action as GetCompanyInviteFailedAction).error,
      })

    case actions.CLEAR_TOASTER:
      return Object.assign({}, state, {
        toaster: null,
      })

    default:
      return state
  }
}

export default inviteReducer
