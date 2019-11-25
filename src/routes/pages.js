import { lazy } from "react";

// User pages

export const Index = lazy(() => import('../components/pages/Client/IndexPage'));

export const CarsList = lazy(() => import('../components/pages/Client/CarsPage'));

export const CarsDetail = lazy(() => import('../components/pages/Client/CarsDetail'));

// Admin pages

export const AdminLogin = lazy(() => import('../components/pages/Admin/Login'));

export const AdminDashboard = lazy(() => import('../components/pages/Admin/Dashboard'));

export const AdminCars = lazy(() => import('../components/pages/Admin/Cars'));

export const AdminReservations = lazy(() => import('../components/pages/Admin/Reservations'));

export const AdminUsers = lazy(() => import('../components/pages/Admin/Users'));

// Dealer pages
