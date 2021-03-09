import React, { useEffect } from 'react'
import { User } from 'src/apiTypes'
import { backgroundCardHeight } from 'src/tables'
import { useTranslation } from 'react-i18next'

interface Props {
  user: User
  onArchive(): void
  onDelete?(): void
  status?: string
  updateJobTitle?(text: string): void
  onView?(): void
  selectUser?(): void
}

const EmployeeRow = (props: Props) => {
  const { t } = useTranslation(['common'])
  const {
    user,
    onArchive,
    status,
    onDelete,
    updateJobTitle,
    onView,
    selectUser,
  } = props
  console.log(onView)

  useEffect(() => {
    backgroundCardHeight()
  }, [])
  return (
    <tr className="custom-table-row">
      <td
        className="column-01"
        onClick={() => {
          if (selectUser) {
            document.getElementById('usersModal')?.classList.toggle('open')
            selectUser()
          }
        }}
      >
        <p>{user?.firstname + ' ' + user?.lastname}</p>
      </td>
      <td className="column-02">
        <p>{user?.email}</p>
      </td>
      <td className="column-03">
        <input
          className="td-input"
          type="text"
          defaultValue={user?.jobtitle}
          placeholder={'Add job title'}
          onChange={(e) => {
            if (updateJobTitle) {
              updateJobTitle(e.target.value)
            }
          }}
        />
      </td>
      <td className="column-04 active">
        <p>{status || t('common:Active')}</p>
      </td>
      <td className="column-05">
        <div className="custom-dropdown half-line">
          <button
            className="custom-dropdown-trigger"
            tab-index="-1"
            onClick={(e) => {
              backgroundCardHeight()
              e.currentTarget.focus()
            }}
          >
            <i className="icon-ellipsis"></i>
          </button>

          <div className="custom-dropdown-menu">
            <div className="custom-dropdown-menu-item">
              <button
                className="custom-dropdown-menu-item-link"
                onClick={() => {
                  if (onView) {
                    onView()
                    document
                      .getElementById('modalCard')
                      ?.classList.toggle('open')
                  }
                }}
              >
                {t('common:Viewprofile')}
              </button>
            </div>
            <div className="custom-dropdown-menu-item delete">
              <button
                className="custom-dropdown-menu-item-link"
                onClick={onArchive}
              >
                {status && status === 'Archived'
                  ? t('common:Restoreemployee')
                  : t('common:Archiveemployee')}
              </button>
            </div>
            {status && status === 'Archived' && (
              <div className="custom-dropdown-menu-item delete">
                <button
                  className="custom-dropdown-menu-item-link"
                  onClick={onDelete}
                >
                  {t('common:Deleteemployee')}
                </button>
              </div>
            )}
          </div>
        </div>
      </td>
    </tr>
  )
}

export default EmployeeRow
