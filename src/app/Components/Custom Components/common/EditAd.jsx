import React, {useEffect, useRef, useState} from 'react'
import {Button, Modal} from 'react-bootstrap'
import {KTSVG} from '../../../../_metronic/helpers'
import {useCreateAdMutation, useEditAdMutation} from '../../../../redux/features/api/adsAPI/adsAPI'
import {toast} from 'react-toastify'
import {useSelector} from 'react-redux'

// type Props = {
//   show: boolean
//   handleClose: () => void
//   type: string
// }

export default function EditAd({adData}) {
  const titleRef = useRef()
  const linkRef = useRef()
  const budgetRef = useRef()
  const durationRef = useRef()
  const spentRef = useRef()
  const statusRef = useRef()
  const [showModal, setShowModal] = useState(false)
  const handleEditModal = () => {
    setShowModal(!showModal)
  }
  const currentUser = useSelector((state) => state?.adminUser)
  //api call
  //   const {data, isFetching, isSuccess} = useGetAllCountryQuery(null)
  const [editAd, {isLoading: isLoadingCreate, isError: isErrorCreate, isSuccess: isSuccessCreate}] =
    useEditAdMutation()
  //   const [editCity, {isLoading: isLoadingEdit, isError: isErrorEdit, isSuccess: isSuccessEdit}] =
  //     useEditCityMutation()
  console.log('adData', adData)
  const handleModal = (e) => {
    e.preventDefault()
    const title = titleRef.current.value
    const link = linkRef.current.value
    const budget = budgetRef.current.value
    const duration = durationRef.current.value
    const status = statusRef.current.value
    const spentAmount = spentRef.current.value
    if (title && link && budget && duration) {
      if (status === 'default') {
        editAd({projectId: adData?._id, data: {title, link, budget, duration, spentAmount}})
      } else {
        editAd({projectId: adData?._id, data: {title, link, budget, duration, status, spentAmount}})
      }
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
    handleEditModal()
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
          <h2>{'Edit Ad'}</h2>
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
                defaultValue={adData?.title}
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
                defaultValue={adData?.link}
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
                type='number'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Budget in USD'
                defaultValue={adData?.budget}
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
                type='number'
                className='form-control form-control-lg form-control-solid'
                name='ad-title'
                placeholder='Duration in days'
                defaultValue={adData?.duration}
              />
            </div>
            {currentUser?.user?.role === 'user' && (
              <>
                <div className='fv-row mb-10'>
                  <label className='d-flex align-items-center fs-5 fw-semibold mb-2'>
                    <span className='required'>Spent Amount</span>
                    <i
                      className='fas fa-exclamation-circle ms-2 fs-7'
                      data-bs-toggle='tooltip'
                      title='Link of the post which you want to advertise'
                    ></i>
                  </label>
                  <input
                    ref={spentRef}
                    type='text'
                    className='form-control form-control-lg form-control-solid'
                    name='ad-title'
                    placeholder='Budget in USD'
                    defaultValue={adData?.spentAmount ?? 0}
                  />
                </div>

                <div className='fv-row mb-10'>
                  <label>Status</label>
                  <select
                    ref={statusRef}
                    className='form-select form-select-sm form-select-solid'
                    data-control='select2'
                    data-placeholder='Latest'
                    data-hide-search='true'
                    onChange={(e) => console.log(e.target.value)}
                  >
                    <option value={'default'}>Status</option>
                    <option value={'active'}>Active</option>
                    <option value={'pending'}>Pending</option>
                    <option value={'reject'}>Reject</option>
                    <option value={'not-delivered'}>Not Delivered</option>
                  </select>
                </div>
              </>
            )}
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
