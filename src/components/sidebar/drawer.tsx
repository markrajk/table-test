import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import { AppDispatch, RootState } from 'src/configureStore'
import { getMyTeamMembers } from 'src/redux/feedback/actions'
import Toaster from 'src/components/common/toaster'

import {
  deleteTeam,
  getMyTeams,
  getTeamById,
  quitTeam,
} from 'src/redux/teams/actions'
import { colorByName } from 'src/utitlity'

import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myTeams: state.teamReducer.myTeams,
  selectedTeam: state.teamReducer.selectedTeam,
  myTeamMembers: state.feedbackReducer.myTeamMembers,
  company: state.companyReducer.company,
  deleteTeamStatus: state.teamReducer.deleteTeamStatus,
  toaster: state.teamReducer.toaster,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMyTeams: () => dispatch(getMyTeams()),
  deleteTeam: (teamId: string) => dispatch(deleteTeam(teamId)),
  quitTeam: (teamId: string) => dispatch(quitTeam(teamId)),
  getTeamById: (teamId: string) => dispatch(getTeamById(teamId)),
  getMyTeamMembers: () => dispatch(getMyTeamMembers()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}
interface ParamTypes {
  teamId?: string
}
const Drawer = (props: Props) => {
  const { t } = useTranslation(['sidebar', 'common'])
  const {
    myTeams,
    user,
    selectedTeam,
    getTeamById,
    getMyTeams,
    quitTeam,
    company,
    deleteTeamStatus,
    toaster,
  } = props

  useEffect(() => {
    if (user) {
      getMyTeams()
    }
  }, [user])

  const { push } = useHistory()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname || selectedTeam) {
      document.getElementById('mainDrawer')?.classList.remove('open')
    }
  }, [pathname, selectedTeam])

  const [teamHover, setTeamHover] = useState(false)
  return (
    <div className="side" id="mainDrawer">
      <div className="side-menu">
        <div className="side-menu-header">
          <div className="custom-dropdown side-menu-dropdown">
            <button
              className="custom-dropdown-trigger"
              style={{
                borderRadius: teamHover ? '9px 9px 0 0' : '9px 9px 9px 9px',
              }}
              tabIndex={-1}
              onClick={(e) => e.currentTarget.focus()}
            >
              <div className="team">
                {pathname.includes('/company/') ? (
                  <div className="team-icon">
                    <i className="icon-company-circle"></i>
                  </div>
                ) : (
                  <div
                    className="team-initials"
                    style={{ backgroundColor: colorByName(selectedTeam?.name) }}
                  >
                    {pathname.includes('/company/')
                      ? company?.name[0] || ''
                      : selectedTeam?.name[0] || 'CT'}
                  </div>
                )}

                <div className="team-set">
                  <p className="team-set-name">
                    {pathname.includes('/company/')
                      ? company?.name || ''
                      : selectedTeam?.name || t('common:CreateTeam')}
                  </p>
                  <p className="team-set-members">
                    {pathname.includes('/company/')
                      ? 'Company admin area'
                      : (selectedTeam?.teamMembers.length || '') +
                        (selectedTeam?.teamMembers &&
                        selectedTeam.teamMembers.length > 1
                          ? ` ${t('common:Members')}`
                          : selectedTeam?.teamMembers.length
                          ? ` ${t('common:Member')}`
                          : t('common:Clickhere'))}
                  </p>
                </div>
              </div>
              <div className="icons">
                <i className="icon-chevron-up"></i>
                <i className="icon-chevron-down"></i>
              </div>
            </button>

            <div className="custom-dropdown-menu" id="dropDownTeam">
              {myTeams
                ?.filter(
                  (team) => String(team._id) !== String(selectedTeam?._id)
                )
                .map((team) => (
                  <div
                    className="team"
                    key={team._id}
                    onMouseOver={() => setTeamHover(true)}
                    onMouseOut={(e) => setTeamHover(false)}
                  >
                    <div
                      className="team-initials"
                      style={{ backgroundColor: colorByName(team.name) }}
                      onClick={() => {
                        getTeamById(team._id)

                        push('/team/overall')
                      }}
                    >
                      {team.name[0]}
                    </div>
                    <div
                      className="team-set"
                      onClick={() => {
                        getTeamById(team._id)
                        push('/team/overall')
                      }}
                    >
                      <p className="team-set-name">{team.name}</p>
                      <p className="team-set-members">
                        {team.teamMembers.length +
                          (team.teamMembers.length > 1
                            ? ' Members'
                            : ' Member')}
                      </p>
                    </div>
                    <div
                      className="team-close"
                      onClick={() => quitTeam(team._id)}
                    >
                      <i className="icon-close"></i>
                    </div>
                  </div>
                ))}
              {!!company && (
                <div
                  className="team"
                  onMouseOver={() => setTeamHover(true)}
                  onMouseOut={(e) => setTeamHover(false)}
                  onClick={() => {
                    push('/company/overview')
                  }}
                >
                  {/*
                  add company icon here and remove next div
                  */}
                  <div className="team-icon">
                    <i className="icon-company-circle"></i>
                  </div>
                  <div className="team-set">
                    <p className="team-set-name">{company.name}</p>
                    <p className="team-set-members">
                      {t('common:Companyadminarea')}
                    </p>
                  </div>
                </div>
              )}
              <div
                className="team create-new"
                onClick={() =>
                  document
                    .getElementById('createNewTeamModal')
                    ?.classList.toggle('open')
                }
              >
                <div className="team-initials">
                  <i className="icon-plus"></i>
                </div>
                <div className="team-set">
                  <p className="team-set-name">{t('common:Createnew')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="side-menu-main"
          onMouseEnter={() => {
            document
              .querySelector('.custom-dropdown-trigger')
              ?.classList.add('open')
          }}
          onMouseLeave={() => {
            document
              .querySelector('.custom-dropdown-trigger')
              ?.classList.remove('open')
          }}
        >
          <div className="side-menu-main-list">
            <button
              className={`side-menu-main-list-item ${
                pathname === '/home' ? 'active' : ''
              }`}
              onClick={() => {
                document.getElementById('mainDrawer')?.classList.remove('open')
                push(
                  `/team/${
                    selectedTeam ? selectedTeam._id : 'null'
                  }/giveFeedback`
                )
              }}
            >
              <i className="icon-half-star"></i>
              <p className="side-menu-main-list-item-text">
                {t('common:Givefeedback')}
              </p>
            </button>
            {myTeams && !!myTeams.length && (
              <>
                <button
                  className={`side-menu-main-list-item ${
                    pathname === '/teamMembers' ? 'active' : ''
                  }`}
                  onClick={() => {
                    document
                      .getElementById('mainDrawer')
                      ?.classList.remove('open')
                    push('/teamMembers')
                  }}
                >
                  <i className="icon-users"></i>
                  <p className="side-menu-main-list-item-text">
                    {t('common:Teammembers')}
                  </p>
                </button>
                <button
                  className={`side-menu-main-list-item ${
                    pathname === '/team/overall' ? 'active' : ''
                  }`}
                  onClick={() => {
                    document
                      .getElementById('mainDrawer')
                      ?.classList.remove('open')
                    push(
                      `/team/${
                        selectedTeam ? selectedTeam._id : 'null'
                      }/data/teamFeedback`
                    )
                  }}
                >
                  <i className="icon-chart-bar"></i>
                  <p className="side-menu-main-list-item-text">
                    {t('common:Feedbackcharts')}
                  </p>
                </button>
                <button
                  className={`side-menu-main-list-item ${
                    pathname === '/team/teamFeedback' ? 'active' : ''
                  }`}
                  onClick={() => {
                    document
                      .getElementById('mainDrawer')
                      ?.classList.remove('open')
                    push('/team/teamFeedback')
                  }}
                >
                  <i className="icon-chat"></i>
                  <p className="side-menu-main-list-item-text">
                    {t('common:teamFeedback')}
                  </p>
                </button>
                <button
                  className={`side-menu-main-list-item ${
                    pathname.includes('/team/') && pathname.includes('general')
                      ? 'active'
                      : ''
                  }`}
                  onClick={() => {
                    if (selectedTeam) {
                      document
                        .getElementById('mainDrawer')
                        ?.classList.remove('open')

                      push(
                        `/team/${
                          selectedTeam ? selectedTeam._id : 'null'
                        }/settings/general`
                      )
                    }
                  }}
                >
                  <i className="icon-cog-full"></i>
                  <p className="side-menu-main-list-item-text">
                    {t('common:Teamsettings')}
                  </p>
                </button>
              </>
            )}
          </div>
          {myTeams && !!myTeams.length && (
            <div className="side-menu-main-list">
              <div className="side-menu-main-list-item title">
                <p className="side-menu-main-list-item-text">
                  {t('common:SHORTCUTS')}
                </p>
              </div>
              <button
                className={`side-menu-main-list-item ${
                  pathname === '/team/feedbackRequest' ? 'active' : ''
                }`}
                onClick={() => {
                  document
                    .getElementById('mainDrawer')
                    ?.classList.remove('open')
                  push('/team/feedbackRequest')
                }}
              >
                <i className="icon-git-pull"></i>
                <p className="side-menu-main-list-item-text">
                  {t('common:Feedbackrequests')}
                </p>
              </button>
              <button
                className="side-menu-main-list-item"
                onClick={() => {
                  document
                    .getElementById('inviteMemberNew')
                    ?.classList.toggle('open')
                }}
              >
                <i className="icon-add-user"></i>
                <p className="side-menu-main-list-item-text">
                  {t('common:inviteNewMembers')}
                </p>
              </button>
              {/* <button className="side-menu-main-list-item">
              <i className="icon-plus"></i>
              <p className="side-menu-main-list-item-text">Add shortcut</p>
            </button> */}
            </div>
          )}

          <div
            className="footer-button"
            onClick={() =>
              document
                .getElementById('createNewTeamModal')
                ?.classList.toggle('open')
            }
          >
            <button className="button button-primary">
              <i className="icon-plus"></i>
              {t('common:Createanewteam')}
            </button>
          </div>
        </div>
      </div>
  
      <Toaster
        type={'success'}
        instance={!!toaster}
        text={toaster}
        clear={() => {}}
      />
    </div>
  )
}

export default connector(Drawer)
