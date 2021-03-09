import { actions, NavState, NavActionTypes } from './constants'

const initialState: NavState = {
  navBar: 3,
  topBar: 'small',
  demo: false,
}

const navReducer = (state = initialState, action: NavActionTypes): NavState => {
  switch (action.type) {
    case actions.SET_NAV:
      return Object.assign({}, state, {
        navBar: action.value,
      })

    case actions.SET_TOPBAR:
      return Object.assign({}, state, {
        topBar: action.value,
      })
    case actions.SET_DEMO:
      return Object.assign({}, state, {
        demo: action.value,
      })

    default:
      return state
  }
}

export default navReducer
