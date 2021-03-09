import React from 'react'
import { CompanyFeedback } from 'src/apiTypes'
import { useTranslation } from 'react-i18next'

interface Props {
  selectedButton: '30' | '3' | '12'
  selectButton(nu: '30' | '3' | '12'): void
  data: CompanyFeedback | null
}

const DataCard = (props: Props) => {
  const { t } = useTranslation(['companyOverviewPage', 'common'])
  const { selectedButton, selectButton, data } = props

  return (
    <div className="data-card">
      <div className="data-card-header">
        <h3 className="data-card-header-title">
          <span></span>
          {t('companyOverviewPage:Amountoffeedback')}
        </h3>
        <p className="data-card-header-text">{t('common:Updated')} 12:15</p>
      </div>
      <i className="icon-refresh-circle-full"></i>
      <div className="data-card-buttons">
        <button
          className={`button button-gradient ${
            selectedButton !== '30' ? 'disabled' : ''
          }`}
          onClick={() => selectButton('30')}
        >
          {t('companyOverviewPage:Last30days')}
        </button>
        <button
          className={`button button-gradient ${
            selectedButton !== '3' ? 'disabled' : ''
          }`}
          onClick={() => selectButton('3')}
        >
          {t('companyOverviewPage:Last3months')}
        </button>
        <button
          className={`button button-gradient ${
            selectedButton !== '12' ? 'disabled' : ''
          }`}
          onClick={() => selectButton('12')}
        >
          {t('companyOverviewPage:Last12months')}
        </button>
      </div>
      <div className="data-card-main">
        <div className="data-card-main-item">
          <h4
            className="data-card-main-item-title"
            style={{ textTransform: 'uppercase' }}
          >
            {t('companyOverviewPage:totalGivenFeedback')}
          </h4>
          <p className="data-card-main-item-amount">
            {data?.total || t('common:Nodata')}
          </p>
        </div>
        <div className="data-card-main-item">
          <h4
            className="data-card-main-item-title"
            style={{ textTransform: 'uppercase' }}
          >
            {t('companyOverviewPage:teamFeedbacks')}
          </h4>
          <p className="data-card-main-item-amount">
            {data?.team || t('common:Nodata')}
          </p>
        </div>
        <div className="data-card-main-item">
          <h4
            className="data-card-main-item-title"
            style={{ textTransform: 'uppercase' }}
          >
            {t('common:Peertopeer')}
          </h4>
          <p className="data-card-main-item-amount">
            {data?.p2p || t('common:Nodata')}
          </p>
        </div>
        <div className="data-card-main-item">
          <h4
            className="data-card-main-item-title"
            style={{ textTransform: 'uppercase' }}
          >
            {t('companyOverviewPage:supervisorFeedbacks')}
          </h4>
          <p className="data-card-main-item-amount">
            {data?.supervisor || t('common:Nodata')}
          </p>
        </div>
        <div className="data-card-main-item">
          <h4
            className="data-card-main-item-title"
            style={{ textTransform: 'uppercase' }}
          >
            {t('companyOverviewPage:selfEvaluations')}
          </h4>
          <p className="data-card-main-item-amount">
            {data?.self || t('common:Nodata')}
          </p>
        </div>
        <div className="data-card-main-item">
          <h4
            className="data-card-main-item-title"
            style={{ textTransform: 'uppercase' }}
          >
            {t('companyOverviewPage:subordinateFeedbacks')}
          </h4>
          <p className="data-card-main-item-amount">
            {data?.subordinate || t('common:Nodata')}
          </p>
        </div>
      </div>
    </div>
  )
}

export default DataCard
