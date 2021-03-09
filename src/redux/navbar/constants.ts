export const actions = {
  SET_NAV: 'SET_NAV',
  SET_TOPBAR: 'SET_TOPBAR',
  SET_DEMO: 'SET_DEMO',
}

export interface NavState {
  navBar: number
  topBar: 'big' | 'small'
  demo: boolean
}

export interface SetNavAction {
  type: typeof actions.SET_NAV
  value: number
}

export interface SetTopBarAction {
  type: typeof actions.SET_TOPBAR
  value: 'big' | 'small'
}

export interface SetDemoAction {
  type: typeof actions.SET_DEMO
  value: boolean
}

export type NavActionTypes = SetNavAction | SetTopBarAction | SetDemoAction
