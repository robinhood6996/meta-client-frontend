import React, { Key, useEffect, useRef, useState } from 'react'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import DeleteModal from '../Common/DeleteModal'
import Loader from '../../../Components/Custom Components/common/Loader'
import { ToastContainer, toast } from 'react-toastify'
import {
  useDeleteSingleEscortMutation,
  useGetAllEscortsQuery,
  useUpdateEscortStatusDataMutation,
} from '../../../../redux/features/api/escorts/escortsApi'
import moment from 'moment'
import { Button } from 'react-bootstrap'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { queryStringToObject } from '../../../../helpers/objectParamsConversion'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

const ActiveEscortsList = ({ className }) => {
  const [deleteEscortUserName, setDeleteEscortUserName] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(null)
  const searchRef = useRef()
  const { search } = useLocation()
  const navigate = useNavigate()
  const limit = 20

  //api call
  const { data, isFetching, isError, isSuccess } = useGetAllEscortsQuery(query, { skip: !query })
  const [
    deleteEscort,
    { isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete },
  ] = useDeleteSingleEscortMutation()
  const [
    updateStatus,
    { isLoading: isLoadingStatus, isError: isErrorStatus, isSuccess: isSuccessStatus },
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
    updateStatus({ id: option?.id, isActive: option?.isActive })
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
        <div className={`card ${className}`}>
          {/* begin::Header */}
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Active</span>
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
                    <th className='min-w-150px'>Serial</th>
                    <th className='min-w-150px'>Name</th>
                    <th className='min-w-150px'>Link</th>
                    <th className='min-w-150px'>Budget</th>
                    <th className='min-w-140px'>Duration</th>
                    <th className='min-w-120px'>Spent</th>
                    <th className='min-w-120px'>Spent in Tk</th>
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
                          <td>
                            <span>
                              {index + 1}
                            </span>
                          </td>
                          {/* <tsole  */}
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='d-flex justify-content-start flex-column'>
                                <a
                                  href='/'
                                  className='text-dark fw-bold text-hover-primary fs-6'
                                >
                                  Ashraf Mahmud
                                </a>
                                <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                  ashrut444@gmail.com
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <a
                              href='/'
                              className='text-dark fw-bold text-hover-primary d-block fs-6'
                            >
                              https://www.facebook.com/your.aktaruzzaman.sam
                            </a>

                          </td>
                          <td className='text-end'>
                            <div className='d-flex flex-column w-100 me-2'>
                              <div className='d-flex flex-stack mb-2'>
                                <span className='text-muted me-2 fs-7 fw-semibold'>
                                  200 $
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className='text-end'>
                            <div className='d-flex flex-column w-100 me-2'>
                              <div className='d-flex flex-stack mb-2'>
                                <span className='text-muted me-2 fs-7 fw-semibold'>
                                  7 Days
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className='text-end'>
                            <div className='d-flex flex-column w-100 me-2'>
                              <div className='d-flex flex-stack mb-2'>
                                <span className='text-muted me-2 fs-7 fw-semibold'>
                                  190 $
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className='text-end'>
                            <div className='d-flex flex-column w-100 me-2'>
                              <div className='d-flex flex-stack mb-2'>
                                <span className='text-muted me-2 fs-7 fw-semibold'>
                                  24700 Tk
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='d-flex justify-content-end flex-shrink-0'>
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
      </>
  )
}

export default ActiveEscortsList
