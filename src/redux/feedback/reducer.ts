import {
  FeedbackActionTypes,
  FeedbackState,
  actions,
  GetMyTeamMembersSuccessAction,
  GetMyTeamMembersFailedAction,
  GetQuestionsSuccessAction,
  GetQuestionsFailedAction,
  SendFeedbackFailedAction,
  GetCommentsSuccessAction,
  GetCommentsFailedAction,
  GetMyCurrentDataSuccessAction,
  GetMyCurrentDataFailedAction,
  GetMyDataSuccessAction,
  GetMyDataFailedAction,
  GetMyToDoSuccessAction,
  GetMyToDoFailedAction,
  GetTeamCurrentDataSuccessAction,
  GetTeamCurrentDataaFailedAction,
  GetTeamDataSuccessAction,
  GetTeamDataFailedAction,
  GetTeamUserRanksSuccessAction,
  GetTeamUserRanksFailedAction,
  GetNewCommentsSuccessAction,
  GetNewCommentsFailedAction,
  GetSentFeedbackSuccessAction,
  GetSentFeedbackFailedAction,
  GetSelectedBarDataSuccessAction,
  GetSelectedBarDataFailedAction,
  GetSeletedTeamBarDataSuccessAction,
  GetSeletedTeamBarDataFailedAction,
  SendCommentOnFeedbackAction,
  LikeUnlikeFeedbackAction,
  GetFeedbacksByQuestionIdAndTeamIdSuccessAction,
  GetFeedbacksByQuestionIdAndTeamIdFailedAction,
  GetMyWidgetsFailedActions,
  GetMyWidgetsSuccessActions,
  MarkReadAction,
  GetUserTextFeedbackSuccessAction,
  GetUserTextFeedbackFailedAction,
  GetTargetHistoryAction,
  GetTargetHistorySuccessAction,
  GetTargetHistoryFailedAction,
  RemoveLayoutAction,
  SwitchChartTypeAction,
  GetDirectFeedbackSuccessAction,
  GetDirectFeedbackFailedAction,
  GetAllMyWidgetSuccessAction
} from './constants'

import {
  actions as authActions,
  UpdateUserSettingsAction,
} from '../auth/constants'

const initialState: FeedbackState = {
  loadingFeedbackData: false,
  myTeamMembers: null,
  getMyTeamMembersError: null,
  questions: {
    valueQuestions: [],
    textQuestions: [],
  },
  getQuestionsError: null,
  feedbackError: null,
  feedbackStatus: false,
  comments: null,
  getCommentsError: null,
  myCurrentData: null,
  getMyCurrentDataError: null,
  myData: null,
  getMyDataError: null,
  todo: null,
  getToDoError: null,
  getTeamCurrentError: null,
  teamCurrentData: null,
  teamData: null,
  getTeamDataError: null,
  usersRank: null,
  getUserRanksError: null,
  userData: null,
  userCurrentData: null,
  newComments: null,
  getNewCommentsError: null,
  mySentFeedbackData: null,
  getSentFeedbackDataError: null,
  getSelectedBarDataError: null,
  selectedBarData: null,
  selectedTeamBarData: null,
  getSelectedTeamBarDataError: null,
  sendCommentError: null,
  getFeedbacksByQuestionIdError: null,
  feedbackByQuestionId: null,
  widgetAdded: false,
  addWidgetError: null,
  getMyWidgetsError: null,
  myWidgets: {
    self: {
      data: null,
      layout: null
    },
    p2p: {
      data: null,
      layout: null
    },
    team: {
      data: null,
      layout: null
    },
    supervisor: {
      data: null,
      layout: null
    },
    supervisoryFeedback: {
      data: null,
      layout: null
    },
    userSentFeedback: {
      data: null,
      layout: null
    },
  },
  layout: null,
  getUserTextFeedbackError: null,
  userTextFeedback: null,
  targetHistory: null,
  getTargetHistoryError: null,
  chartType: 'graph',
  directFeedbacks: null,
  getDirectFeedbacksError: null

}

const feedbackReducer = (
  state = initialState,
  action: FeedbackActionTypes
): FeedbackState => {
  switch (action.type) {
    case actions.GET_MY_TEAM_MEMBERS:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getMyTeamMembersError: null,
      })
    case actions.GET_MY_TEAM_MEMBERS_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        myTeamMembers: (action as GetMyTeamMembersSuccessAction).users,
      })
    case actions.GET_MY_TEAM_MEMBERS_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getMyTeamMembersError: (action as GetMyTeamMembersFailedAction).error,
      })
    case actions.GET_QUESTIONS:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getQuestionsError: null,
      })
    case actions.GET_QUESTIONS_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        questions: (action as GetQuestionsSuccessAction).questions,
      })
    case actions.GET_QUESTIONS_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getQuestionsError: (action as GetQuestionsFailedAction).error,
      })
    case actions.SEND_FEEDBACK:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        feedbackError: null,
        feedbackStatus: false,
      })
    case actions.SEND_FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        feedbackStatus: true,
      })
    case actions.SEND_FEEDBACK_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        feedbackError: (action as SendFeedbackFailedAction).error,
      })
    case actions.GET_COMMENTS:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getCommentsError: null,
        comments: null,
      })
    case actions.GET_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        comments: (action as GetCommentsSuccessAction).comments,
      })
    case actions.GET_COMMENTS_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getCommentsError: (action as GetCommentsFailedAction).error,
      })

    case actions.GET_MY_CURRENT_DATA:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getMyCurrentDataError: null,
      })
    case actions.GET_MY_CURRENT_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        myCurrentData: (action as GetMyCurrentDataSuccessAction).data,
      })
    case actions.GET_USER_CURRENT_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        userCurrentData: (action as GetMyCurrentDataSuccessAction).data,
      })
    case actions.GET_MY_CURRENT_DATA_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getMyCurrentDataError: (action as GetMyCurrentDataFailedAction).error,
      })

    case actions.GET_MY_DATA:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getMyDataError: null,
      })
    case actions.GET_MY_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        myData: (action as GetMyDataSuccessAction).data,
      })

    case actions.GET_USER_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        userData: (action as GetMyDataSuccessAction).data,
      })
    case actions.GET_MY_DATA_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getMyDataError: (action as GetMyDataFailedAction).error,
      })

    case actions.GET_MY_TODO:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getToDoError: null,
      })
    case actions.GET_MY_TODO_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        todo: (action as GetMyToDoSuccessAction).todo,
      })
    case actions.GET_MY_TODO_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getToDoError: (action as GetMyToDoFailedAction).error,
      })

    case actions.GET_TEAM_CURRENT_DATA:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getTeamCurrentError: null,
      })
    case actions.GET_TEAM_CURRENT_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        teamCurrentData: (action as GetTeamCurrentDataSuccessAction).data,
      })
    case actions.GET_TEAM_CURRENT_DATA_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getTeamCurrentError: (action as GetTeamCurrentDataaFailedAction).error,
      })

    case actions.GET_TEAM_DATA:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getTeamDataError: null,
      })
    case actions.GET_TEAM_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        teamData: (action as GetTeamDataSuccessAction).data,
      })
    case actions.GET_TEAM_DATA_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getTeamDataError: (action as GetTeamDataFailedAction).error,
      })
    case actions.GET_TEAM_USER_RANK:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getUserRanksError: null,
      })
    case actions.GET_TEAM_USER_RANK_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        usersRank: (action as GetTeamUserRanksSuccessAction).data,
      })
    case actions.GET_TEAM_USER_RANK_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getUserRanksError: (action as GetTeamUserRanksFailedAction).error,
      })

    case actions.GET_NEW_COMMENTS:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getNewCommentsError: null,
      })
    case actions.GET_NEW_COMMENTS_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        newComments: (action as GetNewCommentsSuccessAction).data,
      })
    case actions.GET_NEW_COMMENTS_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getNewCommentsError: (action as GetNewCommentsFailedAction).error,
      })

    case actions.GET_SENT_FEEDBACK_DATA:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getSentFeedbackDataError: null,
      })
    case actions.GET_SENT_FEEDBACK_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        mySentFeedbackData: (action as GetSentFeedbackSuccessAction).data,
      })
    case actions.GET_SENT_FEEDBACK_DATA_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getSentFeedbackDataError: (action as GetSentFeedbackFailedAction).error,
      })

    case actions.GET_SELECTED_BAR_DATA:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getSelectedBarDataError: null,
      })
    case actions.GET_SELECTED_BAR_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        selectedBarData: (action as GetSelectedBarDataSuccessAction).data,
      })
    case actions.GET_SELECTED_BAR_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getSelectedBarDataError: (action as GetSelectedBarDataFailedAction)
          .error,
      })

    case actions.GET_SELECTED_TEAM_BAR_DATA:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getSelectedTeamBarDataError: null,
      })
    case actions.GET_SELECTED_TEAM_BAR_DATA_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        selectedTeamBarData: (action as GetSeletedTeamBarDataSuccessAction)
          .data,
      })
    case actions.GET_SELECTED_TEAM_BAR_DATA_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getSelectedTeamBarDataError: (action as GetSeletedTeamBarDataFailedAction)
          .error,
      })

    case actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getFeedbacksByQuestionIdEror: null,
      })
    case actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        feedbackByQuestionId: (action as GetFeedbacksByQuestionIdAndTeamIdSuccessAction)
          .data,
      })
    case actions.GET_FEEFBACK_BY_QUESITONID_AND_TEAMID_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getFeedbacksByQuestionIdEror: (action as GetFeedbacksByQuestionIdAndTeamIdFailedAction)
          .error,
      })

    case actions.ADD_WIDGET:
      return Object.assign({}, state, {
        widgetAdded: false,
        addWidgetError: null,
        // getFeedbacksByQuestionIdEror: null,
      })
    case actions.ADD_WIDGET_SUCCESS:
      return Object.assign({}, state, {
        widgetAdded: true,
        addWidgetError: null,
      })
    case actions.ADD_WIDGET_FAILED:
      return Object.assign({}, state, {
        widgetAdded: false,
        addWidgetError: null,
      })

    case actions.GET_MY_WIDGETS:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getMyWidgetsError: null,
        // getFeedbacksByQuestionIdEror: null,
      })
    case actions.GET_MY_WIDGETS_SUCCESS:
      const myWidgets  =  { ...state.myWidgets }
       myWidgets[(action as GetMyWidgetsSuccessActions).category].data = (action as GetMyWidgetsSuccessActions).data
       myWidgets[(action as GetMyWidgetsSuccessActions).category].layout = (action as GetMyWidgetsSuccessActions).layout

      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getMyWidgetsError: null,
        myWidgets,
        layout: (action as GetMyWidgetsSuccessActions).layout,
      })
    case actions.GET_MY_WIDGETS_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getMyWidgetsError: (action as GetMyWidgetsFailedActions).error,
      })

    case actions.GET_USER_TEXT_FEEDBACK:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getUserTextFeedbackError: null,
        // getFeedbacksByQuestionIdEror: null,
      })
    case actions.GET_USER_TEXT_FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getUserTextFeedbackError: null,
        userTextFeedback: (action as GetUserTextFeedbackSuccessAction).data,
      })
    case actions.GET_USER_TEXT_FEEDBACK_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getUserTextFeedbackError: (action as GetUserTextFeedbackFailedAction)
          .error,
      })

    case actions.GET_DIRECT_FEEDBACK:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getDirectFeedbackError: null,
        // getFeedbacksByQuestionIdEror: null,
      })
    case actions.GET_DIRECT_FEEDBACK_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getDirectFeedbackError: null,
        directFeedbacks: (action as GetDirectFeedbackSuccessAction).data,
      })
    case actions.GET_DIRECT_FEEDBACK_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getDirectFeedbackError: (action as GetDirectFeedbackFailedAction).error,
      })

    case actions.GET_TARGET_HISTORY:
      return Object.assign({}, state, {
        loadingFeedbackData: true,
        getTargetHistoryError: null,
        // getFeedbacksByQuestionIdEror: null,
      })
    case actions.GET_TARGET_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getTargetHistoryError: null,
        targetHistory: (action as GetTargetHistorySuccessAction).data,
      })
    case actions.GET_TARGET_HISTORY_FAILED:
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        targetHistory: (action as GetTargetHistoryFailedAction).error,
      })

    case actions.SEND_COMMENT_ON_FEEDBACK:
      const oldComments = state.comments ? [...state.comments] : []
      oldComments.find((com) => {
        if (
          String(com._id) ===
          (action as SendCommentOnFeedbackAction).data.feedbackId
        ) {
          com.comments?.push({
            comment: (action as SendCommentOnFeedbackAction).data.comment,
            //@ts-ignore
            sender: {
              firstname: (action as SendCommentOnFeedbackAction).data.firstname,
              lastname: (action as SendCommentOnFeedbackAction).data.lastname,
            },
          })
        }
      })
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        getSelectedTeamBarDataError: (action as GetSeletedTeamBarDataFailedAction)
          .error,
      })

    case actions.LIKE_UNLIKE_FEEDBACK:
      const comms = state.comments ? [...state.comments] : []
      //const targetHistory = state.targetHistory ? [...state.targetHistory ] : []
      /*       if ((action as LikeUnlikeFeedbackAction).like) {
        targetHistory.pus
      } */
      //targetHistory.find(item => item._id === )
      comms.find((com) => {
        if (com._id === (action as LikeUnlikeFeedbackAction).targetId) {
          com.like = !(action as LikeUnlikeFeedbackAction).like
          com.totalLikes =
            com.totalLikes +
            ((action as LikeUnlikeFeedbackAction).like ? -1 : 1)
        }
      })
      return Object.assign({}, state, {
        loadingFeedbackData: false,
        comments: comms,
      })

    case actions.MARK_READ:
      console.log(action)

      const feedbackByQuestionId = state.feedbackByQuestionId
        ? [...state.feedbackByQuestionId]
        : []
      const userTextFeedback = state.userTextFeedback
        ? [...state.userTextFeedback]
        : []
      const textFeed = userTextFeedback.find(
        (item) =>
          String(item._id) === String((action as MarkReadAction).targetId)
      )
      console.log(textFeed, 'here')

      if (textFeed) {
        textFeed.read = true
      }
      const questions = state.questions
        ? [...state.questions.textQuestions]
        : []
      const questionFound = questions.find(
        (ques) =>
          String(ques.questionId) ===
          String((action as MarkReadAction).questionId)
      )
      if (questionFound) {
        if (questionFound.unread) {
          questionFound.unread = questionFound.unread - 1
        }
      }
      feedbackByQuestionId.find((com) => {
        if (com._id === (action as MarkReadAction).targetId) {
          com.read = true
        }
      })

      return Object.assign({}, state, {
        feedbackByQuestionId,
        userTextFeedback,
        questions: {
          valueQuestions: state.questions ? state.questions.valueQuestions : [],
          textQuestions: questions,
        },
      })

    case authActions.UPDATE_USER_SETTINGS:
      const oldLayouts = state.layout ? { ...state.layout } : {}
      let newSettings = {}
      if ((action as UpdateUserSettingsAction).size) {
        newSettings = {
          [(action as UpdateUserSettingsAction)
            .size || 'false'] : (action as UpdateUserSettingsAction).settings,
        }
      }

      return Object.assign({}, state, {
        layout: Object.assign({}, oldLayouts, newSettings),
      })

    case actions.REMOVE_LAYOUT:
      const oldLayout = state.layout ? { ...state.layout } : {}
      const oldMyWidget = {...state.myWidgets}
      if (oldMyWidget[(action as RemoveLayoutAction).category].layout && oldMyWidget[(action as RemoveLayoutAction).category].layout[(action as RemoveLayoutAction).size]) {
        oldMyWidget[(action as RemoveLayoutAction).category].layout[(action as RemoveLayoutAction).size] = null
      }
      
      const newSetting = {
        [(action as UpdateUserSettingsAction).size || 'false']: null,
      }
      return Object.assign({}, state, {
        layout: Object.assign({}, oldLayout, newSetting),
        myWidgets: oldMyWidget
      })

    case actions.CLEAR_USER_TEXT_FEEDBACK:
      return Object.assign({}, state, {
        userTextFeedback: null,
      })

    case actions.SWITCH_CHART_TYPE:
      return Object.assign({}, state, {
        chartType: (action as SwitchChartTypeAction).chartType
      })

    case actions.GET_ALL_MY_WIDGET_SUCCESS:
      return Object.assign({}, state, {
        myWidgets: (action as GetAllMyWidgetSuccessAction).data
      })

    default:
      return state
  }
}

export default feedbackReducer
