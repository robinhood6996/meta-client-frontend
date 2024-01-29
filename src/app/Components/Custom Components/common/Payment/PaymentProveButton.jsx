import React, {useState} from 'react'
import PaymentProveImage from '../../../../modules/Custom/Payments/PaymentProveImage'

const PaymentProveButton = ({url}) => {
  const [showImage, setShowImage] = useState(false)
  const handleClose = () => {
    setShowImage(!showImage)
  }
  return (
    <div>
      {url ? (
        <button className='btn btn-sm btn-success' onClick={() => setShowImage(true)}>
          Prove
        </button>
      ) : (
        <>N/A</>
      )}
      <PaymentProveImage handleClose={handleClose} image={url} show={showImage} />
    </div>
  )
}

export default PaymentProveButton
