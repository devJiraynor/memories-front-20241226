import React from 'react';
import { Outlet } from 'react-router';

import './style.css';

export default function Layout() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
