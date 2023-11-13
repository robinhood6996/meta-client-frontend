import React, {Key, useEffect, useRef, useState} from 'react'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import Loader from '../../../Components/Custom Components/common/Loader'
import {
  useDeleteSingleEscortMutation,
  useGetFeaturedEscortsQuery,
} from '../../../../redux/features/api/escorts/escortsApi'
import moment from 'moment'
import ImageModal from '../Common/ImageModal'
import EscortAdReceiptModal from '../Escort Ads/EscortAdReceiptModal'
import {Button} from 'react-bootstrap'
import {toast} from 'react-toastify'
import {
  useGetAllBannersQuery,
  useUpdateBannerMutation,
} from '../../../../redux/features/api/bannerAdvertising/bannerApi'

type Props = {
  className: string
}

const PendingBannerAdvertisementList: React.FC<Props> = ({className}) => {
  const [showImageModal, setShowImageModal] = useState(false)
  const [selectedImageURL, setSelectedImageURL] = useState('')
  const [deleteEscortUserName, setDeleteEscortUserName] = useState<string>('')
  const [receiptModal, setReceiptModal] = useState<boolean>(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [receiptData, setReceiptData] = useState<string>('')
  const searchRef = useRef<any>()
  const [query, setQuery] = useState<any>({active: false, expired: false, limit: 50, offset: 0})
  const handleImageModal = () => {
    setShowImageModal(!showImageModal)
  }
  //api call
  const {data, isFetching, isError, isSuccess} = useGetAllBannersQuery(query, {skip: !query})
  const [
    deleteEscort,
    {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete},
  ] = useDeleteSingleEscortMutation()
  const [updateBanner, {}] = useUpdateBannerMutation()
  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleDelete = () => {
    if (deleteEscortUserName !== '') {
      deleteEscort(deleteEscortUserName)
    }
    setDeleteModal(false)
  }

  const handleReceiptModal = () => {
    setReceiptModal(!receiptModal)
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
  return (
    <>
      <div className='card card-xxl-stretch mb-5 mb-xl-8'>
        <div className='row p-3 align-items-center'>
          <div className='col-lg-3 col-md-4 col-12'>
            <input
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
                setQuery((prev: any) => {
                  let oldQ = {...prev}
                  if (e.target.value !== 'default') {
                    oldQ.payment = e.target.value
                    return oldQ
                  } else {
                    delete oldQ.payment
                    return oldQ
                  }
                })
              }}
            >
              <option value={'default'}>Select payment type</option>
              {paymentTypeOptions?.map((option: {label: string; value: string}, index: Key) => {
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
                setQuery((prev: any) => {
                  let oldQ = {...prev}
                  if (e.target.value !== 'default') {
                    oldQ.package = e.target.value
                    return oldQ
                  } else {
                    delete oldQ.package
                    return oldQ
                  }
                })
              }}
            >
              <option value={'default'}>Select package type</option>
              {packageTypeOptions?.map((option: {label: string; value: string}, index: Key) => {
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
              // onClick={() => setShowCreateModal(true)}
              className='btn fw-bold btn-primary'
              data-bs-toggle='modal'
              data-bs-target='#kt_modal_create_app'
            >
              Search
            </Button>
          </div>
          {/* <div className='col-lg-2 col-md-4 col-6'>
                    <Button
                      // onClick={() => setShowCreateModal(true)}
                      className='btn fw-bold btn-primary'
                      data-bs-toggle='modal'
                      data-bs-target='#kt_modal_create_app'
                    >
                      <KTSVG path='media/icons/duotune/arrows/arr075.svg' className='svg-icon-3' />
                      Create User
                    </Button>
                  </div> */}
        </div>
      </div>
      {isFetching ? (
        <Loader />
      ) : !isFetching && !isError && isSuccess ? (
        <>
          {data?.banners?.length > 0 ? (
            <>
              <div className={`card ${className}`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Pending Banners</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>
                      {data?.ads?.length ?? 0} Total Escorts
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
                          <th className='min-w-100px'>Status</th>
                          <th className='min-w-100px text-end'>Actions</th>
                        </tr>
                      </thead>
                      {/* end::Table head */}
                      {/* begin::Table body */}
                      <tbody>
                        {data?.banners?.map(
                          (
                            ad: {
                              _id: string
                              name: string
                              email: string
                              status: string
                              createdAt: string
                              profileImage: string
                              username: string
                              photos: any
                              paymentDetails: any
                              isBank: boolean
                              isPaid: boolean
                              payAmount: number
                              packageType: number
                              active: boolean
                            },
                            index: Key
                          ) => {
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
                                        {ad?.packageType === 1
                                          ? 'VIP'
                                          : ad?.packageType === 2
                                          ? 'Featured'
                                          : ad?.packageType === 3
                                          ? 'Girl of the month'
                                          : 'GOd of Dick'}
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
                                  <td className='text-end'>
                                    <div className='d-flex flex-column w-100 me-2'>
                                      <div className='form-check form-switch form-check-custom form-check-solid'>
                                        <input
                                          className='form-check-input h-20px w-30px'
                                          type='checkbox'
                                          id='flexSwitchDefault'
                                          defaultChecked={ad?.active}
                                          onChange={() => {
                                            updateBanner({
                                              bannerId: ad._id,
                                              active: true,
                                              isPaid: true,
                                            })
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <div className='d-flex justify-content-end flex-shrink-0'>
                                      <button
                                        className='btn btn-primary btn-sm me-1'
                                        onClick={() => {
                                          setReceiptData(ad?.paymentDetails)
                                          setReceiptModal(true)
                                        }}
                                      >
                                        View Receipt
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </>
                            )
                          }
                        )}
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
      <ImageModal
        show={showImageModal}
        handleClose={handleImageModal}
        imageURL={selectedImageURL}
      />
      <EscortAdReceiptModal
        show={receiptModal}
        handleClose={handleReceiptModal}
        data={receiptData}
      />
    </>
  )
}

export default PendingBannerAdvertisementList
