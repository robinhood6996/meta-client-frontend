import React, {Key, useEffect, useRef, useState} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import {
  useDeleteSingleFreeAdsMutation,
  useGetAllFreeAdsQuery,
} from '../../../../redux/features/api/freeAds/freeAdsApi'
import Loader from '../../../Components/Custom Components/common/Loader'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import AdTableRow from './AdTableRow'
import {useLocation, useNavigate} from 'react-router-dom'
import {queryStringToObject} from '../../../../helpers/objectParamsConversion'
import {Button} from 'react-bootstrap'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

const AdList = ({className}) => {
  const [deleteAdId, setDeleteAdId] = useState('')
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState(null)
  const searchRef = useRef()
  const {search} = useLocation()
  const navigate = useNavigate()
  const limit = 20

  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/ads?limit=${limit}&offset=0`)
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
  const {data, isFetching, isError, isSuccess} = useGetAllFreeAdsQuery(query, {skip: !query})

  const handleSearch = (e) => {
    e.preventDefault()
    const searchText = searchRef.current.value
    if (searchText?.length > 0) {
      navigate(`/ads?limit=${limit}&offset=0&search=${searchText}`)
    } else {
      navigate(`/users?limit=${limit}&offset=0`)
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
                placeholder='Search ad'
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
                      <span className='card-label fw-bold fs-3 mb-1'>Active Classified Ads</span>
                      <span className='text-muted mt-1 fw-semibold fs-7'>
                        Total Ads: {data?.data?.length}
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
                            <th className='min-w-120px'>Status</th>
                            <th className='min-w-100px text-end'>Actions</th>
                          </tr>
                        </thead>
                        {/* end::Table head */}
                        {/* begin::Table body */}
                        <tbody>
                          {data?.data?.map((ad, index) => {
                            return <AdTableRow key={index} ad={ad} />
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
            <NotFoundComponent type='Ads Data' />
          )}
        </>
      ) : (
        <ErrorComponent />
      )}
      {!isFetching && !isError && data?.data?.length && (
        <PaginationUrlQuery
          limit={limit}
          page={page}
          totalPage={data?.totalPages}
          dataLength={data?.data?.length}
        />
      )}
    </>
  )
}

export default AdList
