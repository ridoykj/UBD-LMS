
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import AvatarControlRC from 'Frontend/components/profile/AvaterControlRC';
import RNavItemRC from 'Frontend/components/sidebar/NavItemRC';
import { useRouteMetadata } from 'Frontend/util/routing';
import { Suspense } from 'react';
import { FaChartArea, FaDoorOpen, FaHome, FaKey, FaPaintRoller, FaScroll, FaUserTie } from 'react-icons/fa';
import { FaBarsStaggered, FaBezierCurve, FaBuildingCircleCheck, FaBuildingFlag, FaCalendarDay, FaCodeCompare, FaMapLocationDot, FaShop, FaUser, FaUserGear, FaUserGraduate } from 'react-icons/fa6';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {

  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  return (
    <>
      <AppLayout primarySection="drawer" >
        <div slot="drawer" className="min-h-screen bg-gray-800 flex flex-col justify-between p-m">
          <header className="flex flex-col overflow-hidden">
            <div className="flex items-center justify-center h-20 shadow-md">
              {/* <img src="images/move-right.png" alt="" className='w-10' />            
            <h1 className="text-3xl uppercase text-indigo-500">My App</h1> */}
              {/* <img src="images/logo_uoa.svg" alt="" className='w-30' /> */}
              <img src="images/move-right.png" alt="" className='w-20' />
              {/* <h1 className="text-3xl uppercase text-indigo-500 font-bold">AFG College with the Univerity of Aberdeen</h1> */}
              {/* <h1 className="text-xl text-indigo-500 font-bold">AFG College with the University of Aberdeen</h1> */}
            </div>
            <nav className='overflow-y-auto h-full'>

              <RNavItemRC name='Dashboard' icon={<FaChartArea />} route='' />
              <RNavItemRC name='Organization' icon={<FaHome />} route='' subItems={[
                { name: 'Profile', icon: <FaUserGear />, route: 'academic/organization' },
                { name: 'Department', icon: <FaShop />, route: 'edu/department' },
                { name: 'Programme', icon: <FaPaintRoller />, route: 'edu/programme' },
                { name: 'Batch', icon: <FaScroll />, route: 'edu/batch' },
                { name: 'Course', icon: <FaBarsStaggered />, route: 'edu/course' },
                // { name: 'Reservation', icon: <FaCalendarDay />, route: '/edu/reservation' }
              ]} />
              <RNavItemRC name='Place' icon={<FaMapLocationDot />} route='' subItems={[
                { name: 'Sector', icon: <FaBuildingFlag />, route: 'place/sector' },
                { name: 'Building', icon: <FaBuildingCircleCheck />, route: 'place/building' },
                { name: 'Floor', icon: <FaBarsStaggered />, route: 'place/floor' },
                { name: 'Room', icon: <FaDoorOpen />, route: 'place/room' }
              ]} />
              <RNavItemRC name='User' icon={<FaUser />} route='' subItems={[
                { name: 'Coordinator', icon: <FaUserTie />, route: 'user/coordinators' },
                { name: 'Student', icon: <FaUserGraduate />, route: 'user/students' },
                { name: 'Authorization', icon: <FaKey />, route: 'user/authorization' }
              ]} />
              <RNavItemRC name='Allocation' icon={<FaBezierCurve />} route='' subItems={[
                { name: 'Batch-Course', icon: <FaCodeCompare />, route: 'allocation/batch_course' },
                // { name: 'Course-Coordinator', icon: <FaCodeCompare />, route: '/default' },
              ]} />
              <RNavItemRC name='Time Sheet' icon={<FaCalendarDay />} route='' subItems={[
                { name: 'Class', icon: <FaCalendarDay />, route: 'time_sheet/class' },
                { name: 'Examination', icon: <FaCalendarDay />, route: 'default' },
                { name: 'Attendance', icon: <FaCalendarDay />, route: 'default' },
              ]} />
              {/* <RNavItemRC name='Report' icon={<FaClipboard />} route='' subItems={[
                { name: 'Result', icon: <FaReceipt />, route: '/default' },
                { name: 'Revenue', icon: <FaCircleDollarToSlot />, route: '/default' }
              ]} />
              <RNavItemRC name='Configuration' icon={<FaGear />} route='' subItems={[
                { name: 'Schedule', icon: <FaCalendarDay />, route: '/default' },
                { name: 'Result', icon: <FaReceipt />, route: '/default' },
                { name: 'Revenue', icon: <FaCircleDollarToSlot />, route: '/default' }
              ]} /> */}
              {/* <RNavItem name='Users' icon={<FaRegUser />} route='/users' />
            <RNavItem name='Profiles' icon={<FaRegUser />} route='/profiles' /> */}
            </nav>
          </header>
        </div>

        <div slot="navbar" className='flex flex-row w-full h-full items-center'>
          <DrawerToggle aria-label="Menu toggle"></DrawerToggle>
          <p className="text-lg font-semibold m-0">{currentTitle}</p>
          <AvatarControlRC />
        </div>
        <div slot='content'>

        </div>
        <Suspense fallback={<Placeholder />}>
          <Outlet />
        </Suspense>
      </AppLayout>
    </>
  );
}
