/* eslint-disable react/prop-types */
import { Building, Columns3, MoreVertical } from "lucide-react";
import { createContext, useContext, useState } from "react";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

const SidebarContext = createContext();

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-black border-r border-gray-800 shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <Building className={` ${expanded ? "w-5" : "w-0"}`} color="#fff" />
            <p
              className={`text-lg text-white font-semibold overflow-hidden transition-all ${
                expanded ? "w-44" : "w-0"
              }`}
            >
              Bobs Bar Party
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
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold text-gray-400">asana spa</h4>
                <span className="text-xs text-gray-400">info@konaspa.com</span>
              </div>
              <MoreVertical size={20} className="text-gray-400" />
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert, link }) {
  const { expanded } = useContext(SidebarContext);
  return (
    <a href={link}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "text-gray-50"
            : "hover:bg-[#3f3f3f61] hover:text-gray-50 text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          } ${active ? "text-white" : "text-gray-600 group-hover:text-white"}`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-white ${
              expanded ? "" : "top-2"
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
