import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import TeamCard from 'src/components/team/teamCard'
import { AppDispatch, RootState } from 'src/configureStore'
import GiveFeedbackProfileHolder from 'src/components/profile/giveFeedbackProfilesHoldeNew'
import ToDoContainer from 'src/components/toDo/toDoContainer'
import {
  deleteTeam,
  getMyTeams,
  getTeamById,
  quitTeam,
} from 'src/redux/teams/actions'
import { getMyTeamMembers, getMyToDo } from 'src/redux/feedback/actions'
import GiveFeedbackmodal from 'src/components/modals/givefeedback'
import { User, UserTeam } from 'src/apiTypes'
import SelectTeam from 'src/components/modals/selectTeam'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myTeams: state.teamReducer.myTeams,
  selectedTeam: state.teamReducer.selectedTeam,
  myTeamMembers: state.feedbackReducer.myTeamMembers,
  todo: state.feedbackReducer.todo,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMyTeams: () => dispatch(getMyTeams()),
  deleteTeam: (teamId: string) => dispatch(deleteTeam(teamId)),
  quitTeam: (teamId: string) => dispatch(quitTeam(teamId)),
  getTeamById: (teamId: string) => dispatch(getTeamById(teamId)),
  getMyTeamMembers: () => dispatch(getMyTeamMembers()),
  getMyToDo: () => dispatch(getMyToDo()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const Home = (props: Props) => {
  const {
    myTeams,
    getMyTeams,
    user,
    getTeamById,
    getMyTeamMembers,
    myTeamMembers,
    getMyToDo,
    todo,
  } = props
  const { push } = useHistory()
  useEffect(() => {
    if (user) {
      getMyTeams()
      getMyTeamMembers()
      getMyToDo()
    }
  }, [user, getMyTeamMembers, getMyTeams, getMyToDo])

  const [selectedUser, selectUser] = useState<User | null>(null)
  const [selectedTeam, selectTeam] = useState<UserTeam | null>(null)
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
  console.log(selectedTeam)

  return (
    <div
      className="content-wrapper"
      onClick={() =>
        document.getElementById('mainDrawer')?.classList.remove('open')
      }
    >
      <div className="content">
        <div className="content-card">
          {!!todo && !!todo.length && (
            <>
              <div className="caption big">
                <p className="caption-title">Todo list</p>
              </div>
              <ToDoContainer
                data={todo || []}
                selectUser={(u) => selectUser(u)}
                selectTeam={(team) => selectTeam(team)}
              />
            </>
          )}
          <GiveFeedbackProfileHolder
            data={myTeamMembers}
            selectedUser={selectedUser}
            selectUser={(u) => selectUser(u)}
          />
        </div>
      </div>
      <SelectTeam
        teams={selectedUser?.team}
        onSelect={(team) => selectTeam(team)}
      />
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
