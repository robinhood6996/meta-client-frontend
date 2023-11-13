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
  useUpdateEscortStatusDataMutation,
} from '../../../../redux/features/api/escorts/escortsApi'
import moment from 'moment'
import {Button} from 'react-bootstrap'
import {useLocation, useNavigate, useParams} from 'react-router-dom'
import {queryStringToObject} from '../../../../helpers/objectParamsConversion'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

const ActiveEscortsList = ({className}) => {
  const [deleteEscortUserName, setDeleteEscortUserName] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(null)
  const searchRef = useRef()
  const {search} = useLocation()
  const navigate = useNavigate()
  const limit = 20

  //api call
  const {data, isFetching, isError, isSuccess} = useGetAllEscortsQuery(query, {skip: !query})
  const [
    deleteEscort,
    {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete},
  ] = useDeleteSingleEscortMutation()
  const [
    updateStatus,
    {isLoading: isLoadingStatus, isError: isErrorStatus, isSuccess: isSuccessStatus},
  ] = useUpdateEscortStatusDataMutation()

  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/active-escorts?limit=${limit}&offset=0`)
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

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleDelete = () => {
    if (deleteEscortUserName !== '') {
      deleteEscort(deleteEscortUserName)
    }
    setDeleteModal(false)
  }

  const handleStatusChange = (option) => {
    updateStatus({id: option?.id, isActive: option?.isActive})
  }

  //toast
  useEffect(() => {
    if (!isLoadingStatus && !isErrorStatus && isSuccessStatus) {
      toast.success('Successfully updated status', {
        hideProgressBar: true,
        toastId: 'escortStatusSuccess',
      })
    }
    if (!isLoadingStatus && isErrorStatus && !isSuccessStatus) {
      toast.error('Failed to update status', {
        hideProgressBar: true,
        toastId: 'escortStatusError',
      })
    }
    return () => {
      setTimeout(() => {
        toast.dismiss('escortStatusSuccess')
        toast.dismiss('escortStatusError')
      }, 2000)
    }
  }, [isErrorStatus, isLoadingStatus, isSuccessStatus])

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
      navigate(`/active-escorts?limit=${limit}&offset=0&search=${searchText}`)
    } else {
      navigate(`/active-escorts?limit=${limit}&offset=0`)
    }
  }

  console.log(query)
  // console.log(location)

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
                placeholder='Search escort name'
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
              <div className={`card ${className}`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Active Escorts</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>
                      {data?.data?.length > 0 ? data?.data?.length : 0} Total Escorts
                    </span>
                  </h3>
                  {/* <div
                    className='card-toolbar'
                    data-bs-toggle='tooltip'
                    data-bs-placement='top'
                    data-bs-trigger='hover'
                    title='Click to add a user'
                  >
                    <a
                      href='/'
                      className='btn btn-sm btn-light-primary'
                      // data-bs-toggle='modal'
                      // data-bs-target='#kt_modal_invite_friends'
                    >
                      <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                      New Member
                    </a>
                  </div> */}
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
                          {/* <th className='w-25px'>
                            <div className='form-check form-check-sm form-check-custom form-check-solid'>
                              <input
                                className='form-check-input'
                                type='checkbox'
                                value='1'
                                data-kt-check='true'
                                data-kt-check-target='.widget-9-check'
                              />
                            </div>
                          </th> */}
                          <th className='min-w-150px'>Name</th>
                          <th className='min-w-140px'>Category</th>
                          <th className='min-w-120px'>Join Date</th>
                          <th className='min-w-120px'>Status</th>
                          <th className='min-w-100px text-end'>Actions</th>
                        </tr>
                      </thead>
                      {/* end::Table head */}
                      {/* begin::Table body */}
                      <tbody>
                        {data?.data?.map((escort, index) => {
                          return (
                            <>
                              <tr key={index}>
                                {/* <tsole  */}
                                <td>
                                  <div className='d-flex align-items-center'>
                                    <div className='symbol symbol-45px me-5'>
                                      <img
                                        src={`${process.env.REACT_APP_CUSTOM_BASE_URL}/esc/${escort?.profileImage}`}
                                        alt=''
                                      />
                                    </div>
                                    <div className='d-flex justify-content-start flex-column'>
                                      <a
                                        href='/'
                                        className='text-dark fw-bold text-hover-primary fs-6'
                                      >
                                        {escort?.name}
                                      </a>
                                      <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                        {escort?.email}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <a
                                    href='/'
                                    className='text-dark fw-bold text-hover-primary d-block fs-6'
                                  >
                                    {escort?.category?.toUpperCase()}
                                  </a>
                                  {/* <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                      VIP
                                    </span> */}
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2'>
                                      <span className='text-muted me-2 fs-7 fw-semibold'>
                                        {moment(escort?.createdAt).format('MMM Do YYYY, h:mm a')}
                                      </span>
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
                                        defaultChecked={escort?.isActive}
                                        onChange={() => {
                                          handleStatusChange({
                                            type: escort.category,
                                            isActive: !escort?.isActive,
                                            id: escort._id,
                                          })
                                        }}
                                      />
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className='d-flex justify-content-end flex-shrink-0'>
                                    {/* <button
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                      // onClick={handleEdit}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/art/art005.svg'
                                        className='svg-icon-3'
                                      />
                                    </button> */}
                                    <button
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                      onClick={() => {
                                        setDeleteEscortUserName(escort?.username)
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
          ) : (
            <NotFoundComponent type='Escorts List' />
          )}
        </>
      ) : (
        <ErrorComponent />
      )}
      {/* <ToastContainer /> */}
    </>
  )
}

export default ActiveEscortsList
