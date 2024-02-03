/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {useIntl} from 'react-intl'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import {PageTitle} from '../../../_metronic/layout/core'
import {
  ListsWidget2,
  ListsWidget3,
  ListsWidget4,
  ListsWidget6,
  TablesWidget5,
  TablesWidget10,
  MixedWidget8,
  CardsWidget7,
  CardsWidget17,
  CardsWidget20,
  ListsWidget26,
  EngageWidget10,
} from '../../../_metronic/partials/widgets'
import {Col, Row} from 'react-bootstrap'
import {useGeAdStateQuery} from '../../../redux/features/api/adsAPI/adsAPI'
import Loader from '../../Components/Custom Components/common/Loader'

const DashboardPage: FC = () => {
  const {data: stats, isFetching, isSuccess, isError} = useGeAdStateQuery('')
  console.log('stats', stats)
  return (
    <>
      {/* begin::Row */}
      {isFetching ? (
        <Loader />
      ) : (
        !isFetching &&
        !isError &&
        stats?.projects && (
          <div className='row '>
            <h4 className='btn btn-outline btn-outline-dashed'>Advertisement Stats</h4>
            <div className='col-md-6 col-lg-3'>
              <CardsWidget20
                className='mt-2'
                description='Active Ads'
                color='#00830f'
                img={toAbsoluteUrl('/media/patterns/vector-1.png')}
                count={stats?.projects?.active}
              />
            </div>
            <div className='col-md-6 col-lg-3'>
              <CardsWidget20
                className='mt-2'
                description='Pending Ads'
                color='#F1416C'
                img={toAbsoluteUrl('/media/patterns/vector-1.png')}
                count={stats?.projects?.pending}
              />
            </div>
            <div className='col-md-6 col-lg-3'>
              <CardsWidget20
                className='mt-2'
                description='Rejected Ads'
                color='#ff9800'
                img={toAbsoluteUrl('/media/patterns/vector-1.png')}
                count={stats?.projects?.reject}
              />
            </div>
            <div className='col-md-6 col-lg-3'>
              <CardsWidget20
                className='mt-2'
                description='Not Delivered Ads'
                color='#161212'
                img={toAbsoluteUrl('/media/patterns/vector-1.png')}
                count={stats?.projects?.notDelivered}
              />
            </div>
            <div className='col-md-6 col-lg-3'>
              <CardsWidget20
                className='mt-2'
                description='Paused Ads'
                color='#161212'
                img={toAbsoluteUrl('/media/patterns/vector-1.png')}
                count={stats?.projects?.pause}
              />
            </div>
            <div className='col-md-6 col-lg-3'>
              <CardsWidget20
                className='mt-2'
                description='Completed Ads'
                color='#6405B7'
                img={toAbsoluteUrl('/media/patterns/vector-1.png')}
                count={stats?.projects?.complete}
              />
            </div>
            {/* <CardsWidget7
          className='h-md-50 mb-5 mb-xl-10'
          description='Users'
          icon={false}
          stats={57}
          labelColor='dark'
          textColor='gray-300'
        /> */}
            {/* <CardsWidget17 className='h-md-50 mb-5 mb-xl-10' /> */}
            {/* <ListsWidget26 className='h-lg-50' /> */}
            {/* end::Col */}

            {/* begin::Col */}
            <div className='col-xxl-6'>{/* <EngageWidget10 className='h-md-100' /> */}</div>
            {/* end::Col */}
          </div>
        )
      )}

      {/* end::Row */}
      <Row className='mt-3'>
        <Col md={12} lg={6}>
          <ListsWidget2 className='card-xl-stretch mb-xl-8' />
        </Col>
      </Row>
      {/* begin::Row */}
      <div className='row gx-5 gx-xl-10'>
        {/* begin::Col */}
        <div className='col-xxl-6 mb-5 mb-xl-10'>
          {/* <app-new-charts-widget8 cssclassName="h-xl-100" chartHeight="275px" [chartHeightNumber]="275"></app-new-charts-widget8> */}
        </div>
        {/* end::Col */}

        {/* begin::Col */}
        <div className='col-xxl-6 mb-5 mb-xl-10'>
          {/* <app-cards-widget18 cssclassName="h-xl-100" image="./assets/media/stock/600x600/img-65.jpg"></app-cards-widget18> */}
        </div>
        {/* end::Col */}
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      <div className='row gy-5 gx-xl-8'>
        <div className='col-xxl-4'>
          {/* <ListsWidget3 className='card-xxl-stretch mb-xl-3' /> */}
        </div>
        <div className='col-xl-8'>
          {/* <TablesWidget10 className='card-xxl-stretch mb-5 mb-xl-8' /> */}
        </div>
      </div>
      {/* end::Row */}

      {/* begin::Row */}
      {/* <div className='row gy-5 g-xl-8'>
      <div className='col-xl-4'>
        <ListsWidget2 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget6 className='card-xl-stretch mb-xl-8' />
      </div>
      <div className='col-xl-4'>
        <ListsWidget4 className='card-xl-stretch mb-5 mb-xl-8' items={5} />
      </div>
    </div> */}
      {/* end::Row */}

      {/* <div className='row g-5 gx-xxl-8'>
      <div className='col-xxl-4'>
        <MixedWidget8
          className='card-xxl-stretch mb-xl-3'
          chartColor='success'
          chartHeight='150px'
        />
      </div>
      <div className='col-xxl-8'>
        <TablesWidget5 className='card-xxl-stretch mb-5 mb-xxl-8' />
      </div>
    </div> */}
    </>
  )
}

const DashboardWrapper: FC = () => {
  const intl = useIntl()
  return (
    <>
      <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle>
      <DashboardPage />
      {/* <button
        className='btn btn-primary mx-2'
        onClick={() => {
          dispatch(increment())
        }}
      >
        Increment
      </button>
      <button
        className='btn btn-primary mx-2'
        onClick={() => {
          dispatch(decrement())
        }}
      >
        Decrement
      </button>
      <button
        className='btn btn-primary mx-2'
        onClick={() => {
          dispatch(incrementByAmount(5))
        }}
      >
        Increment By 5
      </button> */}
    </>
  )
}

export {DashboardWrapper}
