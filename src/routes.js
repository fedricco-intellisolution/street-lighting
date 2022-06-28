import React from "react";

// Layouts
import AuthLayout from "@layouts/AuthLayout";
import PrivateLayout from "@layouts/PrivateLayout";

// Auth
import Page500 from "@auth/Page500";
import Page404 from "@auth/Page404";

// Sub module
import SubModule from "@sub-module/SubModule";
import SubModuleAddEdit from "@sub-module/SubModuleAddEdit";

// Settings
import Settings from "@settings/Settings";

const routes = [
    {
        path: "auth",
        element: <AuthLayout />,
        children: [
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
        path: "module",
        element: <PrivateLayout />,
        children: [
            {
                path: "sub",
                element: <SubModule />,
            },
            {
                path: "sub/:id",
                element: <SubModuleAddEdit />,
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
