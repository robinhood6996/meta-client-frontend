import React, {useEffect, useRef} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {KTSVG} from '../../../../../_metronic/helpers'
import {useCreateAdMutation} from '../../../../../redux/features/api/paymentsAPI'

// type Props = {
//   show: boolean
//   handleClose: () => void
//   type: string
// }

export default function CreatePayment({
  show,
  handleClose,
  type,
  cityId,
  defaultCountryName,
  defaultCityName,
  defaultDescription,
}) {
  const titleRef = useRef()
  const mediaRef = useRef()
  const descriptionRef = useRef()
  const amountRef = useRef()
  const durationRef = useRef()

  //api call
  //   const {data, isFetching, isSuccess} = useGetAllCountryQuery(null)
  const [
    createAd,
    {isLoading: isLoadingCreate, isError: isErrorCreate, isSuccess: isSuccessCreate},
  ] = useCreateAdMutation()
  //   const [editCity, {isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit}] =
  //     useEditCityMutation()

  const handleModal = (e) => {
    e.preventDefault()
    const title = titleRef.current.value
    const media = mediaRef.current.value
    const budget = amountRef.current.value
    const duration = durationRef.current.value
    const description = descriptionRef.current.value
    if (type === 'create' && title && media && budget && duration) {
      createAd({title, media, budget, duration, description})
    }
    //   if (
    //     type === 'edit-city' &&
    //     (countryName !== null ||
    //       countryName !== '' ||
    //       countryName !== undefined ||
    //       cityName !== null ||
    //       cityName !== '' ||
    //       cityName !== undefined) &&
    //     cityId
    //   ) {
    //       editCity({id: cityId, cityName: cityName, description: description ?? defaultDescription})
    //     console.log('edit', cityId, countryName, cityName)
    //   }
    handleClose()
  }

  //toast create city
  useEffect(() => {
    if (!isLoadingCreate && !isErrorCreate && isSuccessCreate) {
      toast.success('Successfully created Ad', {
        hideProgressBar: true,
        toastId: 'cityCreateSuccess',
      })
    }
    if (!isLoadingCreate && isErrorCreate && !isSuccessCreate) {
      toast.error('Failed to create Ad', {
        hideProgressBar: true,
        toastId: 'cityCreateError',
      })
    }
  }, [isErrorCreate, isLoadingCreate, isSuccessCreate])
  //toast Edit city
  // useEffect(() => {
  //   if (!isLoadingEdit && !isErrorEdit && isSuccessEdit) {
  //     toast.success('Successfully edited city', {
  //       hideProgressBar: true,
  //       toastId: 'cityEditSuccess',
  //     })
  //   }
  //   if (!isLoadingEdit && isErrorEdit && !isSuccessEdit) {
  //     toast.error('Failed to edit city', {
  //       hideProgressBar: true,
  //       toastId: 'cityEditError',
  //     })
  //   }
  //   return () => {
  //     setTimeout(() => {
  //       toast.dismiss('cityEditSuccess')
  //       toast.dismiss('cityEditError')
  //     }, 2000)
  //   }
  // }, [isErrorEdit, isLoadingEdit, isSuccessEdit])

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
          <h2>Make Payment</h2>
          {/* begin::Close */}
          <div className='btn btn-sm btn-icon btn-active-color-primary' onClick={handleClose}>
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
              <select className='form-control form-control-lg form-control-solid'>
                <option value='default'>Select Payment Method</option>
                <option value='bkash'>Bkash</option>
                <option value='nagad'>Nagad</option>
                <option value='bank'>Bank</option>
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
                ref={mediaRef}
                type='text'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Bkash/Nagad Number or Bank Account'
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
              <input
                ref={amountRef}
                type='file'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Amount in BDT'
              />
            </div>
            <div className='d-flex justify-content-end mb-2'>
              <Button
                className='btn btn-sm fw-bold btn-primary'
                // data-bs-toggle='modal'
                // data-bs-target='#kt_modal_create_app'
                type='submit'
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}
