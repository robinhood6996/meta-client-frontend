import React, {useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import moment from 'moment'
import {Modal} from 'react-bootstrap'
import Loader from '../../../Components/Custom Components/common/Loader'

export default function EscortAdReceiptModal({show, handleClose, data}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const showLoader = () => {
    return (
      <div className='border-2'>
        <Loader />
      </div>
    )
  }
  return (
    <div>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-900px'
        show={show}
        onHide={handleClose}
      >
        <div className='modal-header'>
          <h2>Payment Receipt</h2>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
          {/* end::Close */}
        </div>
        <div className='modal-body py-lg-10 px-lg-10'>
          <div style={{display: loading ? 'block' : 'none'}}>{showLoader()}</div>
          <div style={{display: error ? 'block' : 'none'}}>{error && 'No image found'}</div>
          <div className='d-flex align-items-center justify-content-center'>
            <img
              className='w-75'
              src={`${process.env.REACT_APP_CUSTOM_BASE_URL}bank/${data?.receipt?.filename}`}
              alt=''
              onLoad={() => setLoading(false)}
              onError={() => {
                setError(true)
                setLoading(false)
              }}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}
