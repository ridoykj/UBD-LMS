
import { Menu, Transition } from '@headlessui/react'

import { Fragment } from 'react';
import { FaBell, FaRegUser, FaRegUserCircle } from 'react-icons/fa';
import { FaGear } from "react-icons/fa6";
import { AiOutlineLogout } from "react-icons/ai";
import { NavLink } from 'react-router-dom';

const userNavigation = [
  { name: 'Your Profile', icon: <FaRegUserCircle />, href: '#' },
  { name: 'Settings', icon: <FaGear />, href: '#' },
  { name: 'Sign out', icon: <AiOutlineLogout />, href: '#' },
]

function NavLinkItem({ name, icon, route }: { name: string, icon: any, route: string, }) {
  const handleClick = () => {
    document.title = name;
  };

  return (
    <NavLink
      className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 hover:no-underline " to={route} onClick={handleClick}>
      <div>
        <span className="inline-flex justify-center items-center ml-4">
          {icon}
        </span>
        <span className="ml-2 text-sm tracking-wide truncate">{name}</span>
      </div>
    </NavLink>
  );
}
export default function AvatarControl() {
  return <>
    <div slot="navbar" className="absolute inset-y right-10 ml-4 flex items-center md:ml-6">
      <button
        type="button"
        className="relative rounded-full bg-gray-200 p-1 text-gray-400 hover:text-black focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
      >
        <span className="absolute -inset-1.5" />
        <span className="sr-only">View notifications</span>
        <FaBell className="h-6 w-6" size={10} aria-hidden="true" />
      </button>

      {/* Profile dropdown */}
      <Menu as="div" className="relative ml-3">
        <div>
          <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            <img className="h-8 w-8 rounded-full" src={'icons/icon.png'} alt="" />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {() => (
                  <NavLinkItem name={item.name} icon={item.icon} route={item.href} />
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  </>;
}
