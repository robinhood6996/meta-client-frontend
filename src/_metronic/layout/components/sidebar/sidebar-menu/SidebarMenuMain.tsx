/* eslint-disable react/jsx-no-target-blank */
import React, {useEffect} from 'react'
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'
import {useSelector} from 'react-redux'

const SidebarMenuMain = () => {
  const intl = useIntl()
  const {setLogout} = useSelector((state: any) => state.config)

  return (
    <>
      <SidebarMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      {/* <SidebarMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title='Layout Builder'
        fontIcon='bi-layers'
      /> */}
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Functions</span>
        </div>
      </div>
      {/* <SidebarMenuItem
        to='/categories'
        title='Categories'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen025.svg'
      /> */}
      {/* <SidebarMenuItemWithSub
        to='/users'
        title='Users'
        hasBullet={false}
        icon='/media/icons/duotune/communication/com006.svg'
      >
        <SidebarMenuItem to='/users' title='All Users' hasBullet={true} />
        <SidebarMenuItem to='/create-user' title='Create User' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      <SidebarMenuItemWithSub
        to='/ads'
        title='Ads'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/active-ads' title='Active Ads' hasBullet={true} />
        <SidebarMenuItem to='/pending-ads' title='Pending Ads' hasBullet={true} />
        <SidebarMenuItem to='/canceled-ads' title='Canceled Ads' hasBullet={true} />
        <SidebarMenuItem to='/completed-ads' title='Completed Ads' hasBullet={true} />
        <SidebarMenuItem to='/not-delivered-ads' title='Not Delivered' hasBullet={true} />
        <SidebarMenuItem to='/rejected-ads' title='Rejected' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/payments'
        title='Payments'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/payments' title='Active Ads' hasBullet={true} />
        <SidebarMenuItem to='/pending-payments' title='Pending Payments' hasBullet={true} />
        <SidebarMenuItem to='/canceled-payments' title='Canceled Payments' hasBullet={true} />
      </SidebarMenuItemWithSub>
      {/* <SidebarMenuItem
        to='/escorts'
        title='Escorts'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      /> */}
      {/* <SidebarMenuItemWithSub
        to='/ads'
        title='Classified Ads'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/ads' title='Active Ad list' hasBullet={true} />
        <SidebarMenuItem to='/pending-ads' title='Pending list' hasBullet={true} />
        <SidebarMenuItem to='/create-ad' title='Create ad' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItem
        to='/tours'
        title='Tours'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      />
      <SidebarMenuItemWithSub
        to='/active-escorts'
        title='Verification'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/active-verification' title='Active' hasBullet={true} />
        <SidebarMenuItem to='/pending-verification' title='Pending' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to='/active-escort-ads'
        title='Escort Ads'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/active-escort-ads' title='Active' hasBullet={true} />
        <SidebarMenuItem to='/pending-escort-ads' title='Pending' hasBullet={true} />
        <SidebarMenuItem to='/expired-escort-ads' title='Expired' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to='/active-escort-banner-advertisement'
        title='Escort Banner Advertisement'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/active-escort-banner-advertisement' title='Active' hasBullet={true} />
        <SidebarMenuItem
          to='/pending-escort-banner-advertisement'
          title='Pending'
          hasBullet={true}
        />
        <SidebarMenuItem
          to='/expired-escort-banner-advertisement'
          title='Expired'
          hasBullet={true}
        />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItem
        to='/reviews'
        title='Reviews'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      /> */}
      {/* <SidebarMenuItemWithSub
        to='/country'
        title='Country & City'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/countries' title='Countries' hasBullet={true} />
        <SidebarMenuItem to='/cities' title='Cities' hasBullet={true} />
        <SidebarMenuItem to='/area' title='Areas' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItemWithSub
        to='/reports'
        title='Fake Photos'
        hasBullet={false}
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItem to='/reports' title='Fake escort list' hasBullet={true} />
        <SidebarMenuItem to='/pending-reports' title='Pending Reports' hasBullet={true} />
      </SidebarMenuItemWithSub> */}

      {/* <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <SidebarMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='/media/icons/duotune/communication/com006.svg'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/error'
        title='Errors'
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/general/gen040.svg'
      >
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div> */}
      {/* <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub> */}
      {/* <SidebarMenuItem
        to='/apps/user-management/users'
        icon='/media/icons/duotune/general/gen051.svg'
        title='User management'
        fontIcon='bi-layers'
      /> */}

      {/* <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={process.env.REACT_APP_PREVIEW_DOCS_URL + '/docs/changelog'}
        >
          <span className='menu-icon'>
            <KTSVG path='/media/icons/duotune/general/gen005.svg' className='svg-icon-2' />
          </span>
          <span className='menu-title'>Changelog {process.env.REACT_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export {SidebarMenuMain}
