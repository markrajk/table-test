import React from 'react'
import { useEffect } from 'react'
import { User } from 'src/apiTypes'
import { backgroundCardHeight } from 'src/tables'
import { useTranslation } from 'react-i18next'

interface Props {
  data: User
  onDelete?(): void
  onJobtitleChange?(text: string): void
  show?: ['delete' | 'feedback' | 'team']
  isAdmin?: boolean
  onGiveFeed?(): void
  onSelect?(): void
}

const TeamMemberRow = (props: Props) => {
  const { t } = useTranslation(['teamSettingsMembersPage', 'common'])
  const {
    data,
    onDelete,
    onJobtitleChange,
    show,
    isAdmin,
    onGiveFeed,
    onSelect,
  } = props
  useEffect(() => {
   // backgroundCardHeight()
  }, [])

  return (
    <>
      <td
        className="column-01"
        onClick={() => {
          if (onSelect) {
            onSelect()
            document.getElementById('usersModal')?.classList.toggle('open')
          }
        }}
      >
        <p>{data.firstname + ' ' + data.lastname}</p>
      </td>
      <td className="column-02">
        <p>{data.email}</p>
      </td>
      <td className="column-03">
        <input
          className="td-input"
          type="text"
          placeholder={data.jobtitle || t('common:Addjobtitle')}
          defaultValue={data.jobtitle}
          onChange={(e) => {
            if (onJobtitleChange) {
              onJobtitleChange(e.target.value)
            }
          }}
        />
      </td>
      <td className="column-04 active">
        <p>{t('common:Active')}</p>
      </td>
      <td className="column-05">
        <div className="custom-dropdown half-line">
          <button
            className="custom-dropdown-trigger"
            tabIndex={-1}
            onClick={(e) => e.currentTarget.focus()}
          >
            <i className="icon-ellipsis"></i>
          </button>
          {!show ? (
            <div className="custom-dropdown-menu">
              <div className="custom-dropdown-menu-item">
                <button
                  className="custom-dropdown-menu-item-link"
                  onClick={() =>
                    document
                      .getElementById('modalCard')
                      ?.classList.toggle('open')
                  }
                >
                  {t('common:Openprofile')}
                </button>
              </div>
              {isAdmin && (
                <>
                  <div className="custom-dropdown-menu-item">
                    <button
                      className="custom-dropdown-menu-item-link"
                      onClick={() => {
                        if (onGiveFeed) {
                          onGiveFeed()
                        }

                        document
                          .getElementById('peerToPeerFeedbackModal')
                          ?.classList.add('open')
                      }}
                    >
                      {t('common:Givefeedback')}
                    </button>
                  </div>
                  <div className="custom-dropdown-menu-item">
                    <button
                      className="custom-dropdown-menu-item-link"
                      onClick={onDelete}
                    >
                      {t('common:Deletefromteam')}
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
              <div className="custom-dropdown-menu">
                {show.includes('team') && (
                  <div className="custom-dropdown-menu-item">
                    <button className="custom-dropdown-menu-item-link">
                      {t('common:Openteam')}

                    </button>
                  </div>
                )}
                {show.includes('feedback') && (
                  <div className="custom-dropdown-menu-item">
                    <button className="custom-dropdown-menu-item-link">
                      {t('common:Givefeedback')}

                    </button>
                  </div>
                )}
                {show.includes('delete') && (
                  <div className="custom-dropdown-menu-item">
                    <button
                      className="custom-dropdown-menu-item-link"
                      onClick={onDelete}
                    >
                      {t('common:Deletefromteam')}

                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </td>
    </>
  )
}

export default TeamMemberRow
