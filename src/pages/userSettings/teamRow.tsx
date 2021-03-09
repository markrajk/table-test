import React from 'react'
import { MyTeamsStatus } from 'src/apiTypes'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'

interface Props {
  team?: MyTeamsStatus
  onQuit?(): void
}

const roleNameString = (
  role: string
): 'Member' | 'Leader' | 'Admin' | 'View' | ' ' => {
  if (role === 'teamMembers') {
    return i18n.t('common:Member')
  }
  if (role === 'teamLeaders') {
    return i18n.t('common:Leader')
  }
  if (role === 'admins') {
    return i18n.t('common:Admin')
  }
  if (role === 'viewingRights') {
    return i18n.t('common:View')
  }

  return ' '
}

const TeamRow = (props: Props) => {
  const { t } = useTranslation(['userSettingsTeamsPage', 'common'])
  const { team, onQuit } = props
  return (
    <tr className="custom-table-row">
      <td className="column-01">
        <p>{team?.name}</p>
      </td>
      <td className="column-02">
        <p>
          {team?.roles.map((item, i) => {
            if (i < team.roles.length - 1) {
              return roleNameString(item) + ' + '
            }
            return roleNameString(item)
          })}
        </p>
      </td>
      <td className="column-03 active">
        <p>{t('common:Active')}</p>
      </td>
      <td
        className={
          'column-04 ' + (team?.roles.includes('admins') ? 'delete' : 'pending')
        }
        onClick={onQuit}
      >
        <p>
          {team?.roles.includes('admins')
            ? t('common:Deleteteam')
            : t('common:Quitteam')}
        </p>
      </td>
    </tr>
  )
}

export default TeamRow
