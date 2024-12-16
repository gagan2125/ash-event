/* eslint-disable react/prop-types */
import axios from "axios";
import { Building, Columns3, MoreVertical } from "lucide-react";
import { createContext, useContext, useEffect, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import url from "../../constants/url";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  const [oragnizerId, setOragnizerId] = useState(null);
  const [organizer, setOrganizer] = useState({});

  const fetchOrganizer = async () => {
    if (oragnizerId) {
      try {
        const response = await axios.get(`${url}/get-organizer/${oragnizerId}`);
        setOrganizer(response.data);
      } catch (error) {
        console.error("Error fetching organizer:", error);
      }
    } else {
      console.log("not found")
    }
  };

  useEffect(() => {
    const loadFromLocalStorage = () => {
      const storedUserOrganizerId = localStorage.getItem('organizerId');
      if (storedUserOrganizerId) {
        setOragnizerId(storedUserOrganizerId);
      } else {
        console.warn("No organizerId found in localStorage");
      }
    };

    loadFromLocalStorage();
    const handleStorageChange = () => {
      loadFromLocalStorage();
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    if (oragnizerId) {
      fetchOrganizer();
    }
  }, [oragnizerId]);

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-black border-r border-gray-800 shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <Building className={` ${expanded ? "w-5" : "w-0"}`} color="#fff" />
            <p
              className={`text-lg text-white font-semibold overflow-hidden transition-all ${expanded ? "w-44" : "w-0"
                }`}
            >
              {organizer.name || ""}
            </p>
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            >
              {expanded ? <FaCircleArrowLeft /> : <FaCircleArrowRight />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3 mt-12">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t border-gray-800 flex p-3">
            <Columns3 className="w-8 h-8 rounded-md text-gray-400" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-gray-400">ash</h4>
                <span className="text-xs text-gray-400">info@ash.com</span>
              </div>
              <MoreVertical size={20} className="text-gray-400" />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, link, onClick }) {
  const { expanded } = useContext(SidebarContext);
  const handleClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <a href={link || "#"} onClick={handleClick}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${active
            ? "text-gray-50"
            : "hover:bg-[#3f3f3f61] hover:text-gray-50 text-gray-600"
          }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
            } ${active ? "text-white" : "text-gray-600 group-hover:text-white"}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-white ${expanded ? "" : "top-2"
              }`}
          ></div>
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-gray-200 text-black text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </a>
  );
}
