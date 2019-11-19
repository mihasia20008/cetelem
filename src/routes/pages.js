import { lazy } from "react";

export const Index = lazy(() => import('../components/pages/Client/IndexPage'));

export const Cars = lazy(() => import('../components/pages/Client/CarsPage'));

export const Admin = lazy(() => import('../components/pages/MainAdmin'));

export const AdminLogin = lazy(() => import('../components/pages/Admin/Login'));
