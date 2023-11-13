import React, {useEffect, useRef, useState} from 'react'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import Loader from '../../../Components/Custom Components/common/Loader'
import {toast} from 'react-toastify'
import {useDeleteSingleEscortMutation} from '../../../../redux/features/api/escorts/escortsApi'
import moment from 'moment'
import EscortAdReceiptModal from '../Escort Ads/EscortAdReceiptModal'
import {Button} from 'react-bootstrap'
import {useGetAllBannersQuery} from '../../../../redux/features/api/bannerAdvertising/bannerApi'
import {useLocation, useNavigate} from 'react-router-dom'
import {objectToParam, queryStringToObject} from '../../../../helpers/objectParamsConversion'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

const ActiveBannerAdvertisementList = ({className}) => {
  const limit = 20
  const [page, setPage] = useState(1)
  const [showImageModal, setShowImageModal] = useState(false)
  const [deleteEscortUserName, setDeleteEscortUserName] = useState('')
  const [receiptModal, setReceiptModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [receiptData, setReceiptData] = useState('')
  const searchRef = useRef()
  const [query, setQuery] = useState(null)
  const {search} = useLocation()
  const navigate = useNavigate()

  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(
        `/active-escort-banner-advertisement?active=true&expired=false&limit=${limit}&offset=0`
      )
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
  const {data, isFetching, isError, isSuccess} = useGetAllBannersQuery(query, {skip: !query})

  const handleReceiptModal = () => {
    setReceiptModal(!receiptModal)
  }

  const paymentTypeOptions = [
    {
      label: 'Card',
      value: 'card',
    },
    {
      label: 'Bank',
      value: 'bank',
    },
  ]
  const packageTypeOptions = [
    {
      label: 'Profile Top',
      value: 'profile',
    },
    {
      label: 'Left sidebar',
      value: 'left',
    },
    {
      label: 'Right sidebar',
      value: 'right',
    },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    const searchText = searchRef.current.value
    if (searchText?.length > 0) {
      navigate(
        `/active-escort-banner-advertisement?active=true&expired=false&limit=${limit}&offset=0&search=${searchText}`
      )
    } else {
      navigate(
        `/active-escort-banner-advertisement?active=true&expired=false&limit=${limit}&offset=0`
      )
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
          <div className='row p-3 align-items-center'>
            <div className='col-lg-3 col-md-4 col-12'>
              <input
                ref={searchRef}
                className='form-control form-control-lg form-control-solid border border-secondary'
                placeholder='Search email'
                type='text'
                autoComplete='off'
              />
            </div>
            <div className='col-lg-2 col-md-4 col-6'>
              <select
                className='form-select'
                aria-label='Select example'
                onChange={(e) => {
                  let oldQ = {...query}
                  if (e.target.value !== 'default') {
                    oldQ.payment = e.target.value
                    navigate(`/active-escort-banner-advertisement?${objectToParam(oldQ)}`)
                    return oldQ
                  } else {
                    delete oldQ.payment
                    navigate(`/active-escort-banner-advertisement?${objectToParam(oldQ)}`)
                    return oldQ
                  }
                }}
              >
                <option value={'default'}>Select payment type</option>
                {paymentTypeOptions?.map((option, index) => {
                  return (
                    <option key={index} value={option?.value}>
                      {option?.label}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='col-lg-2 col-md-4 col-6'>
              <select
                className='form-select'
                aria-label='Select example'
                onChange={(e) => {
                  let oldQ = {...query}
                  if (e.target.value !== 'default') {
                    oldQ.package = e.target.value
                    navigate(`/active-escort-banner-advertisement?${objectToParam(oldQ)}`)
                    return oldQ
                  } else {
                    delete oldQ.package
                    navigate(`/active-escort-banner-advertisement?${objectToParam(oldQ)}`)
                    return oldQ
                  }
                }}
              >
                <option value={'default'}>Select package type</option>
                {packageTypeOptions?.map((option, index) => {
                  return (
                    <option key={index} value={option?.value}>
                      {option?.label}
                    </option>
                  )
                })}
              </select>
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
                    <span className='card-label fw-bold fs-3 mb-1'>Active Banners</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>
                      {data?.data?.length > 0 ? data?.data?.length : 0} Total Escorts
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
                          <th className='min-w-130px'>Name</th>
                          <th className='min-w-120px'>Email</th>
                          <th className='min-w-120px'>Date</th>
                          <th className='min-w-100px'>Payment Type</th>
                          <th className='min-w-100px'>Price</th>
                          <th className='min-w-100px'>Package Type</th>
                          <th className='min-w-100px'>Transaction ID</th>
                          <th className='min-w-100px'>Payment Status</th>
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
                                      <a
                                        href='/'
                                        className='text-dark fw-bold text-hover-primary fs-6'
                                      >
                                        {ad?.name}
                                      </a>
                                    </div>
                                  </div>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2'>{ad?.email}</div>
                                  </div>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2'>
                                      {moment(ad?.createdAt).format('MMM Do YYYY, h:mm a')}
                                    </div>
                                  </div>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2 fw-bold'>
                                      {ad?.isBank ? 'Bank' : 'Card'}
                                    </div>
                                  </div>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2 fw-bold'>
                                      € {ad?.payAmount}
                                    </div>
                                  </div>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2 fw-bold'>
                                      {ad?.position === 'profile'
                                        ? 'Profile Top'
                                        : ad?.position === 'left'
                                        ? 'Left sidebar'
                                        : 'Right sidebar'}
                                    </div>
                                  </div>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2 fw-bold'>
                                      {ad?.paymentDetails?.paymentIntentId}
                                    </div>
                                  </div>
                                </td>
                                <td className='text-end'>
                                  <div className='d-flex flex-column w-100 me-2'>
                                    <div className='d-flex flex-stack mb-2'>
                                      {ad?.isPaid ? (
                                        <span className='badge badge-success'>Paid</span>
                                      ) : (
                                        <span className='badge badge-warning'>Pending</span>
                                      )}
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className='d-flex justify-content-end flex-shrink-0'>
                                    {ad?.paymentMedia === 'bank' && (
                                      <button
                                        className='btn btn-primary btn-sm me-1'
                                        onClick={() => {
                                          setReceiptData(ad?.paymentDetails)
                                          setReceiptModal(true)
                                        }}
                                      >
                                        View Receipt
                                      </button>
                                    )}
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
            </>
          ) : (
            <NotFoundComponent type='Escorts List' />
          )}
        </>
      ) : (
        <ErrorComponent />
      )}
      {!isFetching && !isError && data?.data?.length > 0 && (
        <PaginationUrlQuery
          limit={limit}
          page={page}
          totalPage={Math.ceil(parseInt(data?.totalCount) / parseInt(limit))}
          dataLength={data?.data?.length}
        />
      )}

      <EscortAdReceiptModal
        show={receiptModal}
        handleClose={handleReceiptModal}
        data={receiptData}
      />
    </>
  )
}

export default ActiveBannerAdvertisementList
