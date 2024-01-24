import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import Flatpickr from 'react-flatpickr'
import {Button} from 'react-bootstrap'
import {objectToParam, queryStringToObject} from '../../../../helpers/objectParamsConversion'

const ProjectFilter = ({limit}) => {
  const searchRef = useRef()
  const dateRef = useRef()
  const navigate = useNavigate()
  const [currentMonth, setCurrentMonth] = useState(false)
  const {search, pathname} = useLocation()
  const [dateState, setDateState] = useState({
    startDate: new Date(),
    endDate: new Date(),
  })

  useEffect(() => {
    const params = queryStringToObject(search)
    if (dateState.date1 && dateState.date2 && dateState.date2 !== 'NaN-NaN-NaN') {
      params.startDate = dateState.date1
      params.endDate = dateState.date2
    }
    navigate(`${pathname}?${objectToParam(params)}`)
  }, [currentMonth, dateState.date1, dateState.date2, navigate, pathname, search])

  const handleSearch = (e) => {
    e.preventDefault()
    let params = queryStringToObject(search)
    const searchText = searchRef.current.value
    if (searchText) {
      params.search = searchText
    }
    let qr = objectToParam({...params})
    if (searchText?.length > 0) {
      navigate(`${pathname}?${qr}`)
    }
  }

  const getFormatedDate = (date) => {
    const startDateFormated = new Date(date)
    const year = startDateFormated.getFullYear()
    const month = String(startDateFormated.getMonth() + 1).padStart(2, '0')
    const day = String(startDateFormated.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  const handleClearDate = () => {
    let params = queryStringToObject(search)
    if (params.startDate) {
      delete params.startDate
      delete params.endDate
      dateRef.current.flatpickr.clear()
    }
    let qr = objectToParam({...params})
    navigate(`${pathname}?${qr}`)
  }
  const handleCurrentMonth = (currentMonth) => {
    console.log('currentMonth', currentMonth)
    let params = queryStringToObject(search)
    if (currentMonth === 'true') {
      params.currentMonth = true
    } else if (currentMonth === 'false') {
      delete params.currentMonth
    }
    let qr = objectToParam({...params})
    navigate(`${pathname}?${qr}`)
  }
  // const handleStatus = (status) => {
  //   let params = queryStringToObject(search)
  //   if (status !== 'all') {
  //     params.status = status
  //   } else {
  //     delete params.status
  //   }
  //   let qr = objectToParam({...params})
  //   navigate(`${pathname}?${qr}`)
  // }

  return (
    <div className='card card-xxl-stretch mb-5 mb-xl-8'>
      <form
        action=''
        onSubmit={(e) => {
          handleSearch(e)
        }}
      >
        <div className='row p-3'>
          <div className='col-lg-3 col-md-4 col-6'>
            <label>Search</label>
            <input
              ref={searchRef}
              className='form-control form-control-lg form-control-solid border border-secondary'
              placeholder='Search ad by title or link'
              type='text'
              autoComplete='off'
            />
          </div>

          <div className='col-lg-3 col-md-4 col-6'>
            <label>Date Filter</label>
            <Flatpickr
              ref={dateRef}
              value={dateState.date}
              onChange={([startDate, endDate]) => {
                const date1 = getFormatedDate(startDate)
                const date2 = getFormatedDate(endDate)
                setDateState({date1, date2})
              }}
              options={{
                mode: 'range',
                dateFormat: 'Y-m-d',
                editable: true,
              }}
              className='form-control form-control-solid'
              placeholder='Pick date'
            />
            {search?.includes('startDate') && (
              <button className='btn btn-sm btn-danger mt-1' onClick={() => handleClearDate()}>
                Clear
              </button>
            )}
          </div>
          <div className='col-lg-3 col-md-4 col-6'>
            <label>Period</label>
            <select
              className='form-select form-select-sm form-select-solid'
              data-control='select2'
              data-placeholder='Latest'
              data-hide-search='true'
              onChange={(e) => handleCurrentMonth(e.target.value)}
            >
              <option value={false}>All</option>
              <option value={true}>This Month</option>
            </select>
          </div>
          {/* Note::This is only for admin */}

          {/* <div className='col-lg-2 col-md-4 col-6'>
            <label>Status</label>
            <select
              className='form-select form-select-sm form-select-solid'
              data-control='select2'
              data-placeholder='Latest'
              data-hide-search='true'
              onChange={(e) => handleStatus(e.target.value)}
            >
              <option value={'all'}>All</option>
              <option value={'active'}>Active</option>
              <option value={'pending'}>Pending</option>
              <option value={'reject'}>Reject</option>
              <option value={'pause'}>Paused</option>
              <option value={'not-delivered'}>Not Delivered</option>
            </select>
          </div> */}
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
  )
}

export default ProjectFilter
