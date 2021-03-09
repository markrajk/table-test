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
  updateTeamProfile,
  getUserSuggestion,
  addToTeam,
  updateJobTitle,
} from 'src/redux/teams/actions'
import { deleteInvite } from 'src/redux/invites/actions'

import { backgroundCardHeight, toggleInputRow } from 'src/tables'
import { TeamUserRank, User } from 'src/apiTypes'
import TopNav from 'src/components/header/topSubNav'
import InviteMembers from 'src/components/modals/inviteMember'
import TeamMemberProfile from 'src/components/profile/teamMemberProfile'
import TeamTable from 'src/components/profile/teamTable'
import { getTeamUserRanks } from 'src/redux/feedback/actions'
import { useHistory } from 'react-router-dom'
import GiveFeedbackmodal from 'src/components/modals/givefeedback'
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
  updateJobTitle: (userId: string, jobtitle: string) =>
    dispatch(updateJobTitle(userId, jobtitle)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const GeneralSettings = (props: Props) => {
  const { t } = useTranslation(['teamMembersPage', 'common'])
  const {
    selectedTeam,
    selectedTeamData,
    getActiveUsers,
    getPendingInvites,
    removeMember,
    deleteInvite,
    getUserSuggestion,
    userSuggestions,
    user,
    getTeamUserRank,
    userRank,
    updateJobTitle,
    selectUserInReducer,
  } = props
  useEffect(() => {
    if (selectedTeam) {
      getActiveUsers(selectedTeam._id, 'teamMembers')
      getPendingInvites(selectedTeam._id, 'Team member')
    }
  }, [getActiveUsers, getPendingInvites])

  const [selectedMember, selectMember] = useState<User | null>(null)
  const [selectedFilter, setSelectedFilter] = useState<
    'firstname' | 'jobtitle' | 'email'
  >('firstname')

  useEffect(() => {
    if (selectedTeam) {
      getTeamUserRank(selectedTeam._id)
    }
  }, [selectedTeam])

  const [mode, selectMode] = useState('table')

  const [filteredUser, setFilteredUsers] = useState<TeamUserRank[]>([])

  useEffect(() => {
    if (userRank) {
      setFilteredUsers(userRank)
    }
  }, [userRank])

  const [keyword, setKeyword] = useState('')
  const filtered = (key: string) => {
    console.log(key)
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
          <div className="fake-card fake-card-team-members-table"></div>
          <div className="content-card-header">
            <p className="content-card-header-title">
              {t('teamMembersPage:teamMembers')}
            </p>
            <div className="options">
              <button
                className={`options-link active`}
                onClick={() => push('/teamMembersTable')}
              >
                {t('teamMembersPage:tableView')}
              </button>
              <span className="options-divider">I</span>
              <button
                className={`options-link`}
                onClick={() => push('/teamMembers')}
              >
                {t('teamMembersPage:gridView')}
              </button>
            </div>
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
                className="button button-primary modal-trigger"
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
          </div>
          <div className="content-card-main">
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

            <TeamTable
              keyword={keyword}
              onSelect={(user) => {
                selectUserInReducer(user)
                document
                  .getElementById('userFeedbacksHighOrder')
                  ?.classList.add('open')
                console.log('clicked')
              }}
              data={filteredUser || undefined}
              removeMember={(userId) =>
                removeMember({
                  teamId: selectedTeam ? selectedTeam._id : '',
                  userId: userId,
                  type: 'teamMembers',
                })
              }
              updateJobTitle={(userId: string, jobtitle: string) =>
                updateJobTitle(userId, jobtitle)
              }
            />
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
