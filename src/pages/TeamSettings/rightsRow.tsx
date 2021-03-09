import { capitalize } from 'src/utitlity'
import React, { useEffect } from 'react'
import { Invite, PendingRequest, User } from 'src/apiTypes'
import { backgroundCardHeight } from 'src/tables'

interface Props {
  data: PendingRequest
  onDelete(): void
}

const RightsRow = (props: Props) => {
  const { data, onDelete } = props
  useEffect(() => {
    //backgroundCardHeight()
  }, [])
  return (
    <tr className="custom-table-row">
      <td className="column-01">
        <p>{data.requester.firstname + ' ' + data.requester.lastname}</p>
      </td>
      <td className="column-02">
        <p>johan.sebastian@gmail.com</p>
      </td>
      <td className="column-03">
        <input className="td-input" type="text" placeholder="Add job title" />
      </td>
      <td className="column-04 choose">
        <p className="options">
          <button className="options-link confirm">Confirm</button>
          <span className="options-divider">I</span>
          <button className="options-link deny">Deny</button>
        </p>
      </td>
      <td className="column-05">
        <div className="custom-dropdown half-line">
          <button
            className="custom-dropdown-trigger"
            tab-index="-1"
            onClick={(e) => e.currentTarget.focus()}
          >
            <i className="icon-ellipsis"></i>
          </button>

          <div className="custom-dropdown-menu">
            <div className="custom-dropdown-menu-item">
              <button className="custom-dropdown-menu-item-link">
                Open profile
              </button>
            </div>
            <div className="custom-dropdown-menu-item delete">
              <button className="custom-dropdown-menu-item-link">
                Withdraw rights
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default RightsRow
