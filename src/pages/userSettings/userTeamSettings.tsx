import React, { useState } from 'react'
import Header from 'src/components/header'
import HeaderUserSubNav from 'src/components/header/userSettingsSubHeader'
import ImageUpload from 'src/components/modals/imageUpload'
import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { useEffect } from 'react'
import { MyTeamsStatus, UpdateProfileVariables, UpdateTeamProfileVariable } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'
import { updateProfile } from 'src/redux/auth/actions'
import { getMyTeamsStatus, quitTeam } from 'src/redux/teams/actions'
import TeamRow from './teamRow'
import { backgroundCardHeight } from 'src/tables'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  myTeamStatus: state.teamReducer.myTeamStatus,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getMyTeamStatus: () => dispatch(getMyTeamsStatus()),
  quitTeam: (teamId: string) => dispatch(quitTeam(teamId)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const UserSettings = (props: Props) => {
  const { t } = useTranslation(['userSettingsTeamsPage', 'common'])

  const { getMyTeamStatus, user, myTeamStatus, quitTeam } = props

  useEffect(() => {
    if (user) {
      getMyTeamStatus()
    }
  }, [user])

  console.log(myTeamStatus)

  useEffect(() => {
    backgroundCardHeight()
  })

  useEffect(() => {
    let editLinks = document.querySelectorAll(
      '.settings-table-row-column-03 .settings-table-link'
    )

    editLinks.forEach((e: any) => {
      e.addEventListener('click', function () {
        console.log('clicked')
        //@ts-ignore
        e.parentElement.parentElement.classList.toggle('edit')
      })
    })

    window.addEventListener('resize', function () {
      //console.log(tableWrapperBodyCustomTable.clientHeight);
      backgroundCardHeight()
    })
  }, [])

  const [selectedImage, selectImage] = useState<any>(null)
  useEffect(() => {
    if (selectedImage) {
      document.getElementById('imageUploadModal')?.classList.add('open')
    }
  }, [selectedImage])

  const [ sortedTeams, setSortedTeam ] = useState<MyTeamsStatus[]>([])
  useEffect(() => {
    if (myTeamStatus) {
      setSortedTeam(myTeamStatus)
    }
  },[myTeamStatus])
  const [ sort, setSort ] = useState<1 | -1>(1)
  const sortTeam = () => {
    if (myTeamStatus) {
      setSortedTeam(myTeamStatus.sort((a,b) => {
        if (a.name < b.name) {
          return sort
        }
        if (a.name > b.name) {
          return -sort
        }
        return 0
      }))
      setSort(sort === 1 ? -1: 1)
    }
    
  }
  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="content-card">
          <div className="fake-card fake-card-team-settings-viewing-rights"></div>
          <div className="content-card-header" style={{ borderBottom: '0' }}>
            <div className="content-card-header-bottom">
              <div className="content-card-header-caption">
                <p className="content-card-header-caption-title">
                  {t('common:Myteams')}
                </p>
                <p className="content-card-header-caption-text">
                  {t('userSettingsTeamsPage:pageHeaderSubtitle')}.
                </p>
              </div>
            </div>
          </div>
          <div className="content-card-main">
            <div className="custom-table-wrapper">
              <div className="custom-table-wrapper-head">
                <table className="custom-table head">
                  <thead className="custom-table-head">
                    <tr className="custom-table-row">
                      <th className="column-01 active" onClick={() => sortTeam()}>
                        <p>{t('common:Teamname')}</p>
                        <i className={`icon-caret-${sort ===1 ? 'up' : 'down'}`}></i>
                      </th>
                      <th className="column-02">
                        <p>{t('common:Yourstatusintheteam')}</p>
                        {/* <i className="icon-caret-down"></i> */}
                      </th>
                      <th className="column-03">
                        <p>{t('common:Status')}</p>
                        {/* <i className="icon-caret-down"></i> */}
                      </th>
                      <th className="column-04">
                        <p>{t('common:Status')}</p>
                        {/* <i className="icon-caret-down"></i> */}
                      </th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="custom-table-wrapper-body">
                <table className="custom-table with-border">
                  <tbody className="custom-table-body">
                    {myTeamStatus?.map((team) => (
                      <TeamRow
                        key={team._id}
                        team={team}
                        onQuit={() => quitTeam(team._id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageUpload image={selectedImage} />
    </div>
  )
}

export default connector(UserSettings)
