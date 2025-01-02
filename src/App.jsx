import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/layouts/Navbar";
import Promote from "./components/layouts/Promote";
import Footer from "./components/layouts/Footer";
import Events from "./pages/Events";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import Login from "./pages/Login";
import SingleEvent from "./pages/SingleEvent";
import MyTickets from "./pages/MyTickets";
import Auth from "./pages/Auth";
import PaymentStripe from "./pages/PaymentStripe";
import LaunchEvent from "./pages/LaunchEvent";
import Ticketed from "./components/features/LaunchEvent/Ticketed";
import Dashbaord from "./pages/organizer/Dashbaord";
import OrgEvent from "./pages/organizer/OrgEvent";
import Create from "./pages/organizer/Create";
import Finance from "./pages/organizer/Finance";
import "./App.css";
import Profile from "./pages/organizer/Profile";
import Analytics from "./pages/organizer/Analytics";
import Makert from "./pages/organizer/Makert";
import Checkout from "./pages/Checkout";
import BasicDetails from "./pages/BasicDetails";
import CreateUserEvent from "./pages/CreateUserEvent";
import Edit from "./pages/organizer/Edit";
import OnboardingSuccess from "./pages/organizer/OnboardingSuccess";
import { stripePromise } from "./constants/stripePromise";
import { Elements } from "@stripe/react-stripe-js";
import QrTicket from "./pages/QrTicket";
import Eventinfo from "./pages/organizer/Eventinfo";
import MyProfile from "./pages/MyProfile";
import Success from "./pages/Success";
import ProfileUrl from './pages/organizer/ProfileUrl'
import Members from "./pages/organizer/Members"
import EventPreview from "./pages/organizer/EventPreview";
import QrScan from "./pages/organizer/QrScan";
import Tickets from "./pages/organizer/Tickets";
import TicketInfo from "./pages/organizer/TicketInfo";
import AddMember from "./pages/organizer/AddMember";
import EditMember from "./pages/organizer/EditMember";
import EventAnalytics from "./pages/organizer/EventAnalytics";
import LoginMember from "./pages/member/LoginMember";
import HomeMember from "./pages/member/HomeMember";
import MemberQRScanner from "./pages/member/MemberQRScanner";
import ScannedTickets from "./pages/member/ScannedTickets";
import ChooseEvent from "./pages/organizer/ChooseEvent";
import EventCopy from "./pages/organizer/EventCopy";
import Complimentary from "./pages/organizer/Complimentary";
import Promo from "./pages/organizer/Promo";
import Test from "./pages/Test";

function App() {
  const location = useLocation();

  const hideNavbarAndFooterPaths = [
    "/create-ticket",
    "/launch-event",
    "/basic-info",
    "/auth",
    "/dashboard",
    "/org-event",
    "/create-event",
    "/create-event-user",
    "/finance",
    "/profile",
    "/analytics",
    "/market",
    "/edit-event",
    '/onboarding-success',
    '/qr-ticket',
    '/event-info',
    '/success',
    '/profile-url',
    '/members',
    '/qr-scanner',
    '/tickets',
    '/ticket-info',
    '/add-member',
    '/edit-member',
    '/event-analytics',
    '/member-login',
    '/home-member',
    '/member-qr-scanner',
    '/scanned-tickets',
    '/choose-event',
    '/complimentary',
    '/promo',
    '/test'
  ];

  const shouldHideNavbarAndFooter = hideNavbarAndFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="h-screen bg-primary">
      {!shouldHideNavbarAndFooter && <Promote />}
      {!shouldHideNavbarAndFooter && <Navbar />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/:name" element={<SingleEvent />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/payment" element={<PaymentStripe />} />
        <Route path="/launch-event" element={<LaunchEvent />} />
        <Route path="/create-ticket" element={<Ticketed />} />
        <Route
          path="/checkout"
          element={
            <Elements stripe={stripePromise}>
              <Checkout />
            </Elements>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashbaord />} />
        <Route path="/org-event" element={<OrgEvent />} />
        <Route path="/create-event/:type" element={<Create />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/market" element={<Makert />} />
        <Route path="/basic-info" element={<BasicDetails />} />
        <Route path="/create-event-user/:type" element={<CreateUserEvent />} />
        <Route path="/edit-event/:id" element={<Edit />} />
        <Route path="/qr-ticket/:id" element={<QrTicket />} />
        <Route path="/onboarding-success/:accountId" element={<OnboardingSuccess />} />
        <Route path="/success/:accountId" element={<Success />} />
        <Route path="/event-info/:id" element={<Eventinfo />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/profile-url/:id/:name" element={<ProfileUrl />} />
        <Route path="/members" element={<Members />} />
        <Route path="/event-preview/:id" element={<EventPreview />} />
        <Route path="/qr-scanner" element={<QrScan />} />
        <Route path="/tickets/:id" element={<Tickets />} />
        <Route path="/ticket-info/:id" element={<TicketInfo />} />
        <Route path="/add-member" element={<AddMember />} />
        <Route path="/edit-member/:id" element={<EditMember />} />
        <Route path="/event-analytics/:id" element={<EventAnalytics />} />
        <Route path="/member-login" element={<LoginMember />} />
        <Route path="/home-member/:id" element={<HomeMember />} />
        <Route path="/member-qr-scanner/:id" element={<MemberQRScanner />} />
        <Route path="/scanned-tickets/:id" element={<ScannedTickets />} />
        <Route path="/choose-event" element={<ChooseEvent />} />
        <Route path="/event-copy/:id" element={<EventCopy />} />
        <Route path="/complimentary/:id" element={<Complimentary />} />
        <Route path="/promo/:id" element={<Promo />} />
        <Route path="/test" element={<Test/>} />
      </Routes>
      {!shouldHideNavbarAndFooter && <Footer />}
    </div>
  );
}

function Main() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Main;
