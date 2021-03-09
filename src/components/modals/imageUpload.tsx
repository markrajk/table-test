import React from 'react'
import { useTranslation } from 'react-i18next'

interface Props {
  image?: any
  selectImage?(image: any): void
}

const ImageUpload = (props: Props) => {
  const { t } = useTranslation(['imageModal', 'common'])
  const { image, selectImage } = props

  return (
    <div className="custom-modal-wrapper" id="imageUploadModal">
      <div className="custom-modal">
        <div className="custom-modal-body">
          <div
            className="custom-modal-close"
            close-modal="imageUploadModal"
            onClick={() =>
              document
                .getElementById('imageUploadModal')
                ?.classList.remove('open')
            }
          >
            <i className="icon-close"></i>
          </div>
          <p className="custom-modal-body-title">{t('imageModal:Looksgood')}</p>

          {!!image && (
            <img
              src={URL.createObjectURL(image)}
              alt="User's profile image"
              className="custom-modal-body-img"
            />
          )}

          <div className="custom-modal-body-buttons">
            <label htmlFor="uploadImage" className="button button-light-gray">
              {t('imageModal:Uploadnew')}
            </label>
            <input
              type="file"
              name="uploadImage"
              id="uploadImage"
              hidden
              onChange={(e) => {
                if (selectImage && e.target.files && e.target.files[0]) {
                  selectImage(e.target.files[0])
                }
              }}
            />
            <button
              className="button button-primary"
              onClick={() =>
                document
                  .getElementById('imageUploadModal')
                  ?.classList.remove('open')
              }
            >
              {t('common:Done')}
            </button>
          </div>
        </div>
      </div>
      <div className="custom-modal-backdrop"></div>
    </div>
  )
}

export default ImageUpload
