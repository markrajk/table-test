import {
  Team,
  CreateTeamVariables,
  InviteUserVariables,
  UpdateTeamProfileVariable,
  User,
  SelectedTeamData,
  Invite,
  MyTeamsStatus,
  TeamByKeyword,
  PendingRequest,
  QuestionByCategory,
  GetQuestionsByCategoryVariables,
  AddQuestionVariables,
  AddQuestionResult,
  RelationData,
  RelationalDataVariables,
  AddFeedbackRequestVariables,
  FeedbackRequest,
  GetFeedbackRequestVariables,
  ChangeFrequencyVariables,
  RelationDataContainer,
} from 'src/apiTypes'

export const actions = {
  CREATE_TEAM: 'CREATE_TEAM',
  CREATE_TEAM_SUCCESS: 'CREATE_TEAM_SUCCESS',
  CREATE_TEAM_FAILED: 'CREATE_TEAM_FAILED',
  INVITE_USER: 'INVITE_USER',
  INVITE_USER_SUCCESS: 'INVITE_USER_SUCCESS',
  INVITE_USER_FAILED: 'INVITE_USER_FAILED',
  CLEAR_INVITE: 'CLEAR_INVITE',
  GET_MY_TEAMS: 'GET_MY_TEAMS',
  GET_MY_TEAMS_SUCCESS: 'GET_MY_TEAMS_SUCCESS',
  GET_MY_TEAMS_FAILED: 'GET_MY_TEAMS_FAILED',
  GET_TEAM_BY_ID: 'GET_TEAM_BY_ID',
  GET_TEAM_BY_ID_SUCCESS: 'GET_TEAM_BY_ID_SUCCESS',
  GET_TEAM_BY_ID_FAILED: 'GET_TEAM_BY_ID_FAILED',
  UPDATE_TEAM_PROFILE: 'UPDATE_TEAM_PROFILE',
  UPDATE_TEAM_PROFILE_SUCCESS: 'UPDATE_TEAM_PROFILE_SUCCESS',
  UPDATE_TEAM_PROFILE_FAILED: 'UPDATE_TEAM_PROFILE_FAILED',
  GET_ACTIVE_TEAM_USERS: 'GET_ACTIVE_TEAM_USERS',
  GET_ACTIVE_TEAM_USERS_SUCCESS: 'GET_ACTIVE_TEAM_USERS_SUCCESS',
  GET_ACTIVE_TEAM_USERS_FAILED: 'GET_ACTIVE_TEAM_USERS_FAILED',
  GET_TEAM_PENDING_INVITES: 'GET_TEAM_PENDING_INVITES',
  GET_TEAM_PENDING_INVITES_SUCCESS: 'GET_TEAM_PENDING_INVITES_SUCCESS',
  GET_TEAM_PENDING_INVITES_FAILED: 'GET_TEAM_PENDING_INVITES_FAILED',
  GET_USER_SUGGESTIONS: 'GET_USER_SUGGESTIONS',
  GET_USER_SUGGESTIONS_SUCCESS: 'GET_USER_SUGGESTIONS_SUCCESS',
  GET_USER_SUGGESTIONS_FAILED: 'GET_USER_SUGGESTIONS_FAILED',
  ADD_TO_TEAM: 'ADD_TO_TEAM',
  ADD_TO_TEAM_SUCCESS: 'ADD_TO_TEAM_SUCCESS',
  ADD_TO_TEAM_FAILED: 'ADD_TO_TEAM_FAILED',
  REMOVE_MEMBER: 'REMOVE_MEMBER',
  REMOVE_MEMBER_SUCCESS: 'REMOVE_MEMBER_SUCCESS',
  REMOVE_MEMBER_FAILED: 'REMOVE_MEMBER_FAILED',
  CLEAR_TEAM_DATA: 'CLEAR_TEAM_DATA',
  CLEAR_CREATED_TEAM: 'CLEAR_CREATED_TEAM',
  GET_MY_TEAMS_STATUS: 'GET_MY_TEAMS_STATUS',
  GET_MY_TEAMS_STATUS_SUCCESS: 'GET_MY_TEAMS_STATUS_SUCCESS',
  GET_MY_TEAMS_STATUS_FAILED: 'GET_MY_TEAMS_STATUS_FAILED',
  DELETE_TEAM: 'DELETE_TEAM',
  DELETE_TEAM_SUCCESS: 'DELETE_TEAM_SUCCESS',
  DELETE_TEAM_FAILED: 'DELETE_TEAM_FAILED',
  GET_TEAMS_BY_KEYWORD: 'GET_TEAMS_BY_KEYWORD',
  GET_TEAMS_BY_KEYWORD_SUCCESS: 'GET_TEAMS_BY_KEYWORD_SUCCESS',
  GET_TEAMS_BY_KEYWORD_FAILED: 'GET_TEAMS_BY_KEYWORD_FAILED',
  REQUEST_RIGHTS: 'REQUEST_RIGHTS',
  REQUEST_RIGHTS_SUCCESS: 'REQUEST_RIGHTS_SUCCESS',
  REQUEST_RIGHTS_FAILED: 'REQUEST_RIGHTS_FAILED',
  CLEAR_TEAMS_BY_KEYWORD: 'CLEAR_TEAMS_BY_KEYWORD',
  GET_PENDING_REQUEST: 'GET_PENDING_REQUEST',
  GET_PENDING_REQUEST_SUCCESS: 'GET_PENDING_REQUEST_SUCCESS',
  GET_PENDING_REQUEST_FAILED: 'GET_PENDING_REQUEST_FAILED',
  ACCEPT_RIGHTS: 'ACCEPT_RIGHTS',
  ACCEPT_RIGHTS_SUCCESS: 'ACCEPT_RIGHTS_SUCCESS',
  ACCEPT_RIGHTS_FAILED: 'ACCEPT_RIGHTS_FAILED',
  QUIT_TEAM: 'QUIT_TEAM',
  GET_QUESTIONS_BY_TEAM_ID_AND_CAT: 'GET_QUESTIONS_BY_TEAM_ID_AND_CAT',
  GET_QUESTIONS_BY_TEAM_ID_AND_CAT_SUCCESS:
    'GET_QUESTIONS_BY_TEAM_ID_AND_CAT_SUCCESS',
  GET_QUESTIONS_BY_TEAM_ID_AND_CAT_FAILED:
    'GET_QUESTIONS_BY_TEAM_ID_AND_CAT_FAILED',
  ADD_QUESTION: 'ADD_QUESTION',
  ADD_QUESTION_SUCCESS: 'ADD_QUESTION_SUCCESS',
  ADD_QUESTION_FAILED: 'ADD_QUESTION_FAILED',
  GET_FEEDBACK_DATA_BY_RELATION: 'GET_FEEDBACK_DATA_BY_RELATION',
  GET_FEEDBACK_DATA_BY_RELATION_SUCCESS:
    'GET_FEEDBACK_DATA_BY_RELATION_SUCCESS',
  GET_FEEDBACK_DATA_BY_RELATION_FAILED: 'GET_FEEDBACK_DATA_BY_RELATION_FAILED',
  UPDATE_JOB_TITLE: 'UPDATE_JOB_TITLE',
  EDIT_QUESTION: 'EDIT_QUESTION',
  ADD_FEEDBACK_REQUEST: 'ADD_FEEDBACK_REQUEST',
  ADD_FEEDBACK_REQUEST_SUCCESS: 'ADD_FEEDBACK_REQUEST_SUCCESS',
  ADD_FEEDBACK_REQUEST_FAILED: 'ADD_FEEDBACK_REQUEST_FAILED',
  GET_FEEDBACK_REQUEST: 'GET_FEEDBACK_REQUEST',
  GET_FEEDBACK_REQUEST_SUCCESS: 'GET_FEEDBACK_REQUEST_SUCCESS',
  GET_FEEDBACK_REQUEST_FAILED: 'GET_FEEDBACK_REQUEST_FAILED',
  DELETE_FEEDBACK_REQUEST: 'DELETE_FEEDBACK_REQUEST',
  CHANGE_FREQUENCY: 'CHANGE_FREQUENCY',
  QUIT_TEAM_SUCCESS: 'QUIT_TEAM_SUCCESS',
  DELETE_QUESTION: 'DELETE_QUESTION',
  CLEAR_TEAM_TOASTER: 'CLEAR_TEAM_TOASTER',
  FEEDBACK_SETTINGS_SELECTION: 'FEEDBACK_SETTINGS_SELECTION',
  RESET_NEW_QUESTION_ADDED: 'RESET_NEW_QUESTION_ADDED',
  SET_INVITE_MODAL_TYPE: 'SET_INVITE_MODAL_TYPE'

}

export interface TeamState {
  loading: boolean
  createdTeam: Team | null
  createTeamError: string | null
  inviteUserError: string | null
  userInvited: boolean
  myTeams: Team[] | null
  getMyTeamsError: string | null
  selectedTeam: Team | null
  getTeamByIdError: string | null
  updateTeamError: string | null
  getActiveUserError: string | null
  selectedTeamData: SelectedTeamData | null
  getPendingInviteError: string | null
  userSuggestions: User[] | null
  getUserSuggestionError: string | null
  addedToTeam: boolean
  addToTeamError: string | null
  removeUserError: string | null
  myTeamStatus: MyTeamsStatus[] | null
  myTeamStatusError: string | null
  deleteTeamStatus: boolean
  deleteTeamError: string | null
  teamsByKeyword: TeamByKeyword[] | null
  getTeamsByKeywordError: string | null
  requestRightStatus: boolean
  requestRightError: string | null
  pendingRequest: PendingRequest[] | null
  pendingRequestError: string | null
  rightsAccpeted: boolean
  acceptRightsError: string | null
  updatingProfile: boolean
  questionsByCat: QuestionByCategory[] | null
  getQuestionBycatError: string | null
  addQuestionError: string | null
  relationalData: RelationDataContainer | null
  relationalSenderData: RelationDataContainer | null
  getRelationalDataError: string | null
  getFeebdackRequestError: string | null
  feedbackRequests: FeedbackRequest | null
  toaster: string
  newQuestionAdded: boolean
  inviteModalType: 'teamMembers' | 'teamLeaders'
  feedbackSettingSelection:
    | 'team'
    | 'p2p'
    | 'supervisor'
    | 'subordinate'
    | 'self'
}

export interface CreateTeamAction {
  type: typeof actions.CREATE_TEAM
  data: CreateTeamVariables
}

export interface CreateTeamSuccessAction {
  type: typeof actions.CREATE_TEAM_SUCCESS
  team: Team
}

export interface CreateTeamFailedAction {
  type: typeof actions.CREATE_TEAM_FAILED
  error: string
}

export interface InviteUserAction {
  type: typeof actions.INVITE_USER
  data: InviteUserVariables
}

export interface InviteUserSuccessAction {
  type: typeof actions.INVITE_USER_SUCCESS
  invite: Invite
}

export interface InviteUserFailedAction {
  type: typeof actions.INVITE_USER_FAILED
  error: string
}

export interface GetMyTeamsAction {
  type: typeof actions.GET_MY_TEAMS
}

export interface GetMyTeamsSuccessAction {
  type: typeof actions.GET_MY_TEAMS_SUCCESS
  teams: Team[]
}

export interface GetMyTeamsFailedAction {
  type: typeof actions.GET_MY_TEAMS_FAILED
  error: string
}

export interface GetTeamByIdAction {
  type: typeof actions.GET_TEAM_BY_ID
  teamId: string
}

export interface GetTeamByIdSuccessAction {
  type: typeof actions.GET_TEAM_BY_ID_SUCCESS
  team: Team
}

export interface GetTeamByIdFailedAction {
  type: typeof actions.GET_TEAM_BY_ID_FAILED
  error: string
}

export interface UpdateTeamProfileAction {
  type: typeof actions.UPDATE_TEAM_PROFILE
  data: UpdateTeamProfileVariable
}

export interface UpdateTeamProfileSuccessAction {
  type: typeof actions.UPDATE_TEAM_PROFILE_SUCCESS
  data: UpdateTeamProfileVariable
}

export interface UpdateTeamProfileFailedAction {
  type: typeof actions.UPDATE_TEAM_PROFILE_FAILED
  error: string
}

export interface GetActiveTeamUsersAction {
  type: typeof actions.GET_ACTIVE_TEAM_USERS
  teamId: string
  memberType: string
  p2pOnly?: string
}

export interface GetActiveTeamUsersSuccessAction {
  type: typeof actions.GET_ACTIVE_TEAM_USERS_SUCCESS
  data: {
    members: User[]
    type: string
  }
}

export interface GetActiveTeamUsersFailedAction {
  type: typeof actions.GET_ACTIVE_TEAM_USERS_FAILED
  error: string
}

export interface GetPendingRequestAction {
  type: typeof actions.GET_PENDING_REQUEST
}

export interface GetPendingRequestSuccessAction {
  type: typeof actions.GET_PENDING_REQUEST_SUCCESS
  requests: PendingRequest[]
}

export interface GetPendingRequestFailedAction {
  type: typeof actions.GET_PENDING_REQUEST_FAILED
  error: string
}

export interface GetPendingInvitesAction {
  type: typeof actions.GET_TEAM_PENDING_INVITES
  teamId: string
  memberType: 'Team member' | 'Viewing rights' | 'Admin rights' | 'Team leader'
}

export interface GetPendingInvitesSuccessAction {
  type: typeof actions.GET_TEAM_PENDING_INVITES_SUCCESS
  data: {
    invite: Invite[]
    type: 'Team member' | 'Viewing rights' | 'Admin rights' | 'Team leader'
  }
}

export interface GetPendingInvitesFailedAction {
  type: typeof actions.GET_TEAM_PENDING_INVITES_FAILED
  error: string
}

export interface GetUserSuggestionsAction {
  type: typeof actions.GET_USER_SUGGESTIONS
  data: {
    teamId?: string
    companyId?: string
    keyword: string
  }
}

export interface GetUserSuggestionsSuccessAction {
  type: typeof actions.GET_USER_SUGGESTIONS_SUCCESS
  suggestions: User[]
}

export interface GetUserSuggestionsFailedAction {
  type: typeof actions.GET_USER_SUGGESTIONS_FAILED
  error: string
}

export interface AddToTeamAction {
  type: typeof actions.ADD_TO_TEAM
  data: {
    teamId: string
    userId: string
    type: string
  }
  user: User
}

export interface AddToTeamSuccessAction {
  type: typeof actions.ADD_TO_TEAM_SUCCESS
  status: boolean
  user: User
  userType: string
}

export interface AddToTeamFailedAction {
  type: typeof actions.ADD_TO_TEAM_FAILED
  error: string
}

export interface RemoveMemberAction {
  type: typeof actions.REMOVE_MEMBER
  data: {
    teamId: string
    userId: string
    type: string
  }
}

export interface RemoveMemberSuccessAction {
  type: typeof actions.REMOVE_MEMBER_SUCCESS
  userId: string
  userType: string
}

export interface RemoveMemberFailedAction {
  type: typeof actions.REMOVE_MEMBER_FAILED
  error: string
}

export interface GetMyTeamStatusAction {
  type: typeof actions.GET_MY_TEAMS_STATUS
}

export interface GetMyTeamStatusSuccessAction {
  type: typeof actions.GET_MY_TEAMS_STATUS_SUCCESS
  myTeamStatus: MyTeamsStatus[]
}

export interface GetMyTeamStatusFailedAction {
  type: typeof actions.GET_MY_TEAMS_STATUS_FAILED
  error: string
}

export interface GetTeamsByKeywordAction {
  type: typeof actions.GET_TEAMS_BY_KEYWORD
  keyword: string
}

export interface GetTeamsByKeywordSuccessAction {
  type: typeof actions.GET_TEAMS_BY_KEYWORD_SUCCESS
  teams: TeamByKeyword[]
}

export interface GetTeamsByKeywordFailedAction {
  type: typeof actions.GET_MY_TEAMS_STATUS_FAILED
  error: string
}

export interface RequestRightsAction {
  type: typeof actions.REQUEST_RIGHTS
  teamId: string
}

export interface RequestRightsSuccessAction {
  type: typeof actions.REQUEST_RIGHTS_SUCCESS
  status: boolean
}

export interface RequestRightsFailedAction {
  type: typeof actions.REQUEST_RIGHTS_FAILED
  error: string
}

export interface AcceptRightsAction {
  type: typeof actions.ACCEPT_RIGHTS
  requestId: string
}

export interface AcceptRightsSuccessAction {
  type: typeof actions.ACCEPT_RIGHTS_SUCCESS
  requestId: string
}

export interface AcceptRightsFailedAction {
  type: typeof actions.ACCEPT_RIGHTS_FAILED
  error: string
}

export interface ClearTeamDataAction {
  type: typeof actions.CLEAR_TEAM_DATA
  what: string
}

export interface ClearTeamsByKeyword {
  type: typeof actions.CLEAR_TEAMS_BY_KEYWORD
}

export interface DeleteTeamAction {
  type: typeof actions.DELETE_TEAM
  teamId: string
}

export interface DeleteTeamSuccessAction {
  type: typeof actions.DELETE_TEAM_SUCCESS
  teamId: string
}

export interface DeleteTeamFailedAction {
  type: typeof actions.DELETE_TEAM_FAILED
  error: string
}

export interface GetQuestionByCategoryAction {
  type: typeof actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT
  data: GetQuestionsByCategoryVariables
}

export interface GetQuestionByCategorySuccessAction {
  type: typeof actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT_SUCCESS
  questions: QuestionByCategory[]
}

export interface GetQuestionByCategoryFailedAction {
  type: typeof actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT_FAILED
  error: string
}

export interface AddQuestionAction {
  type: typeof actions.ADD_QUESTION
  data: AddQuestionVariables
}

export interface AddQuestionSuccessAction {
  type: typeof actions.ADD_QUESTION_SUCCESS
  questionResult: AddQuestionResult
  question: string
}

export interface AddQuestionFailedAction {
  type: typeof actions.ADD_QUESTION_FAILED
  error: string
}

export interface GetRelationalDataAction {
  type: typeof actions.GET_FEEDBACK_DATA_BY_RELATION
  data: RelationalDataVariables
}

export interface GetRelationalDataSuccessAction {
  type: typeof actions.GET_FEEDBACK_DATA_BY_RELATION_SUCCESS
  data: RelationDataContainer
  category: 'p2p' | 'subordinate' | 'supervisor' | 'self'
  feedbackType: 'receiver' | 'sender'
}

export interface GetRelationalDataFailedAction {
  type: typeof actions.GET_FEEDBACK_DATA_BY_RELATION_FAILED
  error: string
}

export interface AddFeebackRequestAction {
  type: typeof actions.ADD_FEEDBACK_REQUEST
  data: AddFeedbackRequestVariables
  user: User
}

export interface AddFeebackRequestSuccessAction {
  type: typeof actions.ADD_FEEDBACK_REQUEST_SUCCESS
}

export interface AddFeebackRequestFailedAction {
  type: typeof actions.ADD_FEEDBACK_REQUEST_FAILED
  error: string
}

export interface UpdateJobTitleAction {
  type: typeof actions.UPDATE_JOB_TITLE
  userId: string
  jobtitle: string
}

export interface ChangeFrequencyAction {
  type: typeof actions.CHANGE_FREQUENCY
  data: ChangeFrequencyVariables
}

/*
export interface MyTeamsStatusAction {
  type: typeof actions.REMOVE_MEMBER_SUCCESS
}

export interface RemoveMemberFailedAction {
  type: typeof actions.REMOVE_MEMBER_FAILED
  error: string
}
*/
export interface ClearTeamDataAction {
  type: typeof actions.CLEAR_TEAM_DATA
  what: string
}
export interface QutiTeamAction {
  type: typeof actions.QUIT_TEAM
  teamId: string
}

export interface EditQuestionAction {
  type: typeof actions.EDIT_QUESTION
  questionId: string
  question?: string
  questionOutput?: string
}

export interface GetFeedbackRequestsAction {
  type: typeof actions.GET_FEEDBACK_REQUEST
  data: GetFeedbackRequestVariables
}

export interface GetFeedbackRequestsSuccessAction {
  type: typeof actions.GET_FEEDBACK_REQUEST_SUCCESS
  data: FeedbackRequest
}

export interface GetFeedbackRequestsFailedAction {
  type: typeof actions.GET_FEEDBACK_REQUEST_FAILED
  error: string
}

export interface DeleteFeedbackRequestAction {
  type: typeof actions.DELETE_FEEDBACK_REQUEST
  data: {
    requestId: string
    teamId: string
    userId: string
  }
}

export interface DeleteQuestionAction {
  type: typeof actions.DELETE_QUESTION
  questionId: string
}

export interface FeedbackSettingSelectionAction {
  type: typeof actions.FEEDBACK_SETTINGS_SELECTION
  selection: 'team' | 'p2p' | 'supervisor' | 'subordinate' | 'self'
}

export interface SetInviteModalType {
  type: typeof actions.SET_INVITE_MODAL_TYPE
  modalType: 'teamMembers' | 'teamLeaders'
}

export type TeamActionTypes =
  | CreateTeamAction
  | CreateTeamSuccessAction
  | CreateTeamFailedAction
  | InviteUserAction
  | InviteUserSuccessAction
  | InviteUserFailedAction
  | GetMyTeamsAction
  | GetMyTeamsSuccessAction
  | GetMyTeamsFailedAction
  | GetTeamByIdAction
  | GetTeamByIdSuccessAction
  | GetTeamByIdFailedAction
  | UpdateTeamProfileAction
  | UpdateTeamProfileSuccessAction
  | UpdateTeamProfileFailedAction
  | GetUserSuggestionsAction
  | GetUserSuggestionsSuccessAction
  | GetUserSuggestionsFailedAction
  | AddToTeamAction
  | AddToTeamSuccessAction
  | AddToTeamFailedAction
  | RemoveMemberAction
  | RemoveMemberSuccessAction
  | RemoveMemberFailedAction
  | GetMyTeamStatusAction
  | GetMyTeamStatusSuccessAction
  | GetMyTeamStatusFailedAction
  | GetTeamsByKeywordAction
  | GetTeamsByKeywordSuccessAction
  | GetTeamsByKeywordFailedAction
  | RequestRightsAction
  | RequestRightsSuccessAction
  | RequestRightsFailedAction
  | QutiTeamAction
  | GetQuestionByCategoryAction
  | GetQuestionByCategorySuccessAction
  | GetQuestionByCategoryFailedAction
  | AddQuestionAction
  | AddQuestionSuccessAction
  | AddQuestionFailedAction
  | GetRelationalDataAction
  | GetRelationalDataSuccessAction
  | GetRelationalDataFailedAction
  | EditQuestionAction
  | AddFeebackRequestAction
  | AddFeebackRequestSuccessAction
  | AddFeebackRequestFailedAction
  | GetFeedbackRequestsAction
  | GetFeedbackRequestsSuccessAction
  | GetFeedbackRequestsFailedAction
  | DeleteFeedbackRequestAction
  | DeleteQuestionAction
  | FeedbackSettingSelectionAction
