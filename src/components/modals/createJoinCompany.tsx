import React, { FC, useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { CreateTeamVariables, InviteUserVariables } from 'src/apiTypes'
import { AppDispatch, RootState } from 'src/configureStore'
import { acceptCompanyInvite, acceptInvite, getAllMyInvites, getCompanyInvites } from 'src/redux/invites/actions'
import {
    createTeam, inviteUser
} from 'src/redux/teams/actions'

import CreateTeamStep5 from './CreateTeamStep5'
import { useTranslation } from "react-i18next";
interface Props {

    open: boolean
    handleClose(): void
}


const mapStateToProps = (state: RootState) => ({
    user: state.authReducer.user,
    sessionRestored: state.authReducer.sessionRestored,
    companyInvites: state.invitesReducer.companyInvites,
    teamInvites: state.invitesReducer.invites,
    createdTeam: state.teamReducer.createdTeam,

})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
    acceptCompanyInvite: (inviteId: string, companyId: string) => dispatch(acceptCompanyInvite(inviteId, companyId)),
    getCompanyInvites: () => dispatch(getCompanyInvites()),
    getMyInvites: (email: string) => dispatch(getAllMyInvites(email)),
    acceptInvite: (inviteId: string) => dispatch(acceptInvite(inviteId)),
    createTeam: (data: CreateTeamVariables) => dispatch(createTeam(data)),
    inviteUser: (data: InviteUserVariables) => dispatch(inviteUser(data)),
})
const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>


const CreateJoinCompany: FC<Props & PropsFromRedux> = (props: Props & PropsFromRedux) => {
    const { t } = useTranslation(['common', 'createJoinCompany'])
    const { open, handleClose, companyInvites, acceptCompanyInvite, getCompanyInvites, getMyInvites, teamInvites, acceptInvite, createTeam, createdTeam, inviteUser } = props
    const [step, changeStep] = useState(1)
    const company = companyInvites && companyInvites[0] ? companyInvites[0].company : undefined
    useEffect(() => {
        if (open) {
            changeStep(1)
        }
    }, [open])
    const [stepStyle, changeStepStyle] = useState(1)



    return (
        <div className={`custom-modal-wrapper step-0${stepStyle} ${open ? 'open' : ''}`} id="createJoinModal">
            <div className="custom-modal">

                <div className="custom-modal-body">
                    <div className="custom-modal-close" close-modal="createJoinModal" onClick={handleClose} >
                        <i className="icon-close"></i>
                    </div>

                    {step === 1 &&
                        <>
                            <img src="/img/logo-only-large.png" alt="Team feedback logo" className="custom-modal-body-logo"></img>

                            <p className="custom-modal-body-title">{t('createJoinCompany:WelcometoTeamFeedback')}</p>
                            <p className="custom-modal-body-text">{t('createJoinCompany:Averypowerfultool')}.</p>

                            <button className="button button-primary modal-trigger" onClick={() => {
                                changeStep(2)
                                changeStepStyle(2)
                            }}>{t('common:Letsstart')}</button>
                        </>
                    }


                    {step === 2 &&
                        <>
                            <p className="custom-modal-body-title">{t('createJoinCompany:Howwouldyouliketogetstarted')}</p>
                            <p className="custom-modal-body-text">{t('createJoinCompany:Getstartedwiththreesimplesteps')}.</p>

                            <div className="cards"  >
                                <div className="card">
                                    <img src="/img/company-choose-01.png" alt="Clip art" className="card-img"></img>
                                    <p className="card-title">{t('createJoinCompany:Joinaregisteredcompany')}</p>
                                    <p className="card-text">{t('createJoinCompany:Invitationrequired')}</p>

                                    <button className="button button-primary" onClick={() => {
                                        if (companyInvites && companyInvites[0]) {
                                            changeStep(4)
                                            changeStepStyle(4)
                                        } else if (teamInvites && teamInvites[0]) {
                                            changeStep(6)
                                            changeStepStyle(4)
                                        } else {
                                            changeStep(3)
                                            changeStepStyle(3)
                                        }
                                    }}>{t('common:Continue')}</button>
                                </div>

                                <div className="divider"></div>

                                <div className="card">
                                    <img src="/img/company-choose-02.png" alt="Clip art" className="card-img"></img>
                                    <p className="card-title">{t('createJoinCompany:Registeranewteam')}</p>
                                    <p className="card-text">{t('createJoinCompany:Basicfeaturesfreeofcharge')}</p>

                                    <button className="button button-primary" onClick={() => {
                                        changeStepStyle(5)
                                        changeStep(7)
                                    }}>{t('common:Continue')}</button>
                                </div>
                            </div>
                        </>
                    }


                    {step === 3 &&
                        <>
                            <div className="custom-modal-close" close-modal="createJoinModal" onClick={handleClose} >
                                <i className="icon-close"></i>
                            </div>
                            <p className="custom-modal-body-title">Join a registered company</p>
                            <p className="custom-modal-body-text">To join a registered company you have to be invited.
                        Your email has not yet been invited.</p>

                            <img src="/img/join-company-img.png" alt="Clip art" className="custom-modal-body-img"></img>

                            <button className="button button-primary modal-trigger" onClick={getCompanyInvites}>Recheck invitation status</button>
                            <button className="custom-modal-body-text-bottom">Last check 1 minute ago</button>
                        </>
                    }

                    {step === 5 &&
                        <>
                            <div className="custom-modal-close" close-modal="createJoinModal" onClick={handleClose} >
                                <i className="icon-close"></i>
                            </div>
                            <p className="custom-modal-body-title">Join a registered team</p>
                            <p className="custom-modal-body-text">To join a registered team you have to be invited.
                        Your email has not yet been invited.</p>

                            <img src="/img/join-company-img.png" alt="Clip art" className="custom-modal-body-img"></img>

                            <button className="button button-primary modal-trigger" onClick={getCompanyInvites}>Recheck invitation status</button>
                            <button className="custom-modal-body-text-bottom">Last check 1 minute ago</button>
                        </>
                    }



                    {step === 4 &&
                        <>
                            <p className="custom-modal-body-title">Join a registered company</p>
                            <p className="custom-modal-body-text">You have been invited to join the following company: </p>

                            {company?.profilePic ?

                                <div className="custom-modal-body-img-container">
                                    <img src="/img/example-logo.png" alt="Clip art" className="custom-modal-body-img"></img>
                                </div>
                                :
                                <div className="custom-modal-body-img-container">
                                    {company?.name[0]}
                                </div>
                            }

                            <p className="custom-modal-body-name">{company?.name}</p>
                            <p className="custom-modal-body-inviter">Inviter: {companyInvites && companyInvites[0] && (companyInvites[0].sender.firstname + ' ' + companyInvites[0].sender.lastname)}</p>

                            <button className="button button-primary modal-trigger" onClick={() => {
                                if (companyInvites && companyInvites[0]) {
                                    acceptCompanyInvite(companyInvites[0]._id, companyInvites[0].company._id)
                                    handleClose()
                                }
                            }}>Join company</button>
                            
                        </>
                    }
                    {step === 6 &&
                        <>
                            <p className="custom-modal-body-title">Join a registered team</p>
                            <p className="custom-modal-body-text">You have been invited to join the following team: </p>


                            <div className="custom-modal-body-img-container">
                                {teamInvites && teamInvites[0] && teamInvites[0]?.teamName[0]}
                            </div>


                            <p className="custom-modal-body-name">{teamInvites && teamInvites[0].teamName}</p>
                            <p className="custom-modal-body-inviter">Inviter: {teamInvites[0] && (teamInvites[0].senderName)}</p>

                            <button className="button button-primary modal-trigger" onClick={() => {
                                if (companyInvites && companyInvites[0]) {
                                    acceptInvite(teamInvites[0]._id)
                                    handleClose()
                                }
                            }}>Join team</button>
                            
                        </>
                    }
                    {step === 7 &&
                        <CreateTeamStep5 createTeam={(data) => {
                            createTeam(data)
                        }}
                            createdTeam={createdTeam}
                            handleClose={handleClose}
                            inviteUser={(email) => {
                                if (createdTeam) {
                                    inviteUser({
                                        teamId: createdTeam._id,
                                        invitedUser: email,
                                        type: 'Team member'

                                    })
                                }
                            }


                            }
                        />
                    }


                </div>
            </div>

            <div className="custom-modal-backdrop"></div>
        </div>
    )
}

export default connector(CreateJoinCompany)
