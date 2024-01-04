import HelloWorldView from 'Frontend/views/helloworld/HelloWorldView.js';
import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import ShopView from './views/shop/ShopView';
import GridView from './views/grid/GridView';
import UserView from './views/users/UserView';
import ProfileView from './views/profiles/ProfileView';

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    handle: { title: 'Main' },
    children: [
      { path: '/', element: <HelloWorldView />, handle: { title: 'Home' } },
      { path: '/shop', element: <ShopView />, handle: { title: 'Shop' } },
      { path: '/grid', element: <GridView />, handle: { title: 'Grid' } },
      { path: '/about', element: <AboutView />, handle: { title: 'About' } },
      { path: '/users', element: <UserView />, handle: { title: 'Users' } },
      { path: '/profiles', element: <ProfileView />, handle: { title: 'profiles' } },
    ],
  },
];

export default createBrowserRouter(routes);
