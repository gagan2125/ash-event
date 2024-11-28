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

function App() {
  const location = useLocation();

  return (
    <div className="h-screen bg-primary">
      {location.pathname !== "/create-ticket" &&
        location.pathname !== "/launch-event" &&
        location.pathname !== "/auth" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/org-event" &&
        location.pathname !== "/create-event" &&
        location.pathname !== "/finance" &&
        location.pathname !== "/profile" &&
        location.pathname !== "/analytics" &&
        location.pathname !== "/market" && <Promote />}
      {location.pathname !== "/launch-event" &&
        location.pathname !== "/auth" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/org-event" &&
        location.pathname !== "/create-event" &&
        location.pathname !== "/finance" &&
        location.pathname !== "/profile" &&
        location.pathname !== "/analytics" &&
        location.pathname !== "/market" && <Navbar />}
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/single-event" element={<SingleEvent />} />
        <Route path="/my-tickets" element={<MyTickets />} />
        <Route path="/payment" element={<PaymentStripe />} />
        <Route path="/launch-event" element={<LaunchEvent />} />
        <Route path="/create-ticket" element={<Ticketed />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashbaord />} />
        <Route path="/org-event" element={<OrgEvent />} />
        <Route path="/create-event" element={<Create />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/market" element={<Makert />} />
      </Routes>
      {location.pathname !== "/create-ticket" &&
        location.pathname !== "/launch-event" &&
        location.pathname !== "/auth" &&
        location.pathname !== "/dashboard" &&
        location.pathname !== "/org-event" &&
        location.pathname !== "/create-event" &&
        location.pathname !== "/finance" &&
        location.pathname !== "/profile" &&
        location.pathname !== "/analytics" &&
        location.pathname !== "/market" && <Footer />}
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
