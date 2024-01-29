import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import Categories from '../modules/Categories/Categories'
import UserList from '../modules/Custom/Users/UserList'
import EscortList from '../modules/Custom/Ads/ActiveProjects'
import CountryList from '../modules/Custom/Country/CountryList'
import CityList from '../modules/Custom/City/CityList'
import AdList from '../modules/Custom/ClassifiedAds/Adlist'
import EscortDetails from '../modules/Custom/Ads/EscortDetails'
import TourList from '../modules/Custom/Tours/TourList'
import VerifieyRequestList from '../modules/Custom/verification/VerifieyRequestList'
import VerifiedIDList from '../modules/Custom/verification/VerifiedIDList'
import ReviewsList from '../modules/Custom/reviews/ReviewsList'
import ActiveEscortsList from '../modules/Custom/Ads/ActiveProjects'
import InactiveEscortsList from '../modules/Custom/Ads/InactiveEscortsList'
import EscortVerifieyRequestList from '../modules/Custom/Escort Ads/EscortVerifieyRequestList'
// import EscortVerifiedIDList from '../modules/Custom/Escort Ads/ActiveAdList'
import EscortExpiredAdsList from '../modules/Custom/Escort Ads/EscortExpiredAdsList'
import ActiveBannerAdvertisementList from '../modules/Custom/Escort Banner Advertisement/ActiveBannerAdvertisementList'
import ExpiredBannerAdvertisementList from '../modules/Custom/Escort Banner Advertisement/ExpiredBannerAdvertisementList'
import PendingBannerAdvertisementList from '../modules/Custom/Escort Banner Advertisement/PendingBannerAdvertisementList'
import ActiveAdList from '../modules/Custom/Escort Ads/ActiveAdList'
import {CreateUser} from '../modules/Custom/Users/CreateUser'
import AreaList from '../modules/Custom/Area/AreaList'
import {CreateAd} from '../modules/Custom/ClassifiedAds/CreateAd'
import PendingAdList from '../modules/Custom/ClassifiedAds/PendingAdList'
import ReportList from '../modules/Custom/Reports/ReportList'
import PendingReportList from '../modules/Custom/Reports/PendingReportList'
import ActiveProjects from '../modules/Custom/Ads/ActiveProjects'
import PendingProjects from '../modules/Custom/Ads/PendingProjects'
import CanceledProjects from '../modules/Custom/Ads/CanceledProjects'
import CompletedProjects from '../modules/Custom/Ads/CompleteProjects'
import NotDeliveredProjects from '../modules/Custom/Ads/NotDeliveredProjects'
import RejectedProjects from '../modules/Custom/Ads/RejectedProjects'
import ApprovedPayments from '../modules/Custom/Payments/ApprovedPayments'
import PendingPayments from '../modules/Custom/Payments/PendingPayment'
import CanceledPayments from '../modules/Custom/Payments/CanceledPayments'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />

        {/* Own Routes Here  */}
        <Route
          path='/categories'
          element={
            <SuspensedView>
              <Categories />
            </SuspensedView>
          }
        />
        <Route
          path='/users'
          element={
            <SuspensedView>
              <UserList className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/create-user'
          element={
            <SuspensedView>
              <CreateUser />
            </SuspensedView>
          }
        />
        <Route
          path='/active-ads'
          element={
            <SuspensedView>
              <ActiveProjects className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/pending-ads'
          element={
            <SuspensedView>
              <PendingProjects className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/canceled-ads'
          element={
            <SuspensedView>
              <CanceledProjects className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/completed-ads'
          element={
            <SuspensedView>
              <CompletedProjects className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/not-delivered-ads'
          element={
            <SuspensedView>
              <NotDeliveredProjects className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/rejected-ads'
          element={
            <SuspensedView>
              <RejectedProjects className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/approved-payments'
          element={
            <SuspensedView>
              <ApprovedPayments className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/pending-payments'
          element={
            <SuspensedView>
              <PendingPayments className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/canceled-payments'
          element={
            <SuspensedView>
              <CanceledPayments className='card-xxl-stretch mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/escorts/:escortId/details'
          element={
            <SuspensedView>
              <EscortDetails className='' />
            </SuspensedView>
          }
        />
        <Route
          path='/countries'
          element={
            <SuspensedView>
              <CountryList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/cities'
          element={
            <SuspensedView>
              <CityList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/area'
          element={
            <SuspensedView>
              <AreaList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/ads'
          element={
            <SuspensedView>
              <AdList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/pending-ads'
          element={
            <SuspensedView>
              <PendingAdList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/create-ad'
          element={
            <SuspensedView>
              <CreateAd />
            </SuspensedView>
          }
        />
        <Route
          path='/tours'
          element={
            <SuspensedView>
              <TourList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/pending-verification'
          element={
            <SuspensedView>
              <VerifieyRequestList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/active-verification'
          element={
            <SuspensedView>
              <VerifiedIDList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/active-escort-ads'
          element={
            <SuspensedView>
              <ActiveAdList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/pending-escort-ads'
          element={
            <SuspensedView>
              <EscortVerifieyRequestList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/expired-escort-ads'
          element={
            <SuspensedView>
              <EscortExpiredAdsList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/active-escort-banner-advertisement'
          element={
            <SuspensedView>
              <ActiveBannerAdvertisementList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/pending-escort-banner-advertisement'
          element={
            <SuspensedView>
              <PendingBannerAdvertisementList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/expired-escort-banner-advertisement'
          element={
            <SuspensedView>
              <ExpiredBannerAdvertisementList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/reviews'
          element={
            <SuspensedView>
              <ReviewsList className='mb-5 mb-xl-8' />
            </SuspensedView>
          }
        />
        <Route
          path='/reports'
          element={
            <SuspensedView>
              <ReportList className={'mb-5 mb-xl-8'} />
            </SuspensedView>
          }
        />
        <Route
          path='/pending-reports'
          element={
            <SuspensedView>
              <PendingReportList className={'mb-5 mb-xl-8'} />
            </SuspensedView>
          }
        />
        {/* Own Routes Here  */}
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--kt-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
