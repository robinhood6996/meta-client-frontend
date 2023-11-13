import React, {Key, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import DeleteModal from '../Common/DeleteModal'
import Loader from '../../../Components/Custom Components/common/Loader'
import {ToastContainer, toast} from 'react-toastify'
import {
  useDeleteSingleEscortMutation,
  useGetAllEscortsQuery,
} from '../../../../redux/features/api/escorts/escortsApi'
import moment from 'moment'
import ImageModal from '../Common/ImageModal'
import {useGetAllRatingsQuery} from '../../../../redux/features/api/rating/ratingApi'
import {useLocation, useNavigate} from 'react-router-dom'
import {queryStringToObject} from '../../../../helpers/objectParamsConversion'
import {Button} from 'react-bootstrap'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

const ReviewsList = ({className}) => {
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const [deleteEscortUserName, setDeleteEscortUserName] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const limit = 20
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState({})
  const searchRef = useRef()
  const {search} = useLocation()
  const navigate = useNavigate()

  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/reviews?limit=${limit}&offset=0`)
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
  const {data, isFetching, isError, isSuccess} = useGetAllRatingsQuery(query)
  const [
    deleteEscort,
    {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete},
  ] = useDeleteSingleEscortMutation()

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleDelete = () => {
    if (deleteEscortUserName !== '') {
      deleteEscort(deleteEscortUserName)
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

  const handleSearch = (e) => {
    e.preventDefault()
    const searchText = searchRef.current.value
    if (searchText?.length > 0) {
      navigate(`/reviews?limit=${limit}&offset=0&search=${searchText}`)
    } else {
      navigate(`/reviews?limit=${limit}&offset=0`)
    }
  }

  return (
    <>
      <div className='card card-xxl-stretch mb-5 mb-xl-8'>
        <form
          action=''
          onSubmit={(e) => {
            handleSearch(e)
          }}
        >
          <div className='row p-3'>
            <div className='col-lg-3 col-md-4 col-6'>
              <input
                ref={searchRef}
                className='form-control form-control-lg form-control-solid border border-secondary'
                placeholder='Search review'
                type='text'
                autoComplete='off'
              />
            </div>
            <div className='col-lg-1 col-md-4 col-6'>
              <Button
                type='submit'
                // onClick={() => setShowCreateModal(true)}
                className='btn fw-bold btn-primary'
                data-bs-toggle='modal'
                data-bs-target='#kt_modal_create_app'
              >
                Search
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Reviews</span>
            <span className='text-muted mt-1 fw-semibold fs-7'>
              {data?.data?.length > 0 ? data?.data?.length : 0} Total Reviews
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
                  <th className='min-w-130px'>Date</th>
                  <th className='min-w-130px'>Customer Name</th>
                  <th className='min-w-110px'>Escort Username</th>
                  <th className='min-w-120px'>Meeting City</th>
                  <th className='min-w-200px'>Services</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {isFetching ? (
                  <Loader />
                ) : !isFetching && !isError && isSuccess ? (
                  <>
                    {data?.data?.length > 0 ? (
                      <>
                        {data?.data?.map((review, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div className='d-flex justify-content-start flex-column'>
                                      <a
                                        href='/'
                                        className='text-dark fw-bold text-hover-primary fs-6'
                                      >
                                        {moment(review?.updatedAt).format('MMM Do YYYY')}
                                      </a>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div className='d-flex justify-content-start flex-column'>
                                      <a
                                        href='/'
                                        className='text-dark fw-bold text-hover-primary fs-6'
                                      >
                                        {review?.customerDetails?.username}
                                      </a>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <a
                                    href='/'
                                    className='text-dark fw-bold text-hover-primary d-block fs-6'
                                  >
                                    {review?.escortDetails?.username}
                                  </a>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2'>
                                      {review?.meetingCity?.toUpperCase()}
                                    </div>
                                  </div>
                                </td>
                                <td className='text-start'>{review?.serviceRate}/10</td>
                                <td>
                                  <div className='d-flex justify-content-end flex-shrink-0'>
                                    <button className='btn btn-bg-light btn-active-color-primary btn-sm me-2'>
                                      Go to reviews
                                    </button>
                                    <button
                                      className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
                                      onClick={() => {
                                        // setDeleteAdId(ad?._id)
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
                      ''
                    )}
                  </>
                ) : (
                  <ErrorComponent />
                )}
              </tbody>
              {/* end::Table body */}
            </table>
            {/* end::Table */}
            {data?.data?.length > 0 && (
              <PaginationUrlQuery
                limit={limit}
                page={page}
                totalPage={50 / limit}
                dataLength={40}
              />
            )}
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
    </>
  )
}

export default ReviewsList
