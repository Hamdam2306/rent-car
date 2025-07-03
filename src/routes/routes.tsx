// src/router.tsx
import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home-page";
import { Cars } from "../pages/carlist-page";
import { Booking } from "../pages/booking-page";
import { Detail } from "../pages/detail-page";
import Login from "../pages/auth-page/login";
import Register from "../pages/auth-page/register";
import { Notfound } from "../pages/notFound-page";

import Dashboard from "../admin/pages/dashboard";
import CarRent from "../admin/pages/car-rent";
import AddCar from "../admin/pages/add-car";
import Inbox from "../admin/pages/inbox";
import CalendarPage from "../admin/pages/calendar";

export const Router = () => {
  return (
    <Routes>
      {/* User pages */}
      <Route path="/" element={<Home />} />
      <Route path="/cars" element={<Cars />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/cars/:id" element={<Detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin pages */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/cars" element={<CarRent />} />
      <Route path="/admin/add-car" element={<AddCar />} />
      <Route path="/admin/inbox" element={<Inbox />} />
      <Route path="/admin/calendar" element={<CalendarPage />} />

      {/* 404 */}
      <Route path="*" element={<Notfound />} />
    </Routes>
  );
};
