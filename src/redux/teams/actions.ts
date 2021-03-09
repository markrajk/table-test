import {
  AddFeedbackRequestVariables,
  AddQuestionResult,
  AddQuestionVariables,
  ChangeFrequencyVariables,
  CreateTeamVariables,
  FeedbackRequest,
  GetFeedbackRequestVariables,
  GetQuestionsByCategoryVariables,
  Invite,
  InviteUserVariables,
  MyTeamsStatus,
  PendingRequest,
  QuestionByCategory,
  RelationalDataVariables,
  RelationData,
  RelationDataContainer,
  Team,
  TeamByKeyword,
  TeamsByKeywordResult,
  UpdateTeamProfileVariable,
  User,
} from 'src/apiTypes'
import { GetFeedbackDataAction } from '../company/constants'
import {
  CreateTeamAction,
  actions,
  CreateTeamSuccessAction,
  CreateTeamFailedAction,
  InviteUserAction,
  InviteUserSuccessAction,
  InviteUserFailedAction,
  GetMyTeamsAction,
  GetMyTeamsSuccessAction,
  GetMyTeamsFailedAction,
  GetTeamByIdAction,
  GetPendingInvitesFailedAction,
  GetTeamByIdSuccessAction,
  GetTeamByIdFailedAction,
  UpdateTeamProfileAction,
  UpdateTeamProfileSuccessAction,
  UpdateTeamProfileFailedAction,
  GetActiveTeamUsersAction,
  GetActiveTeamUsersSuccessAction,
  GetActiveTeamUsersFailedAction,
  GetPendingInvitesSuccessAction,
  GetUserSuggestionsAction,
  GetUserSuggestionsSuccessAction,
  GetUserSuggestionsFailedAction,
  AddToTeamAction,
  AddToTeamSuccessAction,
  AddToTeamFailedAction,
  RemoveMemberAction,
  RemoveMemberSuccessAction,
  RemoveMemberFailedAction,
  GetMyTeamStatusAction,
  GetMyTeamStatusSuccessAction,
  GetMyTeamStatusFailedAction,
  DeleteTeamAction,
  DeleteTeamSuccessAction,
  DeleteTeamFailedAction,
  GetTeamsByKeywordAction,
  GetTeamsByKeywordFailedAction,
  GetTeamsByKeywordSuccessAction,
  RequestRightsAction,
  RequestRightsSuccessAction,
  RequestRightsFailedAction,
  ClearTeamsByKeyword,
  GetPendingRequestAction,
  GetPendingRequestSuccessAction,
  GetPendingRequestFailedAction,
  AcceptRightsAction,
  AcceptRightsSuccessAction,
  AcceptRightsFailedAction,
  QutiTeamAction,
  GetQuestionByCategoryAction,
  GetQuestionByCategorySuccessAction,
  GetQuestionByCategoryFailedAction,
  AddQuestionAction,
  AddQuestionSuccessAction,
  AddQuestionFailedAction,
  GetRelationalDataAction,
  GetRelationalDataSuccessAction,
  GetRelationalDataFailedAction,
  UpdateJobTitleAction,
  AddFeebackRequestAction,
  GetFeedbackRequestsAction,
  GetFeedbackRequestsSuccessAction,
  GetFeedbackRequestsFailedAction,
  DeleteFeedbackRequestAction,
  ChangeFrequencyAction,
  SetInviteModalType,
} from './constants'

export const createTeam = (data: CreateTeamVariables): CreateTeamAction => ({
  type: actions.CREATE_TEAM,
  data,
})

export const createTeamSuccess = (team: Team): CreateTeamSuccessAction => ({
  type: actions.CREATE_TEAM_SUCCESS,
  team,
})

export const createTeamFailed = (error: string): CreateTeamFailedAction => ({
  type: actions.CREATE_TEAM_FAILED,
  error,
})

export const inviteUser = (data: InviteUserVariables): InviteUserAction => ({
  type: actions.INVITE_USER,
  data,
})

export const inviteUserSuccess = (invite: Invite): InviteUserSuccessAction => ({
  type: actions.INVITE_USER_SUCCESS,
  invite,
})

export const inviteUserFailed = (error: string): InviteUserFailedAction => ({
  type: actions.INVITE_USER_FAILED,
  error,
})

export const getMyTeams = (): GetMyTeamsAction => ({
  type: actions.GET_MY_TEAMS,
})

export const getMyTeamsSuccess = (teams: Team[]): GetMyTeamsSuccessAction => ({
  type: actions.GET_MY_TEAMS_SUCCESS,
  teams,
})

export const getMyTeamsFailed = (error: string): GetMyTeamsFailedAction => ({
  type: actions.GET_MY_TEAMS_FAILED,
  error,
})

export const getTeamById = (teamId: string): GetTeamByIdAction => ({
  type: actions.GET_TEAM_BY_ID,
  teamId,
})

export const getTeamByIdSuccess = (team: Team): GetTeamByIdSuccessAction => ({
  type: actions.GET_TEAM_BY_ID_SUCCESS,
  team,
})

export const getTeamByIdFailed = (error: string): GetTeamByIdFailedAction => ({
  type: actions.GET_TEAM_BY_ID_FAILED,
  error,
})

export const updateTeamProfile = (
  data: UpdateTeamProfileVariable
): UpdateTeamProfileAction => ({
  type: actions.UPDATE_TEAM_PROFILE,
  data,
})

export const updateTeamProfileSuccess = (
  data: UpdateTeamProfileVariable
): UpdateTeamProfileSuccessAction => ({
  type: actions.UPDATE_TEAM_PROFILE_SUCCESS,
  data,
})

export const updateTeamProfileFailed = (
  error: string
): UpdateTeamProfileFailedAction => ({
  type: actions.UPDATE_TEAM_PROFILE_FAILED,
  error,
})

export const getActiveTeamUsers = (
  teamId: string,
  memberType: string,
  p2pOnly?: string
): GetActiveTeamUsersAction => ({
  type: actions.GET_ACTIVE_TEAM_USERS,
  teamId,
  memberType,
  p2pOnly,
})

export const getActiveTeamUsersSuccess = (data: {
  members: User[]
  type: string
}): GetActiveTeamUsersSuccessAction => ({
  type: actions.GET_ACTIVE_TEAM_USERS_SUCCESS,
  data,
})

export const getActiveTeamUsersFailed = (
  error: string
): GetActiveTeamUsersFailedAction => ({
  type: actions.GET_ACTIVE_TEAM_USERS_FAILED,
  error,
})

export const getPendingInvites = (
  teamId: string,
  memberType: 'Team member' | 'Viewing rights' | 'Admin rights' | 'Team leader'
): GetActiveTeamUsersAction => ({
  type: actions.GET_TEAM_PENDING_INVITES,
  teamId,
  memberType,
})

export const getPendingInvitesSuccess = (data: {
  invite: Invite[]
  type: 'Team member' | 'Viewing rights' | 'Admin rights'
}): GetPendingInvitesSuccessAction => ({
  type: actions.GET_TEAM_PENDING_INVITES_SUCCESS,
  data,
})

export const getPendingInvitesFailed = (
  error: string
): GetPendingInvitesFailedAction => ({
  type: actions.GET_TEAM_PENDING_INVITES_FAILED,
  error,
})

export const getUserSuggestion = (data: {
  teamId?: string
  companyId?: string
  keyword: string
}): GetUserSuggestionsAction => ({
  type: actions.GET_USER_SUGGESTIONS,
  data,
})

export const getUserSuggestionSuccess = (
  suggestions: User[]
): GetUserSuggestionsSuccessAction => ({
  type: actions.GET_USER_SUGGESTIONS_SUCCESS,
  suggestions,
})

export const getUserSuggestionFailed = (
  error: string
): GetUserSuggestionsFailedAction => ({
  type: actions.GET_USER_SUGGESTIONS_FAILED,
  error,
})

export const addToTeam = (
  data: {
    teamId: string
    userId: string
    type: string
  },
  user: User
): AddToTeamAction => ({
  type: actions.ADD_TO_TEAM,
  data,
  user,
})

export const addToTeamSuccess = (
  status: boolean,
  user: User,
  userType: string
): AddToTeamSuccessAction => ({
  type: actions.ADD_TO_TEAM_SUCCESS,
  status,
  user,
  userType,
})

export const addToTeamFailed = (error: string): AddToTeamFailedAction => ({
  type: actions.ADD_TO_TEAM_FAILED,
  error,
})
export const removeMember = (data: {
  teamId: string
  userId: string
  type: string
}): RemoveMemberAction => ({
  type: actions.REMOVE_MEMBER,
  data,
})

export const removeMemberSuccess = (
  userId: string,
  userType: string
): RemoveMemberSuccessAction => ({
  type: actions.REMOVE_MEMBER_SUCCESS,
  userId,
  userType,
})

export const removeMemberFailed = (
  error: string
): RemoveMemberFailedAction => ({
  type: actions.REMOVE_MEMBER_FAILED,
  error,
})

export const getMyTeamsStatus = (): GetMyTeamStatusAction => ({
  type: actions.GET_MY_TEAMS_STATUS,
})

export const getMyTeamStatusSuccess = (
  myTeamStatus: MyTeamsStatus[]
): GetMyTeamStatusSuccessAction => ({
  type: actions.GET_MY_TEAMS_STATUS_SUCCESS,
  myTeamStatus,
})

export const getMyTeamStatusFailed = (
  error: string
): GetMyTeamStatusFailedAction => ({
  type: actions.GET_MY_TEAMS_STATUS_FAILED,
  error,
})

export const getTeamsByKeyword = (
  keyword: string
): GetTeamsByKeywordAction => ({
  type: actions.GET_TEAMS_BY_KEYWORD,
  keyword,
})

export const getTeamsByKeywordSuccess = (
  teams: TeamByKeyword[]
): GetTeamsByKeywordSuccessAction => ({
  type: actions.GET_TEAMS_BY_KEYWORD_SUCCESS,
  teams,
})

export const getTeamsByKeywordFailed = (
  error: string
): GetTeamsByKeywordFailedAction => ({
  type: actions.GET_MY_TEAMS_STATUS_FAILED,
  error,
})

export const requestRights = (teamId: string): RequestRightsAction => ({
  type: actions.REQUEST_RIGHTS,
  teamId,
})

export const requestRightsSuccess = (
  status: boolean
): RequestRightsSuccessAction => ({
  type: actions.REQUEST_RIGHTS_SUCCESS,
  status,
})

export const requestRightsFailed = (
  error: string
): RequestRightsFailedAction => ({
  type: actions.REQUEST_RIGHTS_FAILED,
  error,
})

export const acceptRights = (requestId: string): AcceptRightsAction => ({
  type: actions.ACCEPT_RIGHTS,
  requestId,
})

export const acceptRightsSuccess = (
  requestId: string
): AcceptRightsSuccessAction => ({
  type: actions.ACCEPT_RIGHTS_SUCCESS,
  requestId,
})

export const acceptRightsFailed = (
  error: string
): AcceptRightsFailedAction => ({
  type: actions.ACCEPT_RIGHTS_SUCCESS,
  error,
})

export const getPendingRequest = (): GetPendingRequestAction => ({
  type: actions.GET_PENDING_REQUEST,
})

export const getPendingRequestSuccess = (
  requests: PendingRequest[]
): GetPendingRequestSuccessAction => ({
  type: actions.GET_PENDING_REQUEST_SUCCESS,
  requests,
})

export const getPendingRequestFailed = (
  error: string
): GetPendingRequestFailedAction => ({
  type: actions.GET_PENDING_REQUEST_FAILED,
  error,
})

export const clearInvite = () => ({
  type: actions.CLEAR_INVITE,
})

export const clearTeamData = (what?: string) => ({
  type: actions.CLEAR_TEAM_DATA,
  what,
})

export const deleteTeam = (teamId: string): DeleteTeamAction => ({
  type: actions.DELETE_TEAM,
  teamId,
})

export const deleteTeamSuccess = (teamId: string): DeleteTeamSuccessAction => ({
  type: actions.DELETE_TEAM_SUCCESS,
  teamId,
})

export const deleteTeamFailed = (error: string): DeleteTeamFailedAction => ({
  type: actions.DELETE_TEAM_FAILED,
  error,
})

export const getQuestionByCat = (
  data: GetQuestionsByCategoryVariables
): GetQuestionByCategoryAction => ({
  type: actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT,
  data,
})

export const getQuestionByCatSuccess = (
  questions: QuestionByCategory[]
): GetQuestionByCategorySuccessAction => ({
  type: actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT_SUCCESS,
  questions,
})

export const getQuestionByCatFailed = (
  error: string
): GetQuestionByCategoryFailedAction => ({
  type: actions.GET_QUESTIONS_BY_TEAM_ID_AND_CAT_FAILED,
  error,
})

export const addQuestion = (data: AddQuestionVariables): AddQuestionAction => ({
  type: actions.ADD_QUESTION,
  data,
})

export const addQuestionSuccess = (
  questionResult: AddQuestionResult,
  question: string
): AddQuestionSuccessAction => ({
  type: actions.ADD_QUESTION_SUCCESS,
  questionResult,
  question,
})

export const addQuestionFailed = (error: string): AddQuestionFailedAction => ({
  type: actions.ADD_QUESTION_FAILED,
  error,
})

export const getRelationalData = (
  data: RelationalDataVariables
): GetRelationalDataAction => ({
  type: actions.GET_FEEDBACK_DATA_BY_RELATION,
  data,
})

export const getRelationalDataSucces = (
  data: RelationDataContainer,
  category: 'p2p' | 'subordinate' | 'supervisor' | 'self',
  feedbackType: 'receiver' | 'sender'
): GetRelationalDataSuccessAction => ({
  type: actions.GET_FEEDBACK_DATA_BY_RELATION_SUCCESS,
  data,
  category,
  feedbackType
})

export const getRelationalDataFailed = (
  error: string
): GetRelationalDataFailedAction => ({
  type: actions.GET_FEEDBACK_DATA_BY_RELATION_FAILED,
  error,
})
export const updateJobTitle = (
  userId: string,
  jobtitle: string
): UpdateJobTitleAction => ({
  type: actions.UPDATE_JOB_TITLE,
  userId,
  jobtitle,
})

export const clearTeamsByKeyword = (): ClearTeamsByKeyword => ({
  type: actions.CLEAR_TEAMS_BY_KEYWORD,
})

export const quitTeam = (teamId: string): QutiTeamAction => ({
  type: actions.QUIT_TEAM,
  teamId,
})

export const quitTeamSuccess = () => ({
  type: actions.QUIT_TEAM_SUCCESS,
})

export const clearCreatedTeam = () => ({
  type: actions.CLEAR_CREATED_TEAM,
})

export const editQuestion = (
  questionId: string,
  question?: string,
  questionOutput?: string
) => ({
  type: actions.EDIT_QUESTION,
  questionId,
  question,
  questionOutput,
})

export const addFeedbackRequest = (
  data: AddFeedbackRequestVariables,
  user: User
): AddFeebackRequestAction => ({
  type: actions.ADD_FEEDBACK_REQUEST,
  data,
  user,
})

export const getFeedbackRequest = (
  data: GetFeedbackRequestVariables
): GetFeedbackRequestsAction => ({
  type: actions.GET_FEEDBACK_REQUEST,
  data,
})

export const getFeedbackRequestSuccess = (
  data: FeedbackRequest
): GetFeedbackRequestsSuccessAction => ({
  type: actions.GET_FEEDBACK_REQUEST_SUCCESS,
  data,
})

export const getFeedbackRequestFailed = (
  error: string
): GetFeedbackRequestsFailedAction => ({
  type: actions.GET_FEEDBACK_REQUEST_FAILED,
  error,
})

export const deleteFeedbackRequest = (data: {
  requestId: string
  teamId: string
  userId: string
}): DeleteFeedbackRequestAction => ({
  type: actions.DELETE_FEEDBACK_REQUEST,
  data,
})
export const changeFrequency = (
  data: ChangeFrequencyVariables
): ChangeFrequencyAction => ({
  type: actions.CHANGE_FREQUENCY,
  data,
})

export const deleteQuestion = (questionId: string) => ({
  type: actions.DELETE_QUESTION,
  questionId,
})

export const clearTeamToaster = () => ({
  type: actions.CLEAR_TEAM_TOASTER,
})

export const selectFeedbackSettings = (
  selection: 'team' | 'p2p' | 'supervisor' | 'subordinate' | 'self'
) => ({
  type: actions.FEEDBACK_SETTINGS_SELECTION,
  selection,
})

export const resetNewQuestionAdded = () => ({
  type: actions.RESET_NEW_QUESTION_ADDED
})

export const setInviteModalType = (modalType: 'teamMembers' | 'teamLeaders'): SetInviteModalType=> ({
  type: actions.SET_INVITE_MODAL_TYPE,
  modalType
}) 