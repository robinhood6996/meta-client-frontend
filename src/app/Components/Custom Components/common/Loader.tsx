import React from 'react'

type country = {
  text?: String
}
const Loader = ({text}: country) => {
  return (
    <div className='d-flex align-items-center flex-column'>
      <span className='spinner-border text-primary' role='status'></span>
      <span className='text-gray-800 fs-6 fw-semibold mt-3'>{text ?? 'Loading...'}</span>
    </div>
  )
}

export default Loader
