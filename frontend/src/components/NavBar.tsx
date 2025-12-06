import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, NavLink } from 'react-router'
import { MdOutlineAccountCircle } from "react-icons/md";
import { TiWorld } from "react-icons/ti";
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

const baseNavigation = [
  { name: 'Home', to: '/', current: true },
  { name: 'Share', to: '/share', current: false },
  { name: 'Moderate', to: '/moderate', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
  const { handleLogout, user } = useAuth();
  const navigate = useNavigate();

  const navigation = user?.role === 'admin'
  ? baseNavigation
  : baseNavigation.filter(item => item.name !== 'Moderate');

  const handleLogoutClick = async () => {
    await handleLogout();
    navigate('/login', { replace: true });
  };

  const handleLoginSwitch = () => {
    navigate('/login', { replace: true });
  }

  return (
    <Disclosure
      as="nav"
      className="relative bg-dark-red after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-light/10"
    >
      <div className="mx-auto max-w-8xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-light-pink hover:bg-light/5 hover:text-light focus:outline-2 focus:-outline-offset-1 focus:outline-crimson">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <TiWorld className='h-8 w-auto text-light'/>
            </div>
            {/* Desktop Nav */}
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.to}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-burgundy/50 text-light' : 'text-light hover:bg-light/5 hover:text-light',
                      'rounded-md px-3 py-2 text-md font-medium',
                    )}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              {user ? (
                <>
                  <MenuButton className="flex items-center gap-2 rounded-full p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson cursor-pointer hover:bg-light/10">
                    <span className="sr-only">Open user menu</span>
                    <h3 className="text-nd font-medium text-light truncate max-w-[100px] text-center">
                      {user?.name || 'User'}
                    </h3>
                    <MdOutlineAccountCircle className="size-8 rounded-full text-light bg-dark-red/50 outline outline-1 outline-light/20" />
                  </MenuButton>

                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-dark-red py-1 outline -outline-offset-1 outline-light/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                  >
                    <MenuItem>
                      <Link
                        to="/account-settings"
                        className="block px-4 py-2 text-sm text-light data-focus:bg-light/5 data-focus:outline-hidden"
                      >
                        Account Settings
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <button
                        onClick={handleLogoutClick}
                        className="block w-full text-left px-4 py-2 text-sm text-light data-focus:bg-light/5 data-focus:outline-hidden"
                      >
                        Log Out
                      </button>
                    </MenuItem>
                  </MenuItems>
                </>
              ) : (
                <>
                  <MenuButton onClick={handleLoginSwitch} className="flex items-center gap-2 rounded-full p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-crimson cursor-pointer hover:bg-light/10">
                    <span className="sr-only">Open user menu</span>
                    <h3 className="text-nd font-medium text-light truncate max-w-[100px] text-center">
                      Login
                    </h3>
                    <MdOutlineAccountCircle className="size-8 rounded-full text-light bg-dark-red/50 outline outline-1 outline-light/20" />
                  </MenuButton>
                </>
              ) }
            </Menu>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                classNames(
                  isActive ? 'bg-burgundy/50 text-light' : 'text-rose-pink hover:bg-light/5 hover:text-light',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}