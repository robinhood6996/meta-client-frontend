import React, {useEffect, useRef, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useEditPaymentMutation} from '../../../../../redux/features/api/paymentsAPI'
import PaymentProveButton from './PaymentProveButton'

export default function EditPayment({defaultPayment}) {
  const titleRef = useRef()
  const mediaRef = useRef()
  const paymentRef = useRef()
  const amountRef = useRef()
  const statusRef = useRef()
  const [showModal, setShowModal] = useState(false)
  const handleEditModal = () => {
    setShowModal(!showModal)
  }
  const [
    editPayment,
    {isLoading: isLoadingCreate, isError: isErrorCreate, isSuccess: isSuccessCreate},
  ] = useEditPaymentMutation()

  const handleModal = (e) => {
    e.preventDefault()
    const title = titleRef.current.value
    const paymentMedia = mediaRef.current.value
    const reference = paymentRef.current.value
    const amount = amountRef.current.value
    const status = statusRef.current.value
    if (title && paymentMedia && amount && reference) {
      if (status === 'default') {
        editPayment({
          paymentId: defaultPayment?._id,
          data: {title, paymentMedia, amount, paymentRef: reference},
        })
      } else {
        editPayment({
          paymentId: defaultPayment?._id,
          data: {title, paymentMedia, amount, paymentRef: reference, status},
        })
      }
    }
    handleEditModal()
  }

  //toast create city
  useEffect(() => {
    if (!isLoadingCreate && !isErrorCreate && isSuccessCreate) {
      toast.success('Successfully Edited Payment', {
        hideProgressBar: true,
        toastId: 'cityCreateSuccess',
      })
    }
    if (!isLoadingCreate && isErrorCreate && !isSuccessCreate) {
      toast.error('Failed to Edit Payment', {
        hideProgressBar: true,
        toastId: 'cityCreateError',
      })
    }
  }, [isErrorCreate, isLoadingCreate, isSuccessCreate])

  return (
    <div>
      <button
        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        onClick={() => {
          // setDeleteEscortUserName(escort?.username)
          handleEditModal()
        }}
      >
        Edit
      </button>
      <Modal
        id='kt_modal_create_app'
        tabIndex={-1}
        aria-hidden='true'
        dialogClassName='modal-dialog modal-dialog-centered mw-900px'
        show={showModal}
        onHide={handleEditModal}
      >
        <div className='modal-header'>
          <h2>Edit Payment</h2>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleEditModal}>
            <KTSVG className='svg-icon-1' path='/media/icons/duotune/arrows/arr061.svg' />
          </div>
          {/* end::Close */}
        </div>

        <form
          onSubmit={(e) => {
            handleModal(e)
          }}
        >
          <div className='modal-body py-lg-10 px-lg-10'>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Payment Title</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Title to identify payment'
                ></i>
              </label>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Title'
                ref={titleRef}
                defaultValue={defaultPayment?.title ?? ''}
              />
            </div>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Payment Method</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Which payment method you are using'
                ></i>
              </label>
              <select
                className='form-control form-control-lg form-control-solid'
                ref={mediaRef}
                defaultValue={defaultPayment?.paymentMedia}
              >
                <option value='default'>Select Payment Method</option>
                <option value='bkash' selected={defaultPayment?.paymentMedia === 'bkash'}>
                  Bkash
                </option>
                <option value='nagad' selected={defaultPayment?.paymentMedia === 'nagad'}>
                  Nagad
                </option>
                <option value='bank' selected={defaultPayment?.paymentMedia === 'bank'}>
                  Bank
                </option>
              </select>
            </div>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Payment Reference</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Reference of Payment: Last number or Bank details'
                ></i>
              </label>
              <input
                ref={paymentRef}
                type='text'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Bkash/Nagad Number or Bank Account'
                defaultValue={defaultPayment?.paymentRef ?? ''}
              />
            </div>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Pay Amount</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Payable Amount'
                ></i>
              </label>
              <input
                ref={amountRef}
                type='number'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Amount in BDT'
                defaultValue={defaultPayment?.amount ?? ''}
              />
            </div>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className=''>Payment Prove</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Payable Amount'
                ></i>
              </label>
              <PaymentProveButton url={defaultPayment?.paymentProve} />
            </div>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Status</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Which payment method you are using'
                ></i>
              </label>
              <select className='form-control form-control-lg form-control-solid' ref={statusRef}>
                <option value='default'>Select Status</option>
                <option value='pending' selected={defaultPayment?.status === 'pending'}>
                  Pending
                </option>
                <option value='verified' selected={defaultPayment?.status === 'verified'}>
                  Verified
                </option>
                <option value='canceled' selected={defaultPayment?.status === 'canceled'}>
                  Cancel
                </option>
              </select>
            </div>
            <div className='d-flex justify-content-end mb-2'>
              <Button className='btn btn-sm fw-bold btn-primary' type='submit'>
                Edit
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
