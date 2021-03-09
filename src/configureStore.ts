import { createStore, applyMiddleware, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import navReducer from './redux/navbar/reducer'
import teamReducer from './redux/teams/reducer'
import authReducer from './redux/auth/reducer'
import invitesReducer from './redux/invites/reducer'
import feedbackReducer from './redux/feedback/reducer'
import companyReducer from './redux/company/reducer'
import companySaga from './redux/company/saga'
import feedbackSaga from './redux/feedback/saga'
import authSaga from './redux/auth/saga'
import teamSaga from './redux/teams/saga'
import invitesSaga from './redux/invites/saga'

import { NavActionTypes } from './redux/navbar/constants'
import { AuthActionTypes } from './redux/auth/constants'
import { TeamActionTypes } from './redux/teams/constants'

const sagaMiddleware = createSagaMiddleware()

const appReducer = combineReducers({
  navReducer,
  authReducer,
  teamReducer,
  invitesReducer,
  feedbackReducer,
  companyReducer,
})

export type RootState = ReturnType<typeof appReducer>

const store = createStore(appReducer, applyMiddleware(sagaMiddleware))

export type AppDispatch = (
  action: NavActionTypes | AuthActionTypes | TeamActionTypes
) => void

export default function configureStore() {
  sagaMiddleware.run(authSaga)
  sagaMiddleware.run(teamSaga)
  sagaMiddleware.run(invitesSaga)
  sagaMiddleware.run(feedbackSaga)
  sagaMiddleware.run(companySaga)
  return store
}
