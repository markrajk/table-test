import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-component'
import { RelationData, DirectFeedback } from 'src/apiTypes'
import FeedbackSummary from './feedbackDirectBox'

type Props = {
    data: DirectFeedback[]
    type?: 'direct' | 'relational'
    getFeedbacks(): void 
}

const SelfFeedback = (props: Props) => {
    const { data, type, getFeedbacks } = props
    
    useEffect(() => {
        getFeedbacks()
    }, [])
    function masonryLayout() {
        let elem = document.querySelectorAll('.grid');
        if (elem.length) {
            elem.forEach(e => {
                new Masonry(e, {
                    // options
                    itemSelector: '.grid-item',
                    transitionDuration: '0.2s',
                    stagger: '0s'
                });
            })
        }
    }

    function checkForReadMore() {
        setTimeout(() => {

            let commentItems = document.querySelectorAll(".feedback-main-item");

            commentItems.forEach((e) => {
                // @ts-ignore
                let commentText = e.querySelector(".feedback-main-item-text");
                // @ts-ignore
                let textHeigh = commentText.clientHeight;


                // @ts-ignore
                if (0 > textHeigh - commentText.scrollHeight) {
                    let readMore = e.querySelector(".read-more");
                    // @ts-ignore
                    let close = e.parentElement.querySelector(".close");
                    // @ts-ignore
                    readMore.style.display = "block";

                    // @ts-ignore
                    readMore.addEventListener("focus", function () {
                        // @ts-ignore
                        this.parentElement.classList.add("open");
                        // @ts-ignore
                        this.style.opacity = "0";
                        // @ts-ignore
                        this.parentElement.classList.remove("trunc");
                        // @ts-ignore
                        console.log('IN');
                        // @ts-ignore
                        masonryLayout();
                    });

                    // @ts-ignore
                    readMore.addEventListener("blur", function () {
                        // @ts-ignore
                        this.parentElement.classList.remove("open");
                        // @ts-ignore
                        this.style.opacity = "1";
                        // @ts-ignore
                        this.parentElement.classList.add("trunc");
                        console.log('OUT');
                        // @ts-ignore
                        masonryLayout();
                    });
                }
            });
        }, 500)
    }

    useEffect(() => {
        checkForReadMore();
    }, [])
    const [ selection, setSelection ] = useState('three')
    return (

        <div className="custom-accordion">
            <div className="custom-accordion-card open card-01">
                <div className="custom-accordion-card-header">
                    <div className="section-header">
                        <p className="section-header-text">Self evaluations</p>
                        {/* <button className="section-header-toggle accordion-card-trigger" accordion-trigger-target="card-01"
                            onClick={(e) => { if (/Close/.test(e.currentTarget.innerText)) { e.currentTarget.innerHTML = `Open section <i className='icon-arrow-down'></i>` } else { e.currentTarget.innerHTML = `Close section <i className='icon-arrow-up'></i>` } }}>
                            Close section <i className="icon-arrow-down"></i>
                        </button> */}
                        <div className="custom-dropdown default">
                            <button className="custom-dropdown-trigger">
                                Summary boxes last {selection} months <i className="icon-caret-down"></i>
                            </button>

                            <div className="custom-dropdown-menu">
                                <div className="custom-dropdown-menu-item">
                                    <button className="custom-dropdown-menu-item-link" onClick={() => setSelection('')}>
                                        Last month
                            </button>
                                </div>
                                <div className="custom-dropdown-menu-item selected">
                                    <button className="custom-dropdown-menu-item-link" onClick={() => setSelection('three')}>
                                        Last 3 months
                            </button>
                                </div>
                                <div className="custom-dropdown-menu-item">
                                    <button className="custom-dropdown-menu-item-link" onClick={() => setSelection('6')}> 
                                        Last 6 months
                            </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-accordion-card-body">
                    <div className="feedback-wrapper grid">
                        {data.map((item) => 
                            <FeedbackSummary data={item} onExpand={() => {
                                //selectFeedback(item)
                                //document.getElementById('feedbackTransferModal')?.classList.add('open')
                            }} />

                        )}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default SelfFeedback