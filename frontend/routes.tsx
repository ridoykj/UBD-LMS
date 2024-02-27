import MainLayout from 'Frontend/views/MainLayout.js';
import { lazy } from 'react';
import { createBrowserRouter, RouteObject } from 'react-router-dom';
import DefaultView from './views/default/DefaultView';
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
import CoordinatorView from './views/org/user/Coordinator/CoordinatorView';
import StudentView from './views/org/user/StudentView';
import TimeTableView from './views/org/timesheet/class_sheet/TimeTableView';
import ProfileView from './views/profile/ProfileView';
import ShopView from './views/shop/ShopView';
import UserView from './views/users/UserView';
import BatchCourseView from './views/org/allocation/BatchCourseView';
import HomeView from './views/home/HomeView';

const AboutView = lazy(async () => import('Frontend/views/about/AboutView.js'));

const rootPath = 'ubd-lms';

export const routes: RouteObject[] = [
  {
//     path: rootPath,
    element: <MainLayout />,
    handle: { title: 'Main' },
    children: [
      { path: '', element: <HomeView />, handle: { title: 'Dashboard' } },

      { path: 'default', element: <DefaultView />, handle: { title: 'Not Implemented' } },
      { path: 'shop', element: <ShopView />, handle: { title: 'Shop' } },
      { path: 'grid', element: <GridView />, handle: { title: 'Grid' } },
      { path: 'about', element: <AboutView />, handle: { title: 'About' } },

      { path: 'academic/organization', element: <OrganizationView />, handle: { title: 'Profile' } },
      { path: 'academic/attendance', element: <AttendanceView />, handle: { title: 'Attendance' } },
      { path: 'academic/section', element: <SectionView />, handle: { title: 'Section' } },
      { path: 'academic/testimonial', element: <TestimonialView />, handle: { title: 'Testimonial' } },

      { path: 'edu/batch', element: <BatchView />, handle: { title: 'Batch' } },
      { path: 'edu/course', element: <CourseView />, handle: { title: 'Course' } },
      { path: 'edu/department', element: <DepartmentView />, handle: { title: 'Department' } },
      { path: 'edu/programme', element: <ProgrammeView />, handle: { title: 'Programme' } },
      { path: 'edu/reservation', element: <ReservationView />, handle: { title: 'Reservation' } },

      { path: 'place/building', element: <BuildingView />, handle: { title: 'Building' } },
      { path: 'place/floor', element: <FloorView />, handle: { title: 'Floor' } },
      { path: 'place/room', element: <RoomView />, handle: { title: 'Room' } },
      { path: 'place/sector', element: <SectorView />, handle: { title: 'Sector' } },

      { path: 'allocation/batch_course', element: <BatchCourseView />, handle: { title: 'Batch-Course' } },

      { path: 'time_sheet/class', element: <TimeTableView />, handle: { title: 'Time Sheet' } },

      { path: 'user/authorization', element: <AuthorizationView />, handle: { title: 'Authorization' } },
      { path: 'user/coordinators', element: <CoordinatorView />, handle: { title: 'Coordinator' } },
      { path: 'user/students', element: <StudentView />, handle: { title: 'Student' } },

      { path: 'users', element: <UserView />, handle: { title: 'Users' } },
      { path: 'profiles', element: <ProfileView />, handle: { title: 'profiles' } },
    ],
  },
];

export default createBrowserRouter(routes);
