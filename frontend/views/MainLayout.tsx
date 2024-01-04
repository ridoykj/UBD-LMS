
import { AppLayout } from '@hilla/react-components/AppLayout.js';
import { DrawerToggle } from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import AvatarControl from 'Frontend/components/profile/AvaterControl';
import RNavItem from 'Frontend/components/sidebar/RNavItem';
import { useRouteMetadata } from 'Frontend/util/routing';
import { Suspense } from 'react';
import { FaHome, FaIoxhost, FaQuestionCircle, FaRegUser, FaShoppingCart, FaTable } from 'react-icons/fa';
import { Outlet } from 'react-router-dom';



export default function MainLayout() {

  const items = [{ text: 'Ridoy Kumar Joy' }, { text: 'Profile' }, { text: 'Setting' }, { text: 'Logout' }];
  const currentTitle = useRouteMetadata()?.title ?? 'My App';
  return (
    <AppLayout primarySection="drawer">
      <div slot="drawer" className="min-h-screen bg-white flex flex-col justify-between p-m">
        <header className="flex flex-col bg-white overflow-hidden">
          <div className="flex items-center justify-center h-20 shadow-md">
            <img src="images/move-right.png" alt="" className='w-10' />
            <h1 className="text-3xl uppercase text-indigo-500">My App</h1>
          </div>
          <nav>
            <RNavItem name='Home' icon={<FaHome />} route='/' />
            <RNavItem name='Shop' icon={<FaShoppingCart />} route='/shop' />
            <RNavItem name='Group' icon={<FaIoxhost />} route='' subItems={[{ name: 'Grid', icon: <FaTable />, route: '/grid' }, { name: 'About', icon: <FaQuestionCircle />, route: '/About' }]} />
            <RNavItem name='Users' icon={<FaRegUser />} route='/users' />
            <RNavItem name='Profiles' icon={<FaRegUser />} route='/profiles' />
          </nav>
        </header>
      </div>

      <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
      <h2 slot="navbar" className="text-l m-0">{currentTitle}</h2>
      <AvatarControl />

      <Suspense fallback={<Placeholder />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  );
}
