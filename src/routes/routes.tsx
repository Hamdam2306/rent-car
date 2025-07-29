// src/router.tsx
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home-page";
import { Cars } from "../pages/carlist-page";
import Booking from "../pages/booking-page/booking-page";
import { Detail } from "../pages/detail-page";
import Login from "../pages/auth-page/login";
import Register from "../pages/auth-page/register";
import { Notfound } from "../pages/notFound-page";

import Dashboard from "../admin/pages/dashboard";
import CarRent from "../admin/pages/car-rent";
import AddCar from "../admin/pages/add-car";
import Inbox from "../admin/pages/inbox";
import CalendarPage from "../admin/pages/calendar";
import SettingsPage from "../admin/pages/settings";
import HelpCenterPage from "../admin/pages/helps";

export const Router = () => {
  return (
    <div className="sm:flex-row min-h-screen bg-gray-50 pl-4">
      <Routes>
        {/* User pages */}
        <Route path="/" element={<Home />} />
        <Route path="cars" element={<Cars />} />
        <Route path="booking" element={<Booking />} />
        <Route path="cars/:id" element={<Detail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Admin pages */}
        <Route path="/admin">
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars" element={<CarRent />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="help" element={<HelpCenterPage />} />
        </Route>
        {/* 404 */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
};
