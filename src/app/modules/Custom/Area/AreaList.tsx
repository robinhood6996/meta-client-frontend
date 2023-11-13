import React, {Key, useEffect, useRef, useState} from 'react'
import {Button} from 'react-bootstrap'
import {toast} from 'react-toastify'
import DeleteModal from '../Common/DeleteModal'

import CreateArea from './CreateArea'
import {
  useDeleteSingleAraMutation,
  useDeleteSingleCityMutation,
  useGetAllAreasQuery,
  useGetAllCitiesQuery,
  useLazyGetCitiesByCountryQuery,
} from '../../../../redux/features/api/citiesApi/citiesApi'
import Loader from '../../../Components/Custom Components/common/Loader'
import {KTSVG} from '../../../../_metronic/helpers'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import {useLocation, useNavigate} from 'react-router-dom'
import {objectToParam, queryStringToObject} from '../../../../helpers/objectParamsConversion'
import {useGetAllCountryQuery} from '../../../../redux/features/api/country/countryApi'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

type Props = {
  className: string
}

const AreaList: React.FC<Props> = ({className}) => {
  const [deleteModal, setDeleteModal] = useState(false)
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)
  const [type, setType] = useState('')
  const [selectedForDelete, setSelectedForDelete] = useState<string>('')
  const [defaultCountryName, setDefaultCountryName] = useState<string>('')
  const [defaultCityName, setDefaultCityName] = useState<string>('')
  const [defaultAreaName, setDefaultAreaName] = useState<string>('')
  const [defaultDescription, setDefaultDescription] = useState<string>('')
  const [cityId, setCityId] = useState<string>('')
  const limit = 30
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState<any>({})
  const searchRef = useRef<HTMLInputElement>(null)
  const {search} = useLocation()
  const navigate = useNavigate()
  const [selectedCountry, setSelectedCountry] = useState(null)
  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/area?limit=${limit}&offset=0`)
    } else {
      let params: any = queryStringToObject(search)
      console.log('params', params)
      if (params?.country) {
        if (params?.country !== selectedCountry) {
          setSelectedCountry(params?.country)
          getCitiesByCountry(params?.country)
        }
      } else {
        setSelectedCountry(null)
      }
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
  const {data, isFetching, isSuccess} = useGetAllAreasQuery(query, {skip: !query})

  const {
    data: countryList,
    isFetching: isFetchingCountty,
    isSuccess: isSuccessCountry,
  } = useGetAllCountryQuery({})

  const [
    getCitiesByCountry,
    {isFetching: isLoadingCity, isSuccess: isSuccessCity, isError: isErrorCity, data: cityList},
  ] = useLazyGetCitiesByCountryQuery({})

  const [
    deleteCity,
    {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete},
  ] = useDeleteSingleAraMutation()

  const handleCreateCountryModal = () => {
    setIsCreateModal(!isCreateModal)
  }
  // const handleEditCountryModal = () => {
  //   setIsEditModal(!isEditModal)
  // }

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleDelete = () => {
    deleteCity(selectedForDelete)
    setDeleteModal(!deleteModal)
  }

  //toast delete country
  useEffect(() => {
    if (!isLoadingDelete && !isErrorDelete && isSuccessDelete) {
      toast.success('Successfully deleted city', {
        hideProgressBar: true,
        toastId: 'cityDeleteSuccess',
      })
    }
    if (!isLoadingDelete && isErrorDelete && !isSuccessDelete) {
      toast.error('Failed to delete city', {
        hideProgressBar: true,
        toastId: 'cityDeleteError',
      })
    }
    return () => {
      setTimeout(() => {
        toast.dismiss('cityDeleteSuccess')
        toast.dismiss('cityDeleteError')
      }, 2000)
    }
  }, [isErrorDelete, isLoadingDelete, isSuccessDelete])

  const handleSearch = (e: any) => {
    e.preventDefault()
    let oldQ = {...query}
    const searchText = searchRef?.current?.value
    if (searchText && searchText?.length > 0) {
      oldQ.search = searchText
      navigate(`/area?${objectToParam(oldQ)}`)
    } else {
      let oldQ = {...query}
      if (oldQ.search) {
        delete oldQ.search
        navigate(`/area?${objectToParam(oldQ)}`)
      }
    }
  }
  console.log('selectedCountry', selectedCountry)
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
                placeholder='Search Area'
                type='text'
                autoComplete='off'
              />
            </div>
            {isFetchingCountty ? (
              <div className='col-lg-2 col-md-4 col-6'>
                <Loader text={'Loading countries...'} />
              </div>
            ) : (
              !isFetchingCountty &&
              isSuccessCountry && (
                <div className='col-lg-2 col-md-4 col-6'>
                  <select
                    className='form-select'
                    aria-label='Select country'
                    onChange={(e) => {
                      let oldQ = {...query}
                      if (oldQ.country) {
                        if (e.target.value === 'default') {
                          delete oldQ.country
                          oldQ.offset = 0
                          delete oldQ.city
                          navigate(`/area?${objectToParam(oldQ)}`)
                          return
                        }
                        oldQ.country = e.target.value
                        oldQ.offset = 0
                        delete oldQ.city
                        navigate(`/area?${objectToParam(oldQ)}`)
                      } else {
                        oldQ.offset = 0
                        oldQ.country = e.target.value
                        delete oldQ.city
                        navigate(`/area?${objectToParam(oldQ)}`)
                        return
                      }
                    }}
                  >
                    <option value={'default'}>Select country</option>
                    {countryList?.countries?.map((option: {name: string}, index: number) => {
                      return (
                        <option key={index} value={option?.name.toLowerCase()}>
                          {option?.name.toUpperCase()}
                        </option>
                      )
                    })}
                  </select>
                </div>
              )
            )}

            {selectedCountry && isLoadingCity ? (
              <div className='col-lg-2 col-md-4 col-6'>
                <Loader text={'Loading cities...'} />
              </div>
            ) : (
              selectedCountry &&
              !isLoadingCity &&
              !isErrorCity &&
              isSuccessCity && (
                <div className='col-lg-2 col-md-4 col-6'>
                  <select
                    className='form-select'
                    aria-label='Select City'
                    onChange={(e) => {
                      let oldQ = {...query}
                      if (oldQ.country) {
                        if (e.target.value === 'default') {
                          delete oldQ.city
                          oldQ.offset = 0
                          navigate(`/area?${objectToParam(oldQ)}`)
                          return
                        }
                        oldQ.city = e.target.value
                        oldQ.offset = 0
                        navigate(`/area?${objectToParam(oldQ)}`)
                      } else {
                        oldQ.city = e.target.value
                        oldQ.offset = 0
                        navigate(`/area?${objectToParam(oldQ)}`)
                        return
                      }
                    }}
                  >
                    {/* {!selectedCountry && <option value={'default'}>Choose country</option>} */}
                    {selectedCountry && <option value={'default'}>Select city</option>}
                    {selectedCountry &&
                      cityList?.cities?.map((option: {name: string}, index: number) => {
                        return (
                          <option key={index} value={option?.name.toLowerCase()}>
                            {option?.name.toUpperCase()}
                          </option>
                        )
                      })}
                  </select>
                </div>
              )
            )}

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
      <div className='d-flex justify-content-end mb-2'>
        <Button
          onClick={() => {
            setType('add-city')
            setIsCreateModal(true)
          }}
          className='btn btn-sm fw-bold btn-primary'
          // data-bs-toggle='modal'
          // data-bs-target='#kt_modal_create_app'
        >
          Add Area
        </Button>
      </div>
      {isFetching ? (
        <Loader />
      ) : !isFetching && isSuccess ? (
        <>
          {data?.areas?.length > 0 ? (
            <>
              <div className={`card ${className}`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Areas</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>
                      Total cities: {data?.length ?? 0}
                    </span>
                  </h3>
                </div>
                <div className='card-body py-3'>
                  <div className='table-responsive'>
                    <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                      <thead>
                        <tr className='fw-bold text-muted'>
                          <th className='min-w-10px'>Serial</th>
                          <th className='min-w-120px'>Area</th>
                          <th className='min-w-140px'>City Name</th>
                          <th className='min-w-140px'>Country Name</th>
                          <th className='min-w-140px'>Description</th>
                          <th className='min-w-100px text-end'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.areas?.map(
                          (
                            area: {
                              name: string
                              _id: string
                              country: string
                              city: string
                              description: string
                            },
                            index: string
                          ) => {
                            return (
                              <>
                                <tr key={index}>
                                  <td>{index + 1}</td>
                                  <td className='fw-bold'>{area?.name?.toUpperCase()}</td>
                                  <td className='fw-bold'>{area?.city?.toUpperCase()}</td>
                                  <td className='fw-bold'>{area?.country?.toUpperCase()}</td>
                                  <td className='fw-bold'>{area?.description}</td>

                                  <td className='text-end'>
                                    {/* <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen019.svg'
                                        className='svg-icon-3'
                                      />
                                    </button> */}
                                    <button
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
                                      onClick={() => {
                                        setType('edit-city')
                                        setCityId(area?._id)
                                        setDefaultCityName(area?.city)
                                        setDefaultCountryName(area?.country)
                                        setDefaultAreaName(area?.name)
                                        setDefaultDescription(area?.description ?? '')
                                        setIsCreateModal(true)
                                      }}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/art/art005.svg'
                                        className='svg-icon-3'
                                      />
                                    </button>
                                    <button
                                      className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
                                      onClick={() => {
                                        setSelectedForDelete(area?._id)
                                        handleDeleteModal()
                                      }}
                                    >
                                      <KTSVG
                                        path='/media/icons/duotune/general/gen027.svg'
                                        className='svg-icon-3'
                                      />
                                    </button>
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
                {/* <CreateCountry
                  show={isEditModal}
                  handleClose={handleEditCountryModal}
                  type='edit-country'
                /> */}
              </div>
            </>
          ) : (
            <NotFoundComponent type='Area' />
          )}
        </>
      ) : (
        <ErrorComponent />
      )}
      {data?.areas?.length > 0 && (
        <PaginationUrlQuery
          limit={limit}
          page={page}
          totalPage={Math.ceil(parseInt(data?.totalCount) / limit)}
          dataLength={data?.cities?.length}
        />
      )}
      <CreateArea
        show={isCreateModal}
        handleClose={handleCreateCountryModal}
        type={type}
        cityId={cityId}
        defaultCountryName={defaultCountryName}
        defaultCityName={defaultCityName}
        defaultAreaName={defaultAreaName}
        defaultDescription={defaultDescription}
      />
      <DeleteModal show={deleteModal} handleModal={handleDeleteModal} handleDelete={handleDelete} />
    </>
  )
}

export default AreaList
