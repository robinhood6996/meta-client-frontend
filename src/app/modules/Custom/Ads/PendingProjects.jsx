import {useEffect, useRef, useState} from 'react'
import {Button} from 'react-bootstrap'
import Moment from 'react-moment'
import {useLocation, useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {KTSVG} from '../../../../_metronic/helpers'
import {queryStringToObject} from '../../../../helpers/objectParamsConversion'
import {useGeActiveAdsQuery} from '../../../../redux/features/api/adsAPI/adsAPI'
// import 'flatpickr/dist/themes/material_green.css'

import {
  useDeleteSingleEscortMutation,
  useUpdateEscortStatusDataMutation,
} from '../../../../redux/features/api/escorts/escortsApi'
import CreateProject from '../../../Components/Custom Components/common/CreateAd'
import DeleteModal from '../Common/DeleteModal'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'
import ProjectFilter from '../../../Components/Custom Components/common/ProjectFilter'
import EditAd from '../../../Components/Custom Components/common/EditAd'
import StatusButton from '../../../Components/Custom Components/common/StatusButton'

const PendingProjects = ({className}) => {
  const [deleteEscortUserName, setDeleteEscortUserName] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(null)

  const {search} = useLocation()
  const navigate = useNavigate()
  const limit = 20
  const [showCreate, setShowCreate] = useState(false)
  const handleClose = () => {
    setShowCreate(!showCreate)
  }

  //api call
  const {data, isFetching, isError, isSuccess} = useGeActiveAdsQuery(query, {skip: !query})
  const [
    deleteEscort,
    {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete},
  ] = useDeleteSingleEscortMutation()
  const [
    updateStatus,
    {isLoading: isLoadingStatus, isError: isErrorStatus, isSuccess: isSuccessStatus},
  ] = useUpdateEscortStatusDataMutation()
  console.log('data', data)
  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/pending-ads?limit=${limit}&offset=0&status=pending`)
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

  // useEffect(() => {
  //   let params = queryStringToObject(search)
  //   if (dateState.date1 && dateState.date2 && dateState.date2 !== 'NaN-NaN-NaN') {
  //     params.startDate = dateState.date1
  //     params.endDate = dateState.date2
  //   }
  //   setQuery(params)
  // }, [search, navigate, limit, dateState])

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

  return (
    <>
      <ProjectFilter limit={limit} />
      <div className={`card ${className}`}>
        {/* begin::Header */}
        <div className='card-header border-0 pt-5 d-flex'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Active</span>
          </h3>
          <Button
            type='button'
            onClick={() => setShowCreate(true)}
            className='btn btn-sm fw-bold btn-primary'
          >
            Create New
          </Button>
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
                  <th className='min-w-150px'>Desc.</th>
                  <th className='min-w-150px'>Budget</th>
                  <th className='min-w-140px'>Duration</th>
                  <th className='min-w-120px'>Spent</th>
                  <th className='min-w-120px'>Spent in Tk</th>
                  <th className='min-w-120px'>Dates</th>
                  <th className='min-w-120px'>Status</th>
                  <th className='min-w-100px text-end'>Actions</th>
                </tr>
              </thead>
              {/* end::Table head */}
              {/* begin::Table body */}
              <tbody>
                {data?.projects?.map((ad, index) => {
                  return (
                    <>
                      <tr key={index}>
                        <td>
                          <span>{index + 1}</span>
                        </td>
                        {/* <tsole  */}
                        <td>
                          <div className='d-flex align-items-center'>
                            <div className='d-flex justify-content-start flex-column'>
                              <a href='/' className='text-dark fw-bold text-hover-primary fs-6'>
                                {ad?.title}
                              </a>
                              <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                {ad?.user?.name}({ad?.user?.email})
                              </span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <a href='/' className='text-dark fw-bold text-hover-primary d-block fs-6'>
                            {ad?.link}
                          </a>
                        </td>
                        <td className='text-start'>
                          <div className='d-flex flex-column w-100 me-2'>
                            <div className='d-flex flex-stack mb-2'>
                              <span className='text-muted me-2 fs-7 fw-semibold'>
                                {ad?.description}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='text-start'>
                          <div className='d-flex flex-column w-100 me-2'>
                            <div className='d-flex flex-stack mb-2'>
                              <span className='text-muted me-2 fs-7 fw-semibold'>
                                {ad?.budget} $
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='text-start'>
                          <div className='d-flex flex-column w-100 me-2'>
                            <div className='d-flex flex-stack mb-2'>
                              <span className='text-muted me-2 fs-7 fw-semibold'>
                                {ad?.duration} Days
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='text-start'>
                          <div className='d-flex flex-column w-100 me-2'>
                            <div className='d-flex flex-stack mb-2'>
                              <span className='text-muted me-2 fs-7 fw-semibold'>
                                {ad?.spentAmount ?? 0} $
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='text-start'>
                          <div className='d-flex flex-column w-100 me-2'>
                            <div className='d-flex flex-stack mb-2'>
                              <span className='text-muted me-2 fs-7 fw-semibold'>
                                {(ad?.spentAmount ?? 0) * 140} Tk
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='text-end'>
                          <div className='d-flex flex-column w-100 me-2'>
                            <div className='d-flex flex-stack mb-2'>
                              <span className='text-muted me-2 fs-7 fw-semibold'>
                                Created:{' '}
                                {ad?.createdAt && (
                                  <Moment
                                    interval={30000}
                                    format='DD-MM-YYYY HH:mm'
                                    // tz='Asia/Dhaka'
                                  >
                                    {ad?.createdAt}
                                  </Moment>
                                )}{' '}
                                <br />
                                Updated:{' '}
                                <Moment
                                  interval={30000}
                                  format='DD-MM-YYYY HH:mm'
                                  // tz='Asia/Dhaka'
                                >
                                  {ad?.updatedAt}
                                </Moment>
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className='text-start'>
                          <StatusButton status={ad?.status} />
                        </td>
                        <td>
                          <div className='d-flex justify-content-end flex-shrink-0 gap-1'>
                            <EditAd adData={ad} />
                            <button
                              className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                              onClick={() => {
                                // setDeleteEscortUserName(escort?.username)
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
          <div className='mt-2'>
            <PaginationUrlQuery
              limit={limit}
              page={page}
              dataLength={data?.meta?.resultCount}
              totalCount={data?.meta?.totalCount}
            />
          </div>
        </div>
        <DeleteModal
          show={deleteModal}
          handleModal={handleDeleteModal}
          handleDelete={handleDelete}
        />
        <CreateProject show={showCreate} handleClose={handleClose} type={'create'} />
        {/* begin::Body */}
      </div>
    </>
  )
}

export default PendingProjects
