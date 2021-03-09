import React, { useEffect, useState, useRef } from 'react'
import { Team } from 'src/apiTypes'
import { useHistory } from 'react-router-dom'
import { filter } from 'lodash'
import { useTranslation } from 'react-i18next'

interface Props {
  selectedTeam: Team | null
  teams: Team[]
  onQuit(teamId: string): void
  companyId?: string
}

const HeaderDropdown: React.FC<Props> = (props) => {
  const [open, setOpen] = useState(false)
  const drowdownEl = useRef(null)
  const { selectedTeam, teams, onQuit, companyId } = props
  useOnClickOutside(drowdownEl, () => setOpen(false))
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([])
  const { t } = useTranslation('common')

  useEffect(() => {
    setFilteredTeams(teams)
  }, [teams])
  function handleToggle() {
    setOpen(!open)
  }

  const filterTeams = (keywords: string) => {
    const newTeams = teams.filter((item) =>
      item.name.toLowerCase().includes(keywords.toLowerCase())
    )
    setFilteredTeams(newTeams)
  }
  const [keyword, setKeyword] = useState('')
  const { push } = useHistory()
  return (
    <div className={`header-dropdown ${open && 'open'}`} ref={drowdownEl} onClick={() => {
      setKeyword('')
    }}>
      <button className="header-dropdown-trigger" onClick={handleToggle}>
        <h1>{selectedTeam?.name}</h1>
        <i className="icon-chevron-down"></i>
      </button>
      <div className="header-dropdown-menu">
        <div className="header-dropdown-menu-header">
          <div className="input-container">
            <input
              type="text"
              placeholder={`${t('common:Searchforateam')}`}
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value)
                filterTeams(e.target.value)
              }}
            />
            <i className="icon-search"></i>
          </div>
        </div>
        <div className="header-dropdown-menu-main">
          {filteredTeams.map((team) => (
            <div
              key={team._id}
              onClick={() => {
                setOpen(false)
                push(`/team/${team._id}/data/teamFeedback`)
              }}
              className={`header-dropdown-menu-main-item ${String(team._id) === String(selectedTeam?._id) ? 'active' : ''
                }`}
            >
              <p className="header-dropdown-menu-main-item-text"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >{team.name}</p>
              {/* <span>({t('common:selected')})</span> */}
              <div
                className="header-dropdown-menu-main-item-close"
                onClick={() => onQuit(team._id)}
              >
                <i className="icon-close"></i>
              </div>
            </div>
          ))}
        </div>
        <div className="header-dropdown-menu-footer">
          <button
            className="button button-light-gradient"
            onClick={() =>
              document
                .getElementById('createNewTeamModal')
                ?.classList.toggle('open')
            }
          >
            {t('common:Createanewteam')}
          </button>
          {companyId && <button
            className="button button-light-gradient"
            onClick={() =>
              push('/company/overview')
            }
          >
            Company admin area
          </button>}
        </div>
      </div>
    </div>
  )
}

// Hook
function useOnClickOutside(ref: any, handler: any) {
  useEffect(
    () => {
      //@ts-ignore
      const listener = (event) => {
        // Do nothing if clicking ref's element or descendent elements
        if (!ref.current || ref.current.contains(event.target)) {
          return
        }

        handler(event)
      }

      document.addEventListener('mousedown', listener)
      document.addEventListener('touchstart', listener)

      return () => {
        document.removeEventListener('mousedown', listener)
        document.removeEventListener('touchstart', listener)
      }
    },
    // Add ref and handler to effect dependencies
    // It's worth noting that because passed in handler is a new ...
    // ... function on every render that will cause this effect ...
    // ... callback/cleanup to run every render. It's not a big deal ...
    // ... but to optimize you can wrap handler in useCallback before ...
    // ... passing it into this hook.
    [ref, handler]
  )
}

export default HeaderDropdown
