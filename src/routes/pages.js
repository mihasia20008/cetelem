import { lazy } from "react";

// User pages

export const Index = lazy(() => import('../components/pages/Client/IndexPage'));

export const Cars = lazy(() => import('../components/pages/Client/CarsPage'));

// Admin pages

export const AdminLogin = lazy(() => import('../components/pages/Admin/Login'));

export const AdminDashboard = lazy(() => import('../components/pages/Admin/Dashboard'));

export const AdminCars = lazy(() => import('../components/pages/Admin/Cars'));

export const AdminUsers = lazy(() => import('../components/pages/Admin/Users'));

// Dealer pages
