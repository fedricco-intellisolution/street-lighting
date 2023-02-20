import {
    Settings,
    Sliders,
    Package,
    Activity,
    CheckSquare,
    Database,
} from "react-feather";

const pagesSection = [
    {
        href: "/",
        icon: Sliders,
        title: "Dashboard",
    },
    {
        icon: Activity,
        title: "Fault management",
        href: "fault",
        children: [
            {
                href: "/fault/list",
                title: "Fault items",
            },
        ],
    },
    {
        icon: Package,
        title: "Installation checklist",
        href: "installation",
        children: [
            {
                href: "/checklist/list",
                title: "Checklist items",
            },
        ],
    },
    {
        icon: CheckSquare,
        title: "Servicing checklist",
        href: "installation",
        // children: [
        //     {
        //         href: "/servicing/list",
        //         title: "Checklist items",
        //     },
        // ],
    },
    {
        icon: Database,
        title: "Assets management",
        href: "assets",
        children: [
            {
                href: "/asset/list",
                title: "Assets items",
            },
        ],
    },
    {
        icon: Settings,
        title: "Settings",
        children: [
            {
                href: "/settings",
                title: "Settings",
            },
        ],
    },
];

const navItems = [
    {
        title: "Pages",
        pages: pagesSection,
    },
];

export default navItems;
