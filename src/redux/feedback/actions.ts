import {
  AddWidgetVariables,
  Category,
  Comment,
  CommentOnFeedback,
  DirectFeedback,
  GetFeedbacksByQuestionIdVariables,
  MyCurrent,
  MyData,
  MyWidget,
  MyWidgetData,
  Question,
  SelectedBarData,
  SendCommentVariables,
  SendFeedbackVariables,
  SentFeedbackData,
  TargetHistory,
  TeamUserRank,
  TextAnswer,
  TexyAnswerByQuestionId,
  ToDo,
  User,
  UserRecievedTextFeedback,
} from 'src/apiTypes'
import {
  actions,
  GetCommentsFailedAction,
  GetCommentsSuccessAction,
  GetMyCurrentDataFailedAction,
  GetMyCurrentDataSuccessAction,
  GetMyDataFailedAction,
  GetMyDataSuccessAction,
  GetMyTeamMembersFailedAction,
  GetMyTeamMembersSuccessAction,
  GetMyToDoFailedAction,
  GetMyToDoSuccessAction,
  GetNewCommentsFailedAction,
  GetNewCommentsSuccessAction,
  GetQuestionsFailedAction,
  GetQuestionsSuccessAction,
  GetSelectedBarDataAction,
  GetSelectedBarDataSuccessAction,
  GetSentFeedbackFailedAction,
  GetSentFeedbackSuccessAction,
  GetTeamCurrentDataaFailedAction,
  GetTeamCurrentDataSuccessAction,
  GetTeamDataFailedAction,
  GetTeamDataSuccessAction,
  GetTeamUserRanksFailedAction,
  GetTeamUserRanksSuccessAction,
  SendFeedbackFailedAction,
  SendFeedbackSuccessAction,
  GetSelectedBarDataFailedAction,
  GetSeletedTeamBarDataAction,
  GetSeletedTeamBarDataSuccessAction,
  GetSeletedTeamBarDataFailedAction,
  SendCommentOnFeedbackAction,
  SendCommentOnFeedbackSuccessAction,
  SendCommentOnFeedbackFailedAction,
  LikeUnlikeFeedbackAction,
  GetFeedbacksByQuestionIdAndTeamIdAction,
  GetFeedbacksByQuestionIdAndTeamIdSuccessAction,
  GetFeedbacksByQuestionIdAndTeamIdFailedAction,
  AddWidgetAction,
  AddWidgetSuccessAction,
  AddWidgetFailedAction,
  GetMyWidgetsAction,
  GetMyWidgetsSuccessActions,
  GetMyWidgetsFailedActions,
  UpdateWidgetSettingsAction,
  MarkReadAction,
  GetUserTextFeedbackAction,
  GetUserTextFeedbackSuccessAction,
  GetUserTextFeedbackFailedAction,
  RemoveLayoutAction,
  GetTargetHistoryAction,
  GetTargetHistorySuccessAction,
  GetTargetHistoryFailedAction,
  GetDirectFeedbackAction,
  GetDirectFeedbackSuccessAction,
  GetDirectFeedbackFailedAction,
  GetAllMyWidgetSuccessAction,
} from './constants'

export const getMyTeamMembers = () => ({
  type: actions.GET_MY_TEAM_MEMBERS,
})

export const getMyTeamMembersSuccess = (
  users: User[]
): GetMyTeamMembersSuccessAction => ({
  type: actions.GET_MY_TEAM_MEMBERS_SUCCESS,
  users,
})

export const getMyTeamMembersFailed = (
  error: string
): GetMyTeamMembersFailedAction => ({
  type: actions.GET_MY_TEAM_MEMBERS_FAILED,
  error,
})

export const getQuestions = (teamId: string, feedbackType: string) => ({
  type: actions.GET_QUESTIONS,
  teamId,
  feedbackType,
})

export const getQuestionsSuccess = (questions: {
  textQuestions: Question[]
  valueQuestions: Question[]
}): GetQuestionsSuccessAction => ({
  type: actions.GET_QUESTIONS_SUCCESS,
  questions,
})

export const getQuestionsFailed = (
  error: string
): GetQuestionsFailedAction => ({
  type: actions.GET_QUESTIONS_SUCCESS,
  error,
})

export const sendFeedback = (data: SendFeedbackVariables) => ({
  type: actions.SEND_FEEDBACK,
  data,
})

export const sendFeedbackSuccess = (
  status: boolean
): SendFeedbackSuccessAction => ({
  type: actions.SEND_FEEDBACK_SUCCESS,
  status,
})

export const sendFeedbackFailed = (
  error: string
): SendFeedbackFailedAction => ({
  type: actions.SEND_FEEDBACK_FAILED,
  error,
})

export const getComments = (category: string, feedbackType: string) => ({
  type: actions.GET_COMMENTS,
  category,
  feedbackType,
})

export const getCommentsSuccess = (
  comments: Comment[]
): GetCommentsSuccessAction => ({
  type: actions.GET_COMMENTS_SUCCESS,
  comments,
})

export const getCommentsFailed = (error: string): GetCommentsFailedAction => ({
  type: actions.GET_COMMENTS_FAILED,
  error,
})

export const getMyCurrentData = (userId?: string) => ({
  type: actions.GET_MY_CURRENT_DATA,
  userId,
})

export const getMyCurrentDataSuccess = (
  data: MyCurrent[]
): GetMyCurrentDataSuccessAction => ({
  type: actions.GET_MY_CURRENT_DATA_SUCCESS,
  data,
})

export const getUserCurrentDataSuccess = (
  data: MyCurrent[]
): GetMyCurrentDataSuccessAction => ({
  type: actions.GET_USER_CURRENT_DATA_SUCCESS,
  data,
})

export const getMyCurrentDataFailed = (
  error: string
): GetMyCurrentDataFailedAction => ({
  type: actions.GET_MY_CURRENT_DATA_FAILED,
  error,
})

export const getMyData = (userId?: string) => ({
  type: actions.GET_MY_DATA,
  userId,
})

export const getMyDataSuccess = (data: MyData[]): GetMyDataSuccessAction => ({
  type: actions.GET_MY_DATA_SUCCESS,
  data,
})

export const getUserDataSuccess = (data: MyData[]): GetMyDataSuccessAction => ({
  type: actions.GET_USER_DATA_SUCCESS,
  data,
})

export const getMyDataFailed = (error: string): GetMyDataFailedAction => ({
  type: actions.GET_MY_DATA_FAILED,
  error,
})

export const getMyToDo = () => ({
  type: actions.GET_MY_TODO,
})

export const getMyToDoSuccess = (todo: ToDo[]): GetMyToDoSuccessAction => ({
  type: actions.GET_MY_TODO_SUCCESS,
  todo,
})

export const getMyToDoFailed = (error: string): GetMyToDoFailedAction => ({
  type: actions.GET_MY_TODO_FAILED,
  error,
})

export const getTeamCurrent = (teamId: string) => ({
  type: actions.GET_TEAM_CURRENT_DATA,
  teamId,
})

export const getTeamCurrentSuccess = (
  data: MyCurrent[]
): GetTeamCurrentDataSuccessAction => ({
  type: actions.GET_TEAM_CURRENT_DATA_SUCCESS,
  data,
})

export const getTeamCurrentFailed = (
  error: string
): GetTeamCurrentDataaFailedAction => ({
  type: actions.GET_TEAM_CURRENT_DATA_FAILED,
  error,
})

export const getTeamData = (teamId: string) => ({
  type: actions.GET_TEAM_DATA,
  teamId,
})

export const getTeamDataSuccess = (
  data: MyData[]
): GetTeamDataSuccessAction => ({
  type: actions.GET_TEAM_DATA_SUCCESS,
  data,
})

export const getTeamDataFailed = (error: string): GetTeamDataFailedAction => ({
  type: actions.GET_TEAM_DATA_FAILED,
  error,
})

export const getTeamUserRanks = (teamId: string) => ({
  type: actions.GET_TEAM_USER_RANK,
  teamId,
})

export const getTeamUserRanksSuccess = (
  data: TeamUserRank[]
): GetTeamUserRanksSuccessAction => ({
  type: actions.GET_TEAM_USER_RANK_SUCCESS,
  data,
})

export const getTeamUserRanksFailed = (
  error: string
): GetTeamUserRanksFailedAction => ({
  type: actions.GET_TEAM_USER_RANK_FAILED,
  error,
})

export const getNewComments = () => ({
  type: actions.GET_NEW_COMMENTS,
})

export const getNewCommentsSuccess = (
  data: Comment[]
): GetNewCommentsSuccessAction => ({
  type: actions.GET_NEW_COMMENTS_SUCCESS,
  data,
})

export const getNewCommentsFailed = (
  error: string
): GetNewCommentsFailedAction => ({
  type: actions.GET_NEW_COMMENTS_FAILED,
  error,
})

export const markFeedbackRead = () => ({
  type: actions.MARK_FEEDBACK_READ,
})

export const getSentFeedbackData = () => ({
  type: actions.GET_SENT_FEEDBACK_DATA,
})

export const getSentFeedbackDataSuccess = (
  data: SentFeedbackData[]
): GetSentFeedbackSuccessAction => ({
  type: actions.GET_SENT_FEEDBACK_DATA_SUCCESS,
  data,
})

export const getSentFeedbackDataFailed = (
  error: string
): GetSentFeedbackFailedAction => ({
  type: actions.GET_SENT_FEEDBACK_DATA_FAILED,
  error,
})

export const getSelectedBarData = (
  barType: string,
  instance: string
): GetSelectedBarDataAction => ({
  type: actions.GET_SELECTED_BAR_DATA,
  barType,
  instance,
})

export const getSelectedBarDataSuccess = (
  data: SelectedBarData[]
): GetSelectedBarDataSuccessAction => ({
  type: actions.GET_SELECTED_BAR_DATA_SUCCESS,
  data,
})

export const getSelectedBarDataFailed = (
  error: string
): GetSelectedBarDataFailedAction => ({
  type: actions.GET_SELECTED_BAR_DATA_FAILED,
  error,
})

export const getSelectedTeamBarData = (
  barType: string,
  instance: string,
  teamId: string
): GetSeletedTeamBarDataAction => ({
  type: actions.GET_SELECTED_TEAM_BAR_DATA,
  barType,
  instance,
  teamId,
})

export const getSelectedTeamBarDataSuccess = (
  data: SelectedBarData[]
): GetSeletedTeamBarDataSuccessAction => ({
  type: actions.GET_SELECTED_TEAM_BAR_DATA_SUCCESS,
  data,
})

export const getSelectedTeamBarDataFailed = (
  error: string
): GetSeletedTeamBarDataFailedAction => ({
  type: actions.GET_SELECTED_TEAM_BAR_DATA_FAILED,
  error,
})

export const sendComment = (
  data: SendCommentVariables
): SendCommentOnFeedbackAction => ({
  type: actions.SEND_COMMENT_ON_FEEDBACK,
  data,
})

export const sendCommentSuccess = (
  comments: CommentOnFeedback[]
): SendCommentOnFeedbackSuccessAction => ({
  type: actions.SEND_COMMENT_ON_FEEDBACK_SUCCESS,
  comments,
})

export const sendCommentFailed = (
  error: string
): SendCommentOnFeedbackFailedAction => ({
  type: actions.GET_SELECTED_TEAM_BAR_DATA_FAILED,
  error,
})

export const likeUnlikeFeedback = (
  targetId: string,
  like: boolean,
  userData?: {
    _id: string
    firstname: string
    lastname: string
  }
): LikeUnlikeFeedbackAction => ({
  type: actions.LIKE_UNLIKE_FEEDBACK,
  targetId,
  like,
})

export const getFeedbacksByQuestionId = (
  data: GetFeedbacksByQuestionIdVariables
): GetFeedbacksByQuestionIdAndTeamIdAction => ({
  type: actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID,
  data,
})

export const getFeedbacksByQuestionIdSuccess = (
  data: TexyAnswerByQuestionId[]
): GetFeedbacksByQuestionIdAndTeamIdSuccessAction => ({
  type: actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_SUCCESS,
  data,
})

export const getFeedbacksByQuestionIdFailed = (
  error: string
): GetFeedbacksByQuestionIdAndTeamIdFailedAction => ({
  type: actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_FAILED,
  error,
})

export const addWidget = (data: AddWidgetVariables): AddWidgetAction => ({
  type: actions.ADD_WIDGET,
  data,
})

export const addWidgetSuccess = (): AddWidgetSuccessAction => ({
  type: actions.ADD_WIDGET_SUCCESS,
})

export const addWidgetFailed = (error: string): AddWidgetFailedAction => ({
  type: actions.ADD_WIDGET_FAILED,
  error,
})

export const getMyWidgets = (
  teamId: string,
  category: 'self' | 'team' | 'p2p' | 'userSentFeedback' | 'supervisor' | 'supervisoryFeedback',
  userId?: string
): GetMyWidgetsAction => ({
  type: actions.GET_MY_WIDGETS,
  teamId,
  category,
  userId,
})

export const getMyWidgetsSuccess = (
  data: MyWidget[],
  layout: any,
  category: 'self' | 'team' | 'p2p' | 'userSentFeedback' | 'supervisor' | 'supervisoryFeedback'
): GetMyWidgetsSuccessActions => ({
  type: actions.GET_MY_WIDGETS_SUCCESS,
  data,
  layout,
  category
})

export const getAllMyWidgetsSuccess = (data: MyWidgetData): GetAllMyWidgetSuccessAction => ({
  type: actions.GET_ALL_MY_WIDGET_SUCCESS,
  data
})

export const getMyWidgetsFailed = (
  error: string
): GetMyWidgetsFailedActions => ({
  type: actions.GET_MY_WIDGETS_FAILED,
  error,
})

export const updateWidgetSettings = (
  settings: any,
  widgetId: string
): UpdateWidgetSettingsAction => ({
  type: actions.UPDATE_WIDGET_SETTINGS,
  settings,
  widgetId,
})

export const markRead = (
  targetId: string,
  questionId: string
): MarkReadAction => ({
  type: actions.MARK_READ,
  targetId,
  questionId,
})

export const getUserTextFeedback = (
  userId: string,
  category: 'p2p' | 'self' | 'subordinate' | 'supervisor'
): GetUserTextFeedbackAction => ({
  type: actions.GET_USER_TEXT_FEEDBACK,
  userId,
  category,
})

export const getUserTextFeedbackSuccess = (
  data: UserRecievedTextFeedback[]
): GetUserTextFeedbackSuccessAction => ({
  type: actions.GET_USER_TEXT_FEEDBACK_SUCCESS,
  data,
})

export const getUserTextFeedbackFailed = (
  error: string
): GetUserTextFeedbackFailedAction => ({
  type: actions.GET_USER_TEXT_FEEDBACK_FAILED,
  error,
})

export const getDirectFeedback = (
  receiver: string,
  sender: string,
  team?: boolean
): GetDirectFeedbackAction => ({
  type: actions.GET_DIRECT_FEEDBACK,
  sender,
  receiver,
  team
})

export const getDirectFeedbackSuccess = (
  data: DirectFeedback[]
): GetDirectFeedbackSuccessAction => ({
  type: actions.GET_DIRECT_FEEDBACK_SUCCESS,
  data,
})

export const getDirectFeedbackFailed = (
  error: string
): GetDirectFeedbackFailedAction => ({
  type: actions.GET_DIRECT_FEEDBACK_FAILED,
  error,
})

export const getTargetHistory = (targetId: string): GetTargetHistoryAction => ({
  type: actions.GET_TARGET_HISTORY,
  targetId,
})

export const getTargetHistorySuccess = (
  data: TargetHistory[]
): GetTargetHistorySuccessAction => ({
  type: actions.GET_TARGET_HISTORY_SUCCESS,
  data,
})

export const getTargetHistoryFailed = (
  error: string
): GetTargetHistoryFailedAction => ({
  type: actions.GET_TARGET_HISTORY_FAILED,
  error,
})

export const removeLayout = (
  size: 'tablet' | 'desktop' | 'wide',
  category: Category
): RemoveLayoutAction => ({
  type: actions.REMOVE_LAYOUT,
  size,
  category
})

export const clearUserTextFeedback = () => ({
  type: actions.CLEAR_USER_TEXT_FEEDBACK,
})

export const switchChartType = (chartType: 'graph' | 'text') => ({
  type: actions.SWITCH_CHART_TYPE,
  chartType
})

export const getAllMyWidgets = () => ({
  type: actions.GET_ALL_MY_WIDGET
})