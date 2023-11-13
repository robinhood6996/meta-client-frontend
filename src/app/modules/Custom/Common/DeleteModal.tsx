import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {Button, Modal} from 'react-bootstrap'

type Props = {
  show: boolean
  handleModal: () => void
  handleDelete: () => void
}

export default function DeleteModal({show, handleModal, handleDelete}: Props) {
  return (
    <div>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-600px'
        show={show}
        onHide={handleModal}
      >
        <div className='modal-header justify-content-end'>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleModal}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
          {/* end::Close */}
        </div>

        <div className='modal-body py-lg-10 px-lg-10'>
          <div className='fv-row mb-10'>
            <KTSVG
              path='/media/icons/duotune/general/gen027.svg'
              className='svg-delete-icon text-danger text-center d-block'
            />
            <h4 className='text-center text-gray-700'>Are you sure ?</h4>
            <p className='text-center text-gray-600'>Are you sure you want to remove ?</p>
          </div>
          <div className='d-flex justify-content-end mb-2'>
            <Button className='btn btn-sm me-3 fw-bold btn-secondary' onClick={handleModal}>
              Close
            </Button>
            <Button className='btn btn-sm fw-bold btn-danger' onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
