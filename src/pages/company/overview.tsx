import React, { useState } from 'react'
import { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { CompanyFeedback } from 'src/apiTypes'
import LineGraph from 'src/components/graph/lineGraph'
import Header from 'src/components/header'
import HeaderCompanySubNav from 'src/components/header/headerCompanySubNav'
import InviteEmployees from 'src/components/modals/inviteEmployees'
import { AppDispatch, RootState } from 'src/configureStore'
import { getFeedbackData } from 'src/redux/company/actions'
import DataCard from './dataCard'
import { capitalize } from 'src/utitlity'
import { useTranslation } from 'react-i18next'
const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  company: state.companyReducer.company,
  feedbackData: state.companyReducer.feedbackData,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getFeedbackData: () => dispatch(getFeedbackData()),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const CompanyOverview = (props: Props) => {
  const { t } = useTranslation(['companyOverviewPage', 'common'])
  const { company, getFeedbackData, feedbackData } = props
  const [threeMonths, setThreeMonths] = useState<CompanyFeedback | null>(null)
  const [twelveMonths, setTwelveMonths] = useState<CompanyFeedback | null>(null)
  const [last30Days, setLast30Days] = useState<CompanyFeedback | null>(null)
  useEffect(() => {
    if (company) {
      getFeedbackData()
    }
  }, [company])

  useEffect(() => {
    if (feedbackData) {
      sortFeedbacks()
      sortGraphData()
    }
  }, [feedbackData])
  const [selectedButton, selectButton] = useState<'30' | '3' | '12'>('30')
  const sortFeedbacks = () => {
    if (feedbackData) {
      const monthly = feedbackData.monthly
      if (monthly.length > 12) {
        monthly.slice(monthly.length - 12)
      }
      const twelve: CompanyFeedback = {
        caption: '12 months',
        p2p: 0,
        self: 0,
        team: 0,
        supervisor: 0,
        subordinate: 0,
        total: 0,
      }
      monthly.forEach((item) => {
        twelve.p2p = twelve.p2p + item.p2p
        twelve.self = twelve.self + item.self
        twelve.team = twelve.team + item.team
        twelve.supervisor = twelve.supervisor + item.supervisor
        twelve.subordinate = twelve.subordinate + item.subordinate
        twelve.total = twelve.total + item.total
      })
      if (monthly.length > 3) {
        monthly.slice(monthly.length - 3)
      }

      const three: CompanyFeedback = {
        caption: '3 months',
        p2p: 0,
        self: 0,
        team: 0,
        supervisor: 0,
        subordinate: 0,
        total: 0,
      }
      monthly.forEach((item) => {
        three.p2p = three.p2p + item.p2p
        three.self = three.self + item.self
        three.team = three.team + item.team
        three.supervisor = three.supervisor + item.supervisor
        three.subordinate = three.subordinate + item.subordinate
        three.total = three.total + item.total
      })
      setThreeMonths(three)
      setTwelveMonths(twelve)
      setLast30Days(feedbackData.last30Days)
    }
  }

  const [total, setTotal] = useState<number[]>([])
  const [p2p, setP2P] = useState<number[]>([])
  const [team, setTeam] = useState<number[]>([])
  const [subordinate, setSubordinate] = useState<number[]>([])
  const [supervisor, setSupervisor] = useState<number[]>([])
  const [self, setSelf] = useState<number[]>([])
  const sortGraphData = () => {
    if (feedbackData) {
      const p2pFeedback = feedbackData.weekly.map((dat) => dat.p2p)
      const teamFeedback = feedbackData.weekly.map((dat) => dat.team)
      const sub = feedbackData.weekly.map((dat) => dat.subordinate)
      const supervisorfeed = feedbackData.weekly.map((dat) => dat.supervisor)
      const selfFeed = feedbackData.weekly.map((dat) => dat.self)
      const totFeed = feedbackData.weekly.map((dat) => dat.total)
      setP2P(p2pFeedback)
      setTeam(teamFeedback)
      setSubordinate(sub)
      setSupervisor(supervisorfeed)
      setSelf(selfFeed)
      setTotal(totFeed)
    }
  }
  return (
    <div
      className="content-wrapper"
      onClick={() =>
        document.getElementById('mainDrawer')?.classList.remove('open')
      }
    >
      <div className="content">
        <div className="content-card admin-card">
          <div className="admin-card-info">
            <p className="admin-card-info-title">
              {capitalize(company?.name || '')}
            </p>
            <p className="admin-card-info-text">
              <span className="strong">
                {t('companyOverviewPage:Youraccess')}:
              </span>{' '}
              {t('companyOverviewPage:completeCompanyAdminAccess')}
            </p>
          </div>
        </div>
        <div className="content-card main-card">
          <div className="main-card-top">
            <div className="data-card">
              <div className="data-card-header">
                <h3 className="data-card-header-title">
                  <span></span>
                  {t('common:Employees')}
                </h3>
                <p className="data-card-header-text">
                  {t('common:Updated')} 12:15
                </p>
              </div>
              <i className="icon-refresh-circle-full"></i>
              <div className="data-card-buttons">
                <button
                  className="button button-gradient"
                  onClick={() =>
                    document
                      .getElementById('inviteEmployeesModal')
                      ?.classList.add('open')
                  }
                >
                  {t('common:Invitenewemployees')}
                </button>
                <button className="button button-gradient">
                  {t('common:Manage')}
                </button>
              </div>
              <div className="data-card-main">
                <div className="data-card-main-item">
                  <h4 className="data-card-main-item-title">
                    {t('common:Registeredemployees')}
                  </h4>
                  <p className="data-card-main-item-amount">288</p>
                </div>
                <div className="data-card-main-item">
                  <h4 className="data-card-main-item-title">
                    {t('companyOverviewPage:Pendinginvitation')}
                  </h4>
                  <p className="data-card-main-item-amount">288</p>
                </div>
                <div className="data-card-main-item">
                  <h4 className="data-card-main-item-title">
                    {t('companyOverviewPage:Mobileappsusers')}
                  </h4>
                  <p className="data-card-main-item-amount">288</p>
                </div>
                <div className="data-card-main-item">
                  <h4 className="data-card-main-item-title">
                    {t('companyOverviewPage:Dashboardusers')}
                  </h4>
                  <p className="data-card-main-item-amount">288</p>
                </div>
                <div className="data-card-main-item">
                  <h4 className="data-card-main-item-title">
                    {t('companyOverviewPage:Signedinmobileapp')}
                  </h4>
                  <p className="data-card-main-item-amount">288</p>
                </div>
                <div className="data-card-main-item">
                  <h4 className="data-card-main-item-title">
                    {t('companyOverviewPage:Signedindashboard')}
                  </h4>
                  <p className="data-card-main-item-amount">288</p>
                </div>
              </div>
            </div>
            <DataCard
              selectedButton={selectedButton}
              selectButton={(selection) => selectButton(selection)}
              data={
                selectedButton === '3'
                  ? threeMonths
                  : selectedButton === '30'
                  ? last30Days
                  : twelveMonths
              }
            />
          </div>

          <div className="main-card-bottom">
            <div className="graph-card">
              <div className="graph-card-header">
                <div className="graph-card-header-text">
                  {t('companyOverviewPage:Totalmonthlyfeedbackamount')}:
                  <span className="strong">
                    {t('common:Last')} / {total.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </div>
              <div className="graph-card-body">
                <LineGraph data={total} />
              </div>
              <div className="graph-card-footer">
                <p className="graph-card-footer-text">
                  {t('common:Last')} {selectedButton}{' '}
                  {selectedButton === '30' ? 'days' : 'months'}
                </p>
              </div>
            </div>

            <div className="graph-card">
              <div className="graph-card-header">
                <div className="graph-card-header-text">
                  {t('companyOverviewPage:Subordinatemonthlyfeedback')}:
                  <span className="strong">
                    {t('common:Last')} /{' '}
                    {subordinate.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </div>
              <div className="graph-card-body">
                <LineGraph data={subordinate} />
              </div>
              <div className="graph-card-footer">
                <p className="graph-card-footer-text">
                  {t('common:Last')} {selectedButton}{' '}
                  {selectedButton === '30' ? 'days' : 'months'}
                </p>
              </div>
            </div>

            <div className="graph-card">
              <div className="graph-card-header">
                <div className="graph-card-header-text">
                  {t('companyOverviewPage:Supervisormonthlyfeedback')}:
                  <span className="strong">
                    {t('common:Last')} /{' '}
                    {supervisor?.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </div>
              <div className="graph-card-body">
                <LineGraph data={supervisor} />
              </div>
              <div className="graph-card-footer">
                <p className="graph-card-footer-text">
                  {t('common:Last')} {selectedButton}{' '}
                  {selectedButton === '30' ? 'days' : 'months'}
                </p>
              </div>
            </div>

            <div className="graph-card">
              <div className="graph-card-header">
                <div className="graph-card-header-text">
                  {t('companyOverviewPage:P2pmonthlyfeedback')}:
                  <span className="strong">
                    {t('common:Last')} / {p2p?.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </div>
              <div className="graph-card-body">
                <LineGraph data={p2p} />
              </div>
              <div className="graph-card-footer">
                <p className="graph-card-footer-text">
                  {t('common:Last')} {selectedButton}{' '}
                  {selectedButton === '30' ? 'days' : 'months'}
                </p>
              </div>
            </div>

            <div className="graph-card">
              <div className="graph-card-header">
                <div className="graph-card-header-text">
                  {t('companyOverviewPage:Selfevaluationmonthlyfeedback')}:
                  <span className="strong">
                    {t('common:Last')} / {self?.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </div>
              <div className="graph-card-body">
                <LineGraph data={self} />
              </div>
              <div className="graph-card-footer">
                <p className="graph-card-footer-text">
                  {t('common:Last')} {selectedButton}{' '}
                  {selectedButton === '30' ? 'days' : 'months'}
                </p>
              </div>
            </div>

            <div className="graph-card">
              <div className="graph-card-header">
                <div className="graph-card-header-text">
                  {t('companyOverviewPage:Teammonthlyfeedback')}:
                  <span className="strong">
                    {t('common:Last')} / {team?.reduce((a, b) => a + b, 0)}
                  </span>
                </div>
              </div>
              <div className="graph-card-body">
                <LineGraph data={total} />
              </div>
              <div className="graph-card-footer">
                <p className="graph-card-footer-text">
                  {t('common:Last')} {selectedButton}{' '}
                  {selectedButton === '30' ? 'days' : 'months'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InviteEmployees />
    </div>
  )
}

export default connector(CompanyOverview)
