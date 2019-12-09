import React from "react";

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import StorageIcon from '@material-ui/icons/Storage';
import PersonIcon from '@material-ui/icons/Person';
import WorkIcon from '@material-ui/icons/Work';

import { RoutesPaths } from "../../../../constants";

export const adminPages = [
  {
    title: 'Главная',
    href: RoutesPaths.admin.dashboard,
    icon: <DashboardIcon />
  },
  {
    title: 'Каталог автомобилей',
    href: RoutesPaths.admin.cars,
    icon: <DirectionsCarIcon />
  },
  {
    title: 'Выгрузки дилеров',
    href: RoutesPaths.admin.dealerCars,
    icon: <StorageIcon />
  },
  {
    title: 'Бронирования',
    href: RoutesPaths.admin.reservations,
    icon: <ShoppingCartIcon />
  },
  {
    title: 'Дилеры',
    href: RoutesPaths.admin.dealersList,
    icon: <WorkIcon />
  },
  {
    title: 'Пользователи',
    href: RoutesPaths.admin.users,
    icon: <PeopleIcon />
  },
];

export const dealerPages = [
  {
    title: 'Главная',
    href: RoutesPaths.dealer.dashboard,
    icon: <DashboardIcon />
  },
  {
    title: 'Каталог автомобилей',
    href: RoutesPaths.dealer.cars,
    icon: <DirectionsCarIcon />
  },
  {
    title: 'Бронирования',
    href: RoutesPaths.dealer.reservations,
    icon: <ShoppingCartIcon />
  },
  {
    title: 'Личные данные',
    href: RoutesPaths.dealer.personal,
    icon: <PersonIcon />
  },
];
