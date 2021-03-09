import React, { useState } from 'react'
import Header from 'src/components/header'
import HeaderTeamSubNav from 'src/components/header/teamSubNavNew'
import ImageUpload from 'src/components/modals/imageUpload'
import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { useEffect } from 'react'
import { updateTeamProfile } from 'src/redux/teams/actions'
import { UpdateTeamProfileVariable } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'
import { select } from 'redux-saga/effects'
import Toaster from 'src/components/common/toaster'
import { clearTeamToaster } from 'src/redux/teams/actions'
import { capitalize } from 'src/utitlity'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
  toaster: state.teamReducer.toaster,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateTeamProfile: (data: UpdateTeamProfileVariable) =>
    dispatch(updateTeamProfile(data)),
  clearToast: () => dispatch(clearTeamToaster()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  getTeamId(teamId: string): void
}
interface ParamTypes {
  teamId?: string
}
const GeneralSettings = (props: Props) => {
  const { t } = useTranslation(['teamSettingsGeneralPage', 'common'])
  const {
    selectedTeam,
    updateTeamProfile,
    toaster,
    clearToast,
    getTeamId,
  } = props

  const [teamName, setTeamName] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (selectedTeam) {
      setTeamName(capitalize(selectedTeam.name))
      setDescription(capitalize(selectedTeam.description))
    }
  }, [selectedTeam])

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
  }, [])

  const [selectedImage, selectImage] = useState<any>(null)
  useEffect(() => {
    if (selectedImage) {
      document.getElementById('imageUploadModal')?.classList.add('open')
    }
  }, [selectedImage])
  const returnFreq = (fre?: number) => {
    if (fre === 1) {
      return t('common:Everyweek')
    }
    if (fre === 2) {
      return t('common:Every2ndweek')
    }
    if (fre === 3) {
      return t('common:Every3rdweek')
    }
    if (fre === 4) {
      return t('common:Monthly')
    }
    return t('common:Every2ndweek')
  }

  const freq = returnFreq(selectedTeam?.frequency)
  const tlFreq = returnFreq(selectedTeam?.tlFrequency)
  const params = useParams<ParamTypes>()

  useEffect(() => {
    if (params.teamId) {
      getTeamId(params.teamId)
    }
  }, [params])

  return (
    <div
      className="content-wrapper"
      onClick={() =>
        document.getElementById('mainDrawer')?.classList.remove('open')
      }
    >
      <div className="content">
        <div className="content-card">
          <div className="content-card-header">
            <div className="content-card-header-caption">
              <p className="content-card-header-caption-title">
                {t('teamSettingsGeneralPage:Generalsettings')}
              </p>
              <p className="content-card-header-caption-text">
                {t('teamSettingsGeneralPage:pageHeaderSubtitle')}
              </p>
            </div>
          </div>
          <div className="content-card-main">
            <div className="settings-table">
              <div className="settings-table-row row-01 editable">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">{t('common:Teamname')}</p>
                </div>

                <div className="settings-table-row-column-02 edit">
                  <input
                    type="text"
                    name="teamName"
                    value={teamName}
                    id="teamname"
                    placeholder={`${t('common:Teamname')}...`}
                    className="settings-input"
                    onChange={(e) => {
                      if (selectedTeam) {
                        setTeamName(e.target.value)
                        updateTeamProfile({
                          name: e.target.value,
                          teamId: selectedTeam._id,
                        })
                      }
                    }}
                  />
                </div>

                <div className="settings-table-row-column-03 edit">
                  <button className="settings-table-link">
                    {t('common:Confirm')}
                  </button>
                </div>

                <div className="settings-table-row-column-02">
                  <p className="settings-table-text">{teamName}</p>
                </div>

                <div className="settings-table-row-column-03">
                  <button className="settings-table-link">
                    {t('common:Edit')}
                  </button>
                </div>
              </div>

              <div className="settings-table-row row-02 editable">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">
                    {t('common:Teamdescription')}
                  </p>
                </div>

                <div className="settings-table-row-column-02 edit">
                  <input
                    type="text"
                    name="teamDescription"
                    id="teamDescription"
                    defaultValue={selectedTeam?.description}
                    placeholder={`${t('common:Teamdescription')}...`}
                    className="settings-input desc "
                    onChange={(e) => {
                      if (selectedTeam) {
                        updateTeamProfile({
                          description: e.target.value,
                          teamId: selectedTeam._id,
                        })
                      }
                    }}
                  />
                </div>

                <div className="settings-table-row-column-03 edit">
                  <button className="settings-table-link">
                    {t('common:Confirm')}
                  </button>
                </div>

                <div className="settings-table-row-column-02">
                  <p className="settings-table-text">
                    {selectedTeam?.description ||
                      t('teamSettingsGeneralPage:Teamdescriptionmissing')}
                  </p>
                </div>

                <div className="settings-table-row-column-03">
                  <button className="settings-table-link">
                    {t('common:Edit')}
                  </button>
                </div>
              </div>

              <div className="settings-table-row row-03">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">{t('common:Teamimage')}</p>
                </div>

                <div className="settings-table-row-column-02">
                  <div className="settings-table-icon">
                    {selectedTeam?.profilePic ? (
                      <img
                        src={IMAGE_API_ROOT + selectedTeam.profilePic}
                        className="settings-table-img"
                      />
                    ) : (
                        <i className="icon-users-circle"></i>
                      )}
                  </div>
                </div>

                <div className="settings-table-row-column-03">
                  <label
                    className="settings-table-link additional-info-img"
                    htmlFor="uploadImage"
                  >
                    {t('common:Upload')}
                  </label>
                  <input
                    type="file"
                    name="uploadImage"
                    id="uploadImage"
                    hidden
                    onChange={(e) => {
                      if (selectedTeam && e.target.files && e.target.files[0]) {
                        selectImage(e.target.files[0])
                        updateTeamProfile({
                          teamId: selectedTeam._id,
                          image: e.target.files[0],
                        })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="settings-table-row row-04">
                <div className="settings-table-row-column-01">
                  <div className="settings-table-info">
                    <p className="settings-table-info-title">
                      {t('teamSettingsGeneralPage:Feedbacktarget')}
                    </p>
                    <p className="settings-table-info-subtitle">
                      {t('teamSettingsGeneralPage:selectHowOften')}
                    </p>
                  </div>
                </div>

                <div className="settings-table-row-column-03">
                  <div className="custom-dropdown">
                    <div
                      className="custom-dropdown-trigger"
                      tabIndex={-1}
                      onClick={(e) => e.currentTarget.focus()}
                    >
                      <p className="value">{selectedTeam?.feedbackTarget + ' per month'}</p>
                      <i className="icon-caret-down"></i>
                    </div>
                    <div className="custom-dropdown-menu">
                      <div className="custom-dropdown-menu-item" onClick={() => {
                        if (selectedTeam) {
                          updateTeamProfile({
                            feedbackTarget: 6,
                            teamId: selectedTeam._id,
                          })
                        }
                      }}>
                        <button

                        >
                          {t('common:SixPermonth')}
                        </button>
                      </div>
                      <div className="custom-dropdown-menu-item" onClick={() => {
                        if (selectedTeam) {
                          updateTeamProfile({
                            feedbackTarget: 8,
                            teamId: selectedTeam._id,
                          })
                        }
                      }}>
                        <button

                        >
                          {t('common:EightPermonth')}
                        </button>
                      </div>
                      <div className="custom-dropdown-menu-item" onClick={() => {
                        if (selectedTeam) {
                          updateTeamProfile({
                            feedbackTarget: 10,
                            teamId: selectedTeam._id,
                          })
                        }
                      }}>
                        <button
                        >
                          {t('common:TenPermonth')}
                        </button>
                      </div>
                      <div className="custom-dropdown-menu-item" onClick={() => {
                        if (selectedTeam) {
                          updateTeamProfile({
                            feedbackTarget: 40,
                            teamId: selectedTeam._id,
                          })
                        }
                      }}>
                        <button

                        >
                          {t('common:TwelwePermonth')}
                        </button>
                      </div>
                      <div className="custom-dropdown-menu-item" onClick={() => {
                        if (selectedTeam) {
                          updateTeamProfile({
                            feedbackTarget: 16,
                            teamId: selectedTeam._id,
                          })
                        }
                      }}>
                        <button

                        >
                          {t('common:SixteenPermonth')}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="settings-table-row row-05">
                  <div className="settings-table-row-column-01">
                    <div className="settings-table-info">
                      <p className="settings-table-info-title">
                        {t("teamSettingsGeneralPage:Teamleaderfeedbackfrequency")}
                      </p>
                      <p className="settings-table-info-subtitle">
                      {t("teamSettingsGeneralPage:selectHowOftenLead")}
                      </p>
                    </div>
                  </div>
                  <div className="settings-table-row-column-03">
                    <div className="custom-dropdown">
                      <div
                        className="custom-dropdown-trigger"
                        tabIndex={-1}
                        onClick={(e) => e.currentTarget.focus()}
                      >
                        <p className="value">{tlFreq}</p>
                        <i className="icon-caret-down"></i>
                      </div>
                      <div className="custom-dropdown-menu">
                        <div className="custom-dropdown-menu-item">
                          <button onClick={() => {
                            if (selectedTeam) {
                              updateTeamProfile({
                                tlFrequency: 1,
                                teamId: selectedTeam._id
                              })
                            }
                          }  }>{t("common:Onceamonth")}</button>
                        </div>
                        <div className="custom-dropdown-menu-item">
                        <button onClick={() => {
                            if (selectedTeam) {
                              updateTeamProfile({
                                tlFrequency: 2,
                                teamId: selectedTeam._id
                              })
                            }
                          }  }>{t("common:Every2ndweek")}</button>
                        </div>
                        <div className="custom-dropdown-menu-item">
                        <button onClick={() => {
                            if (selectedTeam) {
                              updateTeamProfile({
                                tlFrequency: 3,
                                teamId: selectedTeam._id
                              })
                            }
                          }  }>{t("common:Every3rdweek")}</button>
                        </div>
                        <div className="custom-dropdown-menu-item">
                        <button onClick={() => {
                            if (selectedTeam) {
                              updateTeamProfile({
                                tlFrequency: 4,
                                teamId: selectedTeam._id
                              })
                            }
                          }  }>{t("common:Monthly")}</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div> */}

              <div className="settings-table-row row-06">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">
                    {t('common:Linkteamtoacompany')}
                  </p>
                </div>

                <div className="settings-table-row-column-02">
                  <p className="settings-table-text">
                    {t('common:Notlinkedyet')}
                  </p>
                </div>

                <div className="settings-table-row-column-03">
                  <button className="settings-table-link">
                    {t('common:Link')}
                  </button>
                </div>
              </div>

              {/* <div className="settings-table-row row-07">
                  <div className="settings-table-row-column-01">
                    <div className="settings-table-info">
                      <p className="settings-table-info-title">{t("common:teamOwner")}</p>
                      <p className="settings-table-info-subtitle">
                        {t("teamSettingsGeneralPage:Thisteamisownedby")} Nikhil Bhatia
                      </p>
                    </div>
                  </div>
                  <div className="settings-table-row-column-03">
                    <button
                      className="button button-white modal-trigger"
                      target-modal="modal-01"
                    >
                      {t("teamSettingsGeneralPage:Transferownership")}
                    </button>
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
      <ImageUpload image={selectedImage} />
    </div>
  )
}

export default connector(GeneralSettings)