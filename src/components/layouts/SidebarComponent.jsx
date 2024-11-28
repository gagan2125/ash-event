import {
  LogOutIcon,
  CalendarCheck,
  Home,
  ChartPie,
  BookCheck,
  BadgeDollarSign,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../layouts/Sidebar";
import { useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
const SidebarComponent = () => {
  const location = useLocation();
  return (
    <div>
      <Sidebar>
        <SidebarItem
          icon={<Home size={20} />}
          text="Home"
          active={location.pathname === "/dashboard"}
          alert
          link="/dashboard"
        />
        <SidebarItem
          icon={<ChartPie size={20} />}
          text="Analytics"
          link="/analytics"
          active={location.pathname === "/analytics"}
        />
        <div className="my-8"></div>
        <SidebarItem
          icon={<CalendarCheck size={20} />}
          text="Events"
          link="/org-event"
          active={location.pathname === "/org-event"}
        />
        <SidebarItem
          icon={<BookCheck size={20} />}
          text="Marketing"
          link="/market"
          active={location.pathname === "/market"}
        />
        <SidebarItem
          icon={<BadgeDollarSign size={20} />}
          text="Finance"
          link="/finance"
          active={location.pathname === "/finance"}
        />
        <div className="my-8"></div>
        <SidebarItem
          icon={<CgProfile size={20} />}
          text="Profile"
          link="/profile"
          active={location.pathname === "/profile"}
        />
        <SidebarItem icon={<LogOutIcon size={20} />} text="Logout" link="/" />
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
