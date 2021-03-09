import {
  actions,
  SetDemoAction,
  SetNavAction,
  SetTopBarAction,
} from './constants'

export const setNav = (value: number): SetNavAction => ({
  type: actions.SET_NAV,
  value,
})
export const setTopBar = (value: 'big' | 'small'): SetTopBarAction => ({
  type: actions.SET_TOPBAR,
  value,
})

export const setDemo = (value: boolean): SetDemoAction => ({
  type: actions.SET_DEMO,
  value,
})
