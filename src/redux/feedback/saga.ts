import {
  CommentOnFeedback,
  DirectFeedback,
  MyCurrent,
  MyData,
  MyWidget,
  MyWidgetData,
  Question,
  SelectedBarData,
  SentFeedbackData,
  SignUpResult,
  TargetHistory,
  TeamUserRank,
  TextAnswer,
  TexyAnswerByQuestionId,
  ToDo,
  UserRecievedTextFeedback,
} from 'src/apiTypes'
import request, { RequestFail, RequestReturnParam } from 'src/request'
import { GetMyTeamStatusAction } from '../teams/constants'
import {
  actions,
  GetCommentsAction,
  GetMyCurrentDataAction,
  GetMyDataAction,
  GetMyToDoAction,
  GetNewCommentsAction,
  GetQuestionsAction,
  GetSelectedBarDataAction,
  GetSentFeedbackDataAction,
  GetTeamCurrentDataAction,
  GetTeamDataAction,
  GetTeamUserRanksAction,
  SendFeedbackAction,
  GetSeletedTeamBarDataAction,
  SendCommentOnFeedbackFailedAction,
  SendCommentOnFeedbackAction,
  LikeUnlikeFeedbackAction,
  GetFeedbacksByQuestionIdAndTeamIdAction,
  AddWidgetAction,
  GetMyWidgetsAction,
  UpdateWidgetSettingsAction,
  MarkReadAction,
  GetUserTextFeedbackAction,
  GetTargetHistoryAction,
  GetDirectFeedbackAction,
} from './constants'
import { User, Comment } from 'src/apiTypes'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import {
  addWidgetFailed,
  addWidgetSuccess,
  getCommentsFailed,
  getCommentsSuccess,
  getFeedbacksByQuestionIdFailed,
  getFeedbacksByQuestionIdSuccess,
  getMyCurrentDataFailed,
  getMyCurrentDataSuccess,
  getMyDataFailed,
  getMyDataSuccess,
  getMyTeamMembersFailed,
  getMyTeamMembersSuccess,
  getMyToDoFailed,
  getMyToDoSuccess,
  getMyWidgetsFailed,
  getMyWidgetsSuccess,
  getNewCommentsFailed,
  getNewCommentsSuccess,
  getQuestionsFailed,
  getQuestionsSuccess,
  getSelectedBarDataFailed,
  getSelectedBarDataSuccess,
  getSelectedTeamBarDataFailed,
  getSelectedTeamBarDataSuccess,
  getSentFeedbackDataFailed,
  getSentFeedbackDataSuccess,
  getTeamCurrentFailed,
  getTeamCurrentSuccess,
  getTeamDataFailed,
  getTeamDataSuccess,
  getTeamUserRanksFailed,
  getTeamUserRanksSuccess,
  getUserCurrentDataSuccess,
  getUserDataSuccess,
  sendCommentFailed,
  sendCommentSuccess,
  sendFeedbackFailed,
  sendFeedbackSuccess,
  getUserTextFeedbackSuccess,
  getUserTextFeedbackFailed,
  getTargetHistorySuccess,
  getTargetHistoryFailed,
  getDirectFeedbackSuccess,
  getDirectFeedbackFailed,
  getAllMyWidgetsSuccess,
} from './actions'
import { RootState } from 'src/configureStore'

const {
  GET_MY_TEAM_MEMBERS,
  GET_QUESTIONS,
  SEND_FEEDBACK,
  GET_COMMENTS,
  GET_MY_CURRENT_DATA,
  GET_MY_DATA,
  GET_MY_TODO,
  GET_TEAM_CURRENT_DATA,
  GET_TEAM_DATA,
  GET_TEAM_USER_RANK,
  GET_NEW_COMMENTS,
  MARK_FEEDBACK_READ,
  GET_SENT_FEEDBACK_DATA,
  GET_SELECTED_BAR_DATA,
  GET_SELECTED_TEAM_BAR_DATA,
  SEND_COMMENT_ON_FEEDBACK,
  LIKE_UNLIKE_FEEDBACK,
  GET_FEEFBACK_BY_QUESITONID_AND_TEAMID,
  ADD_WIDGET,
  GET_MY_WIDGETS,
  UPDATE_WIDGET_SETTINGS,
  MARK_READ,
  GET_USER_TEXT_FEEDBACK,
  GET_TARGET_HISTORY,
  GET_DIRECT_FEEDBACK,
  GET_ALL_MY_WIDGET
} = actions

const getTeam = (state: RootState) => state.teamReducer.selectedTeam

function* getMyTeamMembers(action: GetMyTeamStatusAction) {
  const requestURL = `/api/teams/getMyTeamMembers`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: User[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  if (signupRes.success) {
    yield put(getMyTeamMembersSuccess(signupRes.data.data))
  } else {
    yield put(getMyTeamMembersFailed((signupRes as RequestFail).message))
  }
}

function* getQuestions(action: GetQuestionsAction) {
  const requestURL = `/api/teams/getCustomQuestions?teamId=${action.teamId}&category=${action.feedbackType}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: {
        textQuestions: Question[]
        valueQuestions: Question[]
      }
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log(signupRes, 'customQuestion')

  if (signupRes.success) {
    yield put(getQuestionsSuccess(signupRes.data.data))
  } else {
    yield put(getQuestionsFailed((signupRes as RequestFail).message))
  }
}

function* sendFeedback(action: SendFeedbackAction) {
  const requestURL = `/api/feedback/sendP2PFeedback`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'POST', action.data, true)

  console.log('send feedback')
  console.log(signupRes)

  if (signupRes.success) {
    yield put(sendFeedbackSuccess(true))
  } else {
    yield put(sendFeedbackFailed((signupRes as RequestFail).message))
  }
}

function* getComments(action: GetCommentsAction) {
  const requestURL = `/api/feedback/getComments?category=${action.category}&type=${action.feedbackType}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: Comment[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log('check comments here')
  console.log(signupRes)

  if (signupRes.success) {
    yield put(getCommentsSuccess(signupRes.data.data))
  } else {
    yield put(getCommentsFailed((signupRes as RequestFail).message))
  }
}

function* getMyCurrentData(action: GetMyCurrentDataAction) {
  const requestURL = `/api/feedback/getCurrentData${
    action.userId ? '?userId=' + action.userId : ''
  }`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: MyCurrent[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  if (signupRes.success) {
    if (action.userId) {
      yield put(getUserCurrentDataSuccess(signupRes.data.data))
    } else {
      yield put(getMyCurrentDataSuccess(signupRes.data.data))
    }
  } else {
    yield put(getMyCurrentDataFailed((signupRes as RequestFail).message))
  }
}
function* getMyData(action: GetMyDataAction) {
  const requestURL = `/api/feedback/getMyScore${
    action.userId ? '?userId=' + action.userId : ''
  }`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: MyData[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  if (signupRes.success) {
    if (action.userId) {
      yield put(getUserDataSuccess(signupRes.data.data))
    } else {
      yield put(getMyDataSuccess(signupRes.data.data))
    }
  } else {
    yield put(getMyDataFailed((signupRes as RequestFail).message))
  }
}

function* getMyToDo(action: GetMyToDoAction) {
  const requestURL = `/api/feedback/getMyToDo`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: ToDo[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  if (signupRes.success) {
    yield put(getMyToDoSuccess(signupRes.data.data))
  } else {
    yield put(getMyToDoFailed((signupRes as RequestFail).message))
  }
}

function* getTeamCurrent(action: GetTeamCurrentDataAction) {
  const requestURL = `/api/feedback/getTeamCurrentData?teamId=${action.teamId}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: MyCurrent[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log(signupRes)
  if (signupRes.success) {
    yield put(getTeamCurrentSuccess(signupRes.data.data))
  } else {
    yield put(getTeamCurrentFailed((signupRes as RequestFail).message))
  }
}

function* getTeamData(action: GetTeamDataAction) {
  const requestURL = `/api/feedback/getTeamScore?teamId=${action.teamId}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: MyData[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log(signupRes)
  if (signupRes.success) {
    yield put(getTeamDataSuccess(signupRes.data.data))
  } else {
    yield put(getTeamDataFailed((signupRes as RequestFail).message))
  }
}

function* getTeamUserRank(action: GetTeamUserRanksAction) {
  const requestURL = `/api/feedback/getUsersRankInTeam?teamId=${action.teamId}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: TeamUserRank[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  if (signupRes.success) {
    yield put(getTeamUserRanksSuccess(signupRes.data.data))
  } else {
    yield put(getTeamUserRanksFailed((signupRes as RequestFail).message))
  }
}

function* getNewComments(action: GetNewCommentsAction) {
  const requestURL = `/api/feedback/getNewComments`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: Comment[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  if (signupRes.success) {
    yield put(getNewCommentsSuccess(signupRes.data.data))
  } else {
    yield put(getNewCommentsFailed((signupRes as RequestFail).message))
  }
}

function* getSentFeedbackData(action: GetSentFeedbackDataAction) {
  const requestURL = `/api/feedback/getUserSentFeedback`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: SentFeedbackData[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  if (signupRes.success) {
    yield put(getSentFeedbackDataSuccess(signupRes.data.data))
  } else {
    yield put(getSentFeedbackDataFailed((signupRes as RequestFail).message))
  }
}

function* getSelectedBarData(action: GetSelectedBarDataAction) {
  console.log(action)
  const requestURL = `/api/feedback/getSeletedDataOfUser?type=${action.barType}&instance=${action.instance}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: SelectedBarData[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log('getSelectedBarData')
  console.log(signupRes)
  if (signupRes.success) {
    yield put(getSelectedBarDataSuccess(signupRes.data.data))
  } else {
    yield put(getSelectedBarDataFailed((signupRes as RequestFail).message))
  }
}

function* getSelectedTeamBarData(action: GetSeletedTeamBarDataAction) {
  const requestURL = `/api/feedback/getSeletedDataOfTeam?type=${action.barType}&instance=${action.instance}&teamId=${action.teamId}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: SelectedBarData[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  if (signupRes.success) {
    yield put(getSelectedTeamBarDataSuccess(signupRes.data.data))
  } else {
    yield put(getSelectedTeamBarDataFailed((signupRes as RequestFail).message))
  }
}

function* sendComment(action: SendCommentOnFeedbackAction) {
  const requestURL = `/api/feedback/sendComment`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: CommentOnFeedback[]
    }
  > = yield call<typeof request>(request, requestURL, 'POST', action.data, true)
  if (signupRes.success) {
    yield put(sendCommentSuccess(signupRes.data.data))
  } else {
    yield put(sendCommentFailed((signupRes as RequestFail).message))
  }
}

function* getFeedbacksByQuestionId(
  action: GetFeedbacksByQuestionIdAndTeamIdAction
) {
  const requestURL = `/api/feedback/getFeedbacksByQuestionId?teamId=${action.data.teamId}&questionId=${action.data.questionId}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: TexyAnswerByQuestionId[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  if (signupRes.success) {
    yield put(getFeedbacksByQuestionIdSuccess(signupRes.data.data))
  } else {
    yield put(
      getFeedbacksByQuestionIdFailed((signupRes as RequestFail).message)
    )
  }
}

function* addWidget(action: AddWidgetAction) {
  const requestURL = `/api/feedback/addWidget`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'POST', action.data, true)
  console.log('addwidget')
  console.log(signupRes)

  if (signupRes.success) {
    yield put(addWidgetSuccess())
    /*  yield call(getMyWidgets, {
      type: actions.GET_MY_WIDGETS,
      teamId: action.data.teamId,
      category: 'team'
    })*/
  } else {
    yield put(addWidgetFailed((signupRes as RequestFail).message))
  }
}

function* getMyWidgets(action: GetMyWidgetsAction) {
  const requestURL = `/api/feedback/getMyWidgets?teamId=${
    action.teamId
  }&category=${action.category}&userId=${action.userId || ''}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: MyWidget[]
      layout: any
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log(signupRes)

  if (signupRes.success) {
    yield put(getMyWidgetsSuccess(signupRes.data.data, signupRes.data.layout, action.category))
  } else {
    yield put(getMyWidgetsFailed((signupRes as RequestFail).message))
  }
}

function* getAllMyWidgets(action: GetMyWidgetsAction) {
  let teamId = yield select(getTeam)
  if (teamId) {
    teamId = teamId._id
  } else {
    teamId = ''
  }
  const requestURL = `/api/feedback/getMyWidgets?teamId=${
    teamId
  }&category=team&userId=${action.userId || ''}`
  const team: RequestReturnParam<
    SignUpResult & {
      data: MyWidget[]
      layout: any
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  
  const requestURL2 = `/api/feedback/getMyWidgets?teamId=${
    teamId
  }&category=supervisor&userId=${action.userId || ''}`
  const supervisor: RequestReturnParam<
    SignUpResult & {
      data: MyWidget[]
      layout: any
    }
  > = yield call<typeof request>(request, requestURL2, 'GET', null, true)
  const requestURL3 = `/api/feedback/getMyWidgets?teamId=${
    teamId
  }&category=supervisoryFeedback&userId=${action.userId || ''}`
  const supervisoryFeedback: RequestReturnParam<
    SignUpResult & {
      data: MyWidget[]
      layout: any
    }
  > = yield call<typeof request>(request, requestURL3, 'GET', null, true)
  const requestURL4 = `/api/feedback/getMyWidgets?teamId=${
    teamId
  }&category=p2p&userId=${action.userId || ''}`
  const p2p: RequestReturnParam<
    SignUpResult & {
      data: MyWidget[]
      layout: any
    }
  > = yield call<typeof request>(request, requestURL4, 'GET', null, true)
  const requestURL5 = `/api/feedback/getMyWidgets?teamId=${
    teamId
  }&category=self&userId=${action.userId || ''}`
  const self: RequestReturnParam<
    SignUpResult & {
      data: MyWidget[]
      layout: any
    }
  > = yield call<typeof request>(request, requestURL5, 'GET', null, true)
  const data: MyWidgetData = {
    p2p: p2p.success ? p2p.data : {
      data: null,
      layout: null
    },
    team: team.success ? team.data : {
      data: null,
      layout: null
    },
    supervisor: supervisor.success ? supervisor.data : {
      data: null,
      layout: null
    }, 
    supervisoryFeedback: supervisoryFeedback.success ? supervisoryFeedback.data : {
      data: null,
      layout: null
    },
    self: self.success ? self.data : {
      data: null,
      layout: null
    },
    userSentFeedback: {
      data: null,
      layout: null
    }

  }
  yield put(getAllMyWidgetsSuccess(data as MyWidgetData))
}

function* updateWidgetSettings(action: UpdateWidgetSettingsAction) {
  const requestURL = `/api/feedback/updateWidgetSettings`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(
    request,
    requestURL,
    'PUT',
    {
      widgetId: action.widgetId,
      settings: action.settings,
    },
    true
  )
  console.log(signupRes)
}

function* likeUnlikeFeedback(action: LikeUnlikeFeedbackAction) {
  const requestURL = `/api/feedback/likeUnlikeFeedback`
  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(request, requestURL, 'POST', { targetId: action.targetId }, true)
}

function* markRead(action: MarkReadAction) {
  const requestURL = `/api/feedback/markRead`
  yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    { targetId: action.targetId, questionId: action.questionId },
    true
  )
}

function* markFeedbackRead() {
  const requestURL = `/api/feedback/markFeedbackRead`
  yield call<typeof request>(request, requestURL, 'PUT', null, true)
}

function* getUserTextFeedback(action: GetUserTextFeedbackAction) {
  const selectedTeam = yield select(getTeam)
  const requestURL = `/api/feedback/getTextFeedbackRecieved?teamId=${
    selectedTeam._id
  }&category=${action.category || ''}&userId=${action.userId || ''}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: UserRecievedTextFeedback[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log(signupRes)

  if (signupRes.success) {
    yield put(getUserTextFeedbackSuccess(signupRes.data.data))
  } else {
    yield put(getUserTextFeedbackFailed((signupRes as RequestFail).message))
  }
}

function* getTargetHistory(action: GetTargetHistoryAction) {
  const selectedTeam = yield select(getTeam)
  const requestURL = `/api/feedback/getTargetHistory?targetId=${action.targetId}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: TargetHistory[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log(signupRes)

  if (signupRes.success) {
    yield put(getTargetHistorySuccess(signupRes.data.data))
  } else {
    yield put(getTargetHistoryFailed((signupRes as RequestFail).message))
  }
}

function* getDirectFeedback(action: GetDirectFeedbackAction) {
  const selectedTeam = yield select(getTeam)
  const requestURL = `/api/feedback/getP2pDirectFeedback/${action.sender}/${action.receiver}?team=${action.team || ''}`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: DirectFeedback[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log(signupRes, 'directFeedback is here')

  if (signupRes.success) {
    yield put(getDirectFeedbackSuccess(signupRes.data.data))
  } else {
    yield put(getDirectFeedbackFailed((signupRes as RequestFail).message))
  }
}

function* getMyTeamMembersSaga() {
  yield takeLatest(GET_MY_TEAM_MEMBERS, getMyTeamMembers)
}

function* getQuestionsSaga() {
  yield takeLatest(GET_QUESTIONS, getQuestions)
}

function* sendFeedbackSaga() {
  yield takeLatest(SEND_FEEDBACK, sendFeedback)
}
function* getCommentsSaga() {
  yield takeLatest(GET_COMMENTS, getComments)
}

function* getMyCurrentDataSaga() {
  yield takeLatest(GET_MY_CURRENT_DATA, getMyCurrentData)
}

function* getMyDataSaga() {
  yield takeLatest(GET_MY_DATA, getMyData)
}

function* getMyToDoSaga() {
  yield takeLatest(GET_MY_TODO, getMyToDo)
}
function* getTeamCurrentSaga() {
  yield takeLatest(GET_TEAM_CURRENT_DATA, getTeamCurrent)
}
function* getTeamDataSaga() {
  yield takeLatest(GET_TEAM_DATA, getTeamData)
}
function* getTeamUserRankSaga() {
  yield takeLatest(GET_TEAM_USER_RANK, getTeamUserRank)
}
function* getNewCommentsSaga() {
  yield takeLatest(GET_NEW_COMMENTS, getNewComments)
}

function* markFeedbackReadSaga() {
  yield takeLatest(MARK_FEEDBACK_READ, markFeedbackRead)
}

function* getSentFeedbackDataSaga() {
  yield takeLatest(GET_SENT_FEEDBACK_DATA, getSentFeedbackData)
}

function* getSelectedBarDataSaga() {
  yield takeLatest(GET_SELECTED_BAR_DATA, getSelectedBarData)
}

function* getSelectedTeamBarDataSaga() {
  yield takeLatest(GET_SELECTED_TEAM_BAR_DATA, getSelectedTeamBarData)
}

function* sendCommentSaga() {
  yield takeLatest(SEND_COMMENT_ON_FEEDBACK, sendComment)
}

function* likeUnlikeFeedbackSaga() {
  yield takeLatest(LIKE_UNLIKE_FEEDBACK, likeUnlikeFeedback)
}

function* updateWidgetSettingsSaga() {
  yield takeLatest(UPDATE_WIDGET_SETTINGS, updateWidgetSettings)
}

function* getFeedbacksByQuestionIdSaga() {
  yield takeLatest(
    GET_FEEFBACK_BY_QUESITONID_AND_TEAMID,
    getFeedbacksByQuestionId
  )
}

function* addWidgetSaga() {
  yield takeLatest(ADD_WIDGET, addWidget)
}

function* getMyWidgetsSaga() {
  yield takeLatest(GET_MY_WIDGETS, getMyWidgets)
}

function* markReadSaga() {
  yield takeLatest(MARK_READ, markRead)
}

function* getUserTextFeedbackSaga() {
  yield takeLatest(GET_USER_TEXT_FEEDBACK, getUserTextFeedback)
}

function* getTargetHistorySaga() {
  yield takeLatest(GET_TARGET_HISTORY, getTargetHistory)
}

function* getDirectFeedbackSaga() {
  yield takeLatest(GET_DIRECT_FEEDBACK, getDirectFeedback)
}

function* getAllMyWidgetsSaga() {
  yield takeLatest(GET_ALL_MY_WIDGET, getAllMyWidgets)
}

function* mainSaga() {
  yield all([
    call(getMyTeamMembersSaga),
    call(getQuestionsSaga),
    call(sendFeedbackSaga),
    call(getCommentsSaga),
    call(getMyCurrentDataSaga),
    call(getMyDataSaga),
    call(getMyToDoSaga),
    call(getTeamCurrentSaga),
    call(getTeamDataSaga),
    call(getTeamUserRankSaga),
    call(getNewCommentsSaga),
    call(markFeedbackReadSaga),
    call(getSentFeedbackDataSaga),
    call(getSelectedBarDataSaga),
    call(getSelectedTeamBarDataSaga),
    call(sendCommentSaga),
    call(likeUnlikeFeedbackSaga),
    call(getFeedbacksByQuestionIdSaga),
    call(addWidgetSaga),
    call(getMyWidgetsSaga),
    call(updateWidgetSettingsSaga),
    call(markReadSaga),
    call(getUserTextFeedbackSaga),
    call(getTargetHistorySaga),
    call(getDirectFeedbackSaga),
    call(getAllMyWidgetsSaga)
  ])
}

export default mainSaga
