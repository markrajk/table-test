import React from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { useTranslation } from 'react-i18next'

const PageLoader: React.FC = () => {
  const { t } = useTranslation('loader')
  return (
    <div className="loader">
      <div className="loader-main">
        <Loader type="Audio" color="#00BFFF" height={50} width={50} />
      </div>
      <p className="loader-title">{t('loader:placeholderTitle')}</p>
      <p className="loader-text">{t('loader:placeholderText')}</p>
    </div>
  )
}

export default PageLoader
