import {
  Comment,
  CommentOnFeedback,
  GetFeedbacksByQuestionIdVariables,
  MyCurrent,
  MyData,
  Question,
  SelectedBarData,
  SendCommentVariables,
  SendFeedbackVariables,
  SentFeedbackData,
  TeamUserRank,
  ToDo,
  User,
  TexyAnswerByQuestionId,
  AddWidgetVariables,
  MyWidget,
  UserRecievedTextFeedback,
  TargetHistory,
  MyWidgetData,
  Category,
  DirectFeedback,
} from 'src/apiTypes'

export const actions = {
  GET_MY_TEAM_MEMBERS: 'GET_MY_TEAM_MEMBERS',
  GET_MY_TEAM_MEMBERS_SUCCESS: 'GET_MY_TEAM_MEMBERS_SUCCESS',
  GET_MY_TEAM_MEMBERS_FAILED: 'GET_MY_TEAM_MEMBERS_FAILED',
  GET_QUESTIONS: 'GET_QUESTIONS',
  GET_QUESTIONS_SUCCESS: 'GET_QUESTIONS_SUCCESS',
  GET_QUESTIONS_FAILED: 'GET_QUESTIONS_FAILED',
  SEND_FEEDBACK: 'SEND_FEEDBACK',
  SEND_FEEDBACK_SUCCESS: 'SEND_FEEDBACK_SUCCESS',
  SEND_FEEDBACK_FAILED: 'SEND_FEEDBACK_FAILED',
  GET_COMMENTS: 'GET_COMMENTS',
  GET_COMMENTS_SUCCESS: 'GET_COMMENTS_SUCCESS',
  GET_COMMENTS_FAILED: 'GET_COMMENTS_FAILED',
  GET_MY_CURRENT_DATA: 'GET_MY_CURRENT_DATA',
  GET_MY_CURRENT_DATA_SUCCESS: 'GET_MY_CURRENT_DATA_SUCCESS',
  GET_MY_CURRENT_DATA_FAILED: 'GET_MY_CURRENT_DATA_FAILED',
  GET_MY_DATA: 'GET_MY_DATA',
  GET_MY_DATA_SUCCESS: 'GET_MY_DATA_SUCCESS',
  GET_MY_DATA_FAILED: 'GET_MY_DATA_FAILED',
  GET_MY_TODO: 'GET_MY_TODO',
  GET_MY_TODO_SUCCESS: 'GET_MY_TODO_SUCCESS',
  GET_MY_TODO_FAILED: 'GET_MY_TODO_FAILED',
  GET_TEAM_CURRENT_DATA: 'GET_GET_TEAM_CURRENT_DATA',
  GET_TEAM_CURRENT_DATA_SUCCESS: 'GET_TEAM_CURRENT_DATA_SUCCESS',
  GET_TEAM_CURRENT_DATA_FAILED: 'GET_TEAM_CURRENT_DATA_FAILED',
  GET_TEAM_DATA: 'GET_TEAM_DATA',
  GET_TEAM_DATA_SUCCESS: 'GET_TEAM_DATA_SUCCESS',
  GET_TEAM_DATA_FAILED: 'GET_TEAM_DATA_FAILED',
  GET_TEAM_USER_RANK: 'GET_TEAM_USER_RANK',
  GET_TEAM_USER_RANK_SUCCESS: 'GET_TEAM_USER_RANK_SUCCESS',
  GET_TEAM_USER_RANK_FAILED: 'GET_TEAM_USER_RANK_FAILED',
  GET_USER_DATA_SUCCESS: 'GET_MY_USER_DATA_SUCCESS',
  GET_USER_CURRENT_DATA_SUCCESS: 'GET_USER_CURRENT_DATA_SUCCESS',
  GET_NEW_COMMENTS: 'GET_NEW_COMMENTS',
  GET_NEW_COMMENTS_SUCCESS: 'GET_NEW_COMMENTS_SUCCESS',
  GET_NEW_COMMENTS_FAILED: 'GET_NEW_COMMENTS_FAILED',
  MARK_FEEDBACK_READ: 'MARK_FEEDBACK_READ',
  GET_SENT_FEEDBACK_DATA: 'GET_SENT_FEEDBACK_DATA',
  GET_SENT_FEEDBACK_DATA_SUCCESS: 'GET_SENT_FEEDBACK_DATA_SUCCESS',
  GET_SENT_FEEDBACK_DATA_FAILED: 'GET_SENT_FEEDBACK_DATA_FAILED',
  GET_SELECTED_BAR_DATA: 'GET_SELECTED_BAR_DATA',
  GET_SELECTED_BAR_DATA_SUCCESS: 'GET_SELECTED_DATA_SUCCESS',
  GET_SELECTED_BAR_DATA_FAILED: 'GET_SELECTED_BAR_DATA_FAILED',
  GET_SELECTED_TEAM_BAR_DATA: 'GET_SELECTED_TEAM_BAR_DATA',
  GET_SELECTED_TEAM_BAR_DATA_SUCCESS: 'GET_SELECTED_TEAM_BAR_DATA_SUCCESS',
  GET_SELECTED_TEAM_BAR_DATA_FAILED: 'GET_SELECTED_TEAM_BAR_DATA_FAILED',
  SEND_COMMENT_ON_FEEDBACK: 'SEND_COMMENT_ON_FEEDBACK',
  SEND_COMMENT_ON_FEEDBACK_SUCCESS: 'SEND_COMMENT_ON_FEEDBACK_SUCCESS',
  SEND_COMMENT_ON_FEEDBACK_FAILED: 'SEND_COMMENT_ON_FEEDBACK_FAILED',
  LIKE_UNLIKE_FEEDBACK: 'LIKE_UNLIKE_FEEDBACK',
  GET_FEEFBACK_BY_QUESITONID_AND_TEAMID:
    'GET_FEEFBACK_BY_QUESITONID_AND_TEAMID',
  GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_SUCCESS:
    'GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_SUCCESS',
  GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_FAILED:
    'GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_FAILED',
  ADD_WIDGET: 'ADD_WIDGET',
  ADD_WIDGET_SUCCESS: 'ADD_WIDGET_SUCCESS',
  ADD_WIDGET_FAILED: 'ADD_WIDGET_FAILED',
  GET_MY_WIDGETS: 'GET_MY_WIDGETS',
  GET_MY_WIDGETS_SUCCESS: 'GET_MY_WIDGETS_SUCCESS',
  GET_MY_WIDGETS_FAILED: 'GET_MY_WIDGETS_FAILED',
  UPDATE_WIDGET_SETTINGS: 'UPDATE_WIDGET_SETTINGS',
  MARK_READ: 'MARK_READ',
  GET_USER_TEXT_FEEDBACK: 'GET_USER_TEXT_FEEDBACK',
  GET_USER_TEXT_FEEDBACK_SUCCESS: 'GET_USER_TEXT_FEEDBACK_SUCCESS',
  GET_USER_TEXT_FEEDBACK_FAILED: 'GET_USER_TEXT_FEEDBACK_FAILED',
  CLEAR_USER_TEXT_FEEDBACK: 'CLEAR_USER_TEXT_FEEDBACK',

  REMOVE_LAYOUT: 'REMOVE_LAYOUT',

  GET_TARGET_HISTORY: 'GET_TARGET_HISTORY',
  GET_TARGET_HISTORY_SUCCESS: 'GET_TARGET_HISTORY_SUCCESS',
  GET_TARGET_HISTORY_FAILED: 'GET_TARGET_HISTORY_FAILED',

  SWITCH_CHART_TYPE: 'SWITCH_CHART_TYPE',

  GET_DIRECT_FEEDBACK: 'GET_DIRECT_FEEDBACK',
  GET_DIRECT_FEEDBACK_SUCCESS: 'GET_DIRECT_FEEDBACK_SUCCESS',
  GET_DIRECT_FEEDBACK_FAILED: 'GET_DIRECT_FEEDBACK_FAILED',


  GET_ALL_MY_WIDGET: 'GET_ALL_MY_WIDGET',
  GET_ALL_MY_WIDGET_SUCCESS: 'GET_ALL_MY_WIDGET_SUCCESS'
}

export interface FeedbackState {
  loadingFeedbackData: false
  myTeamMembers: User[] | null
  getMyTeamMembersError: string | null
  questions: {
    valueQuestions: Question[]
    textQuestions: Question[]
  }
  getQuestionsError: string | null
  feedbackStatus: boolean
  feedbackError: string | null
  comments: Comment[] | null
  getCommentsError: string | null
  myCurrentData: MyCurrent[] | null
  getMyCurrentDataError: string | null
  myData: MyData | null
  userData: MyData | null
  getMyDataError: string | null
  todo: ToDo[] | null
  getToDoError: string | null
  teamCurrentData: MyCurrent[] | null
  getTeamCurrentError: null
  teamData: MyData | null
  getTeamDataError: string | null
  usersRank: TeamUserRank[] | null
  getUserRanksError: string | null
  userCurrentData: MyCurrent[] | null
  newComments: Comment[] | null
  getNewCommentsError: string | null
  mySentFeedbackData: SentFeedbackData[] | null
  getSentFeedbackDataError: string | null
  selectedBarData: SelectedBarData[] | null
  getSelectedBarDataError: string | null
  selectedTeamBarData: SelectedBarData[] | null
  getSelectedTeamBarDataError: string | null
  sendCommentError: string | null
  feedbackByQuestionId: TexyAnswerByQuestionId[] | null
  getFeedbacksByQuestionIdError: string | null
  widgetAdded: boolean
  addWidgetError: string | null
  myWidgets: MyWidgetData
  getMyWidgetsError: string | null
  layout: any
  userTextFeedback: UserRecievedTextFeedback[] | null
  getUserTextFeedbackError: string | null
  targetHistory: TargetHistory[] | null
  getTargetHistoryError: string | null
  chartType: 'text' | 'graph'
  directFeedbacks: DirectFeedback[] | null
  getDirectFeedbacksError: string | null
}

export interface GetMyTeamMembersAction {
  type: typeof actions.GET_MY_TEAM_MEMBERS
}

export interface GetMyTeamMembersSuccessAction {
  type: typeof actions.GET_MY_TEAM_MEMBERS_FAILED
  users: User[]
}

export interface GetMyTeamMembersFailedAction {
  type: typeof actions.GET_MY_TEAM_MEMBERS_FAILED
  error: string
}

export interface GetQuestionsAction {
  type: typeof actions.GET_QUESTIONS
  teamId: string
  feedbackType: string
}

export interface GetQuestionsSuccessAction {
  type: typeof actions.GET_QUESTIONS_SUCCESS
  questions: {
    textQuestions: Question[]
    valueQuestions: Question[]
  }
}

export interface GetQuestionsFailedAction {
  type: typeof actions.GET_QUESTIONS_FAILED
  error: string
}

export interface SendFeedbackAction {
  type: typeof actions.SEND_FEEDBACK
  data: SendFeedbackVariables
}

export interface SendFeedbackSuccessAction {
  type: typeof actions.SEND_FEEDBACK_SUCCESS
  status: boolean
}

export interface SendFeedbackFailedAction {
  type: typeof actions.SEND_FEEDBACK_FAILED
  error: string
}

export interface GetCommentsAction {
  type: typeof actions.GET_COMMENTS
  category: string
  feedbackType: string
}

export interface GetCommentsSuccessAction {
  type: typeof actions.GET_COMMENTS_SUCCESS
  comments: Comment[]
}

export interface GetCommentsFailedAction {
  type: typeof actions.GET_COMMENTS_FAILED
  error: string
}

export interface GetMyCurrentDataAction {
  type: typeof actions.GET_MY_CURRENT_DATA
  userId?: string
}

export interface GetMyCurrentDataSuccessAction {
  type: typeof actions.GET_MY_CURRENT_DATA_SUCCESS
  data: MyCurrent[]
}

export interface GetMyCurrentDataFailedAction {
  type: typeof actions.GET_MY_CURRENT_DATA_FAILED
  error: string
}
export interface GetMyDataAction {
  type: typeof actions.GET_MY_DATA
  userId?: string
}

export interface GetMyDataSuccessAction {
  type: typeof actions.GET_MY_DATA_SUCCESS
  data: MyData[]
}

export interface GetMyDataFailedAction {
  type: typeof actions.GET_MY_DATA_FAILED
  error: string
}

export interface GetMyToDoAction {
  type: typeof actions.GET_MY_TODO
}

export interface GetMyToDoSuccessAction {
  type: typeof actions.GET_MY_TODO_SUCCESS
  todo: ToDo[]
}

export interface GetMyToDoFailedAction {
  type: typeof actions.GET_MY_TODO_FAILED
  error: string
}

export interface GetTeamCurrentDataAction {
  type: typeof actions.GET_TEAM_CURRENT_DATA
  teamId: string
}

export interface GetTeamCurrentDataSuccessAction {
  type: typeof actions.GET_TEAM_CURRENT_DATA_SUCCESS
  data: MyCurrent[]
}

export interface GetTeamCurrentDataaFailedAction {
  type: typeof actions.GET_TEAM_CURRENT_DATA_FAILED
  error: string
}

export interface GetTeamDataAction {
  type: typeof actions.GET_TEAM_DATA
  teamId: string
}

export interface GetTeamDataSuccessAction {
  type: typeof actions.GET_TEAM_DATA_SUCCESS
  data: MyData[]
}

export interface GetTeamDataFailedAction {
  type: typeof actions.GET_TEAM_DATA_FAILED
  error: string
}

export interface GetTeamUserRanksAction {
  type: typeof actions.GET_TEAM_USER_RANK
  teamId: string
}

export interface GetTeamUserRanksSuccessAction {
  type: typeof actions.GET_TEAM_USER_RANK_SUCCESS
  data: TeamUserRank[]
}

export interface GetTeamUserRanksFailedAction {
  type: typeof actions.GET_TEAM_USER_RANK_FAILED
  error: string
}

export interface GetNewCommentsAction {
  type: typeof actions.GET_NEW_COMMENTS
}

export interface GetNewCommentsSuccessAction {
  type: typeof actions.GET_NEW_COMMENTS_SUCCESS
  data: Comment[]
}

export interface GetNewCommentsFailedAction {
  type: typeof actions.GET_NEW_COMMENTS_FAILED
  error: string
}

export interface GetSentFeedbackDataAction {
  type: typeof actions.GET_SENT_FEEDBACK_DATA
}

export interface GetSentFeedbackSuccessAction {
  type: typeof actions.GET_SENT_FEEDBACK_DATA_SUCCESS
  data: SentFeedbackData[]
}

export interface GetSentFeedbackFailedAction {
  type: typeof actions.GET_SENT_FEEDBACK_DATA_FAILED
  error: string
}

export interface GetSelectedBarDataAction {
  type: typeof actions.GET_SELECTED_BAR_DATA
  barType: string
  instance: string
}

export interface GetSelectedBarDataSuccessAction {
  type: typeof actions.GET_SELECTED_BAR_DATA_SUCCESS
  data: SelectedBarData[]
}

export interface GetSelectedBarDataFailedAction {
  type: typeof actions.GET_SELECTED_BAR_DATA_FAILED
  error: string
}

export interface GetSeletedTeamBarDataAction {
  type: typeof actions.GET_SELECTED_TEAM_BAR_DATA
  barType: string
  instance: string
  teamId: string
}

export interface GetSeletedTeamBarDataSuccessAction {
  type: typeof actions.GET_SELECTED_TEAM_BAR_DATA_SUCCESS
  data: SelectedBarData[]
}

export interface GetSeletedTeamBarDataFailedAction {
  type: typeof actions.GET_SELECTED_TEAM_BAR_DATA_FAILED
  error: string
}

export interface SendCommentOnFeedbackAction {
  type: typeof actions.SEND_COMMENT_ON_FEEDBACK
  data: SendCommentVariables
}

export interface SendCommentOnFeedbackSuccessAction {
  type: typeof actions.SEND_COMMENT_ON_FEEDBACK_SUCCESS
  comments: CommentOnFeedback[]
}

export interface SendCommentOnFeedbackFailedAction {
  type: typeof actions.SEND_COMMENT_ON_FEEDBACK_FAILED
  error: string
}

export interface GetFeedbacksByQuestionIdAndTeamIdAction {
  type: typeof actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID
  data: GetFeedbacksByQuestionIdVariables
}

export interface GetFeedbacksByQuestionIdAndTeamIdSuccessAction {
  type: typeof actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_SUCCESS
  data: TexyAnswerByQuestionId[]
}

export interface GetFeedbacksByQuestionIdAndTeamIdFailedAction {
  type: typeof actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_FAILED
  error: string
}

export interface AddWidgetAction {
  type: typeof actions.ADD_WIDGET
  data: AddWidgetVariables
}

export interface AddWidgetSuccessAction {
  type: typeof actions.ADD_WIDGET_SUCCESS
}

export interface AddWidgetFailedAction {
  type: typeof actions.ADD_WIDGET_FAILED
  error: string
}

export interface LikeUnlikeFeedbackAction {
  type: typeof actions.LIKE_UNLIKE_FEEDBACK
  targetId: string
  like: boolean
  userData?: {
    _id: string
    firstname: string
    lastname: string
  }
}

export interface GetMyWidgetsAction {
  type: typeof actions.GET_MY_WIDGETS
  teamId: string
  category: 'self' | 'team' | 'p2p' | 'userSentFeedback' | 'supervisor' | 'supervisoryFeedback'
  userId?: string
  loadAll?: boolean
}

export interface GetMyWidgetsSuccessActions {
  type: typeof actions.GET_MY_WIDGETS_SUCCESS
  data: MyWidget[]
  layout: any
  category: 'self' | 'team' | 'p2p' | 'userSentFeedback' | 'supervisor' | 'supervisoryFeedback'
}

export interface GetAllMyWidgetSuccessAction {
  type: typeof actions.GET_ALL_MY_WIDGET_SUCCESS,
  data: MyWidgetData
}

export interface GetMyWidgetsFailedActions {
  type: typeof actions.GET_MY_WIDGETS_FAILED
  error: string
}

export interface UpdateWidgetSettingsAction {
  type: typeof actions.UPDATE_WIDGET_SETTINGS
  settings: any
  widgetId: string
}

export interface MarkReadAction {
  type: typeof actions.MARK_READ
  targetId: string
  questionId: string
}

export interface GetUserTextFeedbackAction {
  type: typeof actions.GET_USER_TEXT_FEEDBACK
  userId: string
  category: string
}

export interface GetUserTextFeedbackSuccessAction {
  type: typeof actions.GET_USER_TEXT_FEEDBACK_SUCCESS
  data: UserRecievedTextFeedback[]
}

export interface GetUserTextFeedbackFailedAction {
  type: typeof actions.GET_USER_TEXT_FEEDBACK_FAILED
  error: string
}

export interface GetTargetHistoryAction {
  type: typeof actions.GET_TARGET_HISTORY
  targetId: string
}

export interface GetTargetHistorySuccessAction {
  type: typeof actions.GET_TARGET_HISTORY_SUCCESS
  data: TargetHistory[]
}

export interface GetTargetHistoryFailedAction {
  type: typeof actions.GET_TARGET_HISTORY_FAILED
  error: string
}

export interface GetDirectFeedbackAction {
  type: typeof actions.GET_DIRECT_FEEDBACK
  sender: string
  receiver: string
  team?: boolean
}

export interface GetDirectFeedbackSuccessAction {
  type: typeof actions.GET_DIRECT_FEEDBACK_SUCCESS
  data: DirectFeedback[]
}

export interface GetDirectFeedbackFailedAction {
  type: typeof actions.GET_DIRECT_FEEDBACK_FAILED
  error: string
}

export interface RemoveLayoutAction {
  type: typeof actions.REMOVE_LAYOUT
  size: 'tablet' | 'desktop' | 'wide'
  category: Category
}

export interface SwitchChartTypeAction {
  type: typeof actions.SWITCH_CHART_TYPE
  chartType: 'text' | 'graph'
}

export type FeedbackActionTypes =
  | GetMyTeamMembersAction
  | GetMyTeamMembersSuccessAction
  | GetMyTeamMembersFailedAction
  | GetQuestionsAction
  | GetQuestionsSuccessAction
  | GetQuestionsFailedAction
  | SendFeedbackAction
  | SendFeedbackSuccessAction
  | SendFeedbackFailedAction
  | GetCommentsAction
  | GetCommentsSuccessAction
  | GetCommentsFailedAction
  | GetMyCurrentDataAction
  | GetMyCurrentDataSuccessAction
  | GetMyCurrentDataFailedAction
  | GetMyDataAction
  | GetMyDataSuccessAction
  | GetMyDataFailedAction
  | GetTeamCurrentDataAction
  | GetTeamCurrentDataSuccessAction
  | GetTeamCurrentDataaFailedAction
  | GetTeamDataAction
  | GetTeamDataSuccessAction
  | GetTeamDataFailedAction
  | GetTeamUserRanksAction
  | GetTeamUserRanksSuccessAction
  | GetTeamUserRanksFailedAction
  | GetNewCommentsAction
  | GetNewCommentsSuccessAction
  | GetNewCommentsFailedAction
  | GetSentFeedbackDataAction
  | GetSentFeedbackSuccessAction
  | GetSentFeedbackFailedAction
  | GetSelectedBarDataAction
  | GetSelectedBarDataSuccessAction
  | GetSeletedTeamBarDataAction
  | GetSeletedTeamBarDataSuccessAction
  | GetSeletedTeamBarDataFailedAction
  | SendCommentOnFeedbackAction
  | SendCommentOnFeedbackSuccessAction
  | SendCommentOnFeedbackFailedAction
  | GetFeedbacksByQuestionIdAndTeamIdAction
  | GetFeedbacksByQuestionIdAndTeamIdSuccessAction
  | GetFeedbacksByQuestionIdAndTeamIdFailedAction
  | UpdateWidgetSettingsAction
  | MarkReadAction
  | GetUserTextFeedbackAction
  | GetUserTextFeedbackSuccessAction
  | GetUserTextFeedbackFailedAction
  | RemoveLayoutAction
  | GetTargetHistoryAction
  | GetTargetHistorySuccessAction
  | GetTargetHistoryFailedAction
  | SwitchChartTypeAction
  | GetDirectFeedbackAction
  | GetDirectFeedbackSuccessAction
  | GetDirectFeedbackFailedAction
