import React from "react";

import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import SettingsIcon from '@material-ui/icons/Settings';

import { RoutesPaths } from "../../../../constants";

export const adminPages = [
  {
    title: 'Главная',
    href: RoutesPaths.admin.dashboard,
    icon: <DashboardIcon />
  },
  {
    title: 'Пользователи',
    href: RoutesPaths.admin.users,
    icon: <PeopleIcon />
  },
  {
    title: 'Автомобили',
    href: RoutesPaths.admin.cars,
    icon: <DirectionsCarIcon />
  },
  {
    title: 'Настройки',
    href: '/settings',
    icon: <SettingsIcon />
  }
];

export const dealerPages = [];
