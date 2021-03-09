import React, { useState } from 'react'
import Header from 'src/components/header'
import HeaderTeamSubNav from 'src/components/header/headerTeamSubNav'
import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { useEffect } from 'react'
import {
  getActiveTeamUsers,
  getPendingInvites,
  removeMember,
  getUserSuggestion,
} from 'src/redux/teams/actions'
import { deleteInvite } from 'src/redux/invites/actions'

import { TeamUserRank, User } from 'src/apiTypes'

import InviteMembers from 'src/components/modals/inviteMember'
import GiveFeedbackmodal from 'src/components/modals/givefeedback'
import TeamMemberProfile from 'src/components/profile/teamMemberProfile'

import { getTeamUserRanks } from 'src/redux/feedback/actions'
import { useHistory } from 'react-router-dom'
import { selectUser } from 'src/redux/auth/actions'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
  selectedTeamData: state.teamReducer.selectedTeamData,
  userSuggestions: state.teamReducer.userSuggestions,
  userRank: state.feedbackReducer.usersRank,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getActiveUsers: (teamId: string, memberType: string) =>
    dispatch(getActiveTeamUsers(teamId, memberType)),
  selectUserInReducer: (user: User) => dispatch(selectUser(user)),
  deleteInvite: (data: { inviteId: string; inviteType: string }) =>
    dispatch(deleteInvite(data)),
  removeMember: (data: { teamId: string; userId: string; type: string }) =>
    dispatch(removeMember(data)),
  getPendingInvites: (
    teamId: string,
    memberType:
      | 'Team member'
      | 'Viewing rights'
      | 'Admin rights'
      | 'Team leader'
  ) => dispatch(getPendingInvites(teamId, memberType)),
  getUserSuggestion: (data: { teamId: string; keyword: string }) =>
    dispatch(getUserSuggestion(data)),
  getTeamUserRank: (teamId: string) => dispatch(getTeamUserRanks(teamId)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const GeneralSettings = (props: Props) => {
  const {
    selectedTeam,
    selectedTeamData,
    selectUserInReducer,
    getActiveUsers,
    getPendingInvites,
    removeMember,
    deleteInvite,
    getUserSuggestion,
    userSuggestions,
    user,
    getTeamUserRank,
    userRank,
  } = props
  useEffect(() => {
    if (selectedTeam) {
      getActiveUsers(selectedTeam._id, 'teamMembers')
      getPendingInvites(selectedTeam._id, 'Team member')
    }
  }, [getActiveUsers, getPendingInvites])

  const [filteredAdmins, setFiltereredAdmins] = useState<User[]>([])
  const [selectedMember, selectMember] = useState<User | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<
    'firstname' | 'jobtitle' | 'email'
  >('firstname')

  useEffect(() => {
    if (selectedTeamData && selectedTeamData.admins) {
      sortMembers('firstname')
    }
  }, [selectedTeamData])

  useEffect(() => {
    if (selectedTeam) {
      getTeamUserRank(selectedTeam._id)
    }
  }, [selectedTeam])
  const { t } = useTranslation(['teamMembersPage', 'common'])
  const sortMembers = (what: 'firstname' | 'jobtitle' | 'email') => {
    const members = selectedTeamData ? [...selectedTeamData.teamLeaders] : []
    const filtered = members.sort((a, b) => {
      if (a[what] < b[what]) {
        return 1
      } else {
        return -1
      }
    })
    setFiltereredAdmins(filtered)
  }

  const [mode, selectMode] = useState('grid')

  const [filteredUser, setFilteredUsers] = useState<TeamUserRank[]>([])

  useEffect(() => {
    if (userRank) {
      setFilteredUsers(userRank)
    }
  }, [userRank])

  const [keyword, setKeyword] = useState('')
  const filtered = (key: string) => {
    setKeyword(key)

    const filter =
      userRank?.filter((member) => {
        if (member.user.firstname.toLowerCase().includes(key.toLowerCase())) {
          return true
        }
        if (member.user.lastname.toLowerCase().includes(key.toLowerCase())) {
          return true
        }
        //    if (member.user.email.toLowerCase().includes(keyword.toLowerCase())) {
        //       return true
        //  }
      }) || []
    setFilteredUsers(filter)
  }

  const { push } = useHistory()
  const [selectedUser, selectUser] = useState<User | null>(null)
  return (
    <div
      className="content-wrapper"
      onClick={() =>
        document.getElementById('mainDrawer')?.classList.remove('open')
      }
    >
      <div className="content">
        <div
          className={
            'content-card ' +
            (userRank && !userRank.length ? ' show-placeholder' : '')
          }
        >
          <div className="content-card-header">
            <p className="content-card-header-title">
              {t('teamMembersPage:teamMembers')}
            </p>
            <p className="options">
              <button
                className={`options-link`}
                onClick={() => push('/teamMembersTable')}
              >
                {t('teamMembersPage:tableView')}
              </button>
              <span className="options-divider">I</span>
              <button
                className={`options-link active`}
                onClick={() => push('/teamMembers')}
              >
                {t('teamMembersPage:gridView')}
              </button>
            </p>
            <div className="content-card-header-bottom">
              <div className="content-card-input-container">
                <input
                  type="text"
                  placeholder={`${t('common:search')}`}
                  onChange={(e) => filtered(e.target.value)}
                />
                <i className="icon-search"></i>
              </div>
              <button
                className="button button-primary test-add-person modal-trigger"
                target-modal="inviteMembersModal"
                onClick={() =>
                  document
                    .getElementById('inviteMembersModal')
                    ?.classList.add('open')
                }
              >
                {t('common:inviteNewMembers')}
              </button>
            </div>

            <div className="custom-dropdown card-settings-dropdown">
              <button
                className="custom-dropdown-trigger"
                onClick={(e) => e.currentTarget.focus()}
              >
                <i className="icon-cog"></i>
              </button>
              <ul className="custom-dropdown-menu">
                <li className="custom-dropdown-menu-item">
                  <button className="custom-dropdown-menu-item-link">
                    Link 1
                  </button>
                </li>
                <li className="custom-dropdown-menu-item">
                  <button className="custom-dropdown-menu-item-link">
                    Link 2
                  </button>
                </li>
                <li className="custom-dropdown-menu-item">
                  <button className="custom-dropdown-menu-item-link">
                    Link 3
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="content-card-main">
            {!!keyword && !!filteredUser && !filteredUser.length && (
              <div className="no-results-wrapper">
                <div className="no-results">
                  <img
                    src="/img/table-placeholder-img-no-results.png"
                    alt="Clip art"
                    className="no-results-img"
                  />
                  <p className="no-results-title">
                    {t('common:noSearchResults')}
                  </p>
                  <p className="no-results-text">
                    {t('common:click')} <button>{t('common:here')}</button>{' '}
                    {t('common:toInviteNewTeamMembers')}
                  </p>
                </div>
              </div>
            )}

            <div className="placeholder">
              <img
                src="/img/feedback-placeholder-img.png"
                alt="Clip art "
                className="placeholder-img"
              />
              <p className="placeholder-title">
                {t('teamMembersPage:placeholder:title')}
              </p>
              <p className="placeholder-text">
                {t('common:click')} <button>{t('common:here')}</button>{' '}
                {t('teamMembersPage:placeholder:text')}
              </p>
            </div>
            <div className="people">
              {filteredUser?.map((member) => (
                <TeamMemberProfile
                  key={member._id}
                  data={member || undefined}
                  onClick={() => {
                    selectUserInReducer(member.user)
                    document
                      .getElementById('userFeedbacksHighOrder')
                      ?.classList.add('open')
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <InviteMembers />

      <GiveFeedbackmodal
        data={selectedUser}
        team={{
          _id: selectedTeam ? selectedTeam._id : '',
          name: selectedTeam ? selectedTeam.name : '',
          category: 'subordinate',
        }}
        clear={() => {
          selectUser(null)
        }}
      />
    </div>
  )
}

export default connector(GeneralSettings)
