import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Company, CompanyTeam } from 'src/apiTypes'
import Header from 'src/components/header'
import HeaderCompanySubNav from 'src/components/header/headerCompanySubNav'
import { AppDispatch, RootState } from 'src/configureStore'
import { changeTeamStatus, getTeamsOfCompany } from 'src/redux/company/actions'
import { backgroundCardHeight } from 'src/tables'
import TeamRow from './teamRow'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  teamsOfCompany: state.companyReducer.teamsOfCompany,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getTeamsOfCompany: (status: 'active' | 'archived') =>
    dispatch(getTeamsOfCompany(status)),
  changeTeamStatus: (teamId: string, status: string) =>
    dispatch(changeTeamStatus(teamId, status)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const CompanyOverview = (props: Props) => {
  const { t } = useTranslation(['companyTeamsPage', 'common'])
  const { teamsOfCompany, getTeamsOfCompany, user, changeTeamStatus } = props
  const [mode, setMode] = useState<'active' | 'archived'>('active')

  console.log(teamsOfCompany)

  useEffect(() => {
    if (mode) {
      getTeamsOfCompany(mode)
    }
  }, [mode])

  useEffect(() => {
    backgroundCardHeight()
  })

  const [filteredTeams, setFilteredTeams] = useState<CompanyTeam[]>([])
  const [selectedFilter, setSelectedFilter] = useState<
    'firstname' | 'jobtitle' | 'email'
  >('firstname')
  useEffect(() => {
    if (teamsOfCompany) {
      setFilteredTeams(teamsOfCompany.teams)
    }
  }, [teamsOfCompany])
  const [keyword, setKeyword] = useState('')
  const filterTeams = (keyword: string) => {
    setKeyword(keyword)
    let emp = teamsOfCompany ? [...teamsOfCompany.teams] : []
    emp = emp.filter((e) =>
      e.name.toLowerCase().includes(keyword.toLowerCase())
    )
    setFilteredTeams(emp)
  }

  const [currentSort, setCurrentSort] = useState('name')
  const [sortOrder, setSortOrder] = useState(1)
  const sortResults = (
    what: 'name' | 'description' | 'teamLeader' | 'teamMembers'
  ) => {
    setSortOrder(-sortOrder)
    let teams = teamsOfCompany ? [...teamsOfCompany.teams] : []
    setCurrentSort(what)
    if (what === 'name' || what === 'description') {
      teams.sort((a, b) => {
        if (a[what] < b[what]) {
          return -sortOrder
        }
        return -sortOrder
      })
    }
    if (what === 'teamLeader') {
      teams.sort((a, b) => {
        if (a.teamLeaders[0] < b.teamLeaders[0]) {
          return -sortOrder
        }
        return -sortOrder
      })
    }

    if (what === 'teamMembers') {
      teams.sort((a, b) => {
        if (a.teamMembers.length < b.teamMembers.length) {
          return -sortOrder
        }
        return -sortOrder
      })
    }

    setFilteredTeams(teams)
  }
  useEffect(() => {
    backgroundCardHeight()
  })
  return (
    <div
      className="content-wrapper"
      onClick={() =>
        document.getElementById('mainDrawer')?.classList.remove('open')
      }
    >
      <div className="content">
        <div className="content-card">
          <div className="fake-card"></div>
          <div className="content-card-header">
            <p className="content-card-header-title">{t('common:Teams')}</p>
            <div className="options">
              <button
                onClick={() => setMode('active')}
                className={`options-link ${mode === 'active' ? 'active' : ''}`}
              >
                {' '}
                {t('companyTeamsPage:Activeteams')}
              </button>
              <span className="options-divider">I</span>
              <button
                onClick={() => setMode('archived')}
                className={`options-link ${
                  mode === 'archived' ? 'active' : ''
                }`}
              >
                {' '}
                {t('companyTeamsPage:Archivedteams')}
              </button>
            </div>
            <div className="content-card-header-bottom">
              <div className="content-card-input-container">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => filterTeams(e.target.value)}
                />
                <i className="icon-search"></i>
              </div>
            </div>
          </div>
          <div className="content-card-main">
            <div className="custom-table-wrapper">
              <div className="custom-table-wrapper-head">
                <table className="custom-table head">
                  <thead className="custom-table-head">
                    <tr className="custom-table-row">
                      <th
                        onClick={() => sortResults('name')}
                        className={`column-01 ${
                          currentSort === 'name' ? 'active' : ''
                        }
                          ${
                            currentSort === 'name' && sortOrder === -1
                              ? ' up'
                              : ''
                          }
                          `}
                      >
                        <p>{t('common:Teamname')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-02 ${
                          currentSort === 'description' ? 'active' : ''
                        }
                          ${
                            currentSort === 'description' && sortOrder === -1
                              ? ' up'
                              : ''
                          }
                          `}
                        onClick={() => sortResults('description')}
                      >
                        <p>{t('common:Teamdescription')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-03 ${
                          currentSort === 'teamLeader' ? 'active' : ''
                        }
                        ${
                          currentSort === 'teamLeader' && sortOrder === -1
                            ? ' up'
                            : ''
                        }
                        `}
                        onClick={() => sortResults('teamLeader')}
                      >
                        <p>{t('common:Teamlead')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-04 ${
                          currentSort === 'teamMembers' ? 'active' : ''
                        }
                        ${
                          currentSort === 'teamMembers' && sortOrder === -1
                            ? ' up'
                            : ''
                        }
                        `}
                        onClick={() => sortResults('teamMembers')}
                      >
                        <p>{t('common:Members')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th className="column-05"></th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="custom-table-wrapper-body">
                <table className="custom-table with-border">
                  <tbody className="custom-table-body">
                    <tr
                      className="table-placeholder"
                      style={
                        teamsOfCompany && !teamsOfCompany.teams.length
                          ? {}
                          : { display: 'none' }
                      }
                    >
                      <td colSpan={100}>
                        <img
                          src="/img/table-placeholder-img-02.png"
                          alt="Clip art"
                          className="table-placeholder-img"
                        />
                        <p className="table-placeholder-title">
                          {t('companyTeamsPage:placeholderTitle')}
                        </p>
                        <p className="table-placeholder-text">
                          {t('common:Click')}{' '}
                          <button>{t('common:here')}</button>{' '}
                          {t('companyTeamsPage:placeholderText')}.
                        </p>
                      </td>
                    </tr>

                    <tr
                      className="table-placeholder no-results"
                      style={
                        teamsOfCompany &&
                        teamsOfCompany.teams.length &&
                        keyword &&
                        !filteredTeams.length
                          ? {}
                          : { display: 'none' }
                      }
                    >
                      <td colSpan={100}>
                        <img
                          src="/img/table-placeholder-img-no-results.png"
                          alt="Clip art"
                          className="table-placeholder-img"
                        />
                        <p className="table-placeholder-title">
                          {t('common:noSearchResults')}
                        </p>
                      </td>
                    </tr>

                    {filteredTeams?.map((team) => (
                      <TeamRow
                        key={team._id}
                        data={team}
                        mode={mode}
                        onArchive={(status) =>
                          changeTeamStatus(team._id, status)
                        }
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connector(CompanyOverview)
