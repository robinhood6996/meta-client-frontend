import React, {useState, useEffect, useRef} from 'react'
import {KTSVG, toAbsoluteUrl} from '../../../../_metronic/helpers'
import DeleteModal from '../Common/DeleteModal'
import NotFoundComponent from '../../../Components/Custom Components/common/NotFoundComponent'
import {
  useDeleteSingleUserMutation,
  useGetAllUserQuery,
} from '../../../../redux/features/api/auth/authApi'
import {Button} from 'react-bootstrap'
import Loader from '../../../Components/Custom Components/common/Loader'
import {ToastContainer, toast} from 'react-toastify'
import {useLocation, useNavigate} from 'react-router-dom'
import {queryStringToObject} from '../../../../helpers/objectParamsConversion'
import PaginationUrlQuery from '../../../Components/Custom Components/common/PaginationUrlQuery'

const UserList = ({className}) => {
  const limit = 20
  const [page, setPage] = useState(1)
  const {search} = useLocation()
  const navigate = useNavigate()
  const [query, setQuery] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteUserName, setDeleteUserName] = useState('')
  const searchRef = useRef(null)

  //Update page and from url and update url if empty
  useEffect(() => {
    if (!search) {
      navigate(`/users?limit=${limit}&offset=0`)
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
  const {data, isFetching, isError, refetch} = useGetAllUserQuery(query, {skip: query})
  const [
    deleteUser,
    {isLoading: isLoadingDelete, isError: isErrorDelete, isSuccess: isSuccessDelete},
  ] = useDeleteSingleUserMutation()

  const handleDeleteModal = () => {
    setDeleteModal(!deleteModal)
  }

  const handleDelete = () => {
    if (deleteUserName !== '') {
      deleteUser(deleteUserName)
    }
    setDeleteModal(false)
  }

  //toast
  useEffect(() => {
    if (!isLoadingDelete && !isErrorDelete && isSuccessDelete) {
      toast.success('Successfully deleted user', {
        hideProgressBar: true,
        toastId: 'userDeleteSuccess',
      })
    }
    if (!isLoadingDelete && isErrorDelete && !isSuccessDelete) {
      toast.error('Failed to deleted user', {
        hideProgressBar: true,
        toastId: 'userDeleteError',
      })
    }
    return () => {
      setTimeout(() => {
        toast.dismiss('userDeleteSuccess')
        toast.dismiss('userDeleteSuccess')
      }, 2000)
    }
  }, [isErrorDelete, isLoadingDelete, isSuccessDelete])

  const handleSearch = (e) => {
    e.preventDefault()
    const searchText = searchRef.current.value
    if (searchText?.length > 0) {
      navigate(`/users?limit=${limit}&offset=0&search=${searchText}`)
    } else {
      navigate(`/users?limit=${limit}&offset=0`)
    }
  }

  return (
    <>
      <>
        <div className='card card-xxl-stretch mb-5 mb-xl-8'>
          <form
            action=''
            onSubmit={(e) => {
              handleSearch(e)
            }}
          >
            <div className='row p-3 align-items-center'>
              <div className='col-lg-6 col-md-6 col-6'>
                <input
                  ref={searchRef}
                  className='form-control form-control-lg form-control-solid border border-secondary'
                  placeholder='Search user name'
                  type='text'
                  autoComplete='off'
                />
              </div>
              <div className='col-lg-1 col-md-4 col-6'>
                <Button
                  onClick={() => refetch()}
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
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bold fs-3 mb-1'>Users</span>
              <span className='text-muted mt-1 fw-semibold fs-7'>
                Total Users: {data?.data?.length > 0 ? data?.data?.length : 0}
              </span>
            </h3>
          </div>

          {isFetching ? (
            <Loader />
          ) : !isFetching && !isError && data?.data?.length > 0 ? (
            <div className='card-body py-3'>
              <div className='table-responsive'>
                <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                  <thead>
                    <tr className='fw-bold text-muted'>
                      <th className='min-w-150px'>Name/Email</th>
                      <th className='min-w-140px'>Type</th>
                      {/* <th className='min-w-120px'>Join Date</th> */}
                      <th className='min-w-100px text-end'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((user, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className='d-flex align-items-center'>
                              <div className='symbol symbol-45px me-5'>
                                {/* <img src={toAbsoluteUrl('/media/avatars/300-14.jpg')} alt='' /> */}
                              </div>
                              <div className='d-flex justify-content-start flex-column'>
                                <a href='/' className='text-dark fw-bold text-hover-primary fs-6'>
                                  {user?.name}
                                </a>
                                <span className='text-muted fw-semibold text-muted d-block fs-7'>
                                  {user?.email}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <a
                              href='/'
                              className='text-dark fw-bold text-hover-primary d-block mb-1 fs-6'
                            >
                              {user?.type?.toUpperCase()}
                            </a>
                          </td>
                          <td className='text-end'>
                            <button
                              className='btn btn-icon btn-bg-light btn-active-color-danger btn-sm'
                              onClick={() => {
                                setDeleteUserName(user?.username)
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
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <NotFoundComponent type='User' />
          )}

          {/* <CreateCategory show={showCreateModal} handleClose={handleCreateModal} /> */}
          <DeleteModal
            show={deleteModal}
            handleModal={handleDeleteModal}
            handleDelete={handleDelete}
          />
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
      <ToastContainer />
    </>
  )
}

export default UserList
