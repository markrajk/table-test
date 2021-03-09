import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TeamCard from 'src/components/team/teamCard'
import { AppDispatch, RootState } from 'src/configureStore'
import GiveFeedbackProfileHolder from 'src/components/profile/giveFeedbackProfileHolderV3'
import GiveFeedbackToDo from 'src/components/profile/giveFeedbackTodoHolder'

import {
  deleteTeam,
  getMyTeams,
  getPendingInvites,
  getTeamById,
  quitTeam,
} from 'src/redux/teams/actions'
import { getMyTeamMembers, getMyToDo } from 'src/redux/feedback/actions'
import GiveFeedbackmodal from 'src/components/modals/givefeedback'
import { ToDo, User, UserTeam } from 'src/apiTypes'
import SelectTeam from 'src/components/modals/selectTeam'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myTeams: state.teamReducer.myTeams,
  selectedTeamInReducer: state.teamReducer.selectedTeam,
  myTeamMembers: state.feedbackReducer.myTeamMembers,
  todo: state.feedbackReducer.todo,
  pendingInvites: state.invitesReducer.invites,
  selectedTeamData: state.teamReducer.selectedTeamData
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMyTeams: () => dispatch(getMyTeams()),
  deleteTeam: (teamId: string) => dispatch(deleteTeam(teamId)),
  quitTeam: (teamId: string) => dispatch(quitTeam(teamId)),
  getTeamById: (teamId: string) => dispatch(getTeamById(teamId)),
  getMyTeamMembers: () => dispatch(getMyTeamMembers()),
  getMyToDo: () => dispatch(getMyToDo()),
  getPendingInvites: (teamId: string) => dispatch(getPendingInvites(teamId, 'Team member'))
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  getTeamId(teamId: string): void
}
interface ParamTypes {
  teamId?: string
}
const Home = (props: Props) => {
  const { t } = useTranslation(['giveFeedbackPage', 'common'])
  const params = useParams<ParamTypes>()
  const {
    myTeams,
    getMyTeams,
    user,
    getTeamById,
    getMyTeamMembers,
    myTeamMembers,
    getMyToDo,
    todo,
    getTeamId,
    getPendingInvites,
    selectedTeamInReducer,
    selectedTeamData
  } = props
  const { push } = useHistory()
  useEffect(() => {
    if (user) {
      getMyTeams()
      getMyTeamMembers()
      getMyToDo()
    }
  }, [user, getMyTeamMembers, getMyTeams, getMyToDo])

  console.log(myTeamMembers, "MY TEAM MEMBERS!!!!!!!!!!!!!!!!!!!!")

  const [selectedUser, selectUser] = useState<User | null>(null)
  const [selectedTeam, selectTeam] = useState<UserTeam | null>(null)
  console.log(params)

  useEffect(() => {
    if (selectedUser) {
      if (!!selectedUser?.team?.length && selectedUser.team.length < 2) {
        selectTeam(selectedUser.team[0])
      } else {
        document.getElementById('feedbackTypeModal')?.classList.add('open')
      }
    }
  }, [selectedUser])

  useEffect(() => {
    if (selectedTeam) {
      document.getElementById('peerToPeerFeedbackModal')?.classList.add('open')
    }
  }, [selectedTeam])


  useEffect(() => {
    if (selectedTeamInReducer) {
      getPendingInvites(selectedTeamInReducer?._id)
    }
  }, [selectedTeamInReducer])

  const [mode, setMode] = useState<'grid' | 'todo'>('grid')
  useEffect(() => {
    if (params.teamId) {
      getTeamId(params.teamId)
    }
  }, [params])


  const [ filtered, setFiltered ] = useState<User[]>([])

  useEffect(() => {
    if (myTeamMembers) {
      setFiltered(myTeamMembers)
    }
  }, [myTeamMembers])

  const filterTeammembers = (keyword: string) => {
    if (myTeamMembers) {
      setFiltered(myTeamMembers.filter(item => item.firstname.toLowerCase().includes(keyword.toLowerCase())))
    }
    
  }

  const [ filteredTodo, setFilteredTodo ] = useState<ToDo[]>([])

  useEffect(() => {
    if (todo) {
      setFilteredTodo(todo)
    }
  }, [todo])


  const filterToDo = (keyword: string) => {
    if (todo) {
      setFilteredTodo(todo.filter(item => {
        if (item.type === 'team') {
          return item.team.name.toLowerCase().includes(keyword.toLowerCase()) 
        } else {
          return item.target.firstname.toLowerCase().includes(keyword.toLowerCase()) 
        }
        
      }))
    }
    
  }

  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="content-card">
          <div className="content-card-header">
            <p className="content-card-header-title">
              {t('giveFeedbackPage:giveFeedback')}
            </p>
            {/* <div className="options">
              <button
                className={`options-link ${mode === 'grid' ? 'active' : ''}`}
                onClick={() => setMode('grid')}
              >
                {t('common:Allteammembers')}
              </button>
              <span className="options-divider">I</span>
              {!!todo?.length && (
                <button
                  className={`options-link ${mode === 'todo' ? 'active' : ''}`}
                  onClick={() => setMode('todo')}
                >
                  {t('giveFeedbackPage:todoList')}{' '}
                  <span className="amount">{todo?.length || ''}</span>
                </button>
              )}
            </div> */}

            <div className="content-card-header-container">
              <div className="option-buttons">
                <button className={`button ${mode === 'grid' ? 'active' : ''}`} text={`${t('common:Allteammembers')}`} onClick={() => setMode('grid')}>{t('common:Allteammembers')}</button>
                <button className={`button ${mode === 'todo' ? 'active' : ''}`} text={`${t('common:Mytodolist')}`} style={{ paddingRight: '2.5em' }} onClick={() => setMode('todo')}>{t('common:Mytodolist')}{ !!todo?.length &&<span className="amount">{todo?.length || ''}</span>}</button>
              </div>

              <div className="content-card-header-buttons">
                <input type="text" placeholder="Search..." onChange={(e) => {
                  if (mode === 'grid') {
                    filterTeammembers(e.target.value)
                  } else {
                    filterToDo(e.target.value)
                  }
                  
                } } ></input>
                <button className="button button-green-primary" onClick={() => {
                  document
                    .getElementById('inviteMemberNew')
                    ?.classList.add('open')

                }} >{t('common:inviteNewMembers')}</button>
                <button className="button button-light-gradient">
                  <i className="icon-sort"></i>
                </button>
              </div>
            </div>
          </div>

          {
            !myTeamMembers?.length && mode === 'grid' && (
              <div className="placeholder">
                <img src="/img/feedback-placeholder-img.png" alt="Clip art" className="placeholder-img"></img>
                <p className="placeholder-title">No team members yet</p>
                <p className="placeholder-text">This team doesn’t have any members at the moment.
                Click <button>here</button> to invite your first team members.</p>
              </div>
            )
          }

          {
            !todo?.length && mode !== 'grid' && (
              <div className="placeholder">
                <img src="/img/feedback-placeholder-img.png" alt="Clip art" className="placeholder-img"></img>
                <p className="placeholder-title">No team members yet</p>
                <p className="placeholder-text">This team doesn’t have any members at the moment.
                Click <button>here</button> to invite your first team members.</p>
              </div>
            )
          }

          {/* SEARCH PLACEHOLDER */}
          { mode === 'grid' && !filtered.length &&
              <div className="placeholder no-results">
                <img src="/img/table-placeholder-img-no-results.png" alt="Clip art" className="placeholder-img" />
                <p className="placeholder-title">No search results</p>
              </div>
          }
          { mode === 'todo' && !filteredTodo.length &&
              <div className="placeholder no-results">
                <img src="/img/table-placeholder-img-no-results.png" alt="Clip art" className="placeholder-img" />
                <p className="placeholder-title">No search results</p>
              </div>
          }

          {(myTeamMembers?.length || todo?.length) && mode === 'grid' ? (
            <GiveFeedbackProfileHolder
              data={filtered}
              selectedUser={selectedUser}
              selectUser={(u) => selectUser(u)}
              invites={selectedTeamData?.['Team member'] || []}
            />
          ) : (
              <GiveFeedbackToDo
                data={filteredTodo}
                selectedUser={selectedUser}
                selectUser={(u, t) => {
                  selectUser(u)
                  selectTeam(t)
                }}
              />
            )}
        </div>
      </div>
      {mode == 'grid' && <SelectTeam
        teams={selectedUser?.team}
        onSelect={(team) => selectTeam(team)}
      />}

      <GiveFeedbackmodal
        data={selectedUser}
        team={selectedTeam}
        clear={() => {
          selectUser(null)
          selectTeam(null)
          getMyToDo()
        }}
      />
    </div>
  )
}

export default connector(Home)
