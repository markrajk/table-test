import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { CreateCompanyVariables } from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import { clearCreatedCompany, createCompany } from 'src/redux/company/actions'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  sessionRestored: state.authReducer.sessionRestored,
  companyCreated: state.companyReducer.companyCreated,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  createCompany: (data: CreateCompanyVariables) =>
    dispatch(createCompany(data)),
  clearCreatedCompany: () => dispatch(clearCreatedCompany()),
})
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const CreateCompany = (props: Props) => {
  const { t } = useTranslation(['createCompanyModal', 'common'])
  const { createCompany, companyCreated, clearCreatedCompany } = props
  const { push } = useHistory()
  const [name, setName] = useState('')
  const [image, selectImage] = useState<any>(null)
  useEffect(() => {
    if (companyCreated) {
      push('/company/overview')
      clearCreatedCompany()
      document.getElementById('regCoStep02')?.classList.remove('open')
    }
  }, [companyCreated])
  return (
    <div className="custom-modal-wrapper" id="regCoStep02">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="regCoStep02"
            onClick={() =>
              document.getElementById('regCoStep02')?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>

          <p className="custom-modal-body-title">
            {t('createCompanyModal:Registeranewcompany')}
          </p>
          <p className="custom-modal-body-text">
            {t('createCompanyModal:modalSubtitle')}.
          </p>

          {!image ? (
            <label
              htmlFor="uploadCompanyImg"
              className="custom-modal-body-img-label"
              style={
                image
                  ? {
                      backgroundImage: `url(${URL.createObjectURL(image)})`,
                    }
                  : {}
              }
            ></label>
          ) : (
            <img
              className="custom-modal-body-img"
              src={URL.createObjectURL(image)}
              alt="company image"
            />
          )}
          <input
            type="file"
            id="uploadCompanyImg"
            className="custom-modal-body-img-input"
            hidden
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                selectImage(e.target.files[0])
              }
            }}
          />

          {/*!!image && <img src={URL.createObjectURL(image)} alt='company image'/>*/}

          <p className="custom-modal-body-label">{t('common:Companyname')}</p>
          <input
            className="custom-modal-body-input"
            type="text"
            placeholder="Enter company name"
            onChange={(e) => setName(e.target.value)}
          />

          <button
            className="button button-primary modal-trigger"
            target-modal="regCoStep03"
            onClick={() =>
              createCompany({
                name,
                profilePic: image,
              })
            }
          >
            {t('common:Continue')}
          </button>
          <button className="custom-modal-body-link">
            {t('createCompanyModal:Wanttojoinregisteredcompany')}{' '}
            <span>
              {' '}
              {t('common:Click')} {t('common:here')}
            </span>
          </button>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}

export default connector(CreateCompany)
