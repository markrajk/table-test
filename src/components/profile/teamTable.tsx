import { profile } from 'console'
import React, { useEffect, useState } from 'react'
import { SelectedTeamData, TeamUserRank, User } from 'src/apiTypes'
import TeamMemberRow from './teamMemberTableRow'
import { IMAGE_API_ROOT } from 'src/request'
import { backgroundCardHeight } from 'src/tables'
import { useTranslation } from 'react-i18next'

interface Props {
  data?: TeamUserRank[]
  onClick?(): void
  updateJobTitle?(userId: string, jobtitle: string): void
  keyword?: string
  onSelect?(user: User): void
  removeMember?(userId: string): void
}

const TeamTable = (props: Props) => {
  const { t } = useTranslation(['teamMembersPage', 'common'])
  const {
    data,
    onClick,
    updateJobTitle,
    keyword,
    onSelect,
    removeMember,
  } = props

  const [selectedFilter, setSelectedFilter] = useState<
    'firstname' | 'jobtitle' | 'email' | 'average'
  >('firstname')
  const [filteredAdmins, setFiltereredAdmins] = useState<TeamUserRank[]>([])
  const [sortType, setSortType] = useState<1 | -1>(1)

  const sortMembers = (
    what: 'firstname' | 'jobtitle' | 'email' | 'average',
    type: 1 | -1
  ) => {
    const members = [...(data || [])]
    const filtered = members.sort((a, b) => {
      if (what === 'average') {
        if (a.average < b.average) {
          return 1 * type
        } else {
          return -1 * type
        }
      }
      if (a.user[what] < b.user[what]) {
        return 1 * type
      } else {
        return -1 * type
      }
    })

    setFiltereredAdmins(filtered)
  }

  useEffect(() => {
    if (data) {
      sortMembers('firstname', 1)
    }
  }, [data])
  useEffect(() => {
    backgroundCardHeight()
  })
  return (
    <div className="custom-table-wrapper">
      <div className="custom-table-wrapper-head">
        <table className="custom-table head">
          <thead className="custom-table-head">
            <tr className="custom-table-row">
              <th
                className={`column-01 ${
                  selectedFilter === 'firstname' ? ' active' : ''
                } ${
                  selectedFilter === 'firstname' && sortType === -1 ? ' up' : ''
                }`}
                onClick={() => {
                  setSortType(sortType === 1 ? -1 : 1)
                  sortMembers('firstname', sortType === 1 ? -1 : 1)
                  setSelectedFilter('firstname')
                }}
              >
                <p>{t('common:Name')}</p>
                <i className="icon-caret-down"></i>
              </th>
              <th
                className={`column-02 ${
                  selectedFilter === 'jobtitle' ? ' active' : ''
                } ${
                  selectedFilter === 'jobtitle' && sortType === -1 ? ' up' : ''
                }`}
                onClick={() => {
                  setSortType(sortType === 1 ? -1 : 1)
                  sortMembers('jobtitle', sortType === 1 ? -1 : 1)
                  setSelectedFilter('jobtitle')
                }}
              >
                <p>{t('common:Jobtitle')}</p>
                <i className="icon-caret-down"></i>
              </th>
              <th
                className={`column-03 ${
                  selectedFilter === 'average' ? ' active' : ''
                } ${
                  selectedFilter === 'average' && sortType === -1 ? ' up' : ''
                }`}
                onClick={() => {
                  setSortType(sortType === 1 ? -1 : 1)
                  sortMembers('average', sortType === 1 ? -1 : 1)
                  setSelectedFilter('average')
                }}
              >
                <p>{t('teamMembersPage:averageFeedback')}</p>
                <i className="icon-caret-down"></i>
              </th>
              <th className="column-04">
                <p>{t('teamMembersPage:developmentTrend')}</p>
                <i className="icon-caret-down"></i>
              </th>
              <th className="column-05">
                <div className="custom-dropdown table-dropdown">
                  <button
                    className="custom-dropdown-trigger"
                    tabIndex={-1}
                    onClick={(e) => e.currentTarget.focus()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="39.049"
                      height="25.329"
                      viewBox="0 0 39.049 25.329"
                    >
                      <g transform="translate(-1165.976 -228.054)">
                        <path
                          d="M403.1,242h5.454l-2.552,3.46Z"
                          transform="translate(790.784 -2.859)"
                          fill="#647282"
                        />
                        <line
                          x2="7"
                          transform="translate(1178 241)"
                          fill="none"
                          stroke="#647282"
                          stroke-width="1.75"
                        />
                        <line
                          x2="7"
                          transform="translate(1178 238)"
                          fill="none"
                          stroke="#647282"
                          stroke-width="1.75"
                        />
                        <line
                          x2="7"
                          transform="translate(1178 244)"
                          fill="none"
                          stroke="#647282"
                          stroke-width="1.75"
                        />
                        <line
                          x2="1.5"
                          transform="translate(1174.976 244)"
                          fill="none"
                          stroke="#647282"
                          stroke-width="1.75"
                        />
                        <line
                          x2="1.5"
                          transform="translate(1174.976 241)"
                          fill="none"
                          stroke="#647282"
                          stroke-width="1.75"
                        />
                        <line
                          x2="1.5"
                          transform="translate(1174.976 238)"
                          fill="none"
                          stroke="#647282"
                          stroke-width="1.75"
                        />
                        <g transform="translate(1165.976 228.054)" fill="none">
                          <path
                            d="M6.508,0H32.541c3.594,0,6.508,2.646,6.508,5.91V19.419c0,3.264-2.914,5.91-6.508,5.91H6.508C2.914,25.329,0,22.683,0,19.419V5.91C0,2.646,2.914,0,6.508,0Z"
                            stroke="none"
                          />
                          <path
                            className="border"
                            d="M 6.508216857910156 1.749998092651367 C 3.884529113769531 1.749998092651367 1.75 3.616157531738281 1.75 5.909988403320313 L 1.75 19.41852760314941 C 1.75 21.71235847473145 3.884529113769531 23.57851791381836 6.508216857910156 23.57851791381836 L 32.54109954833984 23.57851791381836 C 35.16478729248047 23.57851791381836 37.29931640625 21.71235847473145 37.29931640625 19.41852760314941 L 37.29931640625 5.909988403320313 C 37.29931640625 3.616157531738281 35.16478729248047 1.749998092651367 32.54109954833984 1.749998092651367 L 6.508216857910156 1.749998092651367 M 6.508216857910156 -1.9073486328125e-06 L 32.54109954833984 -1.9073486328125e-06 C 36.1354866027832 -1.9073486328125e-06 39.04931640625 2.645988464355469 39.04931640625 5.909988403320313 L 39.04931640625 19.41852760314941 C 39.04931640625 22.68251800537109 36.1354866027832 25.32851791381836 32.54109954833984 25.32851791381836 L 6.508216857910156 25.32851791381836 C 2.913829803466797 25.32851791381836 0 22.68251800537109 0 19.41852760314941 L 0 5.909988403320313 C 0 2.645988464355469 2.913829803466797 -1.9073486328125e-06 6.508216857910156 -1.9073486328125e-06 Z"
                            stroke="none"
                            fill="#9bc7f1"
                          />
                        </g>
                      </g>
                    </svg>
                  </button>
                  <div className="custom-dropdown-menu">
                    <div className="custom-dropdown-menu-item">
                      <button className="custom-dropdown-menu-item-link">
                        <i className="icon-user"></i>
                        <p>{t('common:Openteam')}</p>
                        <i className="icon-chevron-right"></i>
                      </button>
                    </div>
                    <div className="custom-dropdown-menu-item">
                      <button className="custom-dropdown-menu-item-link">
                        <i className="icon-give-feedback"></i>
                        <p>{t('common:Givefeedback')}</p>
                        <i className="icon-chevron-right"></i>
                      </button>
                    </div>
                    <div className="custom-dropdown-menu-item">
                      <button className="custom-dropdown-menu-item-link">
                        <i className="icon-bin"></i>
                        <p>{t('common:Deletefromteam')}</p>
                        <i className="icon-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      <div className="custom-table-wrapper-body">
        <table className="custom-table with-border">
          <tbody className="custom-table-body">
            {!!keyword && !!filteredAdmins && !filteredAdmins.length && (
              <tr className="no-results-wrapper">
                <td className="no-results" colSpan={100}>
                  <img
                    src="/img/table-placeholder-img-no-results.png"
                    alt="Clip art"
                    className="no-results-img"
                  />
                  <p className="no-results-title">
                    {t('common:noSearchResults')}
                  </p>
                  <p className="no-results-text">
                    {t('common:Click')} <button>{t('common:here')}</button>{' '}
                    {t('common:toInviteNewTeamMembers')}
                  </p>
                </td>
              </tr>
            )}
            {filteredAdmins?.map((member) => (
              <TeamMemberRow
                updateJobTitle={(jobtitle: string) => {
                  if (updateJobTitle) {
                    updateJobTitle(member.user._id, jobtitle)
                  }
                }}
                onClick={() => {
                  if (onSelect) {
                    onSelect(member.user)
                  }
                }}
                removeMember={() => {
                  if (removeMember) {
                    removeMember(member._id)
                  }
                }}
                key={member._id}
                data={member}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TeamTable
