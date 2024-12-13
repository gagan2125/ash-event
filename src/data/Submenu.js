import { ProfileFilled, ProfileOutlined } from "@ant-design/icons";
import {
  ArrowPathIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { CgProfile } from "react-icons/cg";

const Submenu = [
  {
    name: "My Tickets",
    //description: "Get a better understanding of your Bookings",
    href: "/my-tickets",
    icon: TicketIcon,
  },
  {
    name: "My Profile",
    //description: "Get a better understanding of your Bookings",
    href: "/my-profile",
    icon: CgProfile,
  },
];

export default Submenu;
