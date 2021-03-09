import React from 'react'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Header from 'src/components/header'
import TeamCard from 'src/components/team/teamCard'
import { AppDispatch, RootState } from 'src/configureStore'
import GiveFeedbackProfileHolder from 'src/components/profile/givefeedbackProfilesHolder'
import {
  deleteTeam,
  getMyTeams,
  getTeamById,
  quitTeam,
} from 'src/redux/teams/actions'
import { getMyTeamMembers } from 'src/redux/feedback/actions'
import Drawer from 'src/components/sidebar/drawer'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myTeams: state.teamReducer.myTeams,
  selectedTeam: state.teamReducer.selectedTeam,
  myTeamMembers: state.feedbackReducer.myTeamMembers,
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

const Home = (props: Props) => {
  const {
    myTeams,
    getMyTeams,
    user,
    getTeamById,
    getMyTeamMembers,
    myTeamMembers,
  } = props
  const { push } = useHistory()
  useEffect(() => {
    if (user) {
      getMyTeams()
      getMyTeamMembers()
    }
  }, [user, getMyTeamMembers, getMyTeams])

  return (
    <main className="main" id="home-temp">
      <Header />
      <div
        className="content-wrapper"
        onClick={() =>
          document.getElementById('mainDrawer')?.classList.remove('open')
        }
      >
        <div className="content">
          <div className="content-card my-teams">
            <div className="content-card-main">
              {myTeams?.map((team) => (
                <div className="color-card" key={team._id}>
                  <TeamCard
                    data={team}
                    onClick={() => {
                      push('/team/settings')
                      getTeamById(team._id)
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
          <GiveFeedbackProfileHolder data={myTeamMembers} />
        </div>
      </div>
      <Drawer />
    </main>
  )
}

export default connector(Home)
