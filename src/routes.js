import React from "react";

// Layouts
import AuthLayout from "@layouts/AuthLayout";
import PrivateLayout from "@layouts/PrivateLayout";

// Auth
import Page500 from "@auth/Page500";
import Page404 from "@auth/Page404";
import SignInPage from "pages/auth/SignInPage";

// Settings
import Settings from "@settings/Settings";
import Checklist from "./pages/Checklist/Checklist";
import ChecklistForm from "./pages/Checklist/ChecklistForm";
import ChecklistCreate from "./pages/Checklist/ChecklistCreate";
import ChecklistPhotos from "./pages/Checklist/ChecklistPhotos";
import { Dashboard } from "./pages/Dashboard/Dashboard";

import Fault from "./pages/Fault/Fault";
import FaultForm from "./pages/Fault/FaultForm";
import FaultCreate from "./pages/Fault/FaultCreate";
import Asset from "./pages/Assets/Asset";
import AssetCreate from "./pages/Assets/AssetCreate";
import AssetForm from "./pages/Assets/AssetForm";

const routes = [
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
            {
                path: "sign-in",
                element: <SignInPage />,
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
        element: (
            <PrivateLayout>
                <Dashboard />
            </PrivateLayout>
        ),
    },
    {
        path: "checklist",
        element: <PrivateLayout />,
        children: [
            {
                path: "list",
                element: <Checklist />,
            },
            {
                path: "list/create",
                element: <ChecklistCreate />,
            },
            {
                path: "list/edit/:id/photos/:checklist_item_id",
                element: <ChecklistPhotos />,
            },
            {
                path: "list/edit/:id",
                element: <ChecklistForm />,
            },
            {
                path: "list/view/:id",
                element: <ChecklistForm type="View" />,
            },
        ],
    },
    {
        path: "fault",
        element: <PrivateLayout />,
        children: [
            {
                path: "list",
                element: <Fault />,
            },
            {
                path: "list/create",
                element: <FaultCreate />,
            },
            {
                path: "list/edit/:id",
                element: <FaultForm />,
            },
            {
                path: "list/view/:id",
                element: <FaultForm type="View" />,
            },
        ],
    },
    {
        path: "asset",
        element: <PrivateLayout />,
        children: [
            {
                path: "list",
                element: <Asset />,
            },
            {
                path: "list/create",
                element: <AssetCreate />,
            },
            {
                path: "list/edit/:id",
                element: <AssetForm />,
            },
            {
                path: "list/view/:id",
                element: <AssetForm type="View" />,
            },
        ],
    },
    {
        path: "settings",
        element: (
            <PrivateLayout>
                <Settings />
            </PrivateLayout>
        ),
    },
];

export default routes;
