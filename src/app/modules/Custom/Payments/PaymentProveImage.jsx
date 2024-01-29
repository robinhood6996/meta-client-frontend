import React from 'react'
import {Modal} from 'react-bootstrap'
import {KTSVG} from '../../../../_metronic/helpers'

const PaymentProveImage = ({show, handleClose, image}) => {
  return (
    <div>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-500px'
        show={show}
        onHide={handleClose}
      >
        <div className='modal-header'>
          <h2>Payment Prove</h2>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
          {/* end::Close */}
        </div>
        <div className='d-flex justify-content-center p-2'>
          <img src={image} width={300} alt='PaymentProve'></img>
        </div>
      </Modal>
    </div>
  )
}

export default PaymentProveImage
