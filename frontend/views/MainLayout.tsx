
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import AvatarControlRC from 'Frontend/components/profile/AvaterControlRC';
import RNavItemRC from 'Frontend/components/sidebar/NavItemRC';
import { useRouteMetadata } from 'Frontend/util/routing';
import { Suspense } from 'react';
import { FaChartArea, FaDoorOpen, FaHome, FaKey, FaPaintRoller, FaScroll, FaUserTie } from 'react-icons/fa';
import { FaBarsStaggered, FaBezierCurve, FaBuildingCircleCheck, FaBuildingFlag, FaCalendarDay, FaCodeCompare, FaFileShield, FaLock, FaMapLocationDot, FaShop, FaUser, FaUserGear, FaUserGraduate, FaUserShield } from 'react-icons/fa6';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {

  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  return (
    <>
      <AppLayout primarySection="drawer" >
        <div slot="drawer" className="min-h-screen bg-gray-800 flex flex-col justify-between p-m">
          <header className="flex flex-col overflow-hidden">
            <div className="flex items-center justify-center h-20 shadow-md">
              {/* <img src="images/logo_uoa.svg" alt="" className='w-30' /> */}
              <img src="images/move-right.png" alt="" className='w-20' />
              {/* <p className="text-xl uppercase text-center text-purple-500 font-bold drop-shadow-[0_10px_10px_rgba(255, 255, 255, 0.8)]">AFG College with the Univerity of Aberdeen</p> */}
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
              <RNavItemRC name='Allocation' icon={<FaBezierCurve />} route='' subItems={[
                { name: 'Batch-Course', icon: <FaCodeCompare />, route: 'allocation/batch_course' },
                // { name: 'Course-Coordinator', icon: <FaCodeCompare />, route: '/default' },
              ]} />
              <RNavItemRC name='Time Sheet' icon={<FaCalendarDay />} route='' subItems={[
                { name: 'Class', icon: <FaCalendarDay />, route: 'time_sheet/class' },
                { name: 'Examination', icon: <FaCalendarDay />, route: 'default' },
                { name: 'Attendance', icon: <FaCalendarDay />, route: 'default' },
              ]} />
              <RNavItemRC name='User' icon={<FaUser />} route='' subItems={[                
                { name: 'Users', icon: <FaKey />, route: 'user/users' },
                { name: 'Coordinator', icon: <FaUserTie />, route: 'user/coordinators' },
                { name: 'Student', icon: <FaUserGraduate />, route: 'user/students' },
              ]} />
              <RNavItemRC name='Permission' icon={<FaLock />} route='' subItems={[
                { name: 'Resources', icon: <FaFileShield />, route: 'permission/resources' },
                { name: 'Role', icon: <FaUserShield />, route: 'permission/roles' },
                { name: 'Authorization', icon: <FaKey />, route: 'permission/authorization' }
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
