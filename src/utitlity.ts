//const { t } = useTranslation(["common"])
import i18n from 'i18next'
export const colorByName = (string?: string | undefined): string => {
  if (!string) {
    return '#0ab8ff'
  }
  const colors = [
    '#FED230',
    '#FED230',
    '#FD7622',
    '#5DD3FF',
    '#1FB8FD',
    '#1789FC',
    '#85E22D',
    '#32D74B',
    '#24C9B0',
    '#FED230',
    '#FED230',
    '#FD7622',
    '#5DD3FF',
    '#1FB8FD',
    '#1789FC',
  ]
  const firstLetter = parseInt(string[0], 36) - 9
  let userCal = firstLetter + string.length
  userCal = userCal % colors.length
  return colors[userCal - 1] ? colors[userCal - 1] : colors[3]
}

export const capitalize = (string?: string) => {
  if (string) {
    return string[0].toUpperCase() + string.slice(1)
  }
  return ''
}

export const validateEmail = (email: string) => {
  //eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

// export const ratingString = (rating: number) => {
//   if (rating) {
//     if (rating <= 1.5) {
//       return 'bad'
//     }
//     if (rating <= 2.25) {
//       return 'poor'
//     }
//     if (rating <= 3.0) {
//       return 'weak'
//     }
//     if (rating <= 3.2) {
//       return 'okMinus'
//     }
//     if (rating <= 3.6) {
//       return 'ok'
//     }
//     if (rating <= 3.75) {
//       return 'okPlus'
//     }
//     if (rating <= 3.9) {
//       return 'goodMinus'
//     }
//     if (rating <= 4.35) {
//       return 'good'
//     }
//     if (rating <= 4.5) {
//       return 'goodPlus'
//     }
//     if (rating <= 4.7) {
//       return 'great'
//     }
//     if (rating <= 4.9) {
//       return 'excellent'
//     }
//     if (rating <= 5.0) {
//       return 'amazing'
//     }
//   }
//   return 'None'
// }
export const previousWidgetsWidth = (array: any, index: any) => {
  let result = 0
  array.forEach((e: any, i: any) => {
    if (i <= index) {
      if (e.widgetIdentifier === 'valueBox') {
        result += 2
      } else {
        result += 6
      }
    }
  })

  return result
}

export const widgetCoords = (
  index: any,
  array: any,
  cols: any,
  size: number,
  afteValue: any = false
) => {
  if (!afteValue) {
    return {
      x: (index * size) % (cols || 12),
      y: Math.floor(previousWidgetsWidth(array, index) / (cols || 12) - 0.1),
    }
  } else {
    return {
      x: (index * size) % (cols || 12),
      y: Math.max(
        Math.floor(previousWidgetsWidth(array, index) / (cols || 12)) * 1 - 0.1,
        5
      ),
    }
  }
}

export const ratingString = (rating: number) => {
  if (rating) {
    if (rating <= 1.5) {
      return i18n.t('common:bad')
    }
    if (rating <= 2.25) {
      return i18n.t('common:poor')
    }
    if (rating <= 3.0) {
      return i18n.t('common:weak')
    }
    if (rating <= 3.2) {
      return i18n.t('common:okMinus')
    }
    if (rating <= 3.6) {
      return i18n.t('common:ok')
    }
    if (rating <= 3.75) {
      return i18n.t('common:okPlus')
    }
    if (rating <= 3.9) {
      return i18n.t('common:goodMinus')
    }
    if (rating <= 4.35) {
      return i18n.t('common:good')
    }
    if (rating <= 4.5) {
      return i18n.t('common:goodPlus')
    }
    if (rating <= 4.7) {
      return i18n.t('common:great')
    }
    if (rating <= 4.9) {
      return i18n.t('common:excellent')
    }
    if (rating <= 5.0) {
      return i18n.t('common:amazing')
    }
  }
  return i18n.t('common:None')
}

export const ratingColor = (rating: number) => {
  if (rating) {
    if (rating <= 2.5) {
      return '#FA711F'
    }
    if (rating <= 3.25) {
      return '#FEB12D'
    }
    if (rating <= 5.1) {
      return '#64C930'
    }

    //  if (rating <= 4.7) {
    //    return '#5aea31'
    //  }
  }
  if (rating === 0) {
    return '#F5F5F5'
  }
  return 'transparent'
}

export const dateFromObjectId = function (objectId: string) {
  return new Date(parseInt(objectId.substring(0, 8), 16) * 1000)
}

export const returnMainId = (path: string) => {
  if (path.includes('/giveFeedback')) {
    return 'give-feedback'
  }

  if (
    path.includes('/data/') &&
    path.includes('/team/') &&
    path.includes('/teamFeedbackText')
  ) {
    return 'text-feedback'
  }

  if (
    path.includes('/data/') &&
    path.includes('/team/') &&
    path.includes('/p2pFeedbackText')
  ) {
    return 'text-feedback'
  }

  if (
    path.includes('/data/') &&
    path.includes('/team/') &&
    path.includes('/subordinateFeedbackText')
  ) {
    return 'text-feedback'
  }

  if (
    path.includes('/data/') &&
    path.includes('/team/') &&
    path.includes('/selfFeedbackText')
  ) {
    return 'text-feedback'
  }

  if (
    path.includes('/data/') &&
    path.includes('/team/') &&
    path.includes('/supervisorTextFeedback')
  ) {
    return 'text-feedback'
  }

  if (path.includes('/data/') && path.includes('/team/')) {
    return 'team-table'
    return 'widgets'

  }

  if (path === '/teamMembersTable') {
    return 'team-members-table'
  }
  if (path === '/teamMembers') {
    return 'team-members-grid'
  }
  if (path === '/team/teamFeedback') {
    return 'team-feedback'
  }
  if (
    /teamLeaders|members|viewingRights|admins/.test(path) &&
    path.includes('/team/')
  ) {
    return 'team-settings-members'
  }
  if (path.includes('/settings/general') && path.includes('/team/')) {
    return 'team-settings-general'
  }

  if (path === '/company/overview') {
    return 'company-overview'
  }
  if (path === '/company/admins') {
    return 'company-admin-rights'
  }
  if (path === '/company/employees') {
    return 'company-employees'
  }
  if (path === '/company/employees') {
    return 'company-employees'
  }
  if (path === '/company/teams') {
    return 'company-teams'
  }
  if (path === '/') {
    return 'sign-in'
  }
  if (path === '/user/generalSettings') {
    return 'user-settings-general'
  }
  if (path === '/user/teamSettings') {
    return 'user-settings-teams'
  }
  if (path.includes('/team/') && path.includes('/settings/requests')) {
    return 'team-feedback-request-temp'
  }
  if (/feedbackInput*.team/ && path.includes('/team/')) {
    return 'custom-questions-team'
  }
  return 'sign-in'
}

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng)
}

export var randomColor = Math.floor(Math.random() * 16777215).toString(16)


export const checkIfLangExist = (check: string) => {
  const lang = ['en', 'fi']
  if (lang.includes(check)) {
    return true
  }
  return false
}