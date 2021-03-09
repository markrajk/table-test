import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

interface MSG {
  text: string
  type: 'success' | 'error'
}
const Msg = ({ text, type }: MSG) => (
  <div
    className={
      type === 'success' ? 'custom-toast success' : 'custom-toast danger'
    }
  >
    {type === 'success' ? (
      <svg
        className="custom-toast-icon"
        xmlns="http://www.w3.org/2000/svg"
        width="27.6"
        height="27.6"
        viewBox="0 0 27.6 27.6"
      >
        <g transform="translate(-251 -716)">
          <circle
            cx="13.8"
            cy="13.8"
            r="13.8"
            transform="translate(251 716)"
            fill="#3cb582"
          />
          <path
            d="M107.978,818.083l-6.057,6.236-3.527-3.648"
            transform="translate(161.43 -90.928)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="2"
          />
        </g>
      </svg>
    ) : (
      <svg
        className="custom-toast-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 27.5 27.5"
      >
        <path
          d="M17.125,3.375a13.75,13.75,0,1,0,13.75,13.75A13.748,13.748,0,0,0,17.125,3.375Zm1.137,7.245-.2,7.609a.946.946,0,0,1-.932.978h0a.946.946,0,0,1-.932-.978l-.2-7.609a1.139,1.139,0,0,1,1.137-1.163h0A1.139,1.139,0,0,1,18.262,10.62ZM17.125,23.6a1.217,1.217,0,1,1,1.263-1.216A1.228,1.228,0,0,1,17.125,23.6Z"
          transform="translate(-3.375 -3.375)"
          fill="#e62828"
        />
      </svg>
    )}
    <p className="custom-toast-message">{text}</p>
    <svg
      className="custom-toast-close"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 12.647 12.644"
    >
      <path
        d="M19.107,17.61l4.517-4.517a1.058,1.058,0,0,0-1.5-1.5L17.61,16.114,13.093,11.6a1.058,1.058,0,1,0-1.5,1.5l4.517,4.517L11.6,22.127a1.058,1.058,0,0,0,1.5,1.5l4.517-4.517,4.517,4.517a1.058,1.058,0,0,0,1.5-1.5Z"
        transform="translate(-11.285 -11.289)"
        fill="#a1a7b1"
      />
    </svg>
  </div>
)

interface Props {
  text: string
  type: 'success' | 'error'
  instance: boolean
  clear(): void
}
const Toaster = (props: Props) => {
  const { text, type, instance, clear } = props


  useEffect(() => {
    if (instance) {
      toast[type](<Msg type={type} text={text} />, {})
      if (clear) {
        clear()
      }
    }
  }, [instance])
  return null
}

export default Toaster
