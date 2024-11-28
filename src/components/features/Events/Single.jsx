import {
  CalendarIcon,
  ChevronDownIcon,
  MapPinIcon,
  HeartIcon,
} from "@heroicons/react/20/solid";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Single = () => {
  return (
    <>
      <div>
        <div className="lg:flex lg:items-center lg:justify-between px-5 md:px-96 mt-10">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-gray-200 sm:truncate sm:text-4xl sm:tracking-tight">
              Quasi - Halloween Party
            </h2>
            <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
              <div className="mt-2 flex items-center text-lg text-gray-500">
                <MapPinIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-100"
                />
                Hawaii
              </div>
              <div className="mt-2 flex items-center text-lg text-gray-500">
                <CalendarIcon
                  aria-hidden="true"
                  className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-100"
                />
                Closing on January 9, 2024
              </div>
            </div>
          </div>
          <div className="mt-5 flex lg:ml-4 lg:mt-0">
            <span className="hidden sm:block">
              <button
                type="button"
                className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <HeartIcon
                  aria-hidden="true"
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400"
                />
                Wishlist
              </button>
            </span>
            {/* Dropdown */}
            <Menu as="div" className="relative ml-3 hidden sm:hidden">
              <MenuButton className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:ring-gray-400">
                More
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 ml-1.5 h-5 w-5 text-gray-400"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 -mr-1 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Wishlist
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
