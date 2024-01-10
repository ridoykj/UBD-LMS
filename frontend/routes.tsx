import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import GridView from './views/grid/GridView';
import AttendanceView from './views/org/academic/AttendanceView';
import OrganizationView from './views/org/academic/OrganizationView';
import SectionView from './views/org/academic/SectionView';
import TestimonialView from './views/org/academic/TestimonialView';
import BatchView from './views/org/edu/BatchView';
import CourseView from './views/org/edu/CourseView';
import DepartmentView from './views/org/edu/DepartmentView';
import ProgrammeView from './views/org/edu/ProgrammeView';
import ReservationView from './views/org/edu/ReservationView';
import BuildingView from './views/org/place/BuildingView';
import FloorView from './views/org/place/FloorView';
import RoomView from './views/org/place/RoomView';
import SectorView from './views/org/place/SectorView';
import AuthorizationView from './views/org/user/AuthorizationView';
import InstructorView from './views/org/user/InstructorView';
import StudentView from './views/org/user/StudentView';
import DashboardView from './views/profile/dashboard/DashboardView';
import ProfileView from './views/profile/ProfileView';
import ShopView from './views/shop/ShopView';
import UserView from './views/users/UserView';
import DefaultView from './views/default/DefaultView';
import CalenderBoardView from './views/profile/dashboard/CalenderBoardView';

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    handle: { title: 'Main' },
    children: [
      { path: '/', element: <DashboardView />, handle: { title: 'Dashboard' } },
      { path: '/cal', element: <CalenderBoardView />, handle: { title: 'Calender Board' } },
      { path: '/default', element: <DefaultView />, handle: { title: 'Not Implemented' } },
      { path: '/shop', element: <ShopView />, handle: { title: 'Shop' } },
      { path: '/grid', element: <GridView />, handle: { title: 'Grid' } },
      { path: '/about', element: <AboutView />, handle: { title: 'About' } },

      { path: '/academic/organization', element: <OrganizationView />, handle: { title: 'Organization' } },
      { path: '/academic/attendance', element: <AttendanceView />, handle: { title: 'Attendance' } },
      { path: '/academic/section', element: <SectionView />, handle: { title: 'Section' } },
      { path: '/academic/testimonial', element: <TestimonialView />, handle: { title: 'Testimonial' } },

      { path: '/edu/batch', element: <BatchView />, handle: { title: 'Batch' } },
      { path: '/edu/course', element: <CourseView />, handle: { title: 'Course' } },
      { path: '/edu/department', element: <DepartmentView />, handle: { title: 'Department' } },
      { path: '/edu/programme', element: <ProgrammeView />, handle: { title: 'Programme' } },
      { path: '/edu/reservation', element: <ReservationView />, handle: { title: 'Reservation' } },

      { path: '/place/building', element: <BuildingView />, handle: { title: 'Building' } },
      { path: '/place/floor', element: <FloorView />, handle: { title: 'Floor' } },
      { path: '/place/room', element: <RoomView />, handle: { title: 'Room' } },
      { path: '/place/sector', element: <SectorView />, handle: { title: 'Sector' } },

      { path: '/user/authorization', element: <AuthorizationView />, handle: { title: 'Authorization' } },
      { path: '/user/instructors', element: <InstructorView />, handle: { title: 'Instructor' } },
      { path: '/user/students', element: <StudentView />, handle: { title: 'Student' } },

      { path: '/users', element: <UserView />, handle: { title: 'Users' } },
      { path: '/profiles', element: <ProfileView />, handle: { title: 'profiles' } },
    ],
  },
];

export default createBrowserRouter(routes);
