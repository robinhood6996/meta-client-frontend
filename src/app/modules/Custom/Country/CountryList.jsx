import React, {Key, useEffect, useRef, useState} from 'react'
import {Button} from 'react-bootstrap'
import {KTSVG} from '../../../../_metronic/helpers'
import CreateCountry from './CreateCountry'
import {
  useCreateCountryMutation,
  useDeleteSingleCountryMutation,
  useGetAllCountryQuery,
} from '../../../../redux/features/api/country/countryApi'
import Loader from '../../../Components/Custom Components/common/Loader'
import ErrorComponent from '../../../Components/Custom Components/common/ErrorComponent'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import {toast} from 'react-toastify'
import DeleteModal from '../Common/DeleteModal'
import {objectToParam, queryStringToObject} from '../../../../helpers/objectParamsConversion'
import {useLocation, useNavigate} from 'react-router-dom'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

const CountryList = ({className}) => {
  const navigate = useNavigate()
  const {search} = useLocation()
  const [deleteModal, setDeleteModal] = useState(false)
  const [isCreateModal, setIsCreateModal] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)
  const [type, setType] = useState('')
  const [selectedForDelete, setSelectedForDelete] = useState('')
  const [countryId, setCountryId] = useState('')
  const [defaultName, setDefaultName] = useState('')
  const [defaultDescription, setDefaultDescription] = useState('')
  const [page, setPage] = useState()
  const searchRef = useRef()
  const limit = 10
  const [query, setQuery] = useState({})
  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/countries?limit=${limit}&offset=0`)
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
  const {data, isFetching, isSuccess, isError} = useGetAllCountryQuery(query, {skip: !query})

  const [
    deleteCountry,
    {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete},
  ] = useDeleteSingleCountryMutation()

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
    deleteCountry(selectedForDelete)
    setDeleteModal(!deleteModal)
  }

  //toast delete country
  useEffect(() => {
    if (!isLoadingDelete && !isErrorDelete && isSuccessDelete) {
      toast.success('Successfully deleted country', {
        hideProgressBar: true,
        toastId: 'countryDeleteSuccess',
      })
    }
    if (!isLoadingDelete && isErrorDelete && !isSuccessDelete) {
      toast.error('Failed to delete country', {
        hideProgressBar: true,
        toastId: 'countryDeleteError',
      })
    }
    return () => {
      setTimeout(() => {
        toast.dismiss('countryDeleteSuccess')
        toast.dismiss('countryDeleteError')
      }, 2000)
    }
  }, [isErrorDelete, isLoadingDelete, isSuccessDelete])

  const handleSearch = (e) => {
    e.preventDefault()
    let oldQ = {...query}
    const searchText = searchRef.current.value
    if (searchText?.length > 0) {
      oldQ.search = searchText
      navigate(`/countries?${objectToParam(oldQ)}`)
    } else {
      let oldQ = {...query}
      if (oldQ.search) {
        delete oldQ.search
        navigate(`/countries?${objectToParam(oldQ)}`)
      }
    }
  }
  return (
    <>
      <div className='card card-xxl-stretch mb-5 mb-xl-8'>
        <form
          onSubmit={(e) => {
            handleSearch(e)
          }}
        >
          <div className='row p-3 align-items-center'>
            <div className='col-lg-8 col-md-8 col-8'>
              <input
                ref={searchRef}
                className='form-control form-control-lg form-control-solid border border-secondary'
                placeholder='Search country'
                type='text'
                autoComplete='off'
              />
            </div>

            <div className='col-lg-4 col-md-4 col-4'>
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
            setType('add-country')
            setIsCreateModal(true)
          }}
          className='btn btn-sm fw-bold btn-primary'
          // data-bs-toggle='modal'
          // data-bs-target='#kt_modal_create_app'
        >
          Add Country
        </Button>
      </div>
      {isFetching ? (
        <Loader />
      ) : !isFetching && isSuccess ? (
        <>
          {data?.countries?.length > 0 ? (
            <>
              <div className={`card ${className}`}>
                {/* begin::Header */}
                <div className='card-header border-0 pt-5'>
                  <h3 className='card-title align-items-start flex-column'>
                    <span className='card-label fw-bold fs-3 mb-1'>Countries</span>
                    <span className='text-muted mt-1 fw-semibold fs-7'>
                      Total Countries: {data?.countries?.length ?? 0}
                    </span>
                  </h3>
                </div>
                <div className='card-body py-3'>
                  <div className='table-responsive'>
                    <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                      <thead>
                        <tr className='fw-bold text-muted'>
                          <th className='min-w-10px'>Serial</th>
                          <th className='min-w-140px'>Name</th>
                          <th className='min-w-120px'>Description</th>
                          <th className='min-w-100px text-end'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data?.countries?.map((country, index) => {
                          return (
                            <>
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td className='fw-bold'>{country?.name?.toUpperCase()}</td>
                                <td>{country?.description}</td>

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
                                      setDefaultName(country?.name)
                                      setDefaultDescription(country?.description)
                                      setType('edit-country')
                                      setCountryId(country?._id)
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
                                      setSelectedForDelete(country?._id)
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
                        })}
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
            <NotFoundComponent type='Countries' />
          )}
        </>
      ) : (
        <ErrorComponent />
      )}
      {!isFetching && !isError && data?.countries.length > 0 && (
        <PaginationUrlQuery
          limit={limit}
          page={page}
          totalPage={Math.ceil(parseInt(data?.totalCount) / parseInt(limit))}
          dataLength={data?.data?.length}
        />
      )}
      <CreateCountry
        show={isCreateModal}
        handleClose={handleCreateCountryModal}
        type={type}
        countryId={countryId}
        defaultName={defaultName}
        defaultDescription={defaultDescription}
      />
      <DeleteModal show={deleteModal} handleModal={handleDeleteModal} handleDelete={handleDelete} />
    </>
  )
}

export default CountryList
