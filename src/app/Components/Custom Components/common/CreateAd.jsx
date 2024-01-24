import React, {useEffect, useRef} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {KTSVG} from '../../../../_metronic/helpers'
import {useCreateAdMutation} from '../../../../redux/features/api/adsAPI/adsAPI'
import {toast} from 'react-toastify'

// type Props = {
//   show: boolean
//   handleClose: () => void
//   type: string
// }

export default function CreateProject({
  show,
  handleClose,
  type,
  cityId,
  defaultCountryName,
  defaultCityName,
  defaultDescription,
}) {
  const titleRef = useRef()
  const linkRef = useRef()
  const budgetRef = useRef()
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
    const link = linkRef.current.value
    const budget = budgetRef.current.value
    const duration = durationRef.current.value
    if (type === 'create' && title && link && budget && duration) {
      createAd({title, link, budget, duration})
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
          <h2>{type === 'create' ? 'Create Ad' : 'Edit Ad'}</h2>
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
                <span className='required'>Ad Title</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Title to identify ad'
                ></i>
              </label>
              <input
                type='text'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Title'
                defaultValue={type === 'edit' ? defaultCityName : ''}
                ref={titleRef}
              />
            </div>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Link</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Link of the post which you want to advertise'
                ></i>
              </label>
              <input
                ref={linkRef}
                type='text'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Ex: https://facebook.com/post/123'
                defaultValue={type === 'edit-city' ? defaultCityName : ''}
              />
            </div>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Budget</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Link of the post which you want to advertise'
                ></i>
              </label>
              <input
                ref={budgetRef}
                type='text'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Budget in USD'
                defaultValue={type === 'edit-city' ? defaultCityName : ''}
              />
            </div>
            <div className='fv-row mb-10'>
              <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                <span className='required'>Duration</span>
                <i
                  className='fas fa-exclamation-circle ms-2 fs-7'
                  data-bs-toggle='tooltip'
                  title='Link of the post which you want to advertise'
                ></i>
              </label>
              <input
                ref={durationRef}
                type='text'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Duration in days'
                defaultValue={type === 'edit-city' ? defaultCityName : ''}
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
