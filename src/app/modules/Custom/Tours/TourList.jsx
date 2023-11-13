import React, {Key, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import Loader from '../../../Components/Custom Components/common/Loader'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import moment from 'moment'
import {
  useDeleteSingleCityTourMutation,
  useGetAllCityToursQuery,
} from '../../../../redux/features/api/cityTourApi/cityTourApi'
import {useGetSingleEscortDetailsQuery} from '../../../../redux/features/api/escorts/escortsApi'
import DeleteModal from '../Common/DeleteModal'
import {toast} from 'react-toastify'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {queryStringToObject} from '../../../../helpers/objectParamsConversion'
import {Button} from 'react-bootstrap'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

const TourList = ({className}) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteTourId, setDeleteTourId] = useState('')
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(null)
  const searchRef = useRef()
  const {search} = useLocation()
  const navigate = useNavigate()
  const limit = 20

  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/tours?limit=${limit}&offset=0`)
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

  //api call
  const {data, isFetching, isError, isSuccess} = useGetAllCityToursQuery(query, {skip: !query})
  const [
    deleteSelectedTour,
    {isLoading: isLoadingDelete, isSuccess: isSuccessDelete, isError: isErrorDelete},
  ] = useDeleteSingleCityTourMutation()

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleDeleteTour = () => {
    if (
      deleteTourId !== null &&
      deleteTourId !== undefined &&
      deleteTourId !== '' &&
      deleteTourId?.length > 0
    ) {
      deleteSelectedTour(deleteTourId)
    }
    setDeleteModal(false)
  }

  //toast
  useEffect(() => {
    if (!isLoadingDelete && !isErrorDelete && isSuccessDelete) {
      toast.success('Successfully deleted tour', {
        hideProgressBar: true,
        toastId: 'tourDeleteSuccess',
      })
    }
    if (!isLoadingDelete && isErrorDelete && !isSuccessDelete) {
      toast.error('Failed to delete tour', {
        hideProgressBar: true,
        toastId: 'tourDeleteError',
      })
    }
    return () => {
      setTimeout(() => {
        toast.dismiss('tourDeleteSuccess')
        toast.dismiss('tourDeleteError')
      }, 2000)
    }
  }, [isErrorDelete, isLoadingDelete, isSuccessDelete])

  const handleSearch = (e) => {
    e.preventDefault()
    const searchText = searchRef.current.value
    if (searchText?.length > 0) {
      navigate(`/tours?limit=${limit}&offset=0&search=${searchText}`)
    } else {
      navigate(`/tours?limit=${limit}&offset=0`)
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
                placeholder='Search tour'
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
      {isFetching ? (
        <Loader />
      ) : !isFetching && !isError && isSuccess ? (
        <>
          {data?.data?.length > 0 ? (
            <>
              {
                <div className={`card ${className}`}>
                  {/* begin::Header */}
                  <div className='card-header border-0 pt-5'>
                    <h3 className='card-title align-items-start flex-column'>
                      <span className='card-label fw-bold fs-3 mb-1'>Escorts On Tour</span>
                      <span className='text-muted mt-1 fw-semibold fs-7'>
                        Total Tours: {data?.data?.length > 0 ? data?.data?.length : 0}
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
                            <th className='min-w-150px'>Title</th>
                            <th className='min-w-150px'>Author</th>
                            <th className='min-w-140px'>Create Date</th>
                            <th className='min-w-120px'>Expires</th>
                            <th className='min-w-120px'>Views</th>
                            <th className='min-w-100px text-end'>Actions</th>
                          </tr>
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody>
                          {data?.data?.map((ad, index) => {
                            return (
                              <>
                                <tr key={index}>
                                  <td>
                                    <div className='d-flex align-items-center'>
                                      <div className='d-flex justify-content-start flex-column'>
                                        <span className='text-dark fw-bold  fs-7'>{ad?.name}</span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className='d-flex align-items-center'>
                                      <div className='symbol symbol-45px me-5'>
                                        <img
                                          src={`${process.env.REACT_APP_CUSTOM_BASE_URL}/esc/${ad?.profileImage}`}
                                          alt=''
                                        />
                                      </div>
                                      <div className='d-flex justify-content-start flex-column'>
                                        <a
                                          href='/'
                                          className='text-dark fw-bold text-hover-primary fs-6'
                                        >
                                          {ad?.username}
                                        </a>
                                        <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                          {ad?.email}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className='d-flex flex-column w-100 me-2'>
                                      <div className='d-flex flex-stack mb-2'>
                                        <span className='text-muted me-2 fs-7 fw-semibold'>
                                          {moment(ad?.dateFrom).format('MMM Do YYYY, h:mm a')}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='text-end'>
                                    <div className='d-flex flex-column w-100 me-2'>
                                      <div className='d-flex flex-stack mb-2'>
                                        <span className='text-muted me-2 fs-7 fw-semibold'>
                                          {moment(ad?.dateTo).format('MMM Do YYYY, h:mm a')}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className='text-end'>
                                    <div className='d-flex flex-column w-100 me-2'>
                                      <div className='d-flex flex-stack mb-2'>
                                        <span className='text-muted me-2 fs-7 fw-semibold'>
                                          Active
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className='d-flex justify-content-end flex-shrink-0'>
                                      <a
                                        href='/'
                                        className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                      >
                                        <KTSVG
                                          path='/media/icons/duotune/art/art005.svg'
                                          className='svg-icon-3'
                                        />
                                      </a>
                                      <button
                                        className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
                                        onClick={() => {
                                          setDeleteTourId(ad?._id)
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
                        </tbody>
                        {/* end::Table body */}
                      </table>
                      {/* end::Table */}
                    </div>

                    {/* end::Table container */}
                  </div>

                  {/* begin::Body */}
                </div>
              }
            </>
          ) : (
            <NotFoundComponent type='Tour Data' />
          )}
        </>
      ) : (
        <ErrorComponent />
      )}
      {!isFetching && !isError && data?.data?.length && (
        <PaginationUrlQuery
          limit={limit}
          page={page}
          totalPage={Math.ceil(parseInt(data?.totalCount) / parseInt(limit))}
          dataLength={data?.data?.length}
        />
      )}
      <DeleteModal
        show={deleteModal}
        handleModal={handleDeleteModal}
        handleDelete={handleDeleteTour}
      />
    </>
  )
}

export default TourList
