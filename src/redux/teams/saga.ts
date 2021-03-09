import {
  AddQuestionResult,
  CreateTeamResult,
  FeedbackRequest,
  GetTeamsResult,
  InviteUserResult,
  MyTeamsStatus,
  MyTeamsStatusResult,
  PendingRequest,
  QuestionByCategory,
  RelationData,
  RelationDataContainer,
  SignUpResult,
  Team,
  TeamsByKeywordResult,
  User,
} from 'src/apiTypes'
import request, { RequestFail, RequestReturnParam } from 'src/request'
import {
  actions,
  CreateTeamAction,
  CreateTeamSuccessAction,
  GetActiveTeamUsersAction,
  GetTeamByIdAction,
  InviteUserAction,
  UpdateTeamProfileAction,
  GetActiveTeamUsersSuccessAction,
  GetPendingInvitesAction,
  GetUserSuggestionsAction,
  AddToTeamAction,
  RemoveMemberAction,
  GetMyTeamStatusAction,
  DeleteTeamAction,
  GetTeamsByKeywordAction,
  RequestRightsAction,
  GetPendingRequestAction,
  AcceptRightsAction,
  QutiTeamAction,
  GetQuestionByCategorySuccessAction,
  GetQuestionByCategoryAction,
  AddQuestionAction,
  GetRelationalDataAction,
  UpdateJobTitleAction,
  EditQuestionAction,
  AddFeebackRequestAction,
  GetFeedbackRequestsAction,
  DeleteFeedbackRequestAction,
  ChangeFrequencyAction,
  DeleteQuestionAction,
} from './constants'

import { call, put, all, takeLatest, select } from 'redux-saga/effects'
import { addWidget, getQuestions } from '../feedback/actions'
import {
  createTeamFailed,
  createTeamSuccess,
  getActiveTeamUsersSuccess,
  getMyTeamsFailed,
  getMyTeamsSuccess,
  getTeamByIdFailed,
  getTeamByIdSuccess,
  inviteUserFailed,
  inviteUserSuccess,
  updateTeamProfileFailed,
  updateTeamProfileSuccess,
  getActiveTeamUsersFailed,
  getPendingInvitesSuccess,
  getPendingInvitesFailed,
  getUserSuggestionSuccess,
  getUserSuggestionFailed,
  addToTeamSuccess,
  addToTeamFailed,
  removeMemberSuccess,
  removeMemberFailed,
  getMyTeamStatusSuccess,
  getMyTeamStatusFailed,
  deleteTeamSuccess,
  deleteTeamFailed,
  getTeamsByKeywordSuccess,
  getTeamsByKeywordFailed,
  requestRightsSuccess,
  requestRightsFailed,
  getPendingRequestSuccess,
  getPendingRequestFailed,
  acceptRightsSuccess,
  acceptRightsFailed,
  getQuestionByCatSuccess,
  getQuestionByCatFailed,
  addQuestionSuccess,
  addQuestionFailed,
  getRelationalDataSucces,
  getRelationalDataFailed,
  getFeedbackRequestSuccess,
  getFeedbackRequestFailed,
  quitTeamSuccess,
} from './actions'
import { uploadImage } from 'src/redux/auth/saga'
import { RootState } from 'src/configureStore'
import { getMyToDo } from '../feedback/actions'
import i18n from '../../i18n'

const {
  CREATE_TEAM,
  INVITE_USER,
  GET_MY_TEAMS,
  GET_TEAM_BY_ID,
  UPDATE_TEAM_PROFILE,
  GET_ACTIVE_TEAM_USERS,
  GET_TEAM_PENDING_INVITES,
  GET_USER_SUGGESTIONS,
  ADD_TO_TEAM,
  REMOVE_MEMBER,
  GET_MY_TEAMS_STATUS,
  DELETE_TEAM,
  GET_TEAMS_BY_KEYWORD,
  REQUEST_RIGHTS,
  GET_PENDING_REQUEST,
  ACCEPT_RIGHTS,
  QUIT_TEAM,
  GET_QUESTIONS_BY_TEAM_ID_AND_CAT,
  ADD_QUESTION,
  GET_FEEDBACK_DATA_BY_RELATION,
  UPDATE_JOB_TITLE,
  EDIT_QUESTION,
  ADD_FEEDBACK_REQUEST,
  GET_FEEDBACK_REQUEST,
  DELETE_FEEDBACK_REQUEST,
  CHANGE_FREQUENCY,
  DELETE_QUESTION,
} = actions

const getUser = (state: RootState) => state.authReducer.user
const getSelectedTeam = (state: RootState) => state.teamReducer.selectedTeam
function* createTeam(action: CreateTeamAction) {
  if (action.data.profilePic) {
    //@ts-ignore
    const images = yield call(uploadImage, {
      image: action.data.profilePic,
      name: new Date().getTime(),
    })
    console.log(images)
    action.data.profilePic = images[0].photolink
  }

  const requestURL = '/api/teams/createTeam'
  const team: RequestReturnParam<CreateTeamResult> = yield call<typeof request>(
    request,
    requestURL,
    'POST',
    action.data,
    true
  )

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(createTeamSuccess(team.data.team))
  } else {
    yield put(createTeamFailed((team as RequestFail).message))
  }
}

function* inviteUser(action: InviteUserAction) {
  console.log(action.data)

  const requestURL = '/api/invites/sendInvite'
  const team: RequestReturnParam<InviteUserResult> = yield call<typeof request>(
    request,
    requestURL,
    'POST',
    action.data,
    true
  )

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(inviteUserSuccess(team.data.data))
  } else {
    yield put(inviteUserFailed((team as RequestFail).message))
  }
}

function* getMyTeams() {
  const requestURL = '/api/teams/getAllMyTeams'
  const team: RequestReturnParam<GetTeamsResult> = yield call<typeof request>(
    request,
    requestURL,
    'GET',
    null,
    true
  )
  console.log(team, 'team')

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(getMyTeamsSuccess(team.data.data))
  } else {
    yield put(getMyTeamsFailed((team as RequestFail).message))
  }
}

function* getTeamById(action: GetTeamByIdAction) {
  const requestURL = '/api/teams/getTeamById' + '?teamId=' + action.teamId
  const team: RequestReturnParam<SignUpResult & { team: Team }> = yield call<
    typeof request
  >(request, requestURL, 'GET', null, true)

  //  console.log(team);

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(getTeamByIdSuccess(team.data.team))
  } else {
    yield put(getTeamByIdFailed((team as RequestFail).message))
  }
}

function* updateTeamProfile(action: UpdateTeamProfileAction) {
  if (action.data.image) {
    //@ts-ignore
    const images = yield call(uploadImage, {
      image: action.data.image,
      name: action.data.teamId,
    })
    console.log(images)
    action.data.profilePic = images[0].photolink + '?' + new Date().getTime()
  }

  const requestURL = '/api/teams/updateTeamDetails'

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    action.data,
    true
  )

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(updateTeamProfileSuccess(action.data))
  } else {
    yield put(updateTeamProfileFailed((team as RequestFail).message))
  }
}

function* getActiveTeamUsers(action: GetActiveTeamUsersAction) {
  const requestURL = `/api/teams/getActiveTeamUsers?teamId=${
    action.teamId
  }&type=${action.memberType}&p2pOnly=${action.p2pOnly || ''}`

  const team: RequestReturnParam<
    SignUpResult & {
      data: User[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  //  console.log(team);

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(
      getActiveTeamUsersSuccess({
        type: action.memberType,
        members: team.data.data,
      })
    )
  } else {
    yield put(getActiveTeamUsersFailed((team as RequestFail).message))
  }
}

function* getPendingInvites(action: GetPendingInvitesAction) {
  console.log(action)

  const requestURL = `/api/teams/getPendingInvites?teamId=${action.teamId}&type=${action.memberType}`

  const team: RequestReturnParam<
    SignUpResult & {
      data: User[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(
      getPendingInvitesSuccess({
        //@ts-ignore
        type: action.memberType,
        //@ts-ignore
        invite: team.data.data,
      })
    )
  } else {
    yield put(getPendingInvitesFailed((team as RequestFail).message))
  }
}

function* getUserSuggestions(action: GetUserSuggestionsAction) {
  console.log(action)
  if (!action.data.keyword) {
    return yield put(getUserSuggestionSuccess([]))
  }
  const requestURL = `/api/teams/getAddToTeamSuggestion?teamId=${
    action.data.teamId || ''
  }&keyword=${action.data.keyword}&companyId=${action.data.companyId || ''}`

  const team: RequestReturnParam<
    SignUpResult & {
      data: User[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    //@ts-ignore
    yield put(getUserSuggestionSuccess(team.data.data))
  } else {
    yield put(getUserSuggestionFailed((team as RequestFail).message))
  }
}

function* addToTeam(action: AddToTeamAction) {
  console.log(action)

  const requestURL = `/api/teams/addToTeam`

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    action.data,
    true
  )

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    //@ts-ignore
    console.log(action.data)

    yield put(addToTeamSuccess(true, action.user, action.data.type))
  } else {
    yield put(addToTeamFailed((team as RequestFail).message))
  }
}

function* removeMember(action: RemoveMemberAction) {
  console.log(action)

  const requestURL = `/api/teams/removeMember`

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    action.data,
    true
  )

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(removeMemberSuccess(action.data.userId, action.data.type))
  } else {
    yield put(removeMemberFailed((team as RequestFail).message))
  }
}

function* getMyTeamsStatus(action: GetMyTeamStatusAction) {
  const requestURL = `/api/teams/getMyTeamsStatus`

  const team: RequestReturnParam<MyTeamsStatusResult> = yield call<
    typeof request
  >(request, requestURL, 'GET', null, true)

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(getMyTeamStatusSuccess(team.data.data))
  } else {
    yield put(getMyTeamStatusFailed((team as RequestFail).message))
  }
}

function* getTeamsByKeyword(action: GetTeamsByKeywordAction) {
  const requestURL = `/api/teams/getTeamsByKeyword?keyword=${action.keyword}`

  const team: RequestReturnParam<TeamsByKeywordResult> = yield call<
    typeof request
  >(request, requestURL, 'GET', null, true)

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(getTeamsByKeywordSuccess(team.data.teams))
  } else {
    yield put(getTeamsByKeywordFailed((team as RequestFail).message))
  }
}

function* deleteTeam(action: DeleteTeamAction) {
  const requestURL = `/api/teams/deleteTeam`

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    { teamId: action.teamId },
    true
  )

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(deleteTeamSuccess(action.teamId))
  } else {
    yield put(deleteTeamFailed((team as RequestFail).message))
  }
}

function* requestRights(action: RequestRightsAction) {
  const requestURL = `/api/teams/requestRights`

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'POST',
    { teamId: action.teamId, type: 'viewingRights' },
    true
  )

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(requestRightsSuccess(true))
  } else {
    yield put(requestRightsFailed((team as RequestFail).message))
  }
}

function* getPendingRequest(action: GetPendingRequestAction) {
  const requestURL = `/api/teams/getPendingRequestByUserId`

  const team: RequestReturnParam<
    SignUpResult & {
      data: PendingRequest[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(getPendingRequestSuccess(team.data.data))
  } else {
    yield put(getPendingRequestFailed((team as RequestFail).message))
  }
}

function* getQuestionsByCategory(action: GetQuestionByCategoryAction) {
  const requestURL = `/api/teams/getTeamQuestionsByCategory?teamId=${action.data.teamId}&category=${action.data.category}`

  const team: RequestReturnParam<
    SignUpResult & {
      data: QuestionByCategory[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(getQuestionByCatSuccess(team.data.data))
  } else {
    yield put(getQuestionByCatFailed((team as RequestFail).message))
  }
}

function* addQuestion(action: AddQuestionAction) {
  const langcode =
    i18n && i18n.language ? i18n.language[0] + i18n.language[1] : 'en'
  const requestURL = `/api/teams/addQuestion`

  const team: RequestReturnParam<
    SignUpResult & {
      data: AddQuestionResult
    }
  > = yield call<typeof request>(
    request,
    requestURL,
    'POST',
    Object.assign({}, action.data, { langcode }),
    true
  )

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)
    const selectedTeam = yield select(getSelectedTeam)
    yield put(addQuestionSuccess(team.data.data, action.data.question))
    yield put(
      addWidget({
        teamId: selectedTeam._id,
        widgetId: '60054ef7dffb237f6516d3bc',
      })
    )
    yield put(
      addWidget({
        teamId: selectedTeam._id,
        widgetId: '60054ef7dffb237f6516d3bc',
      })
    )
    yield put(
      addWidget({
        teamId: selectedTeam._id,
        widgetId: '600a8d5b74cd7e347f0ddece',
      })
    )
    yield put(
      addWidget({
        teamId: selectedTeam._id,
        widgetId: '6005a84202ff067bc32d412d',
      })
    )
    yield put(getQuestions(action.data.teamId, action.data.category))
  } else {
    yield put(addQuestionFailed((team as RequestFail).message))
  }
}

function* acceptRequest(action: AcceptRightsAction) {
  const requestURL = `/api/teams/acceptRights`

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    { requestId: action.requestId },
    true
  )

  console.log(team)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(acceptRightsSuccess(action.requestId))
  } else {
    yield put(acceptRightsFailed((team as RequestFail).message))
  }
}
function* getRelationalData(action: GetRelationalDataAction) {

  const requestURL = `/api/feedback/getUserFeedbackDataById?userId=${action.data.receiver}&category=${action.data.category}&teamId=${action.data.teamId}&type=${action.data.type || ''}`

  const team: RequestReturnParam<
    SignUpResult & {
      data: RelationDataContainer
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)


  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(getRelationalDataSucces(team.data.data, action.data.category, action.data.type || 'receiver'))
  } else {
    yield put(getRelationalDataFailed((team as RequestFail).message))
  }
}

function* quitTeam(action: QutiTeamAction) {
  const requestURL = `/api/teams/quitTeam`

  console.log(action)

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    { teamId: action.teamId },
    true
  )

  if (team.success) {
    yield put(quitTeamSuccess())
    yield put(getMyToDo())
  }

  yield call(getMyTeams)
  console.log(team)
}

function* updateJobTitle(action: UpdateJobTitleAction) {
  const requestURL = `/api/teams/updateUserJobTitle`

  console.log(action)

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    { userId: action.userId, jobtitle: action.jobtitle },
    true
  )
  console.log(team)
}

function* editQuestion(action: EditQuestionAction) {
  const requestURL = `/api/teams/editQuestion`
  const langcode =
    i18n && i18n.language ? i18n.language[0] + i18n.language[1] : 'en'
  console.log(action, 'questionOutput')
  const data: {
    questionId: string
    question?: string
    questionOutput?: string
    langcode: string
  } = {
    questionId: action.questionId,
    langcode,
  }
  if (action.question) {
    data.question = action.question
  }

  if (action.questionOutput) {
    data.questionOutput = action.questionOutput
  }

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    data,
    true
  )
  console.log('edit question')
  console.log(team)
}

function* addFeedbackRequest(action: AddFeebackRequestAction) {
  const requestURL = `/api/teams/addFeedbackRequest`
  // const user = yield select(getUser)
  console.log(action)
  // action.data.userId = user._id
  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'POST',
    action.data,
    true
  )

  if (team.success) {
    yield call(getFeedbackRequest, {
      type: GET_FEEDBACK_REQUEST,
      data: {
        userId: action.data.userId,
        teamId: action.data.teamId,
      },
    })
  }
  console.log('edit question')
  console.log(team)
}

function* deleteFeedbackRequest(action: DeleteFeedbackRequestAction) {
  const requestURL = `/api/teams/deleteFeedbackRequest`
  // const user = yield select(getUser)
  console.log(action)
  // action.data.userId = user._id
  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'DELETE',
    {
      requestId: action.data.requestId,
    },
    true
  )

  if (team.success) {
    yield call(getFeedbackRequest, {
      type: GET_FEEDBACK_REQUEST,
      data: {
        userId: action.data.userId,
        teamId: action.data.teamId,
      },
    })
  }

  console.log('edit question')
  console.log(team)
}

function* changeFrequency(action: ChangeFrequencyAction) {
  const requestURL = `/api/teams/changeFrequency`
  // const user = yield select(getUser)
  console.log(action)
  // action.data.userId = user._id
  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    {
      requestId: action.data.requestId,
      frequency: action.data.frequency,
    },
    true
  )

  if (team.success) {
    yield call(getFeedbackRequest, {
      type: GET_FEEDBACK_REQUEST,
      data: {
        userId: action.data.userId,
        teamId: action.data.teamId,
      },
    })
  }
  console.log('edit question')
  console.log(team)
}

function* getFeedbackRequest(action: GetFeedbackRequestsAction) {
  const requestURL = `/api/teams/getFeedbackRequestsOfUserByTeam?userId=${action.data.userId}&teamId=${action.data.teamId}`

  const team: RequestReturnParam<
    SignUpResult & {
      data: FeedbackRequest
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  if (team.success) {
    //  yield call(registerForPushNotificationsAsync)

    yield put(getFeedbackRequestSuccess(team.data.data))
  } else {
    yield put(getFeedbackRequestFailed((team as RequestFail).message))
  }
}
function* deleteQuestion(action: DeleteQuestionAction) {
  const requestURL = `/api/teams/deleteCustomQuestion`

  const team: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'DELETE',
    {
      questionId: action.questionId,
    },
    true
  )

  console.log('right here is relational data')
  console.log(team)
}

function* createTeamSaga() {
  yield takeLatest(CREATE_TEAM, createTeam)
}

function* inviteUserSaga() {
  yield takeLatest(INVITE_USER, inviteUser)
}

function* getMyTeamsSaga() {
  yield takeLatest(GET_MY_TEAMS, getMyTeams)
}

function* getTeamByIdSaga() {
  yield takeLatest(GET_TEAM_BY_ID, getTeamById)
}

function* updateTeamProfileSaga() {
  yield takeLatest(UPDATE_TEAM_PROFILE, updateTeamProfile)
}
function* getActiveTeamUsersSaga() {
  yield takeLatest(GET_ACTIVE_TEAM_USERS, getActiveTeamUsers)
}
function* getPendingInvitesSaga() {
  yield takeLatest(GET_TEAM_PENDING_INVITES, getPendingInvites)
}
function* getUserSuggestionsSaga() {
  yield takeLatest(GET_USER_SUGGESTIONS, getUserSuggestions)
}
function* addToTeamSaga() {
  yield takeLatest(ADD_TO_TEAM, addToTeam)
}
function* removeMemberSaga() {
  yield takeLatest(REMOVE_MEMBER, removeMember)
}
function* getMyTeamsStatusSaga() {
  yield takeLatest(GET_MY_TEAMS_STATUS, getMyTeamsStatus)
}
function* deleteTeamSaga() {
  yield takeLatest(DELETE_TEAM, deleteTeam)
}

function* getTeamsByKeywordSaga() {
  yield takeLatest(GET_TEAMS_BY_KEYWORD, getTeamsByKeyword)
}

function* getPendingRequestSaga() {
  yield takeLatest(GET_PENDING_REQUEST, getPendingRequest)
}

function* requestRightsSaga() {
  yield takeLatest(REQUEST_RIGHTS, requestRights)
}

function* acceptRequestSaga() {
  yield takeLatest(ACCEPT_RIGHTS, acceptRequest)
}

function* quitTeamSaga() {
  yield takeLatest(QUIT_TEAM, quitTeam)
}
function* getQuestionsByCategorySaga() {
  yield takeLatest(GET_QUESTIONS_BY_TEAM_ID_AND_CAT, getQuestionsByCategory)
}

function* addQuestionSaga() {
  yield takeLatest(ADD_QUESTION, addQuestion)
}
function* getRelationalSaga() {
  yield takeLatest(GET_FEEDBACK_DATA_BY_RELATION, getRelationalData)
}

function* updateJobTitleSaga() {
  yield takeLatest(UPDATE_JOB_TITLE, updateJobTitle)
}

function* editQuestionSaga() {
  yield takeLatest(EDIT_QUESTION, editQuestion)
}

function* addFeedbackRequestSaga() {
  yield takeLatest(ADD_FEEDBACK_REQUEST, addFeedbackRequest)
}

function* getFeedbackRequestSaga() {
  yield takeLatest(GET_FEEDBACK_REQUEST, getFeedbackRequest)
}

function* deleteFeedbackRequestSaga() {
  yield takeLatest(DELETE_FEEDBACK_REQUEST, deleteFeedbackRequest)
}

function* changeFrequencySaga() {
  yield takeLatest(CHANGE_FREQUENCY, changeFrequency)
}

function* deleteQuestionSaga() {
  yield takeLatest(DELETE_QUESTION, deleteQuestion)
}

function* mainSaga() {
  yield all([
    call(createTeamSaga),
    call(inviteUserSaga),
    call(getMyTeamsSaga),
    call(getTeamByIdSaga),
    call(updateTeamProfileSaga),
    call(getActiveTeamUsersSaga),
    call(getPendingInvitesSaga),
    call(getUserSuggestionsSaga),
    call(addToTeamSaga),
    call(removeMemberSaga),
    call(getMyTeamsStatusSaga),
    call(deleteTeamSaga),
    call(getTeamsByKeywordSaga),
    call(requestRightsSaga),
    call(getPendingRequestSaga),
    call(acceptRequestSaga),
    call(quitTeamSaga),
    call(getQuestionsByCategorySaga),
    call(addQuestionSaga),
    call(getRelationalSaga),
    call(updateJobTitleSaga),
    call(editQuestionSaga),
    call(addFeedbackRequestSaga),
    call(getFeedbackRequestSaga),
    call(deleteFeedbackRequestSaga),
    call(changeFrequencySaga),
    call(deleteQuestionSaga),
  ])
}

export default mainSaga
