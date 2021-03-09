import React from 'react'
import { useEffect } from 'react'
import { backgroundCardHeight } from 'src/tables'
import { useTranslation } from 'react-i18next'

interface Props {
  mode?: 'archived' | 'active'
}

const PlaceHolder = (props: Props) => {
  const { t } = useTranslation(['companyOverviewPage', 'common'])
  const { mode } = props
  useEffect(() => {
    backgroundCardHeight()
  })

  if (mode === 'active') {
    return (
      <tr className="table-placeholder">
        <td colSpan={100}>
          <img
            src="/img/table-placeholder-img-03.png"
            alt="Clip art"
            className="table-placeholder-img"
          />
          <p className="table-placeholder-title">
            {t('companyOverviewPage:placeholderTitle')}
          </p>
          <p className="table-placeholder-text">
            {t('common:Click')} <button>{t('common:here')}</button>{' '}
            {t('companyOverviewPage:placeholderText')}
          </p>
        </td>
      </tr>
    )
  }

  return (
    <tr className="table-placeholder">
      <td colSpan={100}>
        <img
          src="/img/table-placeholder-img-04.png"
          alt="Clip art"
          className="table-placeholder-img"
        />
        <p className="table-placeholder-title">
          {t('companyOverviewPage:Noemployeesarchivedyet')}
        </p>
      </td>
    </tr>
  )
}

export default PlaceHolder
