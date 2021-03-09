import React, { useState } from 'react'

interface Props {
  send(message: string, subject: string): void
}

const ContactSupport = (props: Props) => {
  const [topic, setTopic] = useState('General support')
  const [message, setMessage] = useState('')
  const { send } = props
  return (
    <div className="custom-modal-wrapper" id="contactSupportModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div className="custom-modal-close" close-modal="contactSupportModal">
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-body-title">Contact customer service</p>

          <p className="custom-modal-body-label">Select topic</p>
          <div className="custom-dropdown">
            <button className="custom-dropdown-trigger" tabIndex={-1} onClick={(e) => e.currentTarget.focus()} >
              <p className="custom-dropdown-trigger-text">{topic}</p>
              <div className="custom-dropdown-trigger-icon"><i className="icon-chevron-down"></i></div>
            </button>
            <ul className="custom-dropdown-menu">
              <li className="custom-dropdown-menu-item" onClick={() => setTopic('General support')}>
                <p className="custom-dropdown-menu-item-text">General support</p>
              </li>
              <li className="custom-dropdown-menu-item" onClick={() => setTopic('Feature request')}>
                <p className="custom-dropdown-menu-item-text">Feature request</p>
              </li>
              <li className="custom-dropdown-menu-item" onClick={() => setTopic('Bug report')}>
                <p className="custom-dropdown-menu-item-text">Bug report</p>
              </li>
            </ul>
          </div>

          <p className="custom-modal-body-label">Your message</p>
          <textarea className="custom-modal-body-textarea" placeholder="Enter here..." onChange={(e) => setMessage(e.target.value)} ></textarea>

        </div>

        <div className="custom-modal-footer">
          <button className="button button-green-primary" onClick={() => {
            if (message) {
              send(message, topic)
              document.getElementById('contactSupportModal')?.classList.remove('open')
            } else {
              window.alert('no message')
            }
          }} >Send</button>
          <button className="button button-light-gradient" close-modal="contactSupportModal">Cancel</button>

        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}

export default ContactSupport