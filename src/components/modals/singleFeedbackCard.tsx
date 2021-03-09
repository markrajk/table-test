import React, { useState } from 'react'
import { DirectFeedback, User } from 'src/apiTypes'


interface Props {
    data: DirectFeedback
}

const SingleFeedbackCard = (props: Props) => {
    const { data } = props
    
    return(
        <>
                <div className="feedback-header">
                  <p className="feedback-header-date">12.10.2020</p>
                </div>
                <div className="feedback-rating">
                    {data.valueData.map(item => 
                                        
                  <div className="feedback-rating-item">
                  <p className="feedback-rating-item-name">{item.question}:</p>
                  <div className="feedback-rating-item-stars">
                    {item.value > 0 && <i className="icon-star"></i>}
                    {item.value > 1 && <i className="icon-star" 

                    ></i>}
                    {item.value > 2 && <i className="icon-star" 

                    ></i>}
                    {item.value > 3 && <i className="icon-star" 
        
                    ></i>}
                    {item.value > 4 && <i className="icon-star" 

                    ></i>}
                    

                  </div>
                </div>
                        )}


                </div>
                <div className="feedback-main">

                    {data.textData.map(item => <div className="feedback-main-item">
                    <p className="feedback-main-item-text">
                      <span className="feedback-main-item-text-strong">{item.question}:</span>
                      {item.value}
                    </p>
                  </div>)}
                  
                </div>
</>
    )
}

export default SingleFeedbackCard