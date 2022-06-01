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
import Sectors from "@sector/Sectors";
import AddEditSector from "@sector/AddEditSector";

//Fault
import RegisterFault from "./pages/fault/RegisterFault";
import FaultList from "./pages/fault/FaultList";
import ViewFault from "./pages/fault/ViewFault";

// Preventive maintenance
import { ChecklistBuild } from "pages/preventive-maintenance/checklist-build/ChecklistBuild";
import { ChecklistType } from "pages/preventive-maintenance/checklist-type/ChecklistType";
import { ChecklistItems } from "pages/preventive-maintenance/checklist-items/ChecklistItems";
import { ChecklistSubItems } from "pages/preventive-maintenance/checklist-sub-items/ChecklistSubItems";
import { ChecklistTypeAddEdit } from "pages/preventive-maintenance/checklist-type/ChecklistTypeAddEdit";
import { ChecklistItemsAddEdit } from "pages/preventive-maintenance/checklist-items/ChecklistItemsAddEdit";
import { ChecklistSubItemsAddEdit } from "pages/preventive-maintenance/checklist-sub-items/ChecklistSubItemsAddEdit";

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
        path: "sectors",
        element: <Sectors />,
      },
      {
        path: "sectors/:id",
        element: <AddEditSector />,
      },
    ],
  },
  {
    path: "settings",
    element: <PrivateLayout />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <AddEditUser />,
      },
      {
        path: "groups",
        element: <Groups />,
      },
      {
        path: "permissions",
        element: <Permissions />,
      },
    ],
  },
  {
    path: "faults",
    element: <PrivateLayout />,
    children: [
      {
        path: "",
        element: <FaultList />,
      },
      {
        path: "register",
        element: <RegisterFault />,
      },
      {
        path: ":id",
        element: <ViewFault />,
      },
    ],
  },
  {
    path: "preventive-maintenance",
    element: <PrivateLayout />,
    children: [
      {
        path: "checklist-type",
        element: <ChecklistType />,
      },
	  {
        path: "checklist-type/:action",
        element: <ChecklistTypeAddEdit />,
      },
      {
        path: "checklist-items",
        element: <ChecklistItems />,
      },
	  {
        path: "checklist-items/:action",
        element: <ChecklistItemsAddEdit />,
      },
	  {
        path: "checklist-sub-items",
        element: <ChecklistSubItems />,
      },
	  {
        path: "checklist-sub-items/:action",
        element: <ChecklistSubItemsAddEdit />,
      },
	  {
        path: "checklist-build",
        element: <ChecklistBuild />,
      },
    ],
  },
];

export default routes;
