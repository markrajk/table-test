import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Question, ValueAnswer } from 'src/apiTypes'

interface Props {
  data: Question
  onSelect(value: number): void
  value?: ValueAnswer
}

const StarRating = (props: Props) => {
  const { data, onSelect, value } = props
  //const [ value, setValue ] = useState(0)
  const [animating, animate] = useState(false)


  useEffect(() => {
    if (animating) {
      setTimeout(() => animate(false), 700)
    }
  }, [animating])

  const [tempHover, setTempHover] = useState(0)

  return (
    <div className="rating-item">
      <p className="rating-item-name">{data.question}</p>
      <div className="stars">
        <div
          className={
            'star ' +
            ((value && value.value >= 1) || tempHover >= 1 ? 'selected' : '') +
            (value && value.value >= 1 && animating ? ' animated' : '')
          }
          onClick={() => {
            onSelect(1)
            animate(true)
          }}
          onMouseEnter={() => setTempHover(1)}
          onMouseLeave={() => setTempHover(0)}
        >
          <i className="icon-star"></i>
        </div>
        <div
          className={
            'star ' +
            ((value && value.value >= 2) || tempHover >= 2 ? 'selected' : '') +
            ((value?.value || 0) >= 2 && animating ? ' animated' : '')
          }
          onClick={() => {
            onSelect(2)
            animate(true)
          }}
          onMouseEnter={() => setTempHover(2)}
          onMouseLeave={() => setTempHover(0)}
        >
          <i className="icon-star"></i>
        </div>
        <div
          className={
            'star ' +
            ((value && value.value >= 3) || tempHover >= 3 ? 'selected' : '') +
            ((value?.value || 0) >= 3 && animating ? ' animated' : '')
          }
          onClick={() => {
            onSelect(3)
            animate(true)
          }}
          onMouseEnter={() => setTempHover(3)}
          onMouseLeave={() => setTempHover(0)}
        >
          <i className="icon-star"></i>
        </div>
        <div
          className={
            'star ' +
            ((value && value.value >= 4) || tempHover >= 4 ? 'selected' : '') +
            ((value?.value || 0) >= 4 && animating ? ' animated' : '')
          }
          onClick={() => {
            onSelect(4)
            animate(true)
          }}
          onMouseEnter={() => setTempHover(4)}
          onMouseLeave={() => setTempHover(0)}
        >
          <i className="icon-star"></i>
        </div>
        <div
          className={
            'star ' +
            ((value && value.value >= 5) || tempHover >= 5 ? 'selected' : '') +
            ((value?.value || 0) >= 5 && animating ? ' animated' : '')
          }
          onClick={() => {
            onSelect(5)
            animate(true)
          }}
          onMouseEnter={() => setTempHover(5)}
          onMouseLeave={() => setTempHover(0)}
        >
          <i className="icon-star"></i>
        </div>
      </div>
    </div>
    // <div className="rating-item">
    //   <p className="rating-item-name">{data.question}</p>
    //   <div className="stars">
    //     <input
    //       type="radio"
    //       name={data.questionId}
    //       id={data.questionId + '1'}
    //       onClick={() => {
    //         onSelect(1)
    //         //    setValue(1)
    //       }}
    //       checked={value && value.value >= 1 ? true : false}
    //     />
    //     <label htmlFor={data.questionId + '1'}></label>

    //     <input
    //       type="radio"
    //       name={data.questionId}
    //       id={data.questionId + '2'}
    //       onClick={() => {
    //         onSelect(2)
    //         //    setValue(2)
    //       }}
    //       checked={value && value.value >= 2 ? true : false}
    //     />
    //     <label htmlFor={data.questionId + '2'}></label>

    //     <input
    //       type="radio"
    //       name={data.questionId}
    //       id={data.questionId + '3'}
    //       onClick={() => {
    //         onSelect(3)
    //       }}
    //       checked={value && value.value >= 3 ? true : false}
    //     />
    //     <label htmlFor={data.questionId + '3'}></label>

    //     <input
    //       type="radio"
    //       name={data.questionId}
    //       id={data.questionId + '4'}
    //       onClick={() => {
    //         onSelect(4)
    //         //  setValue(4)
    //       }}
    //       checked={value && value.value >= 4 ? true : false}
    //     />
    //     <label htmlFor={data.questionId + '4'}></label>

    //     <input
    //       type="radio"
    //       name={data.questionId}
    //       id={data.questionId + '5'}
    //       onClick={() => {
    //         onSelect(5)
    //         //  setValue(5)
    //       }}
    //       checked={value && value.value > 4 ? true : false}
    //     />
    //     <label htmlFor={data.questionId + '5'}></label>
    //   </div>
    // </div>
  )
}

export default StarRating
