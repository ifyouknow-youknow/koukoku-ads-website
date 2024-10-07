import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { Home } from './PAGES/Home';
import './App.css'
import { Login } from './PAGES/Login';
import { CreateAd } from './PAGES/CreateAd';
import Notifications from './PAGES/Notifications';
import Campaigns from './PAGES/Campaigns';
import { Signup } from './PAGES/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/campaigns",
    element: <Campaigns />,
  },
  {
    path: "/create-ad",
    element: <CreateAd />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

