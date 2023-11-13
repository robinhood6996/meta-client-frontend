import React, {FC} from 'react'
import {Link} from 'react-router-dom'

type Props = {
  data?: any
}

const BuyAdvertisementCard: FC<Props> = ({data}) => {
  return (
    <div className='card my-3 w-100'>
      <div className='row g-0'>
        <div className='ribbon ribbon-start ribbon-clip col-md-4 col-lg-2 col-12'>
          <div className='ribbon-label' style={{top: '30px'}}>
            {data?.badgeType}
            <span className='ribbon-inner bg-success'></span>
          </div>
          <img src={data?.imageUrl} className='img-fluid rounded-start w-sm-100' alt='...' />
        </div>
        <div className='col-md-8 col-lg-10'>
          <div className='card-body'>
            <div className='d-md-flex d-flex flex-md-row flex-column justify-content-between'>
              <h5 className='card-title'>{data?.title}</h5>
              <h5 className='card-title'>{data?.pricing}</h5>
            </div>
            <p className='card-text'>{data?.description}</p>
            <div className=''>
              <Link to={`/private-area/premium-pay-online/packages/${data?.title}`}>
                <button className='btn btn-primary w-md-25'>BUY ADVERTISE</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyAdvertisementCard
