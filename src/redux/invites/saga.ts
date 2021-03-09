import {
  CompanyInvite,
  CreateTeamResult,
  GetInvitesResult,
  GetTeamsResult,
  SignUpResult,
  Team,
  User,
} from 'src/apiTypes'
import request, { RequestFail, RequestReturnParam } from 'src/request'
import {
  actions,
  AcceptInviteAction,
  DeleteInviteFailedAction,
  DeleteInviteAction,
  GetCompanyInviteAction,
  AcceptCompanyInviteAction,
} from './constants'
import { call, put, all, takeLatest } from 'redux-saga/effects'
import {
  getAllMyInvitesSuccess,
  getAllMyInvitesFailed,
  acceptInviteSuccess,
  acceptInviteFailed,
  deleteInviteSuccess,
  deleteInviteFailed,
  getCompanyInvitesSuccess,
  getCompanyInvitesFailed,
  acceptCompanyInviteSuccess,
  acceptCompanyInviteFailed,
} from './actions'
import { updateUserData } from '../auth/UserSession'

const {
  GET_MY_INVITES,
  ACCEPT_INVITE,
  DELETE_INVITE,
  GET_COMPANY_INVITES,
  ACCEPT_COMPANY_INVITE,
} = actions

function* getAllMyInvites() {
  const requestURL = '/api/invites/getAllMyInvites'
  const invites: RequestReturnParam<GetInvitesResult> = yield call<
    typeof request
  >(request, requestURL, 'GET', null, true)

  if (invites.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(getAllMyInvitesSuccess(invites.data.data))
  } else {
    yield put(getAllMyInvitesFailed((invites as RequestFail).message))
  }
}

function* acceptInvite(action: AcceptInviteAction) {
  const requestURL = '/api/invites/acceptInvite'
  const invites: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'PUT',
    { inviteId: action.inviteId },
    true
  )

  console.log('accept')
  console.log(invites)

  if (invites.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(acceptInviteSuccess(action.inviteId))
  } else {
    yield put(acceptInviteFailed((invites as RequestFail).message))
  }
}

function* deleteInvite(action: DeleteInviteAction) {
  const requestURL = '/api/invites/denyInvite'
  const invites: RequestReturnParam<SignUpResult> = yield call<typeof request>(
    request,
    requestURL,
    'DELETE',
    { inviteId: action.data.inviteId },
    true
  )

  console.log('accept')
  console.log(invites)

  if (invites.success) {
    //  yield call(registerForPushNotificationsAsync)
    yield put(deleteInviteSuccess(action.data))
  } else {
    yield put(deleteInviteFailed((invites as RequestFail).message))
  }
}

function* getCompanyInvites(action: GetCompanyInviteAction) {
  const requestURL = '/api/invites/getCompanyInvites'

  const team: RequestReturnParam<
    SignUpResult & {
      data: CompanyInvite[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  console.log(team)

  if (team.success) {
    yield put(getCompanyInvitesSuccess(team.data.data))
  } else {
    yield put(getCompanyInvitesFailed((team as RequestFail).message))
  }
}

function* acceptCompayInvite(action: AcceptCompanyInviteAction) {
  const requestURL = '/api/invites/acceptCompanyInvite'

  const team: RequestReturnParam<SignUpResult & {}> = yield call<
    typeof request
  >(
    request,
    requestURL,
    'PUT',
    {
      inviteId: action.inviteId,
    },
    true
  )



  if (team.success) {
    updateUserData({companyId:action.companyId })
    yield put(acceptCompanyInviteSuccess(action.inviteId, action.companyId))
  } else {
    yield put(acceptCompanyInviteFailed((team as RequestFail).message))
  }
}
function* getCompanyInvitesSaga() {
  yield takeLatest(GET_COMPANY_INVITES, getCompanyInvites)
}

function* getAllMyInvitesSaga() {
  yield takeLatest(GET_MY_INVITES, getAllMyInvites)
}

function* acceptInviteSaga() {
  yield takeLatest(ACCEPT_INVITE, acceptInvite)
}

function* deleteInviteSaga() {
  yield takeLatest(DELETE_INVITE, deleteInvite)
}

function* acceptCompayInviteSaga() {
  yield takeLatest(ACCEPT_COMPANY_INVITE, acceptCompayInvite)
}

function* mainSaga() {
  yield all([
    call(getAllMyInvitesSaga),
    call(acceptInviteSaga),
    call(deleteInviteSaga),
    call(getCompanyInvitesSaga),
    call(acceptCompayInviteSaga),
  ])
}

export default mainSaga
