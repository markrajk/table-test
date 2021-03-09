import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { InviteEmployeesVariables } from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import { inviteEmployees } from 'src/redux/company/actions'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  company: state.companyReducer.company,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  inviteEmployees: (data: InviteEmployeesVariables) =>
    dispatch(inviteEmployees(data)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {
  type?: 'admin' | 'employee'
}

const InviteEmployees = (props: Props) => {
  const { t } = useTranslation(['iviteEmployeesModals', 'common'])
  const { company, inviteEmployees, type } = props
  const [emails, setEmails] = useState('')
  const formatEmails = () => {
    const removedSpace = emails.replace(' ', '')
    const splitCommas = removedSpace.split(',')
    return splitCommas
  }
  let formattedEmails = formatEmails()
  const countEmail = () => {
    let count = 0
    formattedEmails.forEach((item) => {
      if (item.includes('@')) {
        count++
      }
    })
    return count
  }

  const totalEmails = countEmail()
  return (
    <div className="custom-modal-wrapper" id="inviteEmployeesModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="inviteEmployeesModal"
            onClick={() =>
              document
                .getElementById('inviteEmployeesModal')
                ?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-body-title">
            {t('common:Invitenewemployees')}
          </p>
          <p className="custom-modal-body-label">
            <span className="custom-modal-body-label-text">
              {t('iviteEmployeesModals:Enterheretheemailsofpeople')}
            </span>
            <span className="custom-modal-body-label-amount">
              {totalEmails} {t('common:added')}
            </span>
          </p>
          <textarea
            className="custom-modal-body-textarea"
            placeholder="Enter emails"
            onChange={(e) => setEmails(e.target.value)}
          ></textarea>
        </div>

        <div className="custom-modal-footer">
          <button
            className="button button-light-gray"
            close-modal="inviteEmployeesModal"
          >
            {t('common:Cancel')}
          </button>
          <button
            className="button button-primary send-feedback-modal"
            onClick={() => {
              if (company) {
                inviteEmployees({
                  emails: formattedEmails,
                  type: type ? type : 'employees',
                })
                document
                  .getElementById('inviteEmployeesModal')
                  ?.classList.remove('open')
              }
            }}
          >
            {t('common:Sendinvites')}
          </button>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}
export default connector(InviteEmployees)
