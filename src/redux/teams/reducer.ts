import { User, Invite, Team } from 'src/apiTypes'

import {
  actions,
  CreateTeamFailedAction,
  CreateTeamSuccessAction,
  GetMyTeamsFailedAction,
  GetMyTeamsSuccessAction,
  GetPendingInvitesSuccessAction,
  GetTeamByIdSuccessAction,
  InviteUserFailedAction,
  GetUserSuggestionsFailedAction,
  TeamActionTypes,
  TeamState,
  GetTeamByIdFailedAction,
  GetUserSuggestionsSuccessAction,
  UpdateTeamProfileSuccessAction,
  UpdateTeamProfileFailedAction,
  GetActiveTeamUsersSuccessAction,
  GetActiveTeamUsersFailedAction,
  GetPendingInvitesFailedAction,
  RemoveMemberFailedAction,
  RemoveMemberSuccessAction,
  ClearTeamDataAction,
  GetMyTeamStatusSuccessAction,
  GetMyTeamStatusFailedAction,
  InviteUserSuccessAction,
  AddToTeamSuccessAction,
  DeleteTeamFailedAction,
  DeleteTeamSuccessAction,
  GetTeamsByKeywordSuccessAction,
  GetTeamsByKeywordFailedAction,
  RequestRightsFailedAction,
  GetPendingRequestSuccessAction,
  GetPendingRequestFailedAction,
  AcceptRightsSuccessAction,
  QutiTeamAction,
  GetQuestionByCategoryFailedAction,
  GetQuestionByCategorySuccessAction,
  AddQuestionSuccessAction,
  GetRelationalDataSuccessAction,
  GetRelationalDataFailedAction,
  EditQuestionAction,
  GetFeedbackRequestsSuccessAction,
  GetFeedbackRequestsFailedAction,
  AddFeebackRequestAction,
  DeleteQuestionAction,
  FeedbackSettingSelectionAction,
  SetInviteModalType,
} from './constants'

import {
  actions as inviteActions,
  DeleteInviteSuccessAction,
} from '../invites/constants'
import { select } from 'redux-saga/effects'
import MemberCard from 'src/pages/feedbackRequests/memberCard'
import { actions as authActiions } from '../auth/constants'
const initialState: TeamState = {
  loading: false,
  createdTeam: null,
  createTeamError: null,
  userInvited: false,
  inviteUserError: null,
  myTeams: null,
  getMyTeamsError: null,
  selectedTeam: null,
  getTeamByIdError: null,
  updateTeamError: null,
  getActiveUserError: null,
  selectedTeamData: null,
  getPendingInviteError: null,
  userSuggestions: null,
  getUserSuggestionError: null,
  addedToTeam: false,
  addToTeamError: null,
  removeUserError: null,
  myTeamStatus: null,
  myTeamStatusError: null,
  deleteTeamError: null,
  deleteTeamStatus: false,
  getTeamsByKeywordError: null,
  teamsByKeyword: null,
  requestRightError: null,
  requestRightStatus: false,
  pendingRequest: null,
  pendingRequestError: null,
  rightsAccpeted: false,
  acceptRightsError: null,
  updatingProfile: false,
  questionsByCat: null,
  getQuestionBycatError: null,
  addQuestionError: null,
  relationalData: null,
  relationalSenderData: null,
  getRelationalDataError: null,
  getFeebdackRequestError: null,
  feedbackRequests: null,
  toaster: '',
  feedbackSettingSelection: 'team',
  newQuestionAdded: false,
  inviteModalType: 'teamMembers'
}

const teamReducer = (
  state = initialState,
  action: TeamActionTypes
): TeamState => {
  switch (action.type) {
    case authActiions.LOGOUT:
      return Object.assign({}, state, {
        selectedTeam: null,
        myTeams: null,
      })
    case actions.CREATE_TEAM:
      return Object.assign({}, state, {
        loading: true,
        createTeamError: null,
      })
    case actions.CREATE_TEAM_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        createdTeam: (action as CreateTeamSuccessAction).team,
      })
    case actions.CREATE_TEAM_FAILED:
      return Object.assign({}, state, {
        loading: false,
        createTeamError: (action as CreateTeamFailedAction).error,
      })

    case actions.INVITE_USER:
      return Object.assign({}, state, {
        loading: true,
        inviteUserError: null,
      })
    case actions.INVITE_USER_SUCCESS:
      console.log((action as InviteUserSuccessAction).invite.type)
      const type = (action as InviteUserSuccessAction).invite.type
      //@ts-ignore
      const oldSelectedTeam =
        //@ts-ignore
        state.selectedTeamData && state.selectedTeamData[type]
          ? //@ts-ignore
            [...state.selectedTeamData[type]]
          : []

      oldSelectedTeam.push((action as InviteUserSuccessAction).invite)
      const selectedTeamData: any = state.selectedTeamData
        ? { ...state.selectedTeamData }
        : null
      if (selectedTeamData) {
        selectedTeamData[type] = oldSelectedTeam
      }
      return Object.assign({}, state, {
        loading: false,
        userInvited: true,
        selectedTeamData: selectedTeamData,
      })
    case actions.INVITE_USER_FAILED:
      return Object.assign({}, state, {
        loading: false,
        inviteUserError: (action as InviteUserFailedAction).error,
      })
    case actions.GET_MY_TEAMS:
      return Object.assign({}, state, {
        loading: true,
        getMyTeamsError: null,
      })
    case actions.GET_MY_TEAMS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        myTeams: (action as GetMyTeamsSuccessAction).teams,
      })
    case actions.GET_MY_TEAMS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getMyTeamsError: (action as GetMyTeamsFailedAction).error,
      })
    case actions.GET_TEAM_BY_ID:
      return Object.assign({}, state, {
        loading: true,
        getTeamByIdError: null,
      })
    case actions.GET_TEAM_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        selectedTeam: (action as GetTeamByIdSuccessAction).team,
        selectedTeamData: {
          _id: (action as GetTeamByIdSuccessAction).team._id,
        },
      })
    case actions.GET_TEAM_BY_ID_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getTeamByIdError: (action as GetTeamByIdFailedAction).error,
      })
    case actions.UPDATE_TEAM_PROFILE:
      let toaster = ''
      if ((action as UpdateTeamProfileSuccessAction).data.frequency) {
        toaster = 'Frequency updated'
      }
      if ((action as UpdateTeamProfileSuccessAction).data.tlFrequency) {
        toaster = 'Team leader frequency updated'
      }
      return Object.assign({}, state, {
        updatingProfile: true,
        updateTeamError: null,
        toaster,
      })
    case actions.UPDATE_TEAM_PROFILE_SUCCESS:
      // console.log(state.selectedTeamData);
      //    console.log((action as UpdateTeamProfileSuccessAction).data);

      return Object.assign({}, state, {
        updatingProfile: false,
        toaster: '',
        selectedTeam: Object.assign(
          {},
          state.selectedTeam,
          (action as UpdateTeamProfileSuccessAction).data
        ),
      })
    case actions.UPDATE_TEAM_PROFILE_FAILED:
      return Object.assign({}, state, {
        updatingProfile: false,
        updateTeamError: (action as UpdateTeamProfileFailedAction).error,
      })

    case actions.GET_ACTIVE_TEAM_USERS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        selectedTeamData: Object.assign({}, state.selectedTeamData, {
          [(action as GetActiveTeamUsersSuccessAction).data
            .type]: (action as GetActiveTeamUsersSuccessAction).data.members,
        }),
      })

    case actions.GET_ACTIVE_TEAM_USERS:
      return Object.assign({}, state, {
        loading: true,
        getActiveUserError: null,
      })

    case actions.GET_ACTIVE_TEAM_USERS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getActiveUserError: (action as GetActiveTeamUsersFailedAction).error,
      })
    case actions.GET_TEAM_PENDING_INVITES:
      return Object.assign({}, state, {
        loading: true,
        getPendingInviteError: null,
      })
    case actions.GET_TEAM_PENDING_INVITES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        selectedTeamData: Object.assign({}, state.selectedTeamData, {
          [(action as GetPendingInvitesSuccessAction).data
            .type]: (action as GetPendingInvitesSuccessAction).data.invite,
        }),
      })
    case actions.GET_TEAM_PENDING_INVITES_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getPendingInviteError: (action as GetPendingInvitesFailedAction).error,
      })

    case actions.GET_USER_SUGGESTIONS:
      return Object.assign({}, state, {
        loading: true,
        getUserSuggestionError: null,
      })
    case actions.GET_USER_SUGGESTIONS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userSuggestions: (action as GetUserSuggestionsSuccessAction)
          .suggestions,
      })
    case actions.GET_USER_SUGGESTIONS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getUserSuggestionError: (action as GetUserSuggestionsFailedAction)
          .error,
      })

    case actions.DELETE_TEAM:
      return Object.assign({}, state, {
        loading: true,
        deleteTeamError: null,
        deleteTeamStatus: false,
      })
    case actions.DELETE_TEAM_SUCCESS:
      const myTeams = state.myTeams ? [...state.myTeams] : []

      const newTeams = myTeams.filter(
        (team) =>
          String(team._id) !== (action as DeleteTeamSuccessAction).teamId
      )

      return Object.assign({}, state, {
        loading: false,
        deleteTeamStatus: true,
        myTeams: newTeams,
      })
    case actions.DELETE_TEAM_FAILED:
      return Object.assign({}, state, {
        loading: false,
        deleteTeamStatus: (action as DeleteTeamFailedAction).error,
      })

    case actions.GET_TEAMS_BY_KEYWORD:
      return Object.assign({}, state, {
        loading: true,
        deleteTeamError: null,
      })
    case actions.GET_TEAMS_BY_KEYWORD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        teamsByKeyword: (action as GetTeamsByKeywordSuccessAction).teams,
      })
    case actions.GET_TEAMS_BY_KEYWORD_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getTeamsByKeywordError: (action as GetTeamsByKeywordFailedAction).error,
      })

    case actions.ADD_QUESTION:
      return Object.assign({}, state, {
        loading: true,
        addQuestionError: null,
        newQuestionAdded: false
      })
    case actions.ADD_QUESTION_SUCCESS:
      const questions = state.questionsByCat ? [...state.questionsByCat] : []
      const act = action as AddQuestionSuccessAction
      questions.push({
        type: act.questionResult.type,
        question: act.question,
        questionOutput: act.question,
        level: act.questionResult.level,
        _id: act.questionResult._id,
      })
      return Object.assign({}, state, {
        loading: false,
        questionsByCat: questions,
        newQuestionAdded: true
      })
    case actions.ADD_QUESTION_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getTeamsByKeywordError: (action as GetTeamsByKeywordFailedAction).error,
      })

    case actions.ADD_TO_TEAM:
      return Object.assign({}, state, {
        loading: true,
        addToTeamError: null,
      })
    case actions.ADD_TO_TEAM_SUCCESS:
      const utype = (action as AddToTeamSuccessAction).userType

      const uoldSelectedTeam =
        //@ts-ignore
        state.selectedTeamData && state.selectedTeamData[utype]
          ? //@ts-ignore
            [...state.selectedTeamData[utype]]
          : []

      uoldSelectedTeam.push((action as AddToTeamSuccessAction).user)
      const uselectedTeamData: any = state.selectedTeamData
        ? { ...state.selectedTeamData }
        : null
      if (uselectedTeamData) {
        uselectedTeamData[utype] = uoldSelectedTeam
      }
      return Object.assign({}, state, {
        loading: false,
        addedToTeam: true,
        selectedTeamData: uselectedTeamData,
      })
    case actions.ADD_TO_TEAM_FAILED:
      return Object.assign({}, state, {
        loading: false,
        addToTeamError: (action as GetUserSuggestionsFailedAction).error,
      })
    case actions.REMOVE_MEMBER:
      return Object.assign({}, state, {
        loading: true,
        removeUserError: null,
      })
    case actions.REMOVE_MEMBER_SUCCESS:
      let oldData: any = []
      if (
        state.selectedTeamData &&
        //@ts-ignore
        state.selectedTeamData[(action as RemoveMemberSuccessAction).userType]
      ) {
        oldData = [
          //@ts-ignore
          ...state.selectedTeamData[
            (action as RemoveMemberSuccessAction).userType
          ],
        ]
      }
      console.log((action as RemoveMemberSuccessAction).userType)

      const newData = oldData.filter(
        (user: User) =>
          String(user._id) !==
          (action as RemoveMemberSuccessAction).userId.toString()
      )

      return Object.assign({}, state, {
        loading: false,
        selectedTeamData: Object.assign({}, state.selectedTeamData, {
          [(action as RemoveMemberSuccessAction).userType]: newData,
        }),
      })
    case actions.REMOVE_MEMBER_FAILED:
      return Object.assign({}, state, {
        loading: false,
        removeUserError: (action as RemoveMemberFailedAction).error,
      })

    case actions.GET_MY_TEAMS_STATUS:
      return Object.assign({}, state, {
        loading: true,
        myTeamStatusError: null,
      })
    case actions.GET_MY_TEAMS_STATUS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        myTeamStatus: (action as GetMyTeamStatusSuccessAction).myTeamStatus,
      })
    case actions.GET_MY_TEAMS_STATUS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        myTeamStatusError: (action as GetMyTeamStatusFailedAction).error,
      })

    case actions.GET_FEEDBACK_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        getFeebdackRequestError: null,
      })
    case actions.GET_FEEDBACK_REQUEST_SUCCESS:
      console.log('here is get feedback')
      console.log(action)

      return Object.assign({}, state, {
        loading: false,
        feedbackRequests: (action as GetFeedbackRequestsSuccessAction).data,
      })
    case actions.GET_FEEDBACK_REQUEST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getFeebdackRequestError: (action as GetFeedbackRequestsFailedAction)
          .error,
      })

    case actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT:
      return Object.assign({}, state, {
        loading: true,
        getQuestionBycatError: null,
      })
    case actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        questionsByCat: (action as GetQuestionByCategorySuccessAction)
          .questions,
      })
    case actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getQuestionBycatError: (action as GetQuestionByCategoryFailedAction)
          .error,
      })

    case actions.REQUEST_RIGHTS:
      return Object.assign({}, state, {
        loading: true,
        requestRightError: null,
      })
    case actions.REQUEST_RIGHTS_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        requestRightStatus: true,
      })
    case actions.REQUEST_RIGHTS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        requestRightError: (action as RequestRightsFailedAction).error,
      })

    case actions.GET_PENDING_REQUEST:
      return Object.assign({}, state, {
        loading: true,
        pendingRequestError: null,
      })
    case actions.GET_PENDING_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        pendingRequest: (action as GetPendingRequestSuccessAction).requests,
      })
    case actions.GET_PENDING_REQUEST_FAILED:
      return Object.assign({}, state, {
        loading: false,
        requestRightError: (action as GetPendingRequestFailedAction).error,
      })
    case actions.GET_FEEDBACK_DATA_BY_RELATION:
      return Object.assign({}, state, {
        loading: true,
        getRelationalDataError: null,
      })
    case actions.GET_FEEDBACK_DATA_BY_RELATION_SUCCESS:
      
      /* const oldRelationalData = state.relationalData ? state.relationalData : {}
      const oldSenderRelationData = state.relationalSenderData ? state.relationalSenderData : {}
      if ((action as GetRelationalDataSuccessAction).feedbackType === 'sender') {
        oldRelationalData[
          (action as GetRelationalDataSuccessAction).category
        ] = (action as GetRelationalDataSuccessAction).data
      } else {
        oldSenderRelationData[
          (action as GetRelationalDataSuccessAction).category
        ] = (action as GetRelationalDataSuccessAction).data
      }
       */
      return Object.assign({}, state, {
        loading: false,
        relationalData: (action as GetRelationalDataSuccessAction).feedbackType !== 'sender' ? (action as GetRelationalDataSuccessAction).data : state.relationalData,
        relationalSenderData: (action as GetRelationalDataSuccessAction).feedbackType === 'sender' ? (action as GetRelationalDataSuccessAction).data : state.relationalSenderData
      })
    case actions.GET_FEEDBACK_DATA_BY_RELATION_FAILED:
      return Object.assign({}, state, {
        loading: false,
        getRelationalDataError: (action as GetRelationalDataFailedAction).error,
      })

    case actions.ACCEPT_RIGHTS:
      return Object.assign({}, state, {
        loading: true,
        acceptRightsError: null,
      })
    case actions.ACCEPT_RIGHTS_SUCCESS:
      const oldRequest = state.pendingRequest ? [...state.pendingRequest] : []
      const newRequest = oldRequest.filter(
        (req) =>
          String(req._id) !==
          String((action as AcceptRightsSuccessAction).requestId)
      )
      return Object.assign({}, state, {
        loading: false,
        rightsAccpeted: true,
        toaster: 'Viewing rights granted.',
        pendingRequest: newRequest,
      })
    case actions.ACCEPT_RIGHTS_FAILED:
      return Object.assign({}, state, {
        loading: false,
        acceptRightsError: null,
      })

    case actions.CLEAR_INVITE:
      return Object.assign({}, state, {
        userInvited: false,
        inviteUserError: null,
      })

    case actions.CLEAR_TEAMS_BY_KEYWORD:
      return Object.assign({}, state, {
        teamsByKeyword: null,
        requestRightStatus: false,
      })
    case actions.CLEAR_CREATED_TEAM:
      return Object.assign({}, state, {
        createdTeam: null,
      })
    case actions.CLEAR_TEAM_DATA:
      return Object.assign(
        {},
        state,
        {
          addedToTeam: false,
          userSuggestions: null,
        },
        (action as ClearTeamDataAction).what === 'createdTeam'
          ? { createdTeam: null }
          : {}
      )

    case actions.EDIT_QUESTION:
      const questionsByCat = state.questionsByCat
        ? [...state.questionsByCat]
        : []
      const newQues = questionsByCat.find(
        (ques) =>
          String(ques._id) === String((action as EditQuestionAction).questionId)
      )
      console.log(newQues)

      if (newQues && (action as EditQuestionAction).question) {
        newQues.question = (action as EditQuestionAction).question || ''
      }

      if (newQues && (action as EditQuestionAction).questionOutput) {
        newQues.questionOutput =
          (action as EditQuestionAction).questionOutput || ''
      }
      return Object.assign({}, state, {
        questionsByCat,
      })

    case actions.QUIT_TEAM:
      const myTeamStatus = state.myTeamStatus ? [...state.myTeamStatus] : []
      const newMyteamStatus = myTeamStatus.filter(
        (team) => team._id !== (action as QutiTeamAction).teamId
      )

      const selectedTeam =
        !!state.selectedTeam &&
        String(state.selectedTeam._id) === (action as QutiTeamAction).teamId
          ? null
          : state.selectedTeam
      return Object.assign({}, state, {
        myTeamStatus: newMyteamStatus,
        toaster: '',
        selectedTeam,
      })

    case actions.QUIT_TEAM_SUCCESS:
      return Object.assign({}, state, {
        toaster: 'Team removed successfully.',
      })

    case actions.ADD_FEEDBACK_REQUEST:
      const fr = state.feedbackRequests
        ? [...state.feedbackRequests.targets]
        : []
      const checkUser = fr.find(
        (us) =>
          String(us.target._id) ===
          (action as AddFeebackRequestAction).data.userId
      )
      const addFeedTeamMembers = state.selectedTeamData
        ? [...state.selectedTeamData.teamMembers]
        : []
      const findTarget = fr.find(
        (mem) =>
          String(mem.target._id) ===
          (action as AddFeebackRequestAction).data.target
      )
      const added = addFeedTeamMembers.find((mem) => {
        if (
          String(mem._id) === (action as AddFeebackRequestAction).data.userId
        ) {
          if (!findTarget) {
            mem.request = mem.request ? mem.request + 1 : 1
          }
        }
      })

      if (!checkUser) {
        fr.push({
          target: (action as AddFeebackRequestAction).user,
          frequency: 2,
          _id: (action as AddFeebackRequestAction).data.target,
        })
      }

      return Object.assign({}, state, {
        selectedTeamData: Object.assign({}, state.selectedTeamData, added),
        feedbackRequests: Object.assign(
          {},
          state.feedbackRequests
            ? state.feedbackRequests
            : { _id: (action as AddFeebackRequestAction).data.userId },
          { targets: fr }
        ),
      })

    case actions.DELETE_FEEDBACK_REQUEST:
      const addFeedTeamMembers2 = state.selectedTeamData
        ? [...state.selectedTeamData.teamMembers]
        : []
      const added2 = addFeedTeamMembers2.find((mem) => {
        if (
          String(mem._id) === (action as AddFeebackRequestAction).data.userId
        ) {
          mem.request = mem.request ? mem.request - 1 : 0
        }
      })

      const fr2 = state.feedbackRequests
        ? [...state.feedbackRequests.targets]
        : []
      const checkUser2 = fr2.filter(
        (us) =>
          String(us.target._id) !==
          (action as AddFeebackRequestAction).data.userId
      )

      return Object.assign({}, state, {
        selectedTeamData: Object.assign({}, state.selectedTeamData, added2),
        feedbackRequests: Object.assign({}, state.feedbackRequests, {
          targets: checkUser2,
        }),
      })

    case inviteActions.DELETE_INVITE_SUCCESS:
      let oldDataS: any = []
      if (state.selectedTeamData) {
        //@ts-ignore
        oldDataS = [
          //@ts-ignore
          ...state.selectedTeamData[
            (action as DeleteInviteSuccessAction).data.inviteType
          ],
        ]
      }

      const newFiltered = oldDataS.filter(
        (invite: Invite) =>
          String(invite._id) !==
          String((action as DeleteInviteSuccessAction).data.inviteId)
      )

      return Object.assign({}, state, {
        selectedTeamData: Object.assign({}, state.selectedTeamData, {
          [(action as DeleteInviteSuccessAction).data.inviteType]: newFiltered,
        }),
      })

    case actions.DELETE_QUESTION:
      let questionsByCat2 = state.questionsByCat
        ? [...state.questionsByCat]
        : []
      const fil = questionsByCat2.filter(
        (ques) =>
          String(ques._id) !== (action as DeleteQuestionAction).questionId
      )
      return Object.assign({}, state, {
        questionsByCat: fil,
      })
    case actions.CLEAR_TEAM_TOASTER:
      return Object.assign({}, state, {
        toaster: '',
      })
    case actions.FEEDBACK_SETTINGS_SELECTION:
      return Object.assign({}, state, {
        feedbackSettingSelection: (action as FeedbackSettingSelectionAction)
          .selection,
      })
    case actions.RESET_NEW_QUESTION_ADDED:
      return Object.assign({}, state, {
        newQuestionAdded: false
      })
      case actions.SET_INVITE_MODAL_TYPE:
        return Object.assign({}, state, {
          inviteModalType: (action as SetInviteModalType).modalType
        })
    default:
      return state
  }
}

export default teamReducer
