import React, {useEffect, useRef, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import {objectToParam, queryStringToObject} from '../../../../helpers/objectParamsConversion'

type PropsType = {
  limit: number
  page: number
  totalPage: number
  dataLength: number
}

const PaginationUrlQuery = ({limit, page, totalPage, dataLength}: PropsType) => {
  const [query, setQuery] = useState({})
  const {pathname, search} = useLocation()
  const offsetRef: any = React.useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    let params = queryStringToObject(search)
    if (params) {
      setQuery({...params})
    }
  }, [search])

  const changePagination = (type: string) => {
    // window.scrollTo(0, 0, {behavior: 'smooth'})
    if (type === 'plus') {
      let newPage = page + 1
      if (newPage === 2) {
        let qr = objectToParam({...query, offset: limit})
        navigate(`${pathname}?${qr}`)
      } else {
        let qr = objectToParam({...query, offset: (newPage - 1) * limit})
        navigate(`${pathname}?${qr}`)
      }
    } else if (type === 'minus') {
      if (page > 1) {
        if (page === 2) {
          let qr = objectToParam({...query, offset: 0})
          navigate(`${pathname}?${qr}`)
        } else {
          let newPage = page - 1
          if (newPage === 1) {
            let qr = objectToParam({...query, offset: 0})
            navigate(`${pathname}?${qr}`)
          } else if (newPage === 2) {
            let qr = objectToParam({...query, offset: limit})
            navigate(`${pathname}?${qr}`)
          } else {
            let qr = objectToParam({...query, offset: (newPage - 1) * limit})
            navigate(`${pathname}?${qr}`)
          }
        }
      }
    } else {
      let newPage: any = offsetRef?.current.value - 1
      console.log('newPage', newPage)
      if (newPage === 1) {
        let qr = objectToParam({...query, offset: 0})
        navigate(`${pathname}?${qr}`)
      } else if (newPage === 2) {
        let qr = objectToParam({...query, offset: limit})
        navigate(`${pathname}?${qr}`)
      } else {
        let qr = objectToParam({...query, offset: newPage * limit})
        navigate(`${pathname}?${qr}`)
      }
      // setPage(newPage);
    }
  }
  return (
    <>
      <div className='d-flex justify-content-center'>
        <button
          className='btn btn-primary fw-bolder fs-5'
          disabled={page === 1}
          onClick={() => {
            changePagination('minus')
          }}
        >
          {'<'}
        </button>
        <div className='mx-2'>
          <form
            action=''
            className='form fv-plugins-bootstrap5 fv-plugins-framework'
            onSubmit={() => {
              changePagination('input')
            }}
          >
            <input
              className='form-control'
              type='number'
              min={1}
              ref={offsetRef}
              key={page}
              max={totalPage}
              style={{width: 70}}
              defaultValue={page}
            />
          </form>
        </div>
        <button
          className='btn btn-primary fw-bolder fs-5'
          disabled={dataLength < limit}
          onClick={() => {
            changePagination('plus')
          }}
        >
          {'>'}
        </button>
      </div>
    </>
  )
}

export default PaginationUrlQuery
