import React from 'react'
import { Question } from 'src/apiTypes'

interface Props {
  data: Question
  onChange(text: string): void
  value: string
}

const TextInput = (props: Props) => {
  const { data, onChange, value } = props
  return (
    <div className="feedback-item">
      <p className="feedback-item-name">{data.question}</p>
      <input
        value={value}
        className="feedback-item-input"
        type="text"
        placeholder="Write here..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default TextInput
