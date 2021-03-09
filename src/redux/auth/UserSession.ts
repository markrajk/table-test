import jsCookie from 'js-cookie'
import { User } from 'src/apiTypes'

export interface Session {
  user: User
  jwt: string
}
export const login = (details: Session) => {
  jsCookie.set('user', JSON.stringify(details))
  //  jsCookie.set('jwt', JSON.stringify(details.jwt))
}
/*
export const storeTeams = (teams) => {
  jsCookie.set('teams', JSON.stringify(teams))
}

export const restoreTeams = () => {
  const teams = jsCookie.get('teams')
  return teams ? JSON.parse(teams) : null
}

*/

export const currentSession = () => {
  const user = jsCookie.get('user')
  return user ? JSON.parse(user) : null
}

export const logout = () => {
  jsCookie.remove('user')
  jsCookie.remove('jwt')
  jsCookie.remove('teams')
  jsCookie.remove('teamArray')
}

export const updateUserData = (data: any) => {
  const newData = { ...currentSession(), ...data }
  const userData = JSON.stringify(newData)
  jsCookie.set('user', userData)
  return userData
}

export const removeCode = async (): Promise<Session | null> => {
  const session = await currentSession()
  if (session && session.user) {
    delete session.user.code
  }
  const userData = JSON.stringify(session)
  jsCookie.set('user', JSON.stringify(userData))

  return session
}
/*
export const addToTeamArray = (team) => {
  const prevTeams = restoreTeamArray()
  if (team) {
    prevTeams[team.teamId] = team
  }
  jsCookie.set('teamArray', JSON.stringify(prevTeams))
}

export const restoreTeamArray = () => {
  const teams = jsCookie.get('teamArray')
  return teams ? JSON.parse(teams) : {}
}

export const addToPeopleArray = (user) => {
  const prevUsers = restorePeopleArray()
  if (user) {
    prevUsers[user.userid] = user
  }
  jsCookie.set('peopleArray', JSON.stringify(prevUsers))
}

export const restorePeopleArray = () => {
  const people = jsCookie.get('peopleArray')
  return people ? JSON.parse(people) : {}
}
*/
