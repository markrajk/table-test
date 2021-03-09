import React, { useState } from 'react'
import Header from 'src/components/header'

import ImageUpload from 'src/components/modals/imageUpload'
import ChangePassword from 'src/components/modals/changePassword'
import { AppDispatch, RootState } from 'src/configureStore'
import { connect, ConnectedProps } from 'react-redux'
import { useEffect } from 'react'
import { UpdateProfileVariables, UpdateTeamProfileVariable } from 'src/apiTypes'
import { IMAGE_API_ROOT } from 'src/request'
import { updateProfile } from 'src/redux/auth/actions'

import i18n from 'src/i18n'
import { changeLanguage } from 'src/utitlity'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  selectedTeam: state.teamReducer.selectedTeam,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  updateProfile: (data: UpdateProfileVariables) =>
    dispatch(updateProfile(data)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const UserSettings = (props: Props) => {
  const { t } = useTranslation(['userSettingsGeneralPage', 'common'])
  const { selectedTeam, updateProfile, user } = props

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [jobtitle, setJobtitle] = useState('')
  const [selectedLang, setLang] = useState(i18n.language)

  useEffect(() => {
    if (user) {
      setFirstname(user.firstname)
      setLastname(user.lastname)
      setJobtitle(user.jobtitle)
    }
  }, [user])

  useEffect(() => {
    let editLinks = document.querySelectorAll(
      '.settings-table-row-column-03 .settings-table-link'
    )

    editLinks.forEach((e: any) => {
      e.addEventListener('click', function () {
        console.log('clicked')
        e.parentElement?.parentElement?.classList.toggle('edit')
      })
    })
  }, [])

  const [selectedImage, selectImage] = useState<any>(null)
  useEffect(() => {
    if (selectedImage) {
      document.getElementById('imageUploadModal')?.classList.add('open')
    }
  }, [selectedImage])
  return (
    <div className="content-wrapper">
      <div className="content">
        <div className="content-card">
          <div className="content-card-header">
            <div className="content-card-header-caption">
              <p className="content-card-header-caption-title">
                {t('common:Generalsettings')}
              </p>
              <p className="content-card-header-caption-text">
                {t('userSettingsGeneralPage:pageHeaderSubtitle')}{' '}
                {t('common:Click')} <button>{t('common:here')}</button>
              </p>
            </div>
          </div>
          <div className="content-card-main">
            <div className="settings-table">
              <div className="settings-table-row row-01 editable">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">{t('common:Name')}</p>
                </div>

                <div className="settings-table-row-column-02 edit">
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={firstname}
                    placeholder={`${t('common:Firstname')}...`}
                    onChange={(e) =>
                      updateProfile({
                        firstname: e.target.value,
                      })
                    }
                    className="settings-input"
                  />
                </div>

                <div className="settings-table-row-column-02 edit">
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={lastname}
                    onChange={(e) =>
                      updateProfile({
                        lastname: e.target.value,
                      })
                    }
                    placeholder={`${t('common:Lastname')}...`}
                    className="settings-input"
                  />
                </div>

                <div className="settings-table-row-column-03 edit">
                  <button className="settings-table-link">
                    {t('common:Confirm')}
                  </button>
                </div>

                <div className="settings-table-row-column-02">
                  <p className="settings-table-text">
                    {user?.firstname + ' ' + user?.lastname}
                  </p>
                </div>

                <div className="settings-table-row-column-03">
                  <button className="settings-table-link">
                    {t('common:Edit')}
                  </button>
                </div>
              </div>

              <div className="settings-table-row row-02 editable">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">{t('common:Jobtitle')}</p>
                </div>

                <div className="settings-table-row-column-02 edit">
                  <input
                    type="text"
                    name="title"
                    defaultValue={jobtitle}
                    onChange={(e) =>
                      updateProfile({
                        jobtitle: e.target.value,
                      })
                    }
                    placeholder={`${t('common:Enterjobtitle')}...`}
                    className="settings-input"
                  />
                </div>

                <div className="settings-table-row-column-03 edit">
                  <button className="settings-table-link">
                    {t('common:Confirm')}
                  </button>
                </div>

                <div className="settings-table-row-column-02">
                  <p
                    className={`settings-table-text ${
                      jobtitle ? '' : 'disabled'
                    }`}
                  >
                    {jobtitle || t('common:Jobtitlemissing')}
                  </p>
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
                    {t('common:Enterjobtitle')}
                  </p>
                </div>

                <div className="settings-table-row-column-02 edit">
                  <input
                    type="password"
                    name="password"
                    placeholder={`${t('common:Password')}`}
                    className="settings-input"
                  />
                </div>

                <div className="settings-table-row-column-03 edit">
                  <button className="settings-table-link">
                    {t('common:Confirm')}
                  </button>
                </div>

                <div className="settings-table-row-column-02">
                  <p className="settings-table-text">*********</p>
                </div>

                <div
                  className="settings-table-row-column-03"
                  onClick={() =>
                    document
                      .getElementById('changePasswordModal')
                      ?.classList.add('open')
                  }
                >
                  <button className="settings-table-link">
                    {t('common:Edit')}
                  </button>
                </div>
              </div>

              <div className="settings-table-row row-03">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">
                    {t('common:Profilepicture')}
                  </p>
                </div>

                <div className="settings-table-row-column-02">
                  {user?.profilePic ? (
                    <img
                      src={IMAGE_API_ROOT + user.profilePic}
                      alt="User's profile image"
                      className="settings-table-img"
                    />
                  ) : (
                    <div className="settings-table-initials">
                      {(!!user && user?.firstname[0]) + '' + user?.lastname[0]}
                    </div>
                  )}
                </div>

                <div className="settings-table-row-column-03">
                  <p
                    className="settings-table-link modal-trigger"
                    target-modal="imageUploadModal"
                    onClick={() =>
                      document.getElementById('uploadImage')?.click()
                    }
                  >
                    {t('common:Upload')}
                  </p>
                  <input
                    type="file"
                    name="uploadImage"
                    id="uploadImage"
                    hidden
                    onChange={(e) => {
                      if (selectedTeam && e.target.files && e.target.files[0]) {
                        selectImage(e.target.files[0])
                        updateProfile({
                          image: e.target.files[0],
                        })
                      }
                    }}
                  />
                </div>
              </div>

              <div className="settings-table-row row-06">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">
                    {t('userSettingsGeneralPage:Accountlinktocompany')}
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

              <div className="settings-table-row row-05">
                <div className="settings-table-row-column-01">
                  <p className="settings-table-text">
                    {t('userSettingsGeneralPage:Dashboardlanguage')}
                  </p>
                </div>

                <div className="settings-table-row-column-03">
                  <div className="custom-dropdown">
                    <div className="custom-dropdown-trigger" tabIndex={-1}>
                      <p className="value">{selectedLang}</p>
                      <i className="icon-caret-down"></i>
                    </div>
                    <div className="custom-dropdown-menu">
                      <div
                        className="custom-dropdown-menu-item"
                        onClick={() => {
                          setLang('English')
                          changeLanguage('en')
                        }}
                      >
                        <button>{t('common:English')}</button>
                      </div>
                      <div
                        className="custom-dropdown-menu-item"
                        onClick={() => {
                          setLang('Finnish')
                          changeLanguage('fi')
                        }}
                      >
                        <button>{t('common:Finnish')}</button>
                      </div>
                      <div
                        className="custom-dropdown-menu-item"
                        onClick={() => {
                          setLang('German')
                          changeLanguage('de')
                        }}
                      >
                        <button>{t('common:German')}</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImageUpload image={selectedImage} />
      <ChangePassword />
    </div>
  )
}

export default connector(UserSettings)
