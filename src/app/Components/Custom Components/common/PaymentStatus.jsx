const PaymentStatus = ({status}) => {
  return (
    <div className='d-flex flex-column w-100 me-2'>
      <div className='d-flex flex-stack mb-2'>
        <span
          className={`text-white me-2 fs-7 fw-semibold rounded p-1 ${
            status === 'verified'
              ? 'bg-success '
              : status === 'pending'
              ? 'bg-info'
              : status === 'canceled'
              ? 'bg-danger'
              : ''
          }`}
        >
          {status.toUpperCase()}
        </span>
      </div>
    </div>
  )
}

export default PaymentStatus
