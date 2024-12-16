import {
  LogOutIcon,
  CalendarCheck,
  Home,
  ChartPie,
  BookCheck,
  BadgeDollarSign,
  Group,
} from "lucide-react";
import Sidebar, { SidebarItem } from "../layouts/Sidebar";
import { useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { FaPeopleGroup } from "react-icons/fa6";
import { Modal } from "antd";

const SidebarComponent = () => {
  const location = useLocation();
  const handleLogoutClick = () => {
    Modal.confirm({
      title: "Logout Alert",
      content: "Are you sure you want to logout?",
      onOk: () => {
        localStorage.clear();
        window.location.href = "/";
      },
      onCancel: () => {
        console.log("Logout canceled");
      },
      okButtonProps: {
        style: { backgroundColor: "black", borderColor: "black", color: "white" },
      },
      cancelButtonProps: {
        style: { backgroundColor: "gray", borderColor: "gray", color: "white" },
      },
      okText: "Logout",
      cancelText: "Cancel",
      maskStyle: { backgroundColor: "rgba(0, 0, 0, 0.8)" },
      style: {
        color: "white",
        backgroundColor: "#000",
        borderRadius: "8px",
        borderColor: "#ccc",
      },
    });
  };
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
          active={location.pathname === "/org-event" || location.pathname === "/event-info"}
        />
        <SidebarItem
          icon={<BookCheck size={20} />}
          text="Marketing"
          link="/market"
          active={location.pathname === "/market"}
        />
        <SidebarItem
          icon={<FaPeopleGroup size={20} />}
          text="Members"
          link="/members"
          active={location.pathname === "/members"}
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
        <SidebarItem
          icon={<LogOutIcon size={20} />}
          text="Logout"
          onClick={handleLogoutClick}
        />
      </Sidebar>
    </div>
  );
};

export default SidebarComponent;
