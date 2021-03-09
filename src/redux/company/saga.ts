import {
  Company,
  CompanyFeedbackData,
  CompanyPendingInvite,
  SignUpResult,
  User,
} from 'src/apiTypes'
import request, { RequestFail, RequestReturnParam } from 'src/request'
import {
  actions,
  AddCompanyAdmin,
  ChangeTeamStatusAction,
  ChangeUserStatusAction,
  CreateCompanyAction,
  DeleteComapnyInviteAction,
  GetAdminsAction,
  GetCompanyByUserAction,
  GetCompanyPendingInvitesAction,
  GetEmployeesAction,
  GetFeedbackDataAction,
  InviteEmployeesAction,
} from './constants'

import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import {
  createCompanySuccess,
  createCompanyFailed,
  getCompanyByUserSuccess,
  getCompanyByUserFailed,
  getEmployeesSuccess,
  getEmployeesFailed,
  changeUserStatusSuccess,
  changeUserStatusFailed,
  getAdminsSuccess,
  getAdminsFailed,
  getTeamsOfCompanySuccess,
  getTeamsOfCompanyFailed,
  changeTeamStatusSuccess,
  changeTeamStatusFailed,
  getFeedbackDataSuccess,
  getFeedbackDataFailed,
  getCompanyPendingInvitesSuccess,
  getCompanyPendingInvitesFailed,
} from './actions'
import { RootState } from 'src/configureStore'
import { getCompanyInvites } from '../invites/actions'
import { uploadImage } from '../auth/saga'

const {
  CREATE_COMPANY,
  GET_COMPANY_BY_USER,
  INVITE_EMPLOYEES,
  GET_EMPLOYEES,
  CHANGE_USER_STATUS,
  GET_ADMINS,
  GET_TEAMS_OF_COMPANY,
  CHANGE_TEAM_STATUS,
  GET_FEEDBACK_DATA,
  GET_COMPANY_PENDING_INVITES,
  DELETE_COMPANY_INVITE,
} = actions
const getCompany = (state: RootState) => state.companyReducer.company
function* createCompany(action: CreateCompanyAction) {
  console.log(action.data)

  if (action.data.profilePic) {
    //@ts-ignore
    const images = yield call(uploadImage, {
      image: action.data.profilePic,
      name: action.data.profilePic,
    })
    console.log(images)
    action.data.profilePic = images[0].photolink + '?' + new Date().getTime()
  }

  const requestURL = `/api/company/createCompany`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: Company
    }
  > = yield call<typeof request>(request, requestURL, 'POST', action.data, true)

  if (signupRes.success) {
    yield put(createCompanySuccess(signupRes.data.data))
  } else {
    yield put(createCompanyFailed((signupRes as RequestFail).message))
  }
}
function* getCompanyByUser(action: GetCompanyByUserAction) {
  const requestURL = `/api/company/getCompanyByUserId`
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: Company
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)

  if (signupRes.success) {
    yield put(getCompanyByUserSuccess(signupRes.data.data))
  } else {
    yield put(getCompanyByUserFailed((signupRes as RequestFail).message))
  }
}

function* inviteEmployees(action: InviteEmployeesAction) {
  const requestURL = `/api/company/bulkInviteCompany`
  const company = yield select(getCompany)
  const data = Object.assign({}, action.data, {
    companyId: company._id,
  })
  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: Company
    }
  > = yield call<typeof request>(request, requestURL, 'POST', data, true)
  console.log('inviteEmployees')
  console.log(signupRes)
  if (signupRes.success) {
    yield call(getCompanyPendingInvites, {
      type: 'GET_COMPANY__ENDING_INVITES',
    })
  }
}

function* deleteInvite(action: DeleteComapnyInviteAction) {
  const requestURL = `/api/company/deleteInviteOfCompany`
  //const company = yield select(getCompany)

  const signupRes: RequestReturnParam<SignUpResult> = yield call<
    typeof request
  >(
    request,
    requestURL,
    'DELETE',
    {
      inviteId: action.inviteId,
    },
    true
  )

  if (signupRes.success) {
    yield call(getCompanyPendingInvites, {
      type: 'GET_COMPANY__ENDING_INVITES',
    })
  }
}

function* getEmployees(action: GetEmployeesAction) {
  const company = yield select(getCompany)
  const requestURL = `/api/company/getEmployeesOfCompany?companyId=${
    company._id
  }&employeeStatus=${action.employeeStatus || ''}`

  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: User[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log('getEmployees')
  console.log(signupRes)
  if (signupRes.success) {
    yield put(getEmployeesSuccess(signupRes.data.data))
  } else {
    yield put(getEmployeesFailed((signupRes as RequestFail).message))
  }
}

function* getAdmins(action: GetAdminsAction) {
  const company = yield select(getCompany)
  const requestURL = `/api/company/getAdminsOfCompany?companyId=${company._id}`

  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: User[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log('getEmployees')
  console.log(signupRes)
  if (signupRes.success) {
    yield put(getAdminsSuccess(signupRes.data.data))
  } else {
    yield put(getAdminsFailed((signupRes as RequestFail).message))
  }
}

function* changeUserStatus(action: ChangeUserStatusAction) {
  console.log(action)

  const company = yield select(getCompany)
  const requestURL = `/api/company/changeUserStatus`

  const signupRes: RequestReturnParam<SignUpResult & {}> = yield call<
    typeof request
  >(
    request,
    requestURL,
    'PUT',
    {
      userId: action.userId,
      companyId: company._id,
      admin: action.admin,
      status: action.status,
    },
    true
  )

  if (signupRes.success) {
    yield put(changeUserStatusSuccess())
  } else {
    yield put(changeUserStatusFailed((signupRes as RequestFail).message))
  }
}

function* getTeamsOfCompany(action: ChangeUserStatusAction) {
  console.log(action)

  const company = yield select(getCompany)
  const requestURL = `/api/company/getTeamsOfCompany?companyId=${
    company._id
  }&status=${action.status ? action.status : ''}`

  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: Company[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log('signupRes')
  console.log(signupRes)

  if (signupRes.success) {
    yield put(getTeamsOfCompanySuccess(signupRes.data.data))
  } else {
    yield put(getTeamsOfCompanyFailed((signupRes as RequestFail).message))
  }
}

function* changeTeamStatus(action: ChangeTeamStatusAction) {
  console.log(action)

  const company = yield select(getCompany)
  const requestURL = `/api/company/changeTeamStatus`

  const signupRes: RequestReturnParam<SignUpResult & {}> = yield call<
    typeof request
  >(
    request,
    requestURL,
    'PUT',
    {
      teamId: action.teamId,
      companyId: company._id,
      status: action.status,
    },
    true
  )
  console.log('signupRes')
  console.log(signupRes)

  if (signupRes.success) {
    yield put(changeTeamStatusSuccess())
  } else {
    yield put(changeTeamStatusFailed((signupRes as RequestFail).message))
  }
}

function* getFeedbackData(action: GetFeedbackDataAction) {
  console.log(action)

  const company = yield select(getCompany)
  const requestURL = `/api/company/getCompanyFeedbackData?companyId=${company._id}`

  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: CompanyFeedbackData
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log('signupRes')
  console.log(signupRes)

  if (signupRes.success) {
    yield put(getFeedbackDataSuccess(signupRes.data.data))
  } else {
    yield put(getFeedbackDataFailed((signupRes as RequestFail).message))
  }
}

function* getCompanyPendingInvites(action: GetCompanyPendingInvitesAction) {
  console.log(action)

  const company = yield select(getCompany)
  const requestURL = `/api/invites/getPendingCompanyInvites?companyId=${company._id}&type=employees`

  const signupRes: RequestReturnParam<
    SignUpResult & {
      data: CompanyPendingInvite[]
    }
  > = yield call<typeof request>(request, requestURL, 'GET', null, true)
  console.log('signupRes')
  console.log(signupRes)

  if (signupRes.success) {
    yield put(getCompanyPendingInvitesSuccess(signupRes.data.data))
  } else {
    yield put(
      getCompanyPendingInvitesFailed((signupRes as RequestFail).message)
    )
  }
}
function* addCompanyAdmin(action: AddCompanyAdmin) {
  console.log(action)

  const company = yield select(getCompany)
  const requestURL = `/api/company/addCompanyAdmin?companyId=${company._id}`

  const signupRes: RequestReturnParam<SignUpResult & {}> = yield call<
    typeof request
  >(request, requestURL, 'PUT', null, true)

  yield call(getAdmins, {
    type: GET_ADMINS,
  })
}

function* createComapanySaga() {
  yield takeLatest(CREATE_COMPANY, createCompany)
}
function* getCompanyByUserSaga() {
  yield takeLatest(GET_COMPANY_BY_USER, getCompanyByUser)
}

function* inviteEmployeesSaga() {
  yield takeLatest(INVITE_EMPLOYEES, inviteEmployees)
}

function* getEmployeesSaga() {
  yield takeLatest(GET_EMPLOYEES, getEmployees)
}

function* getAdminsSaga() {
  yield takeLatest(GET_ADMINS, getAdmins)
}

function* changeUserStatusSaga() {
  yield takeLatest(CHANGE_USER_STATUS, changeUserStatus)
}

function* getTeamsOfCompanySaga() {
  yield takeLatest(GET_TEAMS_OF_COMPANY, getTeamsOfCompany)
}

function* changeTeamStatusSaga() {
  yield takeLatest(CHANGE_TEAM_STATUS, changeTeamStatus)
}

function* getFeedbackDataSaga() {
  yield takeLatest(GET_FEEDBACK_DATA, getFeedbackData)
}

function* getCompanyPendingInvitesSaga() {
  yield takeLatest(GET_COMPANY_PENDING_INVITES, getCompanyPendingInvites)
}

function* deleteInviteSaga() {
  yield takeLatest(DELETE_COMPANY_INVITE, deleteInvite)
}

function* mainSaga() {
  yield all([
    call(createComapanySaga),
    call(getCompanyByUserSaga),
    call(inviteEmployeesSaga),
    call(getEmployeesSaga),
    call(changeUserStatusSaga),
    call(getAdminsSaga),
    call(getTeamsOfCompanySaga),
    call(changeTeamStatusSaga),
    call(getFeedbackDataSaga),
    call(getCompanyPendingInvitesSaga),
    call(deleteInviteSaga),
  ])
}

export default mainSaga
