import React from "react";

// All pages that rely on 3rd party components (other than Bootstrap) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "@layouts/AuthLayout";
import PrivateLayout from "@layouts/PrivateLayout";

// // Guards
// import AuthGuard from "./components/guards/AuthGuard";

// Auth
import Page500 from "@auth/Page500";
import Page404 from "@auth/Page404";
import SignIn from "@auth/SignIn";
import SignUp from "@auth/SignUp";
import ResetPassword from "@auth/ResetPassword";

//Settings
import Users from "@users/Users";
import AddEditUser from "@users/AddEditUser";
import Groups from "@groups/Groups";
import Permissions from "@permissions/Permissions";

//property management
import Sector  from "@sector/Sector";
import AddEditSector  from "@sector/AddEditSector";

const routes = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "/",
    element: <PrivateLayout />,
  },
  {
    path: "property-management",
    element: <PrivateLayout />,
    children: [
      {
        path: "sector",
        element: <Sector />
      },
      {
        path: "sector/:id",
        element: <AddEditSector />
      }
    ],
  },
  {
    path: "settings",
    element: <PrivateLayout />,
    children: [
      {
        path: "users",
        element: <Users />
      },
      {
        path: "users/:id",
        element: <AddEditUser />,
      },
      {
        path: "groups",
        element: <Groups />
      },
      {
        path: "permissions",
        element: <Permissions />
      },
    ],
  },
];

export default routes;
