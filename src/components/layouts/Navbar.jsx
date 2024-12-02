import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { IoLogoPlaystation } from "react-icons/io";
import "../../styles/global.css";

import products from "../../data/Submenu";
import callsToAction from "../../data/CallToAction";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [userId, setUserId] = useState(null);
  const [organizerId, setOrganizerId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userID');
    const storedOragnizerId = localStorage.getItem('organizerId');
    setUserId(storedUserId);
    setOrganizerId(storedOragnizerId)
  }, []);

  console.log(organizerId)

  return (
    <>
      <div>
        <header className="bg-primary">
          <nav
            aria-label="Global"
            className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6"
          >
            <div className="flex lg:flex-1 items-center">
              <a href="/" className="-m-1.5 p-1.5 flex gap-3">
                <IoLogoPlaystation className="h-8 w-auto text-white" />
                <p className="text-white mt-1 text-lg">ash</p>
              </a>
            </div>
            <div className="flex lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Bars3Icon aria-hidden="true" className="h-6 w-6 text-white" />
              </button>
            </div>
            <PopoverGroup className="hidden lg:flex lg:gap-x-12">
              <Link
                to="/events"
                className={`text-base font-semibold leading-6 hover:text-secondary px-3 py-2 border-b-2 border-transparent transition duration-200 ${location.pathname === "/events" ||
                  location.pathname === "/single-event"
                  ? "border-red-700 text-secondary"
                  : "text-white hover:border-secondary"
                  }`}
              >
                Explore Events
              </Link>
              <Link
                to="/about"
                className={`text-base font-semibold leading-6 hover:text-secondary px-3 py-2 border-b-2 border-transparent transition duration-200 ${location.pathname === "/about"
                  ? "border-secondary text-secondary"
                  : "text-white hover:border-secondary"
                  }`}
              >
                About Us
              </Link>
              <Link
                to="/blogs"
                className={`text-base font-semibold leading-6 hover:text-secondary px-3 py-2 border-b-2 border-transparent transition duration-200 ${location.pathname === "/blogs"
                  ? "border-secondary text-secondary"
                  : "text-white hover:border-secondary"
                  }`}
              >
                Blogs
              </Link>
              {userId ? (
                <Link
                  to="/my-profile"
                  className={`text-base font-semibold leading-6 hover:text-secondary px-3 py-2 border-b-2 border-transparent transition duration-200 ${location.pathname === "/my-profile"
                    ? "border-secondary text-secondary"
                    : "text-white hover:border-secondary"
                    }`}
                >
                  Profile
                </Link>
              ) : (
                <Link
                  to="/auth"
                  className={`text-base font-semibold leading-6 hover:text-secondary px-3 py-2 border-b-2 border-transparent transition duration-200 ${location.pathname === "/login"
                    ? "border-secondary text-secondary"
                    : "text-white hover:border-secondary"
                    }`}
                >
                  Login
                </Link>
              )}
              <Link
                to="/my-tickets"
                className={`text-base font-semibold leading-6 hover:text-secondary px-3 py-2 border-b-2 border-transparent transition duration-200 ${location.pathname === "/my-tickets"
                  ? "border-secondary text-secondary"
                  : "text-white hover:border-secondary"
                  }`}
              >
                My Bookings
              </Link>

              {/* <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-1 text-base font-semibold leading-6 text-white outline-none hover:text-secondary px-3 py-2 border-b-2 border-transparent hover:border-secondary transition duration-200">
                  More
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="h-5 w-5 flex-none text-gray-400 hover:text-secondary"
                  />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            aria-hidden="true"
                            className="h-6 w-6 text-gray-600 group-hover:text-secondary"
                          />
                        </div>
                        <div className="flex-auto">
                          <a
                            href={item.href}
                            className="block font-semibold text-gray-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-gray-600">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                      >
                        <item.icon
                          aria-hidden="true"
                          className="h-5 w-5 flex-none text-gray-400"
                        />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover> */}
            </PopoverGroup>
            {
              organizerId ? (
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                  <div className="rounded-full p-1">
                    <a
                      href="/dashboard"
                      className="inline-block text-base font-semibold leading-6 text-white px-4 py-2 bg-[#080808] rounded-full"
                    >
                      Go to dashboard <span aria-hidden="true">&rarr;</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                  <div className="rounded-full p-1">
                    <a
                      href="/launch-event"
                      className="inline-block text-base font-semibold leading-6 text-white px-8 py-2 bg-[#080808] rounded-full"
                    >
                      Launch Events
                    </a>
                  </div>
                </div>
              )
            }
          </nav>
          <Dialog
            open={mobileMenuOpen}
            onClose={setMobileMenuOpen}
            className="lg:hidden"
          >
            <div className="fixed inset-0 z-10" />
            <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-primary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
              <div className="flex items-center justify-between">
                <a href="#" className="-m-1.5 p-1.5 flex gap-3">
                  <IoLogoPlaystation className="h-8 w-auto text-white" />
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200/10">
                  <div className="space-y-2 py-6">
                    <a
                      href="/events"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      Explore Events
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      About Us
                    </a>
                    <a
                      href="#"
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                    >
                      Blogs
                    </a>
                    {
                      userId ? (
                        <>
                          <a
                            href="/my-profile"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                          >
                            My Profile
                          </a>
                        </>
                      ) : (
                        <>
                          <a
                            href="/auth"
                            className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-800"
                          >
                            Login
                          </a>
                        </>
                      )
                    }
                    {/* <Disclosure as="div" className="-mx-3">
                      <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-gray-50">
                        More
                        <ChevronDownIcon
                          aria-hidden="true"
                          className="h-5 w-5 flex-none group-data-[open]:rotate-180"
                        />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-white hover:bg-gray-50"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure> */}
                  </div>
                  {
                    organizerId ? (
                      <>
                        <div className="py-6">
                          <a
                            href="/dashboard"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-secondary hover:bg-gray-50"
                          >
                            Switch to Oragnizer
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="py-6">
                          <a
                            href="/launch-event"
                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-secondary hover:bg-gray-50"
                          >
                            Launch Events
                          </a>
                        </div>
                      </>
                    )
                  }
                </div>
              </div>
            </DialogPanel>
          </Dialog>
        </header >
      </div >
    </>
  );
};

export default Navbar;
