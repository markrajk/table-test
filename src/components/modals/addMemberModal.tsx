import React, { FC } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside'

interface Props {

}

const addMemberModal: FC<Props> = (props) => {
    return (
        <div className="custom-modal-wrapper" id="inviteMemberNew">
            <div className="custom-modal">

                <div className="custom-modal-body">
                    <div className="custom-modal-close" close-modal="inviteMemberNew">
                        <i className="icon-close"></i>
                    </div>
                    <p className="custom-modal-body-title">Looks good!</p>

                    <p className="custom-modal-body-label">Enter emails</p>

                    <div className="custom-input-container check">
                        <input type="text" placeholder="Enter email"></input>
                        <i className="icon-check-circle"></i>
                        <div className="dropdown-menu">
                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>

                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>

                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>
                        </div>
                    </div>

                    <div className="custom-input-container open">
                        <input type="text" placeholder="Enter email"></input>
                        <i className="icon-check-circle"></i>

                        <div className="dropdown-menu">
                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>

                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>

                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>
                        </div>
                    </div>

                    <div className="custom-input-container">
                        <input type="text" placeholder="Enter email"></input>
                        <i className="icon-check-circle"></i>

                        <div className="dropdown-menu">
                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>

                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>

                            <div className="dropdown-menu-item">
                                <img src="/img/p-01.png" alt="User" className="dropdown-menu-item-img"></img>
                                <div className="dropdown-menu-item-set">
                                    <p className="dropdown-menu-item-set-title">Julia Smith</p>
                                    <p className="dropdown-menu-item-set-text">Frontend developer</p>
                                </div>
                                <button className="button link">Add</button>
                            </div>
                        </div>
                    </div>

                    <div className="custom-modal-body-buttons">
                        <button className="button button-green-primary">Confirm</button>
                        <button className="button button-light-gradient">Cancel</button>
                    </div>

                </div>
            </div>
            <div className="custom-modal-backdrop"></div>
        </div>
    )
}

export default addMemberModal
