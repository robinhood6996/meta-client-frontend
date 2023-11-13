import React, {useEffect, useRef, useState} from 'react'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'
import DeleteModal from '../Common/DeleteModal'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import {KTSVG} from '../../../../_metronic/helpers'
import {useLocation, useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import {queryStringToObject} from '../../../../helpers/objectParamsConversion'
import {
  useDeleteVerificationMutation,
  useUpdateVerificationMutation,
} from '../../../../redux/features/api/verification/verificationApi'
import {
  useDeleteReportMutation,
  useGetPendingReportsQuery,
  useUpdateReportMutation,
} from '../../../../redux/features/api/reports/reportsApi'
import {toast} from 'react-toastify'
import Loader from '../../../Components/Custom Components/common/Loader'

export default function PendingReportList({className}) {
  const navigate = useNavigate()
  const searchRef = useRef(null)
  const limit = 30
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const [deleteEscortUserId, setDeleteEscortUserId] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(null)
  const {search} = useLocation()

  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/pending-reports?limit=${limit}&offset=0`)
    } else {
      let params = queryStringToObject(search)
      const offset = parseInt(params.offset)
      if (offset === 0) {
        setPage(1)
      } else {
        let pg = offset / limit
        if (pg === 1) {
          setPage(2)
        } else {
          setPage(pg + 1)
        }
      }
      setQuery(queryStringToObject(search))
    }
  }, [search, navigate, limit])

  const handleImageModal = () => {
    setShowImageModal(!showImageModal)
  }

  //api call
  const [
    updateReport,
    {data: repostsData, isLoading: verificationLoading, isSuccess: vSuccess, isError: vIsError},
  ] = useUpdateReportMutation()
  const {data, isFetching, isError, isSuccess} = useGetPendingReportsQuery(query, {skip: !query})
  const [
    deleteVerification,
    {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete},
  ] = useDeleteReportMutation()

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }
  console.log('data', data)
  const handleDelete = () => {
    if (deleteEscortUserId !== '') {
      deleteVerification(deleteEscortUserId)
    }
    setDeleteModal(false)
  }

  //toast
  useEffect(() => {
    if (!isLoadingDelete && !isErrorDelete && isSuccessDelete) {
      toast.success('Successfully deleted escort', {
        hideProgressBar: true,
        toastId: 'escortDeleteSuccess',
      })
    }
    if (!isLoadingDelete && isErrorDelete && !isSuccessDelete) {
      toast.error('Failed to deleted escort', {
        hideProgressBar: true,
        toastId: 'escortDeleteError',
      })
    }
    return () => {
      setTimeout(() => {
        toast.dismiss('escortDeleteSuccess')
        toast.dismiss('escortDeleteError')
      }, 2000)
    }
  }, [isErrorDelete, isLoadingDelete, isSuccessDelete])

  //toast
  useEffect(() => {
    if (!verificationLoading && !vIsError && vSuccess) {
      toast.success('Successfully updated', {
        hideProgressBar: true,
      })
    }
    if (!verificationLoading && vIsError && !vSuccess) {
      toast.error('Failed to update verification', {
        hideProgressBar: true,
      })
    }
  }, [vIsError, vSuccess, verificationLoading])
  const handleSearch = (e) => {
    e.preventDefault()
    const searchText = searchRef.current.value ?? ''
    if (searchText?.length > 0) {
      navigate(`/pending-reports?limit=${limit}&offset=0&search=${searchText}`)
    } else {
      navigate(`/pending-reports?limit=${limit}&offset=0`)
    }
  }
  return (
    <>
      <form
        action=''
        onSubmit={(e) => {
          handleSearch(e)
        }}
      >
        <div className='card card-xxl-stretch mb-5 mb-xl-8'>
          <div className='row p-3 align-items-center'>
            <div className='col-lg-6 col-md-6 col-6'>
              <input
                ref={searchRef}
                className='form-control form-control-lg form-control-solid border border-secondary'
                placeholder='Search request'
                type='text'
                autoComplete='off'
              />
            </div>
            <div className='col-lg-1 col-md-4 col-6'>
              <Button
                type='submit'
                className='btn fw-bold btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_create_app'
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      </form>

      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Pending fake photo report list</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>
              {data?.fakePhotos?.length > 0 ? data?.fakePhotos?.length : 0} Total Escorts
            </span>
          </h3>
        </div>
        {/* end::Header */}
        {/* begin::Body */}
        <div className='card-body py-3'>
          {/* begin::Table container */}
          <div className='table-responsive'>
            {/* begin::Table */}
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
              {/* begin::Table head */}
              <thead>
                <tr className='fw-bold text-muted'>
                  <th className='min-w-100px'>Escort Name</th>
                  <th className='min-w-100px'>Reporter Name</th>
                  <th className='min-w-200px text-start'>Comment</th>
                  <th className='min-w-50px text-start'>Status</th>
                  <th className='min-w-120px text-start'>Profiles</th>
                  <th className='min-w-100px text-start'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {isFetching ? (
                  <div className='d-flex align-items-center justify-content-around'>
                    <Loader />
                  </div>
                ) : !isFetching && !isError && isSuccess ? (
                  <>
                    {data?.fakePhotos?.length > 0 ? (
                      <>
                        {data?.fakePhotos?.map((fakePhoto, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div className='d-flex justify-content-start flex-column'>
                                      <p className='text-dark fw-bold text-hover-primary fs-6'>
                                        {fakePhoto?.name}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <p className='text-dark fw-bold text-hover-primary fs-6'>
                                    {fakePhoto?.reporterName}
                                  </p>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2'>
                                      {fakePhoto?.comment}
                                    </div>
                                  </div>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='form-check form-switch form-check-custom form-check-solid'>
                                      <input
                                        className='form-check-input h-20px w-30px'
                                        type='checkbox'
                                        id='flexSwitchDefault'
                                        onChange={() =>
                                          updateReport({
                                            id: fakePhoto?._id,
                                            suspicious: true,
                                          })
                                        }
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td className='text-start'>
                                  <div className='w-100 me-2'>
                                    <a
                                      href={`${process.env.REACT_APP_FRONTEND_URL}/escort/profile/${fakePhoto?.username}/overview`}
                                      target='_blank'
                                      rel='noreferrer'
                                      className='btn btn-bg-light btn-active-color-primary btn-sm'
                                      onClick={() => {
                                        // setDeleteEscortUserId(escort?._id)
                                      }}
                                    >
                                      Escort Profile
                                    </a>
                                    <br />
                                    {/* <button
                                      className='btn mt-1 btn-bg-light btn-active-color-primary btn-sm'
                                      onClick={() => {
                                        // setDeleteEscortUserId(escort?._id)
                                      }}
                                    >
                                      User Profile
                                    </button> */}
                                  </div>
                                </td>
                                <td>
                                  <div className='d-flex justify-content-start flex-shrink-0'>
                                    <button
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                      onClick={() => {
                                        setDeleteEscortUserId(fakePhoto?._id)
                                        handleDeleteModal()
                                      }}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen027.svg'
                                        className='svg-icon-3'
                                      />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            </>
                          )
                        })}
                      </>
                    ) : (
                      // <NotFoundComponent type='request' />
                      <></>
                    )}
                  </>
                ) : (
                  !isFetching && isError && <ErrorComponent />
                )}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
          </div>

          {/* end::Table container */}
        </div>
        <DeleteModal
          show={deleteModal}
          handleModal={handleDeleteModal}
          handleDelete={handleDelete}
        />
        {/* begin::Body */}
      </div>
      {!isFetching && !isError && data?.data?.length && (
        <PaginationUrlQuery
          limit={limit}
          page={page}
          totalPage={Math.ceil(parseInt(data?.totalCount) / parseInt(limit))}
          dataLength={data?.data?.length}
        />
      )}
    </>
  )
}
